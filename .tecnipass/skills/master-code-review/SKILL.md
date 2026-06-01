# Professional Code Review Mastery: Production Standards

## Core Objective
The primary goal of a code review is not just to find bugs, but to ensure the long-term **maintainability**, **security**, and **reliability** of the system. Every Pull Request (PR) must leave the codebase better than it was found.

---

## 1. The Review Hierarchy
Prioritize your focus according to the impact of the change. Do not spend time on syntax if the architecture is flawed.

| Priority | Category | Focus Area |
| :--- | :--- | :--- |
| **Critical** | **Architecture** | Design patterns, separation of concerns, and system integration. |
| **High** | **Security & Logic** | Data validation, authentication, and edge-case handling. |
| **Medium** | **Performance** | Resource management and algorithmic efficiency. |
| **Low** | **Style & Docs** | Naming conventions, comments, and formatting. |

---

## 2. Production-Ready Checklist

### Logical Correctness
* Does the code actually solve the problem described in the task?
* Are there any "off-by-one" errors or logical fallacies?
* Is the error handling robust? Ensure it doesn't just catch exceptions but handles them gracefully (e.g., retries, logging, or user alerts).

### Security First
* **Sanitization:** Are all user inputs validated and sanitized to prevent SQL Injection or XSS?
* **Sensitive Data:** Ensure no credentials, API keys, or PII (Personally Identifiable Information) are hardcoded or logged.
* **Least Privilege:** Does the code only request the permissions it strictly needs?

### Performance & Scalability
* Check for inefficient loops. Aim for optimal time complexity. If a solution is $O(n^2)$, evaluate if it can be optimized to $O(n \log n)$ or $O(n)$.
* Look for "N+1" query problems in database interactions.
* Ensure heavy operations are handled asynchronously to avoid blocking the main thread.

### Maintainability (Clean Code)
* **SOLID Principles:** Does the code follow Single Responsibility and Open/Closed principles?
* **DRY (Don't Repeat Yourself):** Is there logic that should be abstracted into a reusable utility?
* **Naming:** Are variables and functions named by their intent rather than their technical implementation?

---

## 3. Testing Standards
Code should not reach production without verified behavior.

1.  **Unit Tests:** Ensure high coverage for the new logic.
2.  **Integration Tests:** Verify that the new code interacts correctly with existing modules.
3.  **Edge Cases:** Check tests for null values, empty strings, and maximum/minimum numerical limits.
4.  **Failure Paths:** Tests should verify not only that the code works, but that it fails predictably when given bad data.

---

## 4. Communication & Mentorship
As an engineer and mentor, the tone of the review is as important as the technical feedback.

* **Be Objective:** Comment on the code, not the person. Use "this function could be..." instead of "you wrote this...".
* **Explain the "Why":** Don't just point out a mistake; explain the principle behind the suggestion.
* **Distinguish between "Must-Fix" and "Nitpicks":** Use labels like **[NIT]** for minor style suggestions that shouldn't block the PR, and **[BLOCKER]** for critical issues.
* **Celebrate Good Work:** If you see an elegant solution or a clever optimization, acknowledge it.

---

## 5. Automation Workflow
To maximize efficiency, the human reviewer should only focus on what machines cannot see.

* **Linters/Formatters:** Syntax and style should be enforced by CI/CD tools (e.g., ESLint, Prettier, Black).
* **Static Analysis:** Use tools to detect code smells and security vulnerabilities automatically.
* **Agentic Review:** Utilize tools like Claude Code to perform a pre-review, identifying complex logic patterns or missing test cases before the manual review begins.