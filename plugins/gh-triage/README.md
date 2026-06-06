# gh-triage

End-to-end GitHub issue triage for Claude Code. One command takes your open
issues from "unsorted backlog" to "merged PRs + updated changelog", with a
human in the loop only where it matters.

## What it does

`/gh-triage:triage` runs a six-phase pipeline:

1. **Ingest** — lists open issues via `gh`.
2. **Classify** — a subagent sorts each issue into **feature** vs **fix** (with a feature sub-category and confidence).
3. **Feature gate** — you decide which features to accept and their priority (P0/P1/P2); only the single approved **P0** is implemented now, the rest go to a labelled backlog/milestone.
4. **Impact + dependency graph** — for every fix, a read-only analyzer finds the exact files it must touch. Issues that share files become a **coordinated cluster** (one agent, no write conflicts); the rest are **independent islands** (run in parallel).
5. **Implement** — one worktree-isolated agent per group writes the fix with tests and opens an atomic PR.
6. **Review → CI → merge** — each PR is reviewed (code + security), waits for CI, and is squash-merged on green. Then the changelog is updated in one commit.

Autonomy: PRs auto-merge once CI is green. It stops only on a red CI it can't
fix or a genuine architectural doubt.

```
/gh-triage:triage                 # full run
/gh-triage:triage --dry-run       # classify + plan only, no edits or PRs
/gh-triage:triage --limit 30      # cap how many issues to ingest
/gh-triage:triage --label bug     # only triage issues with a given label
```

## Requirements

- The [`gh` CLI](https://cli.github.com/) installed and authenticated (`gh auth login`), run from inside a Git repo with a GitHub remote.
- Permission for the issue/PR actions it performs (label, comment, milestone, open/merge PR).

## Bundled agents

This plugin ships the three subagents the command orchestrates, so it works
out of the box:

- `issue-classifier` — feature vs fix classification.
- `fix-impact-analyzer` — read-only file-impact analysis per issue.
- `fix-implementer` — implements one fix-group on an isolated branch and opens a PR.

## Optional companions

The review phase uses `code-reviewer` and `security-reviewer` subagents **if
they are installed** (for example from the
[`everything-claude-code`](https://github.com/anthropics/claude-code) ecosystem).
If they are not present, the command performs the review inline to the same
standard. Installing them is recommended for the strongest review gate.

## Network & data

This plugin makes **no network calls of its own**. All GitHub interaction goes
through your local, already-authenticated `gh` CLI. No data is sent anywhere
else.

## Install

```bash
/plugin marketplace add robertomarchioro/goldmarktplace
/plugin install gh-triage@goldmarktplace
```

## License

MIT — see the repository [LICENSE](../../LICENSE).
