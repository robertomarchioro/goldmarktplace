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

## Using this in OpenCode

This is a Claude Code plugin, but the command is just a portable prompt — it
works in [OpenCode](https://opencode.ai) too. OpenCode does not install Claude
Code marketplaces, so copy the ready-made variant instead:

1. Copy [`opencode/throwing-pigs.md`](./opencode/throwing-pigs.md) into your
   OpenCode commands directory:
   - Project: `.opencode/command/throwing-pigs.md`
   - Global: `~/.config/opencode/command/throwing-pigs.md`
2. Invoke it with `/throwing-pigs` (OpenCode commands are not namespaced).

The variant is identical to the Claude Code command minus the Claude-only
`disable-model-invocation` field. The behavior — slow down, verify, no
sycophancy, escalation ladder — is agent-agnostic.

## Disclosure

This plugin makes **no network calls**, registers **no hooks**, and reads **no
files**. It is a single command-file definition.

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

### Usarlo in OpenCode

Questo è un plugin Claude Code, ma il comando è solo un prompt portabile —
funziona anche in [OpenCode](https://opencode.ai). OpenCode non installa i
marketplace di Claude Code, quindi copia la variante già pronta:

1. Copia [`opencode/throwing-pigs.md`](./opencode/throwing-pigs.md) nella tua
   cartella command di OpenCode:
   - Progetto: `.opencode/command/throwing-pigs.md`
   - Globale: `~/.config/opencode/command/throwing-pigs.md`
2. Invocalo con `/throwing-pigs` (i command di OpenCode non hanno namespace).

La variante è identica al comando Claude Code, tolto il campo
`disable-model-invocation` (solo Claude). Il comportamento — rallenta,
verifica, niente sycophancy, escalation ladder — è agnostico rispetto
all'agente.

### Disclosure

Il plugin **non fa chiamate di rete**, **non registra hook** e **non legge
file**. È una singola definizione di command.

### Licenza

[MIT](../../LICENSE) © Roberto Marchioro.
