# 部署踩坑记录（2026-06-04）

来自实际部署反馈，与 [START-HERE.md](../START-HERE.md) 配合使用。

## Neon：必须用 Vercel Storage

- 通过 Vercel 集成的 Neon **不能**用 `neonctl projects create`（会报 org managed by Vercel）。
- **正确做法**：Vercel 项目 → **Storage** → **Neon Postgres** → Create。

## 网站打开是 401

- 原因：项目开了 **Deployment Protection / SSO**。
- 处理：Vercel 项目 → Settings → Deployment Protection → 关闭对 Preview 的保护，或允许公开访问 `.vercel.app`。

## `pnpm seed` 报错

| 报错 | 处理 |
|------|------|
| `loadEnvConfig` undefined | 已加 `@next/env`；用 `tsx scripts/seed.ts`（勿用 `payload` CLI 跑 seed） |
| `Parent` invalid | 分类 parent 须为 **number**（已在 seed 脚本修复） |
| Pulling schema 很慢 | Neon 冷启动，等 1–2 分钟再重试 |

## Seed 只在本机跑

Vercel 构建**不要**跑 seed；本地 `.env` 的 `DATABASE_URI` 与 Vercel **相同**即可。
