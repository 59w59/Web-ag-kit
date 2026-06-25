# 🚀 Web-ag-kit

<p align="left">
  <a href="https://www.npmjs.com/package/@59w59/web-ag-kit">
    <img src="https://img.shields.io/npm/v/@59w59/web-ag-kit.svg?logo=npm&color=CB3837" alt="npm version">
  </a>
  <a href="https://www.npmjs.com/package/@59w59/web-ag-kit">
    <img src="https://img.shields.io/npm/dm/@59w59/web-ag-kit.svg?color=44CC11" alt="npm downloads">
  </a>
  <a href="https://github.com/59w59/web-ag-kit/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@59w59/web-ag-kit.svg?color=blue" alt="license">
  </a>
</p>

**Web-ag-kit** is a ready-to-use **AI Agent Workspace** designed specifically for full-stack web development (frontend & backend). It instantly equips your local coding agents (like Antigravity, Gemini, or Claude) with specialized roles, reusable software engineering skills, custom workflows, and automated quality checks.

Stop teaching your AI how you want to build websites in every session. Scaffold a structured workspace in one command and let your agents code with senior-level guidelines.

---

## 🎯 What it Focuses On

This kit is built to solve common pitfalls in AI-generated web development (like generic color schemes, unoptimized queries, missing test suites, or lack of accessibility compliance):

- 💻 **Frontend Engineering**: Configured for React, Next.js, and standard CSS/Tailwind. Bundles full design guidelines, UX principles, typography combinations, and Framer Motion animation instructions.
- ⚙️ **Backend Architectures**: Establishes strict rules for database migrations, relational schema indexing, REST/GraphQL design, token security (JWT/OAuth), and rate-limiting.
- 🛡️ **Code Quality & Audits**: Contains built-in scripts to test accessibility (a11y), check SEO, run security vulnerability scans (OWASP compliance), and check Next.js bundle sizes before shipping.

---

## 🚀 Quick Start

You can initialize the `.agents/` workspace in your project using either **NPX** or by installing it **globally**.

#### Option A: Run via NPX (No installation required)
In your terminal, navigate to your project directory and run:
```bash
npx @59w59/web-ag-kit
```

#### Option B: Install globally and initialize
Install the package globally:
```bash
npm install -g @59w59/web-ag-kit
```
Now you can initialize it in any project folder by running:
```bash
web-ag-kit
```
*(Or specify a folder: `web-ag-kit ./my-new-project`)*

---

## 🤖 Meet the Specialist Agents

Here are some of the specialized roles ready to work on your codebase:

- **Frontend Specialist** (`frontend-specialist.md`): Focuses on generating beautiful, accessible, and responsive UI components with clean Tailwind classes and fluid animations.
- **Backend Specialist** (`backend-specialist.md`): Focuses on secure, robust RESTful APIs, database optimizations, queries, and server-side middleware.
- **QA & Test Engineer** (`qa-automation-engineer.md`): Focuses on writing unit, integration, and E2E tests (using Playwright or Jest) following strict AAA testing patterns.
- **Penetration Tester / Security Auditor**: Scans code for dependency vulnerabilities, OWASP threats, and SQL injection flaws.

---

## 💡 Example Prompts to Try

Once initialized, try prompts like:

* **For UI design**:
  > *"Use the @frontend-specialist persona to build a responsive, dashboard navbar. Rely on our Tailwind design guidelines, avoid generic templates, and use subtle Framer Motion hover animations."*
  
* **For Database & API**:
  > *"Use the @backend-specialist to design a PostgreSQL migration schema and REST API endpoints for user authentication. Ensure proper indexing for frequently queried fields."*

* **For Pre-deployment Verification**:
  > *"Run the local checklist verification script to verify that my changes pass security linting, test cases, and SEO best practices."*

---

## 🔌 Connecting Local MCP Servers

The workspace comes with a template config at `.agents/mcp/mcp_config.json` defining helpful tools:
* **21st-dev-magic**: Quick UI component insertion.
* **postgres-inspector**: Query your database directly inside the agent chat.
* **puppeteer-browser**: Renders and inspects UI layouts.

To enable them, copy the configuration block and paste it into your local global configuration (`~/.gemini/config/mcp_config.json` or `%USERPROFILE%\.gemini\config\mcp_config.json` on Windows).

---

## 🙈 Git Configuration (.gitignore)

The `.agents/` folder contains your team's custom prompts, rules, and workflows. You **should commit** the `.agents/` folder to Git so that everyone working on the project shares the same AI agent workspace guidelines.

However, you should **ignore local agent run logs** to keep your git commits clean. Add the following to your project's `.gitignore` file:

```text
# Ignore local agent execution logs
.agents/preview.log
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
