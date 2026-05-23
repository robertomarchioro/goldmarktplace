# goldmarktplace

> Curated marketplace of skills, agents, commands, and plugins for [Claude Code](https://code.claude.com).

[![Validate Plugins](https://github.com/robertomarchioro/goldmarktplace/actions/workflows/validate-plugins.yml/badge.svg)](https://github.com/robertomarchioro/goldmarktplace/actions/workflows/validate-plugins.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

> ⚠️ **Trust disclaimer.** Always review a plugin before installing it. Plugins ship code, MCP servers, hooks, and scripts that run on your machine with the same trust level as the rest of your shell. Neither Anthropic nor the maintainer of this marketplace can guarantee that third-party code referenced here will behave as documented. Read each plugin's `README.md` and `Disclosure` section before enabling.

---

## Status

✅ **Live.** The marketplace is public and installable, with its first plugins available — see the table below.

## Install the marketplace

In Claude Code:

```bash
/plugin marketplace add robertomarchioro/goldmarktplace
```

Or non-interactively:

```bash
claude plugin marketplace add robertomarchioro/goldmarktplace
```

Then browse plugins with `/plugin` and install one with:

```bash
/plugin install <plugin-name>@goldmarktplace
```

## Plugins

Each plugin lives in `plugins/<name>/` with its own `README.md`.

| Plugin | Description | Version | Install |
| :--- | :--- | :--- | :--- |
| [`hello-world`](./plugins/hello-world) | Demo plugin that greets the user | 0.1.0 | `/plugin install hello-world@goldmarktplace` |
| [`throwing`](./plugins/throwing) | `/throwing:pigs` — cool-down signal when you are frustrated with Claude | 0.1.1 | `/plugin install throwing@goldmarktplace` |

## Repository structure

```
goldmarktplace/
├── .claude-plugin/
│   └── marketplace.json       # Marketplace catalog (plugin entries)
├── .github/                   # CI workflows, templates
├── plugins/                   # Curated plugins (one folder per plugin)
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
└── SECURITY.md
```

## Contributing

This is a **curated marketplace**: plugins are authored and maintained by Roberto Marchioro. External pull requests adding new plugins are not accepted at this time — but ideas, bug reports, and feedback are welcome via [Issues](https://github.com/robertomarchioro/goldmarktplace/issues) and [Discussions](https://github.com/robertomarchioro/goldmarktplace/discussions).

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the full contribution model.

## Security

Found a security issue? Please **do not open a public Issue**. Use [GitHub's private vulnerability reporting](https://github.com/robertomarchioro/goldmarktplace/security/advisories/new) instead. Details in [`SECURITY.md`](./SECURITY.md).

## Documentation

- [Claude Code — plugin marketplaces](https://code.claude.com/docs/en/plugin-marketplaces)
- [Claude Code — create plugins](https://code.claude.com/docs/en/plugins)
- [Claude Code — plugins reference](https://code.claude.com/docs/en/plugins-reference)
- [Discover and install plugins](https://code.claude.com/docs/en/discover-plugins)

## License

[MIT](./LICENSE) © Roberto Marchioro.

Each plugin under `plugins/` may carry its own license — check the plugin folder if in doubt.

---

## 🇮🇹 Italiano

Marketplace curato di skill, agent, command e plugin per [Claude Code](https://code.claude.com).

> ⚠️ **Disclaimer.** Verifica sempre un plugin prima di installarlo. I plugin includono codice, MCP server, hook e script che girano sulla tua macchina con lo stesso livello di trust della tua shell. Né Anthropic né il maintainer di questo marketplace possono garantire al 100% che codice di terze parti referenziato qui si comporti come documentato. Leggi `README.md` e la sezione `Disclosure` di ogni plugin prima di abilitarlo.

### Stato

✅ Live. Il marketplace è pubblico e installabile, con i primi plugin disponibili (vedi la tabella nella sezione inglese).

### Installazione

```bash
/plugin marketplace add robertomarchioro/goldmarktplace
/plugin install <plugin-name>@goldmarktplace
```

### Contribuire

Marketplace **curato**: i plugin sono scritti e mantenuti da Roberto Marchioro. Non accetto PR esterni per nuovi plugin, ma idee, bug report e feedback sono benvenuti via [Issues](https://github.com/robertomarchioro/goldmarktplace/issues) e [Discussions](https://github.com/robertomarchioro/goldmarktplace/discussions). Vedi [`CONTRIBUTING.md`](./CONTRIBUTING.md).

### Sicurezza

Per segnalazioni di vulnerabilità usa il [private vulnerability reporting di GitHub](https://github.com/robertomarchioro/goldmarktplace/security/advisories/new). Dettagli in [`SECURITY.md`](./SECURITY.md).

### Licenza

[MIT](./LICENSE) © Roberto Marchioro.
