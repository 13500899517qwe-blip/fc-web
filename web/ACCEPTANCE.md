# Acceptance checklist

Full features retained; credentials can be added progressively.

## Local

```bash
pnpm dev
pnpm exec tsx scripts/verify-locales.ts
```

- [ ] `/en/products` — no price, no cart  
- [ ] Inquiry basket → submit → `/admin` → **Inquiries**  
- [ ] With `RESEND_API_KEY` + `INQUIRY_TO_EMAIL` → **email received** (`emailSent: true` in API response)  
- [ ] `/ar` RTL; non-English footer notice  

## Deployed (Vercel + Neon)

See [docs/DEPLOY-VERCEL.md](docs/DEPLOY-VERCEL.md).

**Practice minimum**

- [ ] `/en/products` has seeded data  
- [ ] Inquiry visible in production Admin  

**Recommended before 转正** ([../docs/PRODUCTION-CHECKLIST.md](../docs/PRODUCTION-CHECKLIST.md))

- [ ] Inquiry email received on `INQUIRY_TO_EMAIL`  
- [ ] Turnstile enabled in production  
- [ ] Custom domain + `NEXT_PUBLIC_SERVER_URL` updated  

```bash
NEXT_PUBLIC_SERVER_URL=https://<project>.vercel.app pnpm exec tsx scripts/verify-locales.ts
```
