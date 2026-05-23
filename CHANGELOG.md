# Changelog

All notable changes to this marketplace are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Plugin-level changelogs live inside each plugin folder (`plugins/<name>/CHANGELOG.md`).
This file tracks the marketplace itself: catalog entries, infrastructure, policies.

## [Unreleased]

### Added
- `Scan Plugins` workflow — Claude-powered policy review of changed
  marketplace entries / plugin folders, SHA-pinned to the shared
  Anthropic action. Requires the `ANTHROPIC_API_KEY` repository secret;
  fails closed when the secret is missing on a scan-relevant change.
- `.github/policy/prompt.md` — security and privacy review prompt used
  by `scan-plugins`, adapted from the public Anthropic policy.
- `PRIVACY.md` — repository-level privacy policy declaring zero data
  collection by the marketplace and by current plugins; rules for any
  future plugin (must match the same disclosure standard).
- `plugins/throwing/opencode/throwing-pigs.md` — OpenCode-format variant
  of the command (drop-in for `.opencode/command/`), so the cool-down
  prompt is usable outside Claude Code. Ignored by the Claude Code
  plugin loader.

### Changed
- `plugins/throwing/README.md` — expanded "When to use it" / "Quando
  usarlo" with concrete bilingual use cases (retry loop, scope creep,
  stale docs, sycophancy, pre-emptive cool-down).
- `plugins/throwing/README.md` — added a "Why \"throwing pigs\"" hook
  explaining the Venetian *tirar porchi* pun; the Italian copy now uses
  the idiom ("Tira porchi") instead of the literal "lancia il maiale".

## [0.1.0] - 2026-05-16

First public release of `goldmarktplace`. The marketplace is now installable
from GitHub via `/plugin marketplace add robertomarchioro/goldmarktplace`.

### Added

**Repository scaffolding**
- `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `CHANGELOG.md`, `.gitignore`.
- Bilingual EN/IT documentation surface.
- Curated contribution model (external plugin PRs not accepted).

**Marketplace catalog**
- `.claude-plugin/marketplace.json` listing two plugins.

**Plugins**
- `hello-world` 0.1.0 — demo plugin with a single user-invoked `greet` skill.
- `throwing` 0.1.1 — `/throwing:pigs` user-invoked cool-down command that
  tells Claude to tighten execution discipline for the rest of the session.

**CI and templates**
- `Validate Plugins` workflow — runs `claude plugin validate` plus the shared
  Anthropic security invariants, SHA-pinned, with a `workflow_dispatch` trigger.
- GitHub issue forms (bug report, feature request); config disabling blank
  issues and routing to Discussions, Security Advisories, and the official
  Anthropic submission form.
- Pull request template reflecting the curated model.

**GitHub repo configuration**
- Visibility: public.
- Description and discovery topics (`claude-code`, `claude-plugin`,
  `claude-marketplace`, `agent-skills`, `mcp`).
- Discussions enabled.
- Branch ruleset on `main`: block force-push and deletion, require signed
  commits, require the `validate` status check; admin bypass enabled to
  preserve the solo-maintainer direct-push workflow.

---

[Unreleased]: https://github.com/robertomarchioro/goldmarktplace/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/robertomarchioro/goldmarktplace/releases/tag/v0.1.0
