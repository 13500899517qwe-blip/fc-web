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

## 线上灌分类（推荐）

Neon 连接串**不会**完整下发到本机 `vercel env pull`，请用浏览器：

- 设 `SEED_CATALOG_ENABLED=true` → Redeploy  
- 访问 `/api/seed-catalog?reset=1&key=你的PAYLOAD_SECRET`  
- 成功应见 `"categoriesUpserted": 11`、`"treeFileFound": true`  
- 完成后**删除** `SEED_CATALOG_ENABLED` 再 Redeploy  

详见 [SEED-数据库一步操作.md](./SEED-数据库一步操作.md)。

## 本机 seed（可选）

需自己在 Vercel Storage / Neon 复制 `DATABASE_URI` 到 `web/.env`。Vercel 构建**不要**跑 seed。
