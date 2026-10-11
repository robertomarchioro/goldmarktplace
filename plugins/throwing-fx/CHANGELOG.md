# Changelog — throwing-fx

All notable changes to the `throwing-fx` plugin are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this plugin adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-10-11

First release of `throwing-fx`, an optional companion to the `throwing` plugin.

### Added

- **Savata animation** in the band above the prompt, drawn when Claude's reply
  actually throws a `/throwing:savata` (it opens with 🩴 and carries one of the
  two dialect lines), not when the skill is merely invoked:
  - threat: the raised slipper shakes, then fades (about 5 s);
  - launch: parabolic flight with a dotted trail, 💥 S'CIAF! blinks on impact,
    then fades (about 6 s).
- **Reliable escalation**: the savata's prompt carries the session's own count
  (and the last kind thrown), so threat vs launch survives a compaction.
  `/clear` resets it.
- **Gated reply watch**: replies are read only between a `/throwing:savata`
  invocation and the end of that turn, main conversation only.
- `skill.prompt` hook narrowed by its matcher to `throwing:savata` (or a bare
  `savata`): no other skill's prompt reaches it.
- A reload clears any frame its dropped timer left in the band.
- Test suite for `claude plugin test` (13 tests: frames, detection,
  escalation note, gating, subagent replies, interrupted turns, `/clear`,
  reload, band drawing).

### Notes

- Built on Claude Code function hooks (mods), tested on 2.1.296. That API is
  early access and may change between releases.
- No network calls, no file access.

[Unreleased]: https://github.com/robertomarchioro/goldmarktplace/tree/main/plugins/throwing-fx
[0.1.0]: https://github.com/robertomarchioro/goldmarktplace/tree/main/plugins/throwing-fx
