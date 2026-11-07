# OWASP API Security Top 10:2023 Checklist

> Concrete vulnerable patterns, secure remediations, and code snippets for modern Web APIs (Next.js, Express, Fastify, Prisma/Drizzle).

---

## API1:2023 -- Broken Object Level Authorization (BOLA / IDOR)

### Vulnerable Pattern (Next.js App Router):
```typescript
// ❌ VULNERABLE: Any logged-in user can view any invoice by modifying the ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) return new Response('Unauthorized', { status: 401 });

  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id } // Missing user ownership check!
  });
  return Response.json(invoice);
}
```

### Secure Pattern:
```typescript
// ✅ SECURE: Scope query strictly to the authenticated user's organization or ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user) return new Response('Unauthorized', { status: 401 });

  const invoice = await prisma.invoice.findFirst({
    where: { 
      id: params.id,
      userId: session.user.id // Enforced at database level
    }
  });
  if (!invoice) return new Response('Not Found', { status: 404 });
  return Response.json(invoice);
}
```

---

## API3:2023 -- Broken Object Property Level Authorization (Mass Assignment)

### Vulnerable Pattern:
```typescript
// ❌ VULNERABLE: Direct body spreading allows clients to inject `isAdmin: true` or `role: "admin"`
export async function PATCH(request: Request) {
  const session = await auth();
  const body = await request.json();

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: { ...body } // Mass assignment danger!
  });
  return Response.json(updatedUser);
}
```

### Secure Pattern:
```typescript
// ✅ SECURE: Strict schema whitelisting with Zod
import { z } from 'zod';

const UpdateProfileSchema = z.object({
  name: z.string().min(2).max(50),
  bio: z.string().max(250).optional(),
}).strict(); // Rejects unknown properties

export async function PATCH(request: Request) {
  const session = await auth();
  const rawBody = await request.json();
  const validated = UpdateProfileSchema.parse(rawBody);

  const updatedUser = await prisma.user.update({
    where: { id: session.user.id },
    data: validated
  });
  return Response.json(updatedUser);
}
```

---

## API4:2023 -- Unrestricted Resource Consumption (Rate Limiting & Pagination)

### Checklist:
- [ ] Endpoints returning lists must enforce a maximum `take`/`limit` (e.g. `Math.min(limit, 50)`).
- [ ] Rate limits configured at the Edge (Cloudflare WAF / Upstash Redis / Express rate-limit).
- [ ] Large payload limits enforced (`bodyParser.json({ limit: '1mb' })`).

---

## API7:2023 -- Server-Side Request Forgery (SSRF)

### Checklist:
- [ ] URL parameters for webhooks, link unfurling, or proxying must be validated against a whitelist of allowed domains.
- [ ] Internal/private IP addresses (`127.0.0.1`, `10.0.0.0/8`, `192.168.0.0/16`, `169.254.169.254`) must be blocked before fetching.
- [ ] Do not follow redirects automatically to prevent redirecting to internal metadata services.
