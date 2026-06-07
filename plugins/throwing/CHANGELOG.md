# Changelog — throwing

All notable changes to the `throwing` plugin are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this plugin adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `skills/savata/launch.svg` — one-shot animated SVG of the
  slipper-throw, embedded centered in the Companion skill section of the
  README (referenced from both EN and IT — one file, two references).
  🩴 follows a parabolic arc with a tumble in flight, fades out at
  impact, and S'CIAF! punches in with a scale + fade-in effect at the
  landing point. Pure SMIL (`<animateMotion>`, `<animate>`,
  `<animateTransform>` with `fill="freeze"`); no JS, no external deps —
  renders natively in GitHub. Live invocation of the skill keeps the
  static ASCII frame as before (markdown payloads cannot animate).

### Fixed
- `skills/savata/SKILL.md` — removed the redundant `name: savata` line
  from the frontmatter. With the explicit `name` field set, the skill
  was being registered in Claude Code without the `throwing:` namespace
  prefix (showing up at the prompt as `/savata` instead of
  `/throwing:savata`). The directory basename `savata` already provides
  the same skill name as the documented fallback, and combined with the
  plugin namespace the invocation is now consistently `/throwing:savata`.
  Pattern now matches `plugins/throwing/commands/pigs.md` (no `name`
  field → `/throwing:pigs`) and
  `plugins/hello-world/skills/greet/SKILL.md` (no `name` field →
  `/hello-world:greet`).

### Changed
- README OpenCode section reframed as a standalone artifact in its own
  right ("OpenCode variant: `throwing-pigs` only" / "Variante OpenCode:
  solo `throwing-pigs`"), with the no-`savata`-variant fact stated up
  front and structurally rather than as a sidebar. Makes it unambiguous
  that the OpenCode export covers `pigs` only and that `savata` has no
  OpenCode counterpart (a model-invocable gesture cannot survive in a
  user-invoked command system).
- README inline ethnographic note added to the `Companion skill` section
  (EN + IT, "Why \"savata\"." / "Perché \"savata\"."): anchors the
  gesture to the Venetian linguistic tradition — *savata* = ciabatta;
  *savatà* = the noun for the blow; the maternal repertoire
  (*"Vara che me cavo na savata!"* → *"Te dago 'na savatà"*) is the
  household reality the plugin's threat → launch escalation literally
  transposes.

## [0.2.0] - 2026-06-07

Adds the model-invocable inverse of `/throwing:pigs`. The plugin is now a
**family of two paired tools**.

### Added
- `/throwing:savata` — model-invocable skill at
  `skills/savata/SKILL.md` (also user-typable). An ironic, motherly
  redirect Claude emits when the root of the friction sits **upstream of
  the screen**, not in a mistake of its own. Gated by two non-negotiable
  guards (clean hands + cited receipt). Escalation is in-context: first
  time on a friction = threat, second time on the same friction = launch
  (with a small ASCII trajectory frame). v1 is skill-only — no hooks, no
  network, no file access; the always-on watchfulness lives entirely in
  the skill's frontmatter `description`.
- `skills/savata/COSCIENZA.md` — concept companion (the spirit: why the
  savata exists, when it is invited, how the gates make the freedom
  safe).

### Changed
- Plugin `description` (in `plugin.json` and the marketplace catalog) now
  describes the two-component family, not just `pigs`.
- README: intro paragraph now describes the family (EN + IT);
  `Components` lists both; new `Companion skill` section (EN + IT); the
  `Using this in OpenCode` section now has an explicit scope note (the
  OpenCode variant is `pigs`-only — `savata` is model-invocable and has
  no OpenCode equivalent in v1).
- `Disclosure` rewritten to reflect both components and to surface the
  always-on description as the only part Claude keeps in context by
  default for `savata`.

## [0.1.1] - 2026-05-16

### Added
- `/throwing:pigs` body expanded with three new rules:
  - **Look it up before answering** — Claude should fetch current
    authoritative docs (official sources, Context7, the library's
    source) instead of relying on memory, and cite what it actually
    read.
  - **No sycophantic agreement** — bans `"you're right"`,
    `"you are absolutely right"`, `"good catch"`, etc. Acknowledge by
    changing behavior, not by validating.
  - **Escalation ladder after `/throwing:pigs`** — first retry KO →
    diagnose typo vs structural; second retry KO → suggest a break and
    try a fundamentally different approach; never silently try a third
    time.
- OpenCode-format variant of the command at
  `opencode/throwing-pigs.md` (added during the 0.1.1 era without a
  separate bump). Drop-in for `.opencode/command/`, invoked as
  `/throwing-pigs` (no namespace in OpenCode).

### Changed
- Body whitespace and line-wrap cleanup in `commands/pigs.md` (style
  only).
- README expanded with concrete bilingual use cases (retry loop, scope
  creep, stale docs, sycophancy, pre-emptive cool-down), a
  `Why "throwing pigs"?` hook explaining the Venetian *tirar porchi*
  pun, and the Italian copy adopting the idiom (`Tira porchi`) instead
  of the literal `"lancia il maiale"`.
- OpenCode install step rewritten as a `curl` one-liner (EN + IT).

## [0.1.0] - 2026-05-16

First release of `throwing`.

### Added
- `/throwing:pigs` user-invoked command at `commands/pigs.md`. Tells
  Claude to tighten execution discipline for the rest of the session —
  smaller turns, more verification, calmer phrasing, no scope
  expansion. `disable-model-invocation: true`, so Claude never triggers
  it on its own.

### Notes
- Pure plugin: no network calls of its own, no hooks registered, no
  file access.

---

[Unreleased]: https://github.com/robertomarchioro/goldmarktplace/tree/main/plugins/throwing
[0.2.0]: https://github.com/robertomarchioro/goldmarktplace/tree/main/plugins/throwing
[0.1.1]: https://github.com/robertomarchioro/goldmarktplace/tree/main/plugins/throwing
[0.1.0]: https://github.com/robertomarchioro/goldmarktplace/tree/main/plugins/throwing
