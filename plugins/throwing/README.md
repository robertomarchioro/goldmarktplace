# throwing

A user-invoked "cool down" signal for Claude Code: when you are frustrated by a
recent mistake, type `/throwing:pigs` and Claude will tighten execution
discipline for the rest of the session — smaller turns, more verification,
calmer phrasing, no scope expansion.

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

- Claude just repeated the same broken approach for the third time.
- Claude expanded scope and broke something adjacent to what you asked.
- Claude is being defensive or verbose when you wanted a quick fix.
- You are about to escalate to insults — type `/throwing:pigs` first.

## What changes after invocation

For the rest of the session Claude will:

- Acknowledge briefly, then re-anchor on the goal before doing more work.
- Take smaller turns (fewer tool calls per response).
- Verify before acting: read files before editing, list before creating,
  `git status` before staging.
- Confirm before any destructive or scope-expanding action.
- Cut defensive phrasing, apology theater, and "while I'm at it" detours.

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

### Installazione

```bash
/plugin install throwing@goldmarktplace
```

### Componenti

- **Command** — `/throwing:pigs` — attiva la modalità cool-down per il resto
  della sessione. Solo user-invoked (`disable-model-invocation: true`): Claude
  non lo attiva mai da solo.

### Quando usarlo

Lancia il maiale quando stai per scrivere qualcosa di cui ti pentiresti. Casi
tipici:

- Claude ha ripetuto per la terza volta lo stesso approccio sbagliato.
- Claude ha allargato lo scope e ha rotto qualcosa di adiacente alla richiesta.
- Claude è difensivo o prolisso quando volevi un fix rapido.
- Stai per passare agli insulti — digita prima `/throwing:pigs`.

### Cosa cambia dopo l'invocazione

Per il resto della sessione Claude:

- Riconosce brevemente, poi ri-ancora sull'obiettivo prima di proseguire.
- Fa turni più piccoli (meno tool call per risposta).
- Verifica prima di agire: legge prima di modificare, lista prima di creare,
  `git status` prima dello staging.
- Conferma prima di azioni distruttive o di espansione di scope.
- Taglia fraseggio difensivo, apology theater e divagazioni "già che ci sono".

### Disclosure

Il plugin **non fa chiamate di rete**, **non registra hook** e **non legge
file**. È una singola definizione di command.

### Licenza

[MIT](../../LICENSE) © Roberto Marchioro.
