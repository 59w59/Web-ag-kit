# Defacement, Web Intrusions & Visual Attack Indicators

> Guide for identifying signs of web intrusions, visual defacements, and client-side code tampering.

---

## 1. Website Defacement Signs

Defacement is typically the final stage of an unauthorized breach where the attacker changes the visual content of the website to broadcast the intrusion.

### Key Indicators:
- **Visual Banners**: Phrases like "Hacked by", "Pwned", "Security Breach", or attacker handles in header/body tags.
- **Replaced Index Page**: Replacement of `index.html` or main landing page with static HTML/images.
- **Favicon or Title Tampering**: Altered page `<title>` tag or favicon pointing to external image hosts.
- **Rogue Embeds**: Unauthorized audio players, background music, or fullscreen canvas animations.

### Remediation Protocol:
1. Immediately revoke active session tokens and isolate origin server behind Cloudflare Access.
2. Compare git commit history against disk files using `git status` and `git diff`.
3. Restore from verified clean git commit or backup snapshot.
4. Review access logs to identify vector (compromised FTP/SSH, unauthenticated upload endpoint, or SQLi).

---

## 2. Formjacking & Magecart Attacks

Formjacking occurs when malicious JavaScript is injected into legitimate pages (via third-party script compromise, supply-chain attack, or XSS) to steal payment or login credentials as the user types them.

### Visual & DOM Indicators:
- **Event Interception**: Event listeners on `input` or `form[onsubmit]` sending base64 payloads to unrecognized external domains.
- **Fake Visual Overlays**: Rogue modals or popup credit card entry fields injected over checkout flows.
- **Obfuscated JS**: Strings decoded via `eval(String.fromCharCode(...))` or packed scripts loaded from typosquatted CDNs.

### Remediation Protocol:
1. Enforce strict `Content-Security-Policy` with `script-src` whitelist and hashes/nonces.
2. Enable Subresource Integrity (`integrity="sha384-..."`) on all external CDN scripts.
3. Use Cloudflare Page Shield to continuously monitor client-side script dependencies.

---

## 3. UI Redressing & Clickjacking

Clickjacking tricks users into clicking actionable elements (buttons, links) on a trusted site by embedding it in an invisible iframe beneath an enticing decoy UI.

### Defense Verification:
- Ensure HTTP response contains:
  ```http
  X-Frame-Options: DENY
  Content-Security-Policy: frame-ancestors 'none';
  ```
- In Next.js:
  ```javascript
  // next.config.js
  headers: async () => [{
    source: '/(.*)',
    headers: [
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" }
    ]
  }]
  ```
