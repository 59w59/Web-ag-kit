# Web Defense Simulation Scenarios

Detailed breakdown of how diagnostic probes evaluate defensive posture without risking denial-of-service or data corruption.

---

## 1. CORS Reflection Probe
- **Attack Vector**: Cross-Origin resource theft using authenticated cookies.
- **Probe**: `Origin: https://evil-target.com` sent via preflight `OPTIONS`.
- **Expected Defense**: Server either omits `Access-Control-Allow-Origin` or returns specific allowed domain (e.g. `https://my-app.com`). Never `*` with credentials.

## 2. Unauthenticated Bot Form Submission
- **Attack Vector**: Automated credential-stuffing bot trying thousands of passwords.
- **Probe**: POST to login endpoint without Turnstile response token.
- **Expected Defense**: HTTP 400 Bad Request or HTTP 403 Forbidden with `{ "error": "Bot verification failed" }`.

## 3. Clickjacking Embedding
- **Attack Vector**: Framing the target inside an invisible iframe on a malicious website.
- **Probe**: Inspecting response headers for `X-Frame-Options: DENY` or `frame-ancestors 'none'`.
- **Expected Defense**: Browser blocks iframe embedding completely.
