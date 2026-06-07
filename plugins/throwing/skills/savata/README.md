# savata — English brief

This folder contains the `/throwing:savata` skill in its native form:
Italian, with Venetian dialect quotes preserved. This file is a short
English door for readers who don't parse Italian — the canonical
documents live next to it.

## What it is

`savata` is the inverse twin of `/throwing:pigs`. Where `pigs` is the
user telling Claude to slow down, `savata` is Claude (when explicitly
invited by this plugin) emitting an ironic, motherly redirect when the
root of the friction sits **upstream of the screen** — not in a mistake
of its own. Model-invocable: Claude can self-trigger, but you can also
type `/throwing:savata` directly.

## How it fires

Before any savata, two non-negotiable gates:

1. **Clean hands** — Claude is not in the wrong this turn (no loop, no
   hallucination, no sloppiness in this exchange).
2. **Receipt** — Claude can cite the upstream evidence verbatim
   (specific turn, specific quote).

If either fails: no savata, Claude keeps it to itself. A savata without
a receipt is just touchiness — exactly what the design is built to
prevent.

Escalation lives in-context. First savata on a given friction =
**threat**. Second savata on the same friction = **launch** (with a
small ASCII trajectory frame printed under the dialect line).

## Why it stays in Italian

The skill is built around a specific Venetian cultural gesture
(*tirar la savata* — the motherly slipper-throw). Its operational
vocabulary (*cancelli*, *scontrino*, *porte*, the dialect line
*«Te dago 'na savatà»*) is not interchangeable with English
equivalents — translation would lose the register and authority the
Italian carries. The plugin's English-facing surfaces — the bilingual
skill `description` and the bilingual *Companion skill* section in the
plugin [`README.md`](../../README.md) — cover discovery for non-Italian
users.

## The canonical files (Italian)

- [`SKILL.md`](./SKILL.md) — operating manual. What Claude reads when
  savata is invoked.
- [`COSCIENZA.md`](./COSCIENZA.md) — concept companion. The *why*: the
  spirit, the gates, the family of upstream frictions, the rationale
  for the escalation.
