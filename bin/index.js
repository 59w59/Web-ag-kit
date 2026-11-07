#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const pkg = require('../package.json');
const args = process.argv.slice(2);

// Handle Scrapling setup command
if (args.includes('setup-scrapling') || args.includes('install-scrapling')) {
  const installerScript = path.join(__dirname, '../.agents/skills/scrapling/scripts/install_scrapling.js');
  if (fs.existsSync(installerScript)) {
    require(installerScript);
  } else {
    console.error('❌ Scrapling installer script not found at:', installerScript);
    process.exit(1);
  }
  return;
}

// Handle help flag
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
\x1b[36m🚀 Web-ag-kit v${pkg.version}\x1b[0m
${pkg.description}

\x1b[1mUSAGE:\x1b[0m
  web-ag-kit [target-directory] [options]
  web-ag-kit security [target-directory] [options]
  web-ag-kit install-scrapling
  npx @59w59/web-ag-kit [target-directory] [options]
  npx @59w59/web-ag-kit security [target-directory] [options]
  npx @59w59/web-ag-kit install-scrapling

\x1b[1mCOMMANDS:\x1b[0m
  security             Install ONLY security, OWASP API, Cloudflare & Pentest assets
  install-scrapling    Install Scrapling framework & stealth browser binaries (Python 3.10+)

\x1b[1mARGUMENTS:\x1b[0m
  target-directory     Target directory to scaffold (default: current directory)

\x1b[1mOPTIONS:\x1b[0m
  -s, --security       Install only cybersecurity and edge defense assets
  -y, --yes            Skip interactive prompts and use defaults
  -f, --force          Overwrite existing files in .agents
  -v, --version        Show version number
  -h, --help           Show this help message

\x1b[1mEXAMPLES:\x1b[0m
  web-ag-kit
  web-ag-kit security ./my-api
  web-ag-kit --security ./my-project -y
  web-ag-kit install-scrapling
  npx @59w59/web-ag-kit security
`);
  process.exit(0);
}

// Handle version flag
if (args.includes('--version') || args.includes('-v')) {
  console.log(`v${pkg.version}`);
  process.exit(0);
}

const isSecurityOnlyCommand = args.includes('security') || args.includes('--security') || args.includes('-s') || args.includes('--security-only');
const isNonInteractive = args.includes('-y') || args.includes('--yes') || !process.stdin.isTTY;

const nonFlagArgs = args.filter(a => !a.startsWith('-') && a !== 'security');
const targetDirArg = nonFlagArgs[0] || '.';
const sourceAgents = path.join(__dirname, '../.agents');

const SECURITY_AGENTS = [
  'security-auditor.md',
  'penetration-tester.md',
  'debugger.md'
];

const SECURITY_SKILLS = [
  'api-security',
  'vulnerability-scanner',
  'web-defense-simulator',
  'web-threat-modeling',
  'skill-inspector',
  'visual-security-debugger',
  'cloudflare-waf',
  'cloudflare-one',
  'turnstile-spin',
  'gateway-workers',
  'red-team-tactics',
  'db-migration-guard',
  'scrapling'
];

const SECURITY_WORKFLOWS = [
  'security-audit.md'
];

function getBanner(isSecurityOnly) {
  return `
\x1b[36m  __        __   _          _             _  ___ _   
  \\ \\      / /__| |__      / \\   __ _    | |/ (_) |_ 
   \\ \\ /\\ / / _ \\ '_ \\    / _ \\ / _\` |___| ' /| | __|
    \\ V  V /  __/ |_) |  / ___ \\ (_| |___| . \\| | |_ 
     \\_/\\_/ \\___|_.__/  /_/   \\_\\__, |   |_|\\_\\_|\\__|
                                |___/                \x1b[0m
  ${isSecurityOnly ? '\x1b[32m🛡️  CYBERSECURITY & EDGE DEFENSE EDITION 🛡️\x1b[0m' : `\x1b[1mAI Agent Full-Stack Workspace Scaffold (v${pkg.version})\x1b[0m`}
`;
}

function ask(rl, question, defaultValue) {
  return new Promise((resolve) => {
    rl.question(`${question} \x1b[90m(${defaultValue})\x1b[0m: `, (answer) => {
      resolve(answer.trim() || defaultValue);
    });
  });
}

function copyDirectorySubset(srcDir, destDir, allowedItems) {
  if (!fs.existsSync(srcDir)) return;
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  for (const item of allowedItems) {
    const srcPath = path.join(srcDir, item);
    const destPath = path.join(destDir, item);
    if (fs.existsSync(srcPath)) {
      fs.cpSync(srcPath, destPath, { recursive: true });
    }
  }
}

async function runWizard() {
  let isSecurityOnly = isSecurityOnlyCommand;
  let targetDir = targetDirArg;
  let stack = isSecurityOnly ? 'Cybersecurity & Edge Defense' : 'Next.js 15 Full-Stack';

  console.log(getBanner(isSecurityOnly));

  if (!isNonInteractive) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log('\x1b[1m🛠️ Configure your AI Agent Workspace:\x1b[0m\n');
    targetDir = await ask(rl, '📂 Target directory', targetDir);

    if (!isSecurityOnlyCommand) {
      console.log('\n\x1b[1m📦 Select package installation mode:\x1b[0m');
      console.log('  1) Complete Full-Stack Workspace (All 18 Agents & 30+ Skills including ECC & Scrapling) [Default]');
      console.log('  2) Cybersecurity & Edge Defense ONLY (Cloudflare, OWASP API, Scrapling, Pentest, Threat Modeling)');
      const modeChoice = await ask(rl, 'Choose mode [1-2]', '1');
      if (modeChoice === '2') {
        isSecurityOnly = true;
        stack = 'Cybersecurity & Edge Defense Only';
      }
    }

    if (!isSecurityOnly) {
      console.log('\n\x1b[1m🎯 Select your primary web stack:\x1b[0m');
      console.log('  1) Next.js 15 (App Router, Server Actions, Tailwind, Prisma/Drizzle)');
      console.log('  2) React SPA (Vite, Tailwind, TanStack Query)');
      console.log('  3) Full-Stack Node / Express / Fastify / Supabase API');
      console.log('  4) Universal Full-Stack (All Skills, Agents & Scrapling Crawler)');
      const stackChoice = await ask(rl, 'Choose stack [1-4]', '1');
      const stackMap = {
        '1': 'Next.js 15 Full-Stack',
        '2': 'React SPA (Vite)',
        '3': 'Full-Stack Node API',
        '4': 'Universal Full-Stack'
      };
      stack = stackMap[stackChoice] || stackMap['1'];
    }

    rl.close();
  }

  const targetPath = path.resolve(targetDir);
  const targetAgents = path.join(targetPath, '.agents');

  console.log('\n\x1b[36m%s\x1b[0m', `🚀 Initializing ${isSecurityOnly ? 'Security Shield' : 'Web-ag-kit workspace'}...`);

  try {
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }

    if (fs.existsSync(targetAgents)) {
      console.warn('\x1b[33m%s\x1b[0m', '⚠️  A .agents folder already exists in the target directory (merging).');
    }

    if (isSecurityOnly) {
      // Create destination directories
      fs.mkdirSync(path.join(targetAgents, 'agents'), { recursive: true });
      fs.mkdirSync(path.join(targetAgents, 'skills'), { recursive: true });
      fs.mkdirSync(path.join(targetAgents, 'workflows'), { recursive: true });

      // Copy only security assets
      copyDirectorySubset(path.join(sourceAgents, 'agents'), path.join(targetAgents, 'agents'), SECURITY_AGENTS);
      copyDirectorySubset(path.join(sourceAgents, 'skills'), path.join(targetAgents, 'skills'), SECURITY_SKILLS);
      copyDirectorySubset(path.join(sourceAgents, 'workflows'), path.join(targetAgents, 'workflows'), SECURITY_WORKFLOWS);

      // Copy shared rules & mcp
      if (fs.existsSync(path.join(sourceAgents, 'rules'))) {
        fs.cpSync(path.join(sourceAgents, 'rules'), path.join(targetAgents, 'rules'), { recursive: true });
      }
      if (fs.existsSync(path.join(sourceAgents, 'mcp'))) {
        fs.cpSync(path.join(sourceAgents, 'mcp'), path.join(targetAgents, 'mcp'), { recursive: true });
      }
      if (fs.existsSync(path.join(sourceAgents, 'scripts'))) {
        fs.cpSync(path.join(sourceAgents, 'scripts'), path.join(targetAgents, 'scripts'), { recursive: true });
      }

      console.log('\n\x1b[32m%s\x1b[0m', '🛡️  Web-ag-kit [SECURITY EDITION] installed successfully!');
      console.log(`\n  📂 Target: \x1b[34m${targetAgents}\x1b[0m`);
      console.log(`  🛡️ Profile: \x1b[32mCybersecurity & Edge Defense Only\x1b[0m`);
      console.log(`  🤖 Security Agents: \x1b[36m@security-auditor, @penetration-tester, @debugger\x1b[0m`);
      console.log(`  ⚡ Security Skills: \x1b[36m${SECURITY_SKILLS.join(', ')}\x1b[0m`);
      console.log(`  🔄 Audit Workflow: \x1b[36m/security-audit\x1b[0m\n`);

      console.log('\x1b[1mNext steps:\x1b[0m');
      console.log('  1. Open this project in VS Code / Antigravity / Cursor.');
      console.log('  2. Run: \x1b[33m"Run /security-audit across our application"\x1b[0m to execute full 360° audit.');
      console.log('  3. Proactively audit API endpoints with \x1b[35mapi-security\x1b[0m and \x1b[35mweb-defense-simulator\x1b[0m!');
      console.log('  4. To setup stealth crawling with Scrapling, run: \x1b[33mweb-ag-kit install-scrapling\x1b[0m\n');
    } else {
      // Full copy
      fs.cpSync(sourceAgents, targetAgents, { recursive: true });

      console.log('\n\x1b[32m%s\x1b[0m', '✅ Web-ag-kit initialized successfully!');
      console.log(`\n  📂 Target: \x1b[34m${targetAgents}\x1b[0m`);
      console.log(`  💻 Stack Profile: \x1b[35m${stack}\x1b[0m`);
      console.log(`  🤖 Agents Installed: \x1b[36m18 Specialist Personas\x1b[0m`);
      console.log(`  ⚡ Skills Included: \x1b[36m23 Hardened Skills (Fullstack + Security + CWV + Scrapling)\x1b[0m`);
      console.log(`  🔄 Workflows: \x1b[36morchestrate, security-audit, ui-ux-pro-max, deploy\x1b[0m\n`);

      console.log('\x1b[1mNext steps:\x1b[0m');
      console.log('  1. Open this directory in VS Code / Antigravity / Cursor.');
      console.log('  2. Try prompt: \x1b[33m"Run /security-audit to test our web application security."\x1b[0m');
      console.log('  3. To setup Scrapling for web crawling & anti-bot testing, run: \x1b[33mweb-ag-kit install-scrapling\x1b[0m\n');
    }
  } catch (err) {
    console.error('\x1b[31m%s\x1b[0m', '❌ Initialization failed:', err.message);
    process.exit(1);
  }
}

runWizard();
