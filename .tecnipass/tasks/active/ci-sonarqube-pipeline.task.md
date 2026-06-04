---
id: ci/sonarqube-pipeline
spec_ref: null
prompt_ref: null
status: in-progress
priority: high
execution_mode: sequential
created: 2026-06-02
updated: 2026-06-02
runtime_origin: current
---

# Task: CI/CD SonarQube Pipeline Integration

> Implement SonarQube quality scanning in GitHub Actions CI pipelines for both frontend and backend repositories, using a self-hosted GitHub runner on the company's on-premise Windows 11 server.

## Context

- Frontend: `ci/sonarqube` branch — add `sonar-project.properties` and update `.github/workflows/ci.yml`
- Backend: `ci/sonarqube` branch — add `sonar-project.properties` and update `.github/workflows/ci.yml`
- Harness: Update memory (decisions, module-status), create task

## Charter Preflight

```md
CHARTER_CHECK:
- Clarification level: Fully clarified
- Work domain: CI/CD infrastructure
- Execution mode candidate: sequential
- Objective: Add SonarQube scanning to PR validation pipelines using self-hosted runner
- Must not do: Do not modify deploy.yml, do not change application source code, do not push without human approval
- Success criteria: PRs in both repos trigger SonarQube analysis on the self-hosted runner and report results
- Assumptions: Self-hosted runner is registered and online, SonarQube server running on port 9005, sonar-scanner CLI installed on server
- Blockers: SONAR_TOKEN and SONAR_HOST_URL must be configured as GitHub Secrets before the pipeline can run successfully
```

## Shared Task List

| ID | Status | Priority | Owner | Scope | Files | Deliverable | Dependencies | Validation |
|---|---|---|---|---|---|---|---|---|
| T1 | done | P0 | agent | harness | `tasks/active/ci-sonarqube-pipeline.task.md` | Task created | none | Review |
| T2 | done | P0 | agent | harness | `memory/decisions.md`, `memory/module-status.md` | Harness updated | T1 | Review |
| T3 | done | P0 | agent | frontend | `sonar-project.properties`, `.github/workflows/ci.yml` | SonarQube CI in frontend | T2 | Pipeline green on PR |
| T3.1 | done | P1 | agent | frontend | `sonar-project.properties`, `.github/workflows/ci.yml`, `.gitignore` | Frontend audit: harden CI job, refine scan config, organize ignore | T3 | Pipeline green + senior DevOps review |
| T3.2 | done | P1 | agent | frontend | `.github/workflows/ci.yml` | Frontend reliability: prerequisites precheck, pnpm install before scan, mask GH PR env vars for SQ Community Edition | T3.1 | Job fails fast with clear message if scanner/secrets missing |
| T4 | pending | P0 | agent | backend | `sonar-project.properties`, `.github/workflows/ci.yml` | SonarQube CI in backend | T3.2 | Pipeline green on PR |

## Done Criteria
- [x] Harness memory and tasks updated with CI/CD SonarQube context
- [x] Frontend `sonar-project.properties` updated (removed hardcoded host, added build exclusions)
- [x] Frontend `ci.yml` updated with sonarqube job on self-hosted runner
- [x] Frontend audit: timeout, concurrency, draft-skip, explicit pwsh shell on sonar job
- [x] Frontend audit: scanner config — tsconfigPaths, scm.provider, full exclusions, separated test exclusions
- [x] Frontend audit: `.gitignore` reorganized — `.scannerwork/` in its own SonarQube section
- [x] Frontend reliability: precheck of `sonar-scanner` CLI in PATH + required secrets with actionable error messages
- [x] Frontend reliability: `pnpm install --frozen-lockfile` runs before scanner for richer TS analysis
- [x] Frontend reliability: GitHub PR env vars masked so SonarQube Community Edition treats every run as main-branch analysis
- [ ] Backend `sonar-project.properties` created
- [ ] Backend `ci.yml` updated with sonarqube job on self-hosted runner
- [x] Atomic commits applied per commit-protocol.skill.md (frontend)

## Decision Log

| Date | Decision | Rationale | Evidence |
|---|---|---|---|
| 2026-06-02 | Use self-hosted GitHub runner on Windows 11 server | Server not exposed to internet; runner only needs outbound HTTPS. Zero network exposure. | Plan evaluation: 3 options compared |
| 2026-06-02 | Split CI into `validate` (cloud) + `sonarqube` (self-hosted) jobs | Minimize CPU/RAM load on the on-prem server; cloud runners handle lint/build for free | Hardware constraint: i3 4-core, 16GB RAM |
| 2026-06-02 | Use `run: sonar-scanner` instead of Docker-based GitHub Action | `SonarSource/sonarqube-scan-action@v4` uses Docker which only works on Linux runners | Runner OS is Windows 11 |
| 2026-06-02 | Branch name: `ci/sonarqube` | Prefix `ci/` matches infrastructure changes. Consistent across both repos | commit-protocol.skill.md conventions |
| 2026-06-02 | Quality Gate runs report-only (no `sonar.qualitygate.wait=true`) on this iteration | Plan §9 lists "Blocking Quality Gate" as a future improvement. Avoids blocking PRs on inherited tech debt during first scan | Human decision during audit |
| 2026-06-02 | No explicit `.scannerwork/` cleanup step in workflow | `actions/checkout@v4` defaults `clean: true` which runs `git clean -ffdx`, removing ignored files including `.scannerwork/` | actions/checkout v4 docs |
| 2026-06-02 | Drop coverage-action GitHub Action; use `run: sonar-scanner` with `shell: pwsh` | Self-hosted runner is Windows 11; the Docker-based action does not run on Windows runners | ADR-008 |
| 2026-06-02 | Mask `GITHUB_EVENT_NAME`, `GITHUB_REF`, `GITHUB_BASE_REF`, `GITHUB_HEAD_REF` for sonar-scanner | SonarQube Community Edition does not support PR/branch analysis. The scanner auto-enables PR mode when these vars are present, failing with a licensing error. Masking them makes the scanner treat every run as main-branch analysis (matches local-dev behavior). | sonar-scanner CI auto-config docs |
| 2026-06-02 | Add `pnpm install --frozen-lockfile` before scan | TS analyzer resolves imports better with `node_modules/` present; matches what `sonar.typescript.tsconfigPaths` expects | Trade-off: +30-60s per scan |
| 2026-06-02 | Precheck step for prerequisites instead of relying on raw scanner errors | Self-hosted runners share state with the host; PATH changes after runner registration are NOT picked up by the Windows service until restart. Precheck surfaces this with an actionable message. | Windows service env-var inheritance behavior |

## Progress Notes

### 2026-06-02
- Status: In progress — frontend audited, hardened and ready for human review/push; backend pending
- Server setup: Self-hosted runner installed, registered, and connected to GitHub (frontend repo confirmed)
- SonarQube: Server running on port 9005 (Community Edition), sonar-scanner CLI installed on system PATH
- Reusable template extracted to `memory/patterns.md` §8 for backend replication (T4)
- Gotchas recorded in `memory/mistakes.md` §8 (Windows service PATH) and §9 (Community Edition PR auto-detection)
- Pending: GitHub Secrets (SONAR_TOKEN, SONAR_HOST_URL) to be configured by human
- Server-side check to run before first real pipeline: confirm `sonar-scanner --version` resolves in a fresh shell; if scanner was added to PATH after runner install, `Restart-Service actions.runner.*` to refresh the service PATH
- Frontend commits (branch `ci/sonarqube`):
  - `7cecfa2e` — ci(sonarqube): remove hardcoded host url and add build exclusions to sonar config
  - `296862c5` — ci(sonarqube): add sonarqube job on self-hosted runner to ci pipeline
  - `a281eb63` — ci(sonarqube): refine scanner config with tsconfig, scm and broader exclusions
  - `35322f75` — ci(sonarqube): harden scan job with timeout, concurrency and draft skip
  - `15fa55e9` — chore(sonarqube): move scannerwork ignore into its own section
  - `ddd3ae9b` — ci(sonarqube): validate scanner and secrets with actionable error messages
  - `a84e50cd` — ci(sonarqube): install dependencies before scan for richer ts analysis
  - `3d19f166` — ci(sonarqube): mask github pr env vars to force main-branch analysis on community edition
- Next step: Human reviews + approves push of `ci/sonarqube`. Then configure GitHub Secrets and implement backend.

## Quality Gate
- [x] Formatting completed or not applicable. (Biome ran via pre-commit hook on every commit — no fixes needed)
- [x] Type-check completed or not applicable. (`tsc --noEmit` passed via pre-commit hook on every commit)
- [x] Tests completed or not applicable. (N/A — CI/CD config only, no app source touched; repo has no unit tests yet)
- [x] Sonar/linting completed or not applicable. (`pnpm lint` clean; this task configures SonarQube itself)
- [x] No secrets or forbidden debug artifacts introduced. (Secrets injected via GitHub Secrets, never hardcoded; `.scannerwork/` git-ignored)
- [x] Commit message follows the requested commit protocol when committing. (8 atomic commits, conventional `ci(sonarqube)` / `chore(sonarqube)` scopes)
