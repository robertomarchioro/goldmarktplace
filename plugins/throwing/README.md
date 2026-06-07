# throwing

A user-invoked "cool down" signal for Claude Code: when you are frustrated by a
recent mistake, type `/throwing:pigs` and Claude will tighten execution
discipline for the rest of the session — smaller turns, more verification,
calmer phrasing, no scope expansion.

## Why "throwing pigs"?

`/throwing:pigs` is a calque of the Venetian expression *tirar porchi* —
literally "to throw pigs", idiomatically "to let out a string of curses". It's
exactly what a frustrated user is one step away from doing. Invoking the
command is a way of saying *"I'm about to start swearing"* — and channeling
that into a cool-down instead. The plugin name (`throwing` + `pigs`) is built
entirely around this.

## Install

```bash
/plugin install throwing@goldmarktplace
```

## Components

- **Command** — `/throwing:pigs` — flips Claude into cool-down mode for the
  remainder of the session. User-invoked only
  (`disable-model-invocation: true`), so Claude never triggers it on its own.
- **Skill** — `/throwing:savata` — the inverse: model-invocable (and
  user-typable) redirect Claude emits when the friction comes from upstream
  of the screen, not from a mistake of its own. Ironic, motherly tone — never
  an accusation. Details below.

## When to use it

Throw the pigs when you are about to write something you would regret. Common
moments:

- **Claude keeps repeating a broken fix.** You asked for a fix. After the
  third attempt with the same wrong approach (just tweaked slightly each
  time) you are done. `/throwing:pigs` stops the retry loop, forces a
  diagnosis (typo vs structural), and proposes a fundamentally different
  path before touching more code.
- **Scope creep on a small change.** You asked for a one-line fix. Claude
  returned the fix plus three "improvements" plus a refactor of an unrelated
  module — and broke the build. `/throwing:pigs` locks Claude inside the
  requested scope for the rest of the session.
- **Hallucinated API or stale documentation.** Claude confidently called a
  function that doesn't exist, or used a deprecated API. `/throwing:pigs`
  requires Claude to fetch current authoritative documentation (official
  docs, Context7, the library's source) before proposing anything else, and
  to cite what it actually read.
- **Sycophantic agreement instead of behavior change.** Claude keeps saying
  "you're absolutely right" and making the same mistake. `/throwing:pigs`
  bans sycophantic phrasing for the rest of the session — the only
  acceptable acknowledgment is changing behavior.
- **Pre-emptive cool-down before you escalate.** You can feel yourself about
  to type something rude. `/throwing:pigs` first — Claude re-anchors on the
  goal, asks if your current understanding is correct, and slows the turn
  cadence so the next exchange has room to land cleanly.

## What changes after invocation

For the rest of the session Claude will:

- Acknowledge briefly, then re-anchor on the goal before doing more work.
- Take smaller turns (fewer tool calls per response).
- Verify before acting: read files before editing, list before creating,
  `git status` before staging.
- Confirm before any destructive or scope-expanding action.
- Cut defensive phrasing, apology theater, and "while I'm at it" detours.

## Companion skill: `/throwing:savata`

`savata` is the inverse twin of `pigs`. Where `pigs` is the user telling Claude
"slow down", `savata` is Claude — only when invited explicitly by this plugin —
emitting an ironic, motherly redirect when it notices the root of the friction
sits **upstream of the screen**, not in a mistake of its own. Model-invocable
(Claude can self-trigger), but you can also type `/throwing:savata` directly.

Two non-negotiable gates fire before any savata:

1. **Mani pulite ("clean hands")** — if Claude is the one in the wrong this
   turn (loop, hallucination, sloppiness), no savata: Claude fixes itself
   first.
2. **Scontrino ("receipt")** — Claude must be able to cite the upstream
   evidence verbatim. No receipt = no savata.

Escalation is in-context: first time = a (motherly) threat; second time on the
same friction = the launch. Tone is always motherly — sharp but never spiteful.
After thirty seconds, back to work together.

**v1 design note.** `savata` is implemented purely as a skill — no hooks. The
always-on watchfulness lives entirely in the skill's `description` (always in
context). This preserves the plugin's purity: no hooks, no network, no file
access. A v2 may add an optional `UserPromptSubmit` hook for deterministic
red-line pre-screening; it would be opt-in and clearly disclosed.

Details and the operating consciousness:
- [`skills/savata/SKILL.md`](./skills/savata/SKILL.md) — the operating manual.
- [`skills/savata/COSCIENZA.md`](./skills/savata/COSCIENZA.md) — the spirit
  (why the savata exists, when it is invited, how the gates make the freedom
  safe).

## Using this in OpenCode

This is a Claude Code plugin, but the command is just a portable prompt — it
works in [OpenCode](https://opencode.ai) too. OpenCode does not install Claude
Code marketplaces, so drop the ready-made variant into your OpenCode commands
directory with one command.

Global (every project):

```bash
mkdir -p ~/.config/opencode/command && curl -fsSL https://raw.githubusercontent.com/robertomarchioro/goldmarktplace/main/plugins/throwing/opencode/throwing-pigs.md -o ~/.config/opencode/command/throwing-pigs.md
```

Current project only:

```bash
mkdir -p .opencode/command && curl -fsSL https://raw.githubusercontent.com/robertomarchioro/goldmarktplace/main/plugins/throwing/opencode/throwing-pigs.md -o .opencode/command/throwing-pigs.md
```

Then invoke it with `/throwing-pigs` (OpenCode commands are not namespaced);
re-run the same command to update. You can also copy
[`opencode/throwing-pigs.md`](./opencode/throwing-pigs.md) by hand instead.

The variant is identical to the Claude Code command minus the Claude-only
`disable-model-invocation` field. The behavior — slow down, verify, no
sycophancy, escalation ladder — is agent-agnostic.

## Disclosure

This plugin makes **no network calls**, registers **no hooks**, and reads **no
files**. It ships one user-invoked command (`pigs`) and one model-invocable
skill (`savata`); both are pure in-context prompt engineering. The skill's
always-on watchfulness lives in its frontmatter `description`, which is the
only part Claude keeps in context by default.

## License

[MIT](../../LICENSE) © Roberto Marchioro.

---

## 🇮🇹 Italiano

Segnale "cool down" da invocare quando sei frustrato da un errore recente di
Claude Code: digita `/throwing:pigs` e Claude stringe la disciplina di
esecuzione per il resto della sessione — turni più piccoli, più verifica, tono
più calmo, niente espansione di scope.

### Perché "throwing pigs"

`/throwing:pigs` è il calco dell'espressione veneta *tirar porchi* —
idiomaticamente "bestemmiare, sparare una sfilza di porchi". 
È esattamente ciò che un utente frustrato è a un passo dal fare.
Invocare il comando è un modo per dire *"sto per tirar porchi"* — e
incanalare quella frustrazione in un cool-down. Il nome del plugin
(`throwing` + `pigs`) è costruito tutto attorno a questo.

### Installazione

```bash
/plugin install throwing@goldmarktplace
```

### Componenti

- **Command** — `/throwing:pigs` — attiva la modalità cool-down per il resto
  della sessione. Solo user-invoked (`disable-model-invocation: true`): Claude
  non lo attiva mai da solo.
- **Skill** — `/throwing:savata` — il vettore inverso: redirect
  model-invocable (digitabile anche dall'utente) che Claude emette quando si
  accorge che la radice dell'attrito sta a monte del monitor, non in un proprio
  errore. Tono ironico e materno — mai un'accusa. Dettagli sotto.

### Quando usarlo

Tira porchi quando stai per scrivere qualcosa di cui ti pentiresti.
Casi tipici:

- **Claude ripete la stessa fix sbagliata.** Hai chiesto un fix. Al terzo
  tentativo con lo stesso approccio (con piccole variazioni) sei al
  limite. `/throwing:pigs` ferma il loop, forza una diagnosi (typo vs
  strutturale) e propone un approccio fondamentalmente diverso prima di
  toccare altro codice.
- **Scope creep su una modifica piccola.** Hai chiesto una riga di fix.
  Claude ha restituito il fix più tre "miglioramenti" più il refactor di
  un modulo non correlato — e ha rotto la build. `/throwing:pigs` blocca
  Claude dentro lo scope richiesto per il resto della sessione.
- **API allucinata o documentazione obsoleta.** Claude ha chiamato con
  sicurezza una funzione che non esiste, o ha usato una API deprecated.
  `/throwing:pigs` obbliga a recuperare documentazione autoritativa
  aggiornata (docs ufficiali, Context7, sorgenti della libreria) prima di
  proporre altro, e a citare cosa ha effettivamente letto.
- **Accordi servili invece di cambiare comportamento.** Claude continua a
  dire "hai assolutamente ragione" e a fare lo stesso errore.
  `/throwing:pigs` banna le frasi servili per il resto della sessione —
  l'unico ack accettabile è cambiare comportamento.
- **Cool-down preventivo prima di escalare.** Senti che stai per scrivere
  qualcosa di scortese. `/throwing:pigs` prima — Claude si ri-ancora
  sull'obiettivo, chiede se la tua comprensione è corretta, e rallenta
  il ritmo dei turni così il prossimo scambio ha spazio per atterrare
  bene.

### Cosa cambia dopo l'invocazione

Per il resto della sessione Claude:

- Riconosce brevemente, poi ri-ancora sull'obiettivo prima di proseguire.
- Fa turni più piccoli (meno tool call per risposta).
- Verifica prima di agire: legge prima di modificare, lista prima di creare,
  `git status` prima dello staging.
- Conferma prima di azioni distruttive o di espansione di scope.
- Taglia fraseggio difensivo, apology theater e divagazioni "già che ci sono".

### Skill companion: `/throwing:savata`

`savata` è il gemello inverso di `pigs`. Dove `pigs` è l'utente che dice a
Claude "datti una regolata", `savata` è Claude — solo quando esplicitamente
invitato da questo plugin — che emette un redirect ironico e materno quando si
accorge che la radice dell'attrito sta **a monte del monitor**, non in un
proprio errore. Model-invocable (Claude può lanciarla da sé), ma puoi anche
digitare `/throwing:savata` direttamente.

Due cancelli non negoziabili prima di qualsiasi savata:

1. **Mani pulite** — se in questo scambio Claude sta sbagliando lui (loop,
   allucinazione, sciatteria), niente savata: prima si sistema.
2. **Scontrino** — Claude deve poter citare la prova a monte, testuale.
   Niente ricevuta = niente savata.

L'escalation vive nel contesto: la prima volta è una minaccia (materna), la
seconda sullo stesso attrito è il lancio. Il tono è sempre materno — secco ma
mai astioso. Dopo trenta secondi si torna a lavorare insieme.

**Nota di design v1.** `savata` è implementata puramente come skill — niente
hook. La sorveglianza always-on vive interamente nella `description` della
skill (sempre in contesto). Mantiene la purezza del plugin: niente hook, niente
rete, niente accesso ai file. Una v2 potrà aggiungere un hook opzionale
`UserPromptSubmit` per il pre-screening deterministico delle righe rosse;
sarebbe opt-in e dichiarato esplicitamente.

Dettagli e coscienza operativa:
- [`skills/savata/SKILL.md`](./skills/savata/SKILL.md) — il manuale operativo.
- [`skills/savata/COSCIENZA.md`](./skills/savata/COSCIENZA.md) — lo spirito
  (perché esiste la savata, quando è invitata, come i cancelli rendono la
  libertà sicura).

### Usarlo in OpenCode

Questo è un plugin Claude Code, ma il comando è solo un prompt portabile —
funziona anche in [OpenCode](https://opencode.ai). OpenCode non installa i
marketplace di Claude Code, quindi metti la variante già pronta nella tua
cartella command di OpenCode con un solo comando.

Globale (tutti i progetti):

```bash
mkdir -p ~/.config/opencode/command && curl -fsSL https://raw.githubusercontent.com/robertomarchioro/goldmarktplace/main/plugins/throwing/opencode/throwing-pigs.md -o ~/.config/opencode/command/throwing-pigs.md
```

Solo nel progetto corrente:

```bash
mkdir -p .opencode/command && curl -fsSL https://raw.githubusercontent.com/robertomarchioro/goldmarktplace/main/plugins/throwing/opencode/throwing-pigs.md -o .opencode/command/throwing-pigs.md
```

Poi invocalo con `/throwing-pigs` (i command di OpenCode non hanno namespace);
ri-lancia lo stesso comando per aggiornarlo. In alternativa copia a mano
[`opencode/throwing-pigs.md`](./opencode/throwing-pigs.md).

La variante è identica al comando Claude Code, tolto il campo
`disable-model-invocation` (solo Claude). Il comportamento — rallenta,
verifica, niente sycophancy, escalation ladder — è agnostico rispetto
all'agente.

### Disclosure

Il plugin **non fa chiamate di rete**, **non registra hook** e **non legge
file**. Spedisce un command user-invoked (`pigs`) e una skill model-invocable
(`savata`); entrambi sono pure prompt engineering in-context. La sorveglianza
always-on della skill vive nella `description` del frontmatter, che è l'unica
parte che Claude tiene in contesto by default.

### Licenza

[MIT](../../LICENSE) © Roberto Marchioro.
