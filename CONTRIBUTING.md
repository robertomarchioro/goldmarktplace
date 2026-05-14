# Contributing to goldmarktplace

Thanks for your interest in `goldmarktplace`! This document explains how to contribute.

## Contribution model: curated

`goldmarktplace` is a **curated marketplace**. Plugins published here are authored and maintained by Roberto Marchioro. This keeps the catalog focused, the quality predictable, and the security surface small.

**What this means in practice:**

- ❌ **Pull requests adding new plugins to `plugins/` or new entries to `.claude-plugin/marketplace.json` will be closed** without merge. This is enforced via the `close-external-prs.yml` workflow once enabled.
- ✅ **Bug reports, feature requests, and ideas are very welcome.** Open an [Issue](https://github.com/robertomarchioro/goldmarktplace/issues) or start a [Discussion](https://github.com/robertomarchioro/goldmarktplace/discussions).
- ✅ **PRs for typos, docs improvements, CI/infra fixes, or bug fixes in existing plugins are accepted** when they don't introduce new components.
- ✅ **If you have built a Claude Code plugin and want it to reach a wider audience**, submit it directly to the [official Anthropic marketplace](https://clau.de/plugin-directory-submission) — that's the right channel for community plugins.

## How to report a bug

1. Search existing [Issues](https://github.com/robertomarchioro/goldmarktplace/issues) — your problem may already be tracked.
2. Open a new Issue using the **Bug report** template.
3. Include:
   - Plugin name and version (`@goldmarktplace` tag).
   - Claude Code version (`claude --version`).
   - OS and shell.
   - Exact reproduction steps and what you expected vs. what happened.
   - Any relevant log output (with secrets redacted).

## How to propose an idea

1. Open a [Discussion](https://github.com/robertomarchioro/goldmarktplace/discussions) in the **Ideas** category, or
2. Open an Issue using the **Feature request** template.

Describe the problem first, the proposed solution second.

## How to fix a typo or improve docs

Small docs PRs are welcome:

1. Fork the repo.
2. Make the change on a branch.
3. Open a PR using the [PR template](./.github/PULL_REQUEST_TEMPLATE.md).
4. Make sure CI is green (the `Validate Plugins` workflow).

## Code style and conventions

When working on this repo:

- **Commits**: [Conventional Commits](https://www.conventionalcommits.org) — `feat:`, `fix:`, `docs:`, `chore:`, `ci:`, `refactor:`.
- **Plugin names** (`plugin.json` `name`): kebab-case, ASCII `[a-z0-9-]` only.
- **Versioning**: [SemVer 2.0](https://semver.org). Bump `version` in `plugin.json` on every release.
- **Descriptions**: one sentence, "action + value", in English.
- **File size**: keep `SKILL.md` < 500 lines, agent files < 300 lines, `hooks.json` < 100 lines.
- **Frontmatter** in `SKILL.md` / agent / command files must be valid YAML — the CI checks this.
- **No hardcoded secrets** anywhere — `.mcp.json`, hooks, scripts, examples.
- **Hook gating**: any hook that runs on `UserPromptSubmit`, `PreToolUse`, or `PostToolUse` must be **gated** to the plugin's domain (don't observe unrelated sessions).
- **Disclosure**: any plugin that makes network calls outside its declared MCP servers must document it in its `README.md` and provide an opt-out.

## Local validation before pushing

Run from the repo root:

```bash
# Schema check (marketplace.json, plugin.json, YAML frontmatter, hooks.json)
claude plugin validate .

# Smoke test
/plugin marketplace add ./
/plugin install <plugin-name>@goldmarktplace
```

## License of contributions

By submitting a contribution, you agree that it is licensed under the [MIT License](./LICENSE), the same license as the rest of the repository.

---

## 🇮🇹 Italiano

### Modello di contribuzione: curato

`goldmarktplace` è un marketplace curato: i plugin sono scritti e mantenuti da Roberto Marchioro.

- ❌ **Le PR che aggiungono nuovi plugin a `plugins/` o nuove voci a `.claude-plugin/marketplace.json` verranno chiuse** senza merge.
- ✅ **Bug report, idee e feedback** sono benvenuti su [Issues](https://github.com/robertomarchioro/goldmarktplace/issues) e [Discussions](https://github.com/robertomarchioro/goldmarktplace/discussions).
- ✅ **PR per typo, miglioramenti alla documentazione, fix di CI o bug nei plugin esistenti** sono accettate.
- ✅ Se hai un plugin tuo e vuoi distribuirlo, submittalo al [marketplace ufficiale Anthropic](https://clau.de/plugin-directory-submission).

### Convenzioni rapide

- Commit: [Conventional Commits](https://www.conventionalcommits.org) (`feat:`, `fix:`, `docs:`, ...).
- Plugin name: `kebab-case`, solo `[a-z0-9-]`.
- Version: SemVer 2.0, bump ad ogni release.
- Niente segreti hardcoded.
- Hook gated al dominio del plugin.
- Disclosure obbligatoria per qualsiasi chiamata di rete fuori dagli MCP server dichiarati.

### Prima di pushare

```bash
claude plugin validate .
```
