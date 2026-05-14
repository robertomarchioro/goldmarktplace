# hello-world

A pure-demo plugin that greets the user. It exists as the starter example for the
[`goldmarktplace`](https://github.com/robertomarchioro/goldmarktplace) marketplace —
use it as a reference for the minimal structure of a Claude Code plugin.

## Install

```bash
/plugin install hello-world@goldmarktplace
```

## Components

- **Skill** — `/hello-world:greet [name]` — greets the user by name (or generically
  if no name is given). User-invoked only (`disable-model-invocation: true`), so
  Claude never triggers it automatically.

## Usage

```bash
/hello-world:greet Roberto
# → "Hello Roberto! Great to see you — how can I help today?"

/hello-world:greet
# → "Hello there! How can I help you today?"
```

## Structure

```
hello-world/
├── .claude-plugin/
│   └── plugin.json          # plugin manifest
├── skills/
│   └── greet/
│       └── SKILL.md         # the greet skill
└── README.md
```

## Disclosure

This plugin makes **no network calls**, registers **no hooks**, and reads **no
files**. It is a static skill definition only.

## License

[MIT](../../LICENSE) © Roberto Marchioro.

---

## 🇮🇹 Italiano

Plugin demo che saluta l'utente. Esiste come esempio starter del marketplace
[`goldmarktplace`](https://github.com/robertomarchioro/goldmarktplace): usalo come
riferimento per la struttura minima di un plugin per Claude Code.

### Installazione

```bash
/plugin install hello-world@goldmarktplace
```

### Componenti

- **Skill** — `/hello-world:greet [nome]` — saluta l'utente per nome (o in modo
  generico se non passi un nome). Invocabile solo dall'utente
  (`disable-model-invocation: true`): Claude non la attiva mai da solo.

### Disclosure

Questo plugin **non fa chiamate di rete**, **non registra hook** e **non legge
file**. È solo una definizione statica di skill.

### Licenza

[MIT](../../LICENSE) © Roberto Marchioro.
