# 从这里开始（唯一入口）

## 当前状态（2026-06-04）

- **已上线**：https://web-silk-zeta-71.vercel.app  
- **已完成**：丰成品牌、B2B 目录 UI（Mega Menu / 搜索 / 分类 / 询盘篮）、Vercel Blob 图片、**11 个产品分类**（产品列表仍为空，等阿里数据）  
- **沉淀总结**：[docs/PROJECT-SUMMARY.md](docs/PROJECT-SUMMARY.md)

---

## 你现在可以做什么

1. **逛站**：`/en`、`/en/products`、分类与车型筛选  
2. **后台**：`/admin`（请尽快改默认密码）  
3. **试询盘**：加询盘篮 → 提交 → Admin → **Inquiries**  
4. **加产品**：Admin → Products + Media，或填 CSV 后 `SEED_PRODUCTS=true pnpm seed`  

---

## 常用操作

| 要做的事 | 看哪里 |
|----------|--------|
| 灌/重置线上分类 | [docs/SEED-数据库一步操作.md](docs/SEED-数据库一步操作.md) |
| 部署 / 401 / Neon | [docs/DEPLOY-TROUBLESHOOTING.md](docs/DEPLOY-TROUBLESHOOTING.md) |
| 首次部署 | [web/docs/DEPLOY-VERCEL.md](web/docs/DEPLOY-VERCEL.md) |
| 架构与邮件 | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| 正式上线 | [docs/PRODUCTION-CHECKLIST.md](docs/PRODUCTION-CHECKLIST.md) |
| 全貌与待办 | [docs/PROJECT-SUMMARY.md](docs/PROJECT-SUMMARY.md) |

---

## 目录

| 路径 | 用途 |
|------|------|
| **web/** | 代码（Vercel Root = `web`） |
| **网站资料/** | 运营 CSV、公司文案（导入源） |
| **web/seed-data/** | 部署用分类/FAQ（与资料目录保持同步） |
| **docs/** | 技术文档 |

---

## 首次部署（未完成时）

1. GitHub → Vercel Import，Root Directory = **`web`**  
2. **Storage → Neon Postgres**  
3. 环境变量：`PAYLOAD_SECRET`、`NEXT_PUBLIC_SERVER_URL`、`BLOB_READ_WRITE_TOKEN`  
4. Redeploy → 按 [SEED-数据库一步操作.md](docs/SEED-数据库一步操作.md) 灌分类  
5. 关闭 `SEED_CATALOG_ENABLED` 后再次 Redeploy  
