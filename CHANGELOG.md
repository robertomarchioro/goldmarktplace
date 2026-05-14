# Changelog

All notable changes to this marketplace are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Plugin-level changelogs live inside each plugin folder (`plugins/<name>/CHANGELOG.md`).
This file tracks the marketplace itself: catalog entries, infrastructure, policies.

## [Unreleased]

### Added
- Initial repository scaffolding (Phase 0): `README.md`, `CONTRIBUTING.md`, `SECURITY.md`, `.gitignore`.
- Bilingual EN/IT documentation surface.
- Curated contribution model (external plugin PRs not accepted).
- Marketplace catalog `.claude-plugin/marketplace.json` (Phase 1).
- `hello-world` starter plugin: demo `greet` skill, plugin manifest, README (Phase 1).
- CI: `Validate Plugins` workflow — `claude plugin validate` plus security invariants (Phase 2).
- GitHub issue forms (bug report, feature request) and pull request template (Phase 2).

### Pending
- Branch protection on `main` (Phase 2).
- Public visibility on GitHub (Phase 3).

---

[Unreleased]: https://github.com/robertomarchioro/goldmarktplace/commits/main
