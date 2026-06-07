# Changelog

All notable changes to this marketplace are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Plugin-level changelogs live inside each plugin folder (`plugins/<name>/CHANGELOG.md`).
This file tracks the marketplace itself: catalog entries, infrastructure, policies.

## [Unreleased]

### Added
- `plugins/throwing/skills/savata/README.md` — short English brief
  acting as a service door into the (Italian) savata artifacts:
  explains what the skill does, the two gates, the escalation, and
  why the canonical `SKILL.md` and `COSCIENZA.md` remain in Italian.
  GitHub auto-renders it when a visitor lands on the skill folder.
- `plugins/throwing/skills/savata/launch.svg` — looping animated SVG
  of the slipper-throw (🩴 flies a parabolic arc, S'CIAF! punches in on
  landing, holds, then the loop restarts every 2.5s), embedded centered
  in the Companion skill section of the throwing README (one file,
  referenced from both EN and IT). Pure SMIL, no JS, renders natively
  in GitHub. The live skill payload keeps the static ASCII frame —
  markdown output cannot animate, the visual belongs in the docs.

### Fixed
- `plugins/throwing/skills/savata/SKILL.md` — removed a redundant
  `name: savata` line from the frontmatter; the explicit `name` was
  causing the skill to be registered without the plugin namespace
  prefix (showing up at the prompt as `/savata` instead of
  `/throwing:savata`). With the directory basename fallback
  (`savata/`) + plugin namespace (`throwing`), the invocation is now
  consistently `/throwing:savata`. The pattern now matches both
  `commands/pigs.md` and `plugins/hello-world/skills/greet/`.

### Added
- `plugins/throwing/skills/savata/SKILL.md` — new model-invocable skill
  `/throwing:savata`, the inverse twin of `/throwing:pigs`: an ironic,
  motherly redirect Claude emits (or the user types) when the root of the
  friction sits upstream of the screen, not in a mistake of its own. Gated
  by two non-negotiable guards (clean hands + cited receipt). Escalation
  is in-context (threat → launch). v1 is skill-only — no hooks, no
  network, no file access; the always-on watchfulness lives entirely in
  the skill's frontmatter `description`.
- `plugins/throwing/skills/savata/COSCIENZA.md` — concept companion
  documenting the spirit (why the savata exists, when it is invited,
  how the gates make the freedom safe).
- `plugins/throwing/CHANGELOG.md` — retroactive plugin-level CHANGELOG
  (entries 0.1.0, 0.1.1, 0.2.0), harmonizing with `gh-triage`'s
  plugin-level changelog.

### Changed
- `throwing` plugin bumped 0.1.1 → 0.2.0 (new component: model-invocable
  skill alongside the existing user-invoked command). Plugin
  `description` (in `plugin.json` and the marketplace catalog) and the
  plugin README intro now describe the **two-component family** (EN + IT)
  rather than just `pigs`. `Components`, `Disclosure`, and a new
  `Companion skill` section reflect both components in the plugin README.
  The `Using this in OpenCode` section has an explicit scope note (savata
  is model-invocable, no OpenCode equivalent in v1). `PRIVACY.md` throwing
  entry rewritten for the multi-component state; root `README.md` plugins
  table updated.
- `plugins/throwing/skills/savata/SKILL.md` — `description` made bilingual
  (IT first, EN second anchored on *la chancla*) so the always-on
  watchfulness is intelligible to non-Italian users without losing the
  dialect fidelity the gesture is built around.
- `plugins/throwing/skills/savata/COSCIENZA.md` — §7 corrected: the v1
  technical wiring is a **skill**, not a command-file (the pre-handoff
  draft still called it command-file).
- `plugins/throwing/README.md` — OpenCode section reframed as a
  standalone artifact in its own right ("OpenCode variant:
  `throwing-pigs` only" / "Variante OpenCode: solo `throwing-pigs`"),
  with the no-`savata`-variant fact stated up front and structurally,
  not as a sidebar. Makes it unambiguous that the OpenCode export is
  `pigs`-only and that `savata` has no OpenCode counterpart (a
  model-invocable gesture can't survive in a user-invoked command
  system).
- `plugins/throwing/README.md` — inline ethnographic note added to the
  `Companion skill` section (EN + IT, "Why \"savata\"." / "Perché
  \"savata\"."): anchors the gesture to the Venetian linguistic
  tradition — *savata* = ciabatta; *savatà* = the noun for the blow;
  the maternal repertoire (*"Vara che me cavo na savata!"* →
  *"Te dago 'na savatà"*) is the household reality the plugin's
  threat → launch escalation literally transposes.

## [0.2.0] - 2026-06-06

This release adds the `gh-triage` plugin, an OpenCode-compatible variant of
the `throwing` command, the marketplace's first privacy policy, and an
optional Claude-powered security scan workflow.

### Added

**Plugins**
- `gh-triage` 0.1.0 — new plugin: end-to-end GitHub issue triage command
  (`/gh-triage:triage`) that classifies feature vs fix, gates and prioritizes
  features, resolves fixes in parallel/coordinated groups, reviews, opens
  PRs, waits for CI, auto-merges on green, and updates the changelog. Ships
  three bundled agents (`issue-classifier`, `fix-impact-analyzer`,
  `fix-implementer`); review phase optionally uses
  `code-reviewer`/`security-reviewer` when installed from Anthropic's
  official plugin marketplace or Agent Skills. Makes no network calls of its
  own — all GitHub access goes through the local `gh` CLI.
- `plugins/throwing/opencode/throwing-pigs.md` — OpenCode-format variant of
  the `/throwing:pigs` command (drop-in for `.opencode/command/`), so the
  cool-down prompt is usable outside Claude Code. Ignored by the Claude Code
  plugin loader.

**CI and policy**
- `Scan Plugins` workflow — Claude-powered policy review of changed
  marketplace entries / plugin folders, SHA-pinned to the shared Anthropic
  action. Requires the `ANTHROPIC_API_KEY` repository secret; fails closed
  when the secret is missing on a scan-relevant change.
- `.github/policy/prompt.md` — security and privacy review prompt used by
  `scan-plugins`, adapted from the public Anthropic policy.
- `PRIVACY.md` — repository-level privacy policy declaring zero data
  collection by the marketplace and listing the per-plugin disclosure rules
  any future plugin must meet.

### Changed

**Plugin documentation (alignment with marketplace standard)**
- `plugins/throwing/README.md` — expanded "When to use it" / "Quando usarlo"
  with concrete bilingual use cases (retry loop, scope creep, stale docs,
  sycophancy, pre-emptive cool-down); added a "Why \"throwing pigs\"" hook
  explaining the Venetian *tirar porchi* pun; the Italian copy now uses the
  idiom ("Tira porchi") instead of the literal "lancia il maiale"; the
  OpenCode install step was rewritten as a `curl` one-liner (EN + IT).
- `plugins/gh-triage/README.md` — restructured to match the marketplace
  standard (Install moved to the top, "Network & data" renamed to
  "Disclosure", optional companions now point to Anthropic's official plugin
  marketplace and Agent Skills) and given a full bilingual EN/IT mirror.
- `PRIVACY.md` — added an honest disclosure entry for `gh-triage` 0.1.0
  (uses the local `gh` CLI for GitHub API calls under the user's credentials;
  no network of its own).

**Root documentation**
- `README.md` — first public-release status, plugin install command column in
  the plugins table, and a row for `gh-triage`.

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

[Unreleased]: https://github.com/robertomarchioro/goldmarktplace/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/robertomarchioro/goldmarktplace/releases/tag/v0.2.0
[0.1.0]: https://github.com/robertomarchioro/goldmarktplace/releases/tag/v0.1.0
