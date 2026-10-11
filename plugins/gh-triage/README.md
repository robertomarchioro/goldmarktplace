# gh-triage

End-to-end GitHub issue triage for Claude Code. One command takes your open
issues from "unsorted backlog" to "merged PRs + updated changelog", with a
human in the loop only where it matters.

## Install

```bash
/plugin marketplace add robertomarchioro/goldmarktplace
/plugin install gh-triage@goldmarktplace
```

## What it does

`/gh-triage:triage` runs a six-phase pipeline:

1. **Ingest** — lists open issues via `gh`.
2. **Classify** — a subagent sorts each issue into **feature** vs **fix** (with a feature sub-category and confidence).
3. **Feature gate** — you decide which features to accept and their priority (P0/P1/P2); only the single approved **P0** is implemented now, the rest go to a labelled backlog/milestone.
4. **Impact + dependency graph** — for every fix, a read-only analyzer finds the exact files it must touch. Issues that share files become a **coordinated cluster** (one agent, no write conflicts); the rest are **independent islands** (run in parallel).
5. **Implement** — one worktree-isolated agent per group writes the fix with tests and opens an atomic PR.
6. **Review → CI → merge** — each PR is reviewed (code + security), waits for CI, and is squash-merged on green. Then the changelog is updated in one commit.

Autonomy: PRs auto-merge once CI is green. It stops only on a red CI it can't
fix or a genuine architectural doubt. A PR that touches CI/workflow, release
or credential files is never auto-merged: it is left for you to review.

Issue text is treated as untrusted data: anyone who can open an issue writes
it, so the command and its agents never follow instructions found there.
Issues that ask for such actions go to the human-review list.

```
/gh-triage:triage                 # full run
/gh-triage:triage --dry-run       # classify + plan only, no edits or PRs
/gh-triage:triage --limit 30      # cap how many issues to ingest
/gh-triage:triage --label bug     # only triage issues with a given label
```

## Requirements

- The [`gh` CLI](https://cli.github.com/) installed and authenticated (`gh auth login`), run from inside a Git repo with a GitHub remote.
- Permission for the issue/PR actions it performs (label, comment, milestone, open/merge PR).

## Bundled agents

This plugin ships the three subagents the command orchestrates, so it works
out of the box:

- `issue-classifier` — feature vs fix classification.
- `fix-impact-analyzer` — read-only file-impact analysis per issue.
- `fix-implementer` — implements one fix-group on an isolated branch and opens a PR.

## Optional companions

The review phase uses `code-reviewer` and `security-reviewer` subagents **if
they are installed** — for example from the
[official Anthropic plugin marketplace](https://github.com/anthropics/claude-plugins-official)
or [Anthropic's Agent Skills](https://github.com/anthropics/skills). If they
are not present, the command performs the review inline to the same standard.
Installing them is recommended for the strongest review gate.

## Disclosure

This plugin makes **no network calls of its own**. All GitHub interaction goes
through your local, already-authenticated `gh` CLI — which sends requests to
the GitHub API on your behalf using your credentials. It performs the issue,
label, milestone, branch, and PR actions described above, in the repository
you run it from. No data is sent anywhere else.

The bundled agents read project files for impact analysis and write changes on
isolated git worktrees / branches before opening PRs. Registers no hooks.

To verify a fix, the implementer agents run **your repository's own** install,
build and test commands (e.g. `npm ci`, `cargo test`), which may download
dependencies from that ecosystem's registry. The plugin itself never asks to
install system packages. To save disk space it may share one build directory
between parallel agents for the run (e.g. `CARGO_TARGET_DIR`); it does not
edit user-global config such as `~/.cargo/config.toml` without asking you.

## License

MIT — see the repository [LICENSE](../../LICENSE).

---

## 🇮🇹 Italiano

Triage end-to-end delle issue GitHub per Claude Code. Un solo comando porta le
issue aperte dal "backlog disordinato" a "PR mergiate + changelog aggiornato",
con l'utente in-the-loop solo dove serve davvero.

### Installazione

```bash
/plugin marketplace add robertomarchioro/goldmarktplace
/plugin install gh-triage@goldmarktplace
```

### Cosa fa

`/gh-triage:triage` esegue una pipeline in sei fasi:

1. **Ingest** — elenca le issue aperte tramite `gh`.
2. **Classify** — un subagent ordina ciascuna issue tra **feature** e **fix** (con sotto-categoria della feature e confidenza).
3. **Feature gate** — decidi quali feature accettare e con che priorità (P0/P1/P2); viene implementata solo l'unica **P0** approvata, le altre vanno in backlog con label/milestone.
4. **Impatto + grafo delle dipendenze** — per ogni fix un analyzer in sola lettura trova i file esatti da toccare. Le issue che condividono file diventano un **cluster coordinato** (un agent, niente conflitti di scrittura); le altre sono **isole indipendenti** (eseguite in parallelo).
5. **Implement** — un agent per gruppo, in un worktree isolato, scrive il fix con i test e apre una PR atomica.
6. **Review → CI → merge** — ogni PR viene rivista (code + security), aspetta la CI e viene squash-mergiata quando è green. Poi il changelog viene aggiornato in un singolo commit.

Autonomia: le PR vengono auto-mergiate appena la CI è green. Si ferma solo se
la CI rossa è irrecuperabile o se c'è un dubbio architetturale reale. Una PR
che tocca file di CI/workflow, di release o credenziali non viene mai
auto-mergiata: resta a te da rivedere.

Il testo delle issue è trattato come dato non fidato: lo scrive chiunque possa
aprire una issue, quindi il comando e i suoi agent non seguono mai istruzioni
trovate lì. Le issue che chiedono azioni del genere finiscono nella lista per
la revisione umana.

```
/gh-triage:triage                 # full run
/gh-triage:triage --dry-run       # solo classify + piano, niente edit né PR
/gh-triage:triage --limit 30      # massimo numero di issue da prendere
/gh-triage:triage --label bug     # filtra per label
```

### Requisiti

- La [`gh` CLI](https://cli.github.com/) installata e autenticata (`gh auth login`), eseguita da una repo Git con un remote GitHub.
- I permessi per le azioni che il comando esegue su issue/PR (label, commento, milestone, apertura/merge PR).

### Agent inclusi

Il plugin spedisce i tre subagent che il comando orchestra, così funziona
out-of-the-box:

- `issue-classifier` — classifica feature vs fix.
- `fix-impact-analyzer` — analisi read-only dell'impatto sui file per issue.
- `fix-implementer` — implementa un fix-group su un branch isolato e apre la PR.

### Companion opzionali

La fase di review usa i subagent `code-reviewer` e `security-reviewer` **se
sono installati** — per esempio dal [marketplace ufficiale di plugin
Anthropic](https://github.com/anthropics/claude-plugins-official) o dalle
[Agent Skills ufficiali Anthropic](https://github.com/anthropics/skills). Se
non sono presenti, il comando esegue la review inline allo stesso standard.
Installarli è consigliato per il gate di review più forte.

### Disclosure

Il plugin **non fa chiamate di rete di propria iniziativa**. Tutta
l'interazione con GitHub passa dalla tua `gh` CLI locale già autenticata —
che invia richieste alle API di GitHub per tuo conto usando le tue
credenziali. Esegue le azioni descritte sopra (issue, label, milestone,
branch, PR) sul repository da cui lo lanci. Nessun dato viene inviato
altrove.

Gli agent inclusi leggono i file del progetto per l'impact analysis e
scrivono modifiche su worktree git / branch isolati prima di aprire le PR.
Non registra hook.

Per verificare un fix, gli agent implementer eseguono i comandi di install,
build e test **del tuo repository** (es. `npm ci`, `cargo test`), che possono
scaricare dipendenze dal registry di quell'ecosistema. Il plugin non chiede
mai di installare pacchetti di sistema. Per risparmiare disco può far
condividere agli agent in parallelo una sola cartella di build per la durata
del run (es. `CARGO_TARGET_DIR`); non modifica configurazioni globali come
`~/.cargo/config.toml` senza chiedertelo.

### Licenza

MIT — vedi la [LICENSE](../../LICENSE) del repository.
