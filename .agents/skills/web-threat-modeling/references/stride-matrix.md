# STRIDE Web Threat Matrix & Assessment Questionnaire

Use this questionnaire to guide architectural threat discussions during sprint planning or security reviews.

---

## 1. Spoofing Questions
- How is the client authenticated on each request?
- Can an attacker forge or tamper with the session token / JWT?
- Are webhooks authenticated with HMAC signature verification (e.g., `stripe-signature`)?
- Is MFA enforced for administrative users?

## 2. Tampering Questions
- Can a client modify request payload properties to elevate their privileges (Mass Assignment)?
- Are database updates guarded by parameterized queries or an ORM?
- Are client-side state variables (e.g. cart total, discount codes) trusted on the server? (Never trust client-calculated prices!)

## 3. Repudiation Questions
- Are state-changing operations (user deletions, password updates, payments) logged with timestamp, user ID, and IP?
- Can logs be altered or deleted by application-level roles?

## 4. Information Disclosure Questions
- Do error responses return database error codes or stack traces?
- Are sensitive keys (`STRIPE_SECRET_KEY`, `DATABASE_URL`) accessible to client-side bundles?
- Is TLS 1.3 enforced with HSTS (`Strict-Transport-Security`)?

## 5. Denial of Service Questions
- Are regex expressions tested against ReDoS (Catastrophic Backtracking)?
- Is there a rate-limiting policy on login, password reset, and resource-heavy search routes?
- Can an unauthenticated user trigger expensive database joins or large file uploads?

## 6. Elevation of Privilege Questions
- Does every route verify authorization, not just authentication?
- Can a standard user access `/admin` or `/api/admin/*` by guessing the URL?
- Are IDOR checks enforced on all resource retrievals (`where: { id, userId }`)?
