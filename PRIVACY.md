# Privacy Policy

> Effective date: 2026-05-16
> Last updated: 2026-05-16

This policy applies to the `goldmarktplace` marketplace and to the plugins
maintained in this repository.

## Summary

- The marketplace itself collects no data.
- Plugins maintained here are explicitly designed to make no network calls,
  install no software, and read no files outside the plugin's own directory.
- Anything else relevant to a specific plugin is documented in its own
  `Disclosure` section inside its `README.md`.
- Your underlying use of Claude Code is governed by
  [Anthropic's privacy policy](https://www.anthropic.com/legal/privacy),
  not by this document.

## What the marketplace does

`goldmarktplace` is a static catalog hosted on GitHub
(`.claude-plugin/marketplace.json`). It lists plugins and where to fetch
them. The marketplace itself runs no code on your machine and has no
backend, no analytics, and no user accounts.

## What the plugins do

Each plugin includes a `Disclosure` section in its `README.md` stating
exactly what it does. Current state:

### `hello-world` 0.1.0
- Makes no network calls.
- Registers no hooks.
- Reads no files.
- Single static skill definition (`/hello-world:greet`).

### `throwing` 0.1.1
- Makes no network calls.
- Registers no hooks.
- Reads no files.
- Single user-invoked command (`/throwing:pigs`,
  `disable-model-invocation: true`); pure in-context prompt engineering.

Any future plugin added to this marketplace will be documented in the same
way and must follow the rules in [`SECURITY.md`](./SECURITY.md) — no
undisclosed telemetry, no ungated hooks, no data collection beyond the
plugin's stated purpose.

## What Anthropic does

When you use Claude Code itself, your prompts, conversations, and tool I/O
are processed by Anthropic's services according to:

- [Anthropic Privacy Policy](https://www.anthropic.com/legal/privacy)
- [Anthropic Usage Policies](https://www.anthropic.com/legal/aup)
- [Anthropic Commercial Terms](https://www.anthropic.com/legal/commercial-terms)

This marketplace has no visibility into and no control over what Anthropic
collects, retains, or processes.

## What this repository's GitHub Actions do

The CI workflows in `.github/workflows/` run only against the source code
in this repository (validation, optional Claude-powered security review of
plugin code). They do not collect data from users of the installed plugins.

## Contact

Questions about this policy: open a
[Discussion](https://github.com/robertomarchioro/goldmarktplace/discussions).

Privacy or security concerns about a specific plugin: use
[GitHub Security Advisories](https://github.com/robertomarchioro/goldmarktplace/security/advisories/new)
— do not file a public issue.

---

## 🇮🇹 Italiano

> Data di entrata in vigore: 2026-05-16
> Ultimo aggiornamento: 2026-05-16

Questa policy si applica al marketplace `goldmarktplace` e ai plugin
mantenuti in questo repository.

### In sintesi

- Il marketplace di per sé non raccoglie dati.
- I plugin mantenuti qui sono progettati esplicitamente per non fare
  chiamate di rete, non installare software, non leggere file fuori dalla
  cartella del plugin.
- Qualunque altra cosa rilevante per un plugin specifico è documentata
  nella sezione `Disclosure` del suo `README.md`.
- L'uso sottostante di Claude Code è regolato dalla
  [privacy policy di Anthropic](https://www.anthropic.com/legal/privacy),
  non da questo documento.

### Cosa fa il marketplace

`goldmarktplace` è un catalogo statico su GitHub
(`.claude-plugin/marketplace.json`). Elenca i plugin e dove recuperarli.
Il marketplace non esegue codice sulla tua macchina, non ha backend, non
ha analytics, non ha account utente.

### Cosa fanno i plugin

Stato attuale:

- **`hello-world`** 0.1.0 — nessuna chiamata di rete, nessun hook,
  nessuna lettura di file. Singola skill statica.
- **`throwing`** 0.1.1 — nessuna chiamata di rete, nessun hook, nessuna
  lettura di file. Singolo command user-invoked
  (`disable-model-invocation: true`); pure prompt engineering in-context.

Ogni futuro plugin sarà documentato allo stesso modo e dovrà seguire le
regole in [`SECURITY.md`](./SECURITY.md): niente telemetria nascosta,
niente hook ungated, nessuna raccolta dati oltre lo scopo dichiarato.

### Cosa fa Anthropic

Quando usi Claude Code, prompt, conversazioni e I/O degli strumenti sono
processati dai servizi Anthropic secondo le loro policy ufficiali
(privacy, uso, termini commerciali) linkate sopra. Questo marketplace non
ha visibilità né controllo su cosa Anthropic raccoglie o processa.

### Cosa fa la CI di questo repo

I workflow in `.github/workflows/` girano solo sul codice di questo repo
(validazione, review di sicurezza opzionale tramite Claude). Non
raccolgono dati dagli utenti dei plugin installati.

### Contatti

Domande sulla policy: apri una
[Discussion](https://github.com/robertomarchioro/goldmarktplace/discussions).

Problemi di privacy o sicurezza di un plugin specifico: usa il
[Security Advisory privato](https://github.com/robertomarchioro/goldmarktplace/security/advisories/new)
— non aprire una issue pubblica.
