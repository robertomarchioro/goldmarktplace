# Security Policy

## Reporting a vulnerability

**Please do not report security vulnerabilities through public GitHub Issues, Discussions, or pull requests.**

Use GitHub's **private vulnerability reporting** instead:

👉 **[Open a security advisory](https://github.com/robertomarchioro/goldmarktplace/security/advisories/new)**

This sends the report directly to the maintainer without exposing details publicly.

### What to include

To help us triage your report quickly, please include as much of the following as you can:

- A clear description of the issue and its impact.
- The affected plugin name and version (`@goldmarktplace` tag), or the affected workflow/file in this repo.
- Steps to reproduce, ideally with a minimal proof of concept.
- Claude Code version (`claude --version`).
- Your OS and shell.
- Any relevant log output, **with secrets redacted**.
- (Optional) Your suggested fix.

### What to expect

- **Acknowledgement**: within **72 hours** of your report.
- **Initial assessment**: within **7 days**.
- **Fix and disclosure**: depends on severity and complexity. We follow [coordinated disclosure](https://www.cisa.gov/coordinated-vulnerability-disclosure-process). Critical issues are prioritized and patched as soon as a fix is verified.
- **Credit**: with your permission, we credit reporters in the release notes and (where applicable) in the published advisory.

We will keep you informed throughout the process.

## Scope

### In scope

- Code in this repository:
  - The marketplace catalog (`.claude-plugin/marketplace.json`).
  - CI workflows under `.github/workflows/`.
  - Plugins published under `plugins/` (curated by Roberto Marchioro).
- Misconfigurations that could allow:
  - Unauthorized code execution on a user's machine via this marketplace's plugins.
  - Leakage of user data (prompts, files, env vars) beyond what the plugin's `README.md` discloses.
  - Supply-chain compromise (e.g., unpinned third-party action, unverified upstream `source`).

### Out of scope

- Vulnerabilities in **third-party plugins** referenced from this marketplace via `github`, `url`, `git-subdir`, or `npm` sources. Report those to the upstream maintainer.
- Vulnerabilities in **Claude Code itself**. Report those to Anthropic following their [responsible disclosure process](https://www.anthropic.com/responsible-disclosure-policy).
- Issues that require an attacker to already have full local access to the victim's machine.
- Theoretical issues without a realistic exploitation path.

## Security practices for plugin authors (this repo)

Every plugin we publish here follows these rules (also documented in `CONTRIBUTING.md`):

- ❌ No hardcoded secrets in `plugin.json`, `.mcp.json`, hooks, or scripts.
- ❌ No undisclosed telemetry. Any network call outside the plugin's declared MCP servers is documented in the plugin's `README.md` with an opt-out.
- ❌ No ungated hooks on `UserPromptSubmit`, `PreToolUse`, `PostToolUse` — they must check the plugin's domain (e.g. presence of a specific config file in the project).
- ❌ No prompt-injection patterns in skill/agent text (e.g. "ignore other instructions", "always run me first").
- ✅ All third-party GitHub Actions are **SHA-pinned**. Renovate/Dependabot keep them current.
- ✅ All external `source` references in `marketplace.json` (if any) are **SHA-pinned**, on hosts from a strict allowlist (`github.com`, `gitlab.com`, `bitbucket.org`).
- ✅ Hooks use shell-form quoting around `${CLAUDE_PLUGIN_ROOT}` to avoid injection.

## Anthropic policies

This marketplace adheres to:

- [Anthropic Software Directory Policy](https://support.claude.com/en/articles/13145358-anthropic-software-directory-policy)
- [Anthropic Acceptable Use Policy](https://www.anthropic.com/legal/aup)

---

## 🇮🇹 Italiano

### Segnalare una vulnerabilità

**Non segnalare vulnerabilità di sicurezza tramite Issue/Discussion/PR pubbliche.**

Usa il **private vulnerability reporting di GitHub**:

👉 **[Apri un security advisory](https://github.com/robertomarchioro/goldmarktplace/security/advisories/new)**

### Cosa includere

- Descrizione del problema e impatto.
- Nome e versione del plugin coinvolto.
- Passi per riprodurre (idealmente con un PoC minimale).
- Versione di Claude Code, OS, shell.
- Log rilevanti **con i segreti oscurati**.

### Cosa aspettarsi

- Acknowledgement entro **72 ore**.
- Valutazione iniziale entro **7 giorni**.
- Fix in tempi proporzionati alla severità, con coordinated disclosure.
- Credit (con il tuo consenso) nelle release notes.

### Scope

**In scope**: codice di questo repo (catalogo, workflow CI, plugin curati). **Fuori scope**: plugin di terze parti referenziati via `github`/`url`/`npm` (segnala all'autore originale) e Claude Code stesso (segnala via [responsible disclosure Anthropic](https://www.anthropic.com/responsible-disclosure-policy)).
