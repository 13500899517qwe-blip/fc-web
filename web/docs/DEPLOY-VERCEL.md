# 部署：Vercel + Neon（练手与转正同一套）

功能**不删减**；练手可先不配部分 API Key，转正按 [../../docs/PRODUCTION-CHECKLIST.md](../../docs/PRODUCTION-CHECKLIST.md) 补全即可。

架构说明：[../../docs/ARCHITECTURE.md](../../docs/ARCHITECTURE.md)

## 1. Neon（Postgres — 必需）

1. [https://neon.tech](https://neon.tech) 新建 Project  
2. 复制 Connection string（`?sslmode=require`）→ 用作 `DATABASE_URI`

## 2. Vercel

1. Import Git 仓库，**Root Directory = `web`**  
2. 环境变量：

| 变量 | 练手 | 转正 |
|------|------|------|
| `DATABASE_URI` | 必填 | 必填 |
| `PAYLOAD_SECRET` | 必填 | 强随机 |
| `NEXT_PUBLIC_SERVER_URL` | `https://项目.vercel.app` | 正式域名 |
| `RESEND_API_KEY` | 建议填（免费发 Gmail） | 必填 |
| `INQUIRY_TO_EMAIL` | 你的 Gmail | sales@域名 |
| `INQUIRY_FROM_EMAIL` | `onboarding@resend.dev` | 已验证域名 |
| Turnstile / 机翻 | 可选 | 建议开启 |

部署后更新 `NEXT_PUBLIC_SERVER_URL` 并 Redeploy。

## 3. 本地 seed（必需，勿在 Vercel 构建时跑）

```bash
cd web
cp .env.example .env
pnpm install
pnpm seed
```

## 4. 验收

**练手最低：** 产品列表 + 询盘进 `/admin` → Inquiries  

**建议同时测邮件：** 配置 Resend 后提交询盘 → 收件箱收到（与后台记录并存）

```bash
NEXT_PUBLIC_SERVER_URL=https://<project>.vercel.app pnpm exec tsx scripts/verify-locales.ts
```

## 5. 常见问题

| 现象 | 处理 |
|------|------|
| 无邮件但有后台记录 | 补 `RESEND_API_KEY` + `INQUIRY_TO_EMAIL` |
| 产品为空 | `pnpm seed` + 检查 `DATABASE_URI` |
| 图片上传后消失 | 转正接 Vercel Blob，见 PRODUCTION-CHECKLIST |

Vercel **Storage → Neon** 可自动注入 `DATABASE_URI`。
