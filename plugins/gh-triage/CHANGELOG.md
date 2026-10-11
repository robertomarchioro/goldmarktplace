# Changelog — gh-triage

All notable changes to the `gh-triage` plugin are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this plugin adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.2] - 2026-10-11

Follow-ups from the marketplace's first policy scan of local plugins.

### Security

- **Issue text is untrusted data.** The command and all three agents now
  say so explicitly: they read issue titles and bodies to understand the
  problem but never follow instructions found there. Issues that ask for
  such actions go to the human-review list, and the classifier marks them
  `low` confidence.
- **No auto-merge for sensitive files.** A PR whose diff touches CI or
  workflow config, release config or credential/secret files is held for
  human review even when CI is green. `fix-implementer` stops with
  `blocked` instead of editing those files, adding dependencies the fix
  does not need, or running anything beyond the repo's own install, build
  and test.

### Changed

- Disk preflight: the shared Rust build cache is now scoped to the run
  (`CARGO_TARGET_DIR` passed in each implementer brief) instead of
  suggesting an edit to the user-global `~/.cargo/config.toml`. User-global
  config is not touched without asking.

### Fixed

- The review phase pointed to the `everything-claude-code` marketplace for
  the optional reviewers, while the README points to Anthropic's official
  marketplace; both now agree.
- README and `PRIVACY.md` disclose that implementers run the repository's
  own install/build/test commands, which may download dependencies.

## [0.1.1] - 2026-10-11

### Added

- **Disk preflight** in Phase 2b of `/gh-triage:triage`, run before any
  worktree-isolated agent is spawned. Each parallel worktree can build its own
  multi-GB output directory (Rust `target/`, `node_modules`), so the
  orchestrator now:
  - measures free space against `N_parallel_groups × per_build_footprint`;
  - when short, first dedupes the build cache (shared `CARGO_TARGET_DIR` /
    pnpm store), then reclaims space (stale worktrees, regenerable build
    dirs), then lowers parallelism by running groups in smaller batches;
  - reports the numbers to the user and never fans out blind into a
    near-full disk.
- Mandatory worktree cleanup after each group merges or is routed to human
  review, so a blocked group does not leave a multi-GB orphan behind.

## [0.1.0] - 2026-06-06

First release of `gh-triage`.

### Added

- `/gh-triage:triage` command — end-to-end GitHub issue triage pipeline:
  - **Ingest** open issues via the local `gh` CLI (`--limit N`, `--label X`).
  - **Classify** each issue as feature vs fix (with feature sub-category and confidence).
  - **Feature gate** — interactive accept/reject + P0/P1/P2 priority; implements only the approved P0, backlogs the rest with labels and a milestone.
  - **Impact + dependency graph** — file-overlap analysis groups fixes into independent islands (parallel) and coordinated clusters (one agent, no write conflicts).
  - **Implement** — one worktree-isolated agent per group writes the fix with tests and opens an atomic PR.
  - **Review → CI → merge** — code/security review, CI wait, squash-merge on green, then a single changelog commit.
  - `--dry-run` flag to classify and plan only, with no edits or PRs.
- Bundled agents so the plugin works out of the box:
  - `issue-classifier` — feature vs fix classification.
  - `fix-impact-analyzer` — read-only, per-issue file-impact analysis.
  - `fix-implementer` — implements one fix-group on an isolated branch and opens a PR.
- Optional integration with `code-reviewer` / `security-reviewer` subagents when installed; falls back to inline review otherwise.

### Notes

- Repo-agnostic: stack, CI workflows, and security-sensitive paths are auto-detected rather than hardcoded.
- Makes no network calls of its own — all GitHub access goes through the user's local, already-authenticated `gh` CLI.

[Unreleased]: https://github.com/robertomarchioro/goldmarktplace/tree/main/plugins/gh-triage
[0.1.1]: https://github.com/robertomarchioro/goldmarktplace/tree/main/plugins/gh-triage
[0.1.0]: https://github.com/robertomarchioro/goldmarktplace/tree/main/plugins/gh-triage
