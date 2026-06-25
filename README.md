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
  <a href="https://img.shields.io/badge/PRs-welcome-brightgreen.svg">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs Welcome">
  </a>
</p>

Scaffold a high-performance **AI Agent Workspace** tailored specifically for frontend and backend web development. Bring specialized agents, custom coding workflows, pre-deployment checklists, and automated testing suites to any project repository in seconds.

---

## ✨ Features

- 🤖 **20+ Specialized Agent Personas**: Personas for Frontend UI/UX, Backend APIs, QA testing, DevOps, Security Auditing, and Code Archeology.
- 📦 **12 Developer Skills**: Built-in instructions covering Tailwind/CSS layout systems, Next.js optimization, REST/GraphQL design, and vulnerability scanners.
- ⚙️ **Custom Workflows**: Interactive procedures for Socratic brainstorming, advanced UI coding, debugging sessions, and deployments.
- 🛠️ **Automated Scripts**: Local Python/Node scripts that run linter checks, test cases, and accessibility/SEO audits.
- 🔌 **MCP configuration template**: Set up and manage Model Context Protocol servers like 21st.dev, postgres-inspector, and puppeteer.

---

## 🚀 Quick Start

Initialize the `.agents/` workspace directory in your current project folder:

```bash
npx @59w59/web-ag-kit
```

---

## 📂 What Gets Created

Running the bootstrapper installs the following structure inside your repository:

```text
.agents/
├── .shared/                   # Central design system data, component templates, and assets
│   └── ui-ux-pro-max/         # CSV style sheets, animations, and design python helpers
├── agents/                    # Special system prompts defining agent capabilities
│   ├── frontend-specialist.md # Master of UI/UX, responsive design, and animations
│   ├── backend-specialist.md  # Schema modeling, APIs, caching, and server security
│   ├── qa-specialist.md       # Unit/E2E test suite writer (AAA patterns)
│   └── ... (17 more specialized personas)
├── mcp/                       # MCP Server integration configurations
│   └── mcp_config.json        # Template config for postgres, sqlite, and puppeteer servers
├── rules/                     # Styling guidelines, syntax rules, and Gemini behaviors
│   └── GEMINI.md              # Override instructions and command triggers
├── scripts/                   # Local verification utilities
│   ├── verify_all.py          # Syntax and structure verification
│   └── checklist.py           # Pre-deployment pipeline gate
├── skills/                    # Modular developer instructions (loaded dynamically)
│   ├── clean-code/
│   ├── database-design/
│   └── ... (10 more skills)
└── workflows/                 # Interactive workflows for planning and debugging
    ├── plan.md
    └── ui-ux-pro-max.md
```

For a detailed breakdown of directories and how the agents interact, read [ARCHITECTURE.md](file:///.agents/ARCHITECTURE.md).

---

## 🔧 MCP Configuration Setup

The template configuration at `.agents/mcp/mcp_config.json` is ready to be configured. To apply it to your agent:

1. Copy the servers block from `.agents/mcp/mcp_config.json`.
2. Paste them into your global MCP configuration:
   - **Windows**: `%USERPROFILE%\.gemini\config\mcp_config.json`
   - **macOS/Linux**: `~/.gemini/config/mcp_config.json`
3. Reload your editor/terminal window to load the new servers.

---

## 🛠️ How to Publish Updates (For Maintainers)

If you are the developer of this kit, here is how you can publish updates to the npm registry:

### 1. Log in to npm
Make sure you are logged in to your npm account from the command line. If you don't have an account, sign up at [npmjs.com](https://www.npmjs.com/).

```bash
npm login
```

### 2. Configure Scoped Package Publishing
Since this package is scoped (`@59w59`), npm publishes it as a **private** package by default. If you want this to be **publicly accessible** so anyone can use it via `npx`, publish it with the `--access public` flag:

```bash
npm publish --access public
```

### 3. Publishing Updates
Whenever you change the `.agents` workspace configurations or the CLI script:
1. Increment the version in `package.json` (e.g. from `1.0.0` to `1.0.1` or use `npm version patch`).
2. Run the publish command again:
```bash
npm publish --access public
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
