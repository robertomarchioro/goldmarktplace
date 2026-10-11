#!/usr/bin/env bash
# Claude policy scan of the marketplace's LOCAL plugins (./plugins/<name>).
#
# The upstream scan-plugins action only reviews external entries (object
# `source`), so local plugins would otherwise never be scanned. This mirrors
# its review — same policy prompt, same verdict schema, same read-only
# tools — for local entries, and is fail-closed: a verdict that cannot be
# parsed fails the job instead of being skipped.
#
# Env:
#   MARKETPLACE_PATH   default .claude-plugin/marketplace.json
#   POLICY_PROMPT      default .github/policy/prompt.md
#   VERDICT_SCHEMA     default .github/policy/schema.json
#   BASE_REF           ref to diff against; required unless SCAN_ALL=true
#   SCAN_ALL           true scans every local plugin
#   SCAN_TIMEOUT_SECS  per-plugin timeout, default 300
#   LIST_ONLY          true prints the targets and exits without scanning

set -euo pipefail

MARKETPLACE_PATH="${MARKETPLACE_PATH:-.claude-plugin/marketplace.json}"
POLICY_PROMPT="${POLICY_PROMPT:-.github/policy/prompt.md}"
VERDICT_SCHEMA="${VERDICT_SCHEMA:-.github/policy/schema.json}"
SCAN_ALL="${SCAN_ALL:-false}"
SCAN_TIMEOUT_SECS="${SCAN_TIMEOUT_SECS:-300}"
LIST_ONLY="${LIST_ONLY:-false}"

LOCAL_SOURCE='^\./plugins/[A-Za-z0-9][A-Za-z0-9._-]*$'

log() { printf '%s\n' "$*"; }
die() { printf '::error::%s\n' "$*"; exit 1; }
group_start() { printf '::group::%s\n' "$*"; }
group_end() { printf '::endgroup::\n'; }

[[ -f "$MARKETPLACE_PATH" ]] || die "marketplace not found at $MARKETPLACE_PATH"
[[ -f "$POLICY_PROMPT" ]] || die "policy prompt not found at $POLICY_PROMPT"
[[ -f "$VERDICT_SCHEMA" ]] || die "verdict schema not found at $VERDICT_SCHEMA"
[[ "$SCAN_TIMEOUT_SECS" =~ ^[0-9]+$ ]] || die "SCAN_TIMEOUT_SECS must be an integer"

repo_root="$(pwd -P)"
plugins_root="$repo_root/plugins"

# ---- determine targets ------------------------------------------------------

# Every local entry as "name<TAB>source".
local_entries() {
  jq -r '.plugins[] | select(.source|type=="string") | [.name, .source] | @tsv' -- "$1"
}

# True when an entry's catalog line changed against BASE_REF.
entry_changed() {
  local name="$1" base_entry head_entry
  base_entry="$(git show "$BASE_REF:$MARKETPLACE_PATH" 2>/dev/null \
    | jq -c --arg n "$name" '.plugins[] | select(.name==$n)' 2>/dev/null || true)"
  head_entry="$(jq -c --arg n "$name" '.plugins[] | select(.name==$n)' -- "$MARKETPLACE_PATH")"
  [[ "$base_entry" != "$head_entry" ]]
}

# True when any of the paths differ from BASE_REF. A git error fails the
# job rather than passing for "changed" or "unchanged".
paths_changed() {
  local status=0
  git diff --quiet "$BASE_REF" HEAD -- "$@" || status=$?
  case "$status" in
    0) return 1 ;;
    1) return 0 ;;
    *) die "git diff against $BASE_REF failed ($status) for: $*" ;;
  esac
}

is_target() {
  local name="$1" source="$2"
  [[ "$SCAN_ALL" == "true" ]] && return 0
  entry_changed "$name" && return 0
  paths_changed "$source"
}

if [[ "$SCAN_ALL" != "true" ]]; then
  [[ -n "${BASE_REF:-}" ]] || die "BASE_REF is required unless SCAN_ALL=true"
  git rev-parse --verify --quiet "$BASE_REF^{commit}" >/dev/null || die "BASE_REF $BASE_REF is not a commit"
  # A policy change re-reviews everything against the new rules.
  if paths_changed "$POLICY_PROMPT" "$VERDICT_SCHEMA"; then
    log "Policy changed: scanning every local plugin."
    SCAN_ALL=true
  fi
fi

group_start "Determine local scan targets"
targets=()
while IFS=$'\t' read -r name source; do
  if [[ ! "$source" =~ $LOCAL_SOURCE ]]; then
    die "local source for $name is not ./plugins/<name>: $source"
  fi
  dir="$(cd -- "$source" 2>/dev/null && pwd -P)" || die "$name: $source does not exist"
  [[ "$(dirname -- "$dir")" == "$plugins_root" ]] || die "$name: $source resolves outside plugins/"
  if is_target "$name" "$source"; then
    targets+=("$name"$'\t'"$dir")
    log "  target: $name ($source)"
  fi
done < <(local_entries "$MARKETPLACE_PATH")
log "Local scan targets: ${#targets[@]}"
group_end

if [[ "$LIST_ONLY" == "true" || ${#targets[@]} -eq 0 ]]; then
  exit 0
fi

# ---- scan each target -------------------------------------------------------

command -v claude >/dev/null || die "claude CLI not found"
: "${ANTHROPIC_API_KEY:?ANTHROPIC_API_KEY is required to scan}"

prompt="$(cat -- "$POLICY_PROMPT")"$'\n\n'"The plugin files are in the current working directory. Read every relevant file (\`.claude-plugin/plugin.json\`, \`.mcp.json\`, \`skills/\`, \`agents/\`, \`commands/\`, \`hooks/\`, and any source) before deciding."
schema="$(cat -- "$VERDICT_SCHEMA")"

failed=()
rows=()
for target in "${targets[@]}"; do
  name="${target%%$'\t'*}"
  dir="${target#*$'\t'}"
  group_start "Scan: $name"

  # </dev/null: claude -p would otherwise read stdin. `|| true`: a failed
  # or timed-out run is caught below as an unparseable verdict.
  # shellcheck disable=SC2015
  raw="$(cd -- "$dir" && timeout "$SCAN_TIMEOUT_SECS" \
           claude -p "$prompt" \
             --bare \
             --allowed-tools "Read,Glob,Grep" \
             --output-format json \
             --json-schema "$schema" \
           </dev/null 2>&1 || true)"

  verdict="$(jq -c '.structured_output // empty' <<<"$raw" 2>/dev/null || true)"
  if [[ -z "$verdict" ]] || ! jq -e 'has("passes")' <<<"$verdict" >/dev/null 2>&1; then
    log "$raw"
    printf '::error file=%s::scan-local-plugins: %s — could not parse verdict; raw output above\n' "$MARKETPLACE_PATH" "$name"
    failed+=("$name")
    rows+=("| $name | ⚠️ | ? | ? | verdict could not be parsed |")
    group_end
    continue
  fi

  jq '.' <<<"$verdict" | sed 's/^/    /'
  passes="$(jq -r '.passes' <<<"$verdict")"
  rows+=("$(jq -r --arg n "$name" '"| \($n) | \(if .passes then "✅" else "❌" end) | \(if .may_make_external_network_calls then "yes" else "no" end) | \(if .may_download_additional_software then "yes" else "no" end) | \(.summary | gsub("\\|"; "/") | .[0:120]) |"' <<<"$verdict")")

  if [[ "$passes" == "true" ]]; then
    log "  ✓ $name passes — $(jq -r '.summary' <<<"$verdict")"
  else
    failed+=("$name")
    printf '::error file=%s::scan-local-plugins: %s FAILS policy — %s\n' "$MARKETPLACE_PATH" "$name" "$(jq -r '.violations' <<<"$verdict")"
  fi
  group_end
done

{
  echo "## Local plugin policy scan"
  echo
  echo "Scanned ${#targets[@]} local plugin(s). Failures: ${#failed[@]}."
  echo
  echo "| Plugin | Passes | Net calls | Installs sw | Summary |"
  echo "|---|---|---|---|---|"
  printf '%s\n' "${rows[@]}"
} >> "${GITHUB_STEP_SUMMARY:-/dev/stdout}"

[[ ${#failed[@]} -eq 0 ]] || die "local plugins failing the policy scan: ${failed[*]}"
