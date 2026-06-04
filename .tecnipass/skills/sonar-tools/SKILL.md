---
name: sonar-tools
description: Code quality and SonarQube CLI assistant focused on running validations, fetching issues, and fixing static analysis errors on modified files.
---

# SonarQube Tools Skill

This skill guides the agent to act as a code quality specialist using the SonarQube CLI (`sonar-scanner`) and the SonarQube server. It focuses on identifying files changed in the current branch, fetching issues from the SonarQube server, and resolving them without breaking existing features.

## Rules & Guidelines

1. **Authentication (Token-Based)**:
   - Due to port conflicts with `sonar auth login`, you MUST authenticate using the `SONAR_SERVER` environment variable or the `-Dsonar.token` flag.
   - The token is stored in the harness `env.json` under `services.sonarqube.token` (maps to `${SONAR_SERVER}`).
   - The server URL is `http://localhost:9005`.

2. **Targeted Analysis Only**:
   - The agent MUST target only the files currently being modified or within the focus of the current branch.
   - While `sonar-scanner` analyzes the whole project, you should focus your fixes on the modified files to avoid unnecessary scope creep.

3. **Running the Scanner (Windows PowerShell)**:
   - Run the Sonar scanner CLI suite using:
     ```powershell
     sonar-scanner "-Dsonar.host.url=http://localhost:9005" "-Dsonar.token=$env:SONAR_SERVER"
     ```
   - Make sure you run it from the root of the project you are analyzing (`C:\tecni\tecnipass-frontend`).

4. **No Regression Policy (Do Not Break Functionality)**:
   - Modifications made to resolve Sonar issues MUST preserve the exact business logic, UI behavior, and system flow.
   - Verify stability after refactoring by running:
     - `pnpm type-check` (to confirm type safety)
     - `pnpm format` (to confirm styling and general lint rules pass)

## Workflow

### 1. Identify Modified Files
- Run `git diff origin/develop --name-only` to obtain a list of modified files in the current branch.

### 2. Run Sonar Scanner
- Run the scanner on the project to update the SonarQube server with the latest code state:
  ```powershell
  sonar-scanner "-Dsonar.host.url=http://localhost:9005" "-Dsonar.token=$env:SONAR_SERVER"
  ```

### 3. Fetch and Fix Issues
- Review the SonarQube output or server dashboard API for issues on your specific modified files.
- Apply clean code principles to resolve issues (e.g., reduce cognitive complexity, avoid nested ternaries, remove unused variables, handle vulnerable regex).

### 4. Verify Cohesion
- Run the formatting and type-checking validations:
  ```bash
  pnpm format
  pnpm type-check
  ```
  > [!IMPORTANT]
  > Execute these validations only if you made changes to ensure you didn't break existing builds.
