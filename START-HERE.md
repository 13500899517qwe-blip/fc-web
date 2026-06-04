# 从这里开始（唯一入口）

## 部署已完成？

若你已在 Vercel 看到网站 → **跳到下方「部署成功后」**。  
若还没部署 → 看 [web/docs/DEPLOY-VERCEL.md](web/docs/DEPLOY-VERCEL.md)（Neon 在 **Vercel → Storage** 里建，不要去 neon.tech 单独建）。

---

## 部署成功后 — 你现在可以做什么

1. **逛站**：`/en`、`/en/products`、换语言 `/fr` …  
2. **后台**：`/admin`（默认 `admin@example.com` / `changeme123`，请尽快改密码）  
3. **试询盘**：加询盘篮 → 提交 → 在 Admin → **Inquiries** 查看  
4. **（可选）邮件**：在 Vercel 加 `RESEND_API_KEY` + `INQUIRY_TO_EMAIL` 后 Redeploy  

### 建议下一步（开发）

| 顺序 | 做什么 | 你怎么说 |
|------|--------|----------|
| 0 | **定产品范围**（阿里店 = 车身件+灯，见 [GOOGLE-SITE-DIRECTION.md](docs/GOOGLE-SITE-DIRECTION.md)） | 回复 A / B / C |
| 1 | 改首页/产品页 UI（对标同行） | 「开始 P1 UI」 |
| 2 | 产品图（Vercel Blob） | 「加产品图存储」 |
| 3 | 搜索 / Blog | 「做 P2」 |

踩坑记录：[docs/DEPLOY-TROUBLESHOOTING.md](docs/DEPLOY-TROUBLESHOOTING.md)

---

## 项目是什么

B2B 汽配询盘站（**常州丰成** — 车身件 + 改装灯，与 [阿里店](http://fengchengcar.en.alibaba.com) 一致）：8 语言子目录 + CMS + 询盘篮 + 邮件/后台。代码在 [web/](web/)。

**更新线上数据**（替换旧占位产品）：

```bash
cd web
# .env 里 DATABASE_URI 与 Vercel 相同
pnpm seed:reset
```

## 目录

| 路径 | 用途 |
|------|------|
| **web/** | 代码，Vercel Root = `web` |
| **网站资料/** | 产品 CSV、公司信息 |
| **docs/** | 架构、转正、踩坑 |

## 首次部署清单（未完成时）

1. GitHub 已有仓库  
2. Vercel Import，Root Directory = **`web`**  
3. **Storage → Neon Postgres**（自动有 `DATABASE_URI`）  
4. 加 `PAYLOAD_SECRET`、`NEXT_PUBLIC_SERVER_URL` → Redeploy  
5. 本地：`cd web` → `.env` 同 Vercel → `pnpm seed:reset`（只灌**分类+公司文案**，产品 CSV 空着等阿里数据）
6. 有阿里 CSV 后：`SEED_PRODUCTS=true pnpm seed` 或在 Admin 里手工录入  
7. 若 401：关 Deployment Protection（见踩坑文档）

## 文档

| 文件 | 用途 |
|------|------|
| [DEPLOY-VERCEL.md](web/docs/DEPLOY-VERCEL.md) | 部署步骤 |
| [DEPLOY-TROUBLESHOOTING.md](docs/DEPLOY-TROUBLESHOOTING.md) | 401 / Neon / seed |
| [PRODUCTION-CHECKLIST.md](docs/PRODUCTION-CHECKLIST.md) | 正式上线 |
