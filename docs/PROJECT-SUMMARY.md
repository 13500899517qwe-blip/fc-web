# 丰成 B2B 独立站 — 项目沉淀总结

> 更新：2026-06-04 · 公司：**Changzhou Fengcheng Import And Export Co., Ltd.**（常州丰成进出口）  
> 阿里店：[fengchengcar.en.alibaba.com](http://fengchengcar.en.alibaba.com)

---

## 1. 项目定位（已定稿）

| 项 | 结论 |
|----|------|
| 业务 | B2B 外贸询盘站（不标价，询盘篮 + 邮件 + 后台） |
| 产品线 | **方案 A**：车身件 + 改装灯，与阿里店主类目一致 |
| 内容事实来源 | 阿里巴巴店（公司名、厂房、类目、信任数据） |
| 交互对标 | LTD 同行：分类/车型导航、搜索、RFQ、多语言子目录 |
| 当前数据 | **分类 + About/FAQ 已上线**；**产品列表留空**，等阿里 CSV 或后台录入 |

---

## 2. 生产环境

| 项 | 值 |
|----|-----|
| 生产域名 | https://web-silk-zeta-71.vercel.app |
| 语言入口 | `/en`、`/fr`、`/de`、`/es`、`/ru`、`/ja`、`/ar`、`/pt` |
| 后台 | `/admin` |
| GitHub | `13500899517qwe-blip/fc-web` |
| Vercel 项目 | `dongli-s-projects/web`，Root Directory = **`web`** |
| 数据库 | Vercel Storage → **Neon Postgres** |
| 图片 | **Vercel Blob**（Payload Media） |

---

## 3. 技术栈

- **Next.js 16** + **Payload CMS 3.85** + **PostgreSQL（Neon）**
- **next-intl**：8 语，`localePrefix: always`，`ar` RTL
- **询盘**：`localStorage` 询盘篮 → `POST /api/inquiry` → DB + 可选 Resend
- **Spam**：Cloudflare Turnstile（未配 Key 时跳过校验）

---

## 4. 已实现功能（截至当前）

- [x] 丰成品牌与公司信息（`web/src/lib/company.ts`）
- [x] 顶栏、Mega Menu（品类 + 车企）、全站搜索
- [x] 产品列表 / 分类页 / 详情页骨架（无图占位 + Blob 有图即显示）
- [x] 询盘篮、联系表单、WhatsApp
- [x] 首页信任条、分类入口、空目录说明
- [x] Vercel Blob 生产图存储
- [x] 线上分类 seed：`GET /api/seed-catalog`（需 `SEED_CATALOG_ENABLED` + `PAYLOAD_SECRET`）

---

## 5. 目录与数据流

```
FC web/
├── START-HERE.md          ← 日常唯一入口
├── docs/                  ← 架构、部署、seed、转正
├── 网站资料/              ← 运营维护 CSV/文案（导入源）
├── web/                   ← Vercel 部署根目录
│   ├── seed-data/         ← 部署用分类/FAQ（与 网站资料 同步）
│   ├── src/               ← 前台 + Payload
│   └── scripts/seed.ts    ← 本地 seed（需 Neon 连接串）
```

| 数据 | 来源 | 导入方式 |
|------|------|----------|
| 分类树 | `seed-data/分类树.txt` | 浏览器 `/api/seed-catalog?reset=1&key=…` 或本地 `pnpm seed:reset` |
| About / FAQ | `seed-data/FAQ.txt` + `company.ts` | 同上 |
| 产品 | `网站资料/产品主数据.csv`（当前仅表头） | Admin 手工 或 `SEED_PRODUCTS=true pnpm seed` |
| 产品图 | Admin → Media | 自动存 Vercel Blob |

---

## 6. 阿里店要点（建站依据）

- **主类目**：Car Bumper、Body Kit、Hoods、Grille + 车身钣金件；**car modified lights** 独立大类
- **导航逻辑**：先车企（Toyota、Jeep…），再品类 — 站内已用「BY CATEGORY + BY VEHICLE」实现
- **信任**：约 23,575㎡、评分 4.8/5、交期 92.9%、响应 ≤4h — 已展示在首页
- **转化**：独立站 = 询盘篮 + 邮件/后台；阿里店作补充链接

---

## 7. 待办（按优先级）

| 优先级 | 事项 |
|--------|------|
| P0 | 关闭或删除 Vercel 环境变量 `SEED_CATALOG_ENABLED`（seed 完成后） |
| P0 | 修改 `/admin` 默认管理员密码 |
| P1 | 从阿里整理 SKU，填入 `网站资料/产品主数据.csv` 并导入 |
| P1 | 产品图上传 Media（或阿里图批量入库） |
| P2 | 配置 `RESEND_API_KEY` + `INQUIRY_TO_EMAIL` |
| P2 | Blog / SEO 文章、证书与工厂图、动态 sitemap 含产品 URL |
| P2 | 多语言机翻（`GOOGLE_TRANSLATE_API_KEY` / `DEEPL_API_KEY` + `pnpm translate:ui`） |

---

## 8. 文档索引

| 文档 | 用途 |
|------|------|
| [START-HERE.md](../START-HERE.md) | 日常入口、快速清单 |
| [SEED-数据库一步操作.md](./SEED-数据库一步操作.md) | 线上灌分类（浏览器） |
| [DEPLOY-TROUBLESHOOTING.md](./DEPLOY-TROUBLESHOOTING.md) | 401、Neon、seed 踩坑 |
| [web/docs/DEPLOY-VERCEL.md](../web/docs/DEPLOY-VERCEL.md) | 首次部署步骤 |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | 数据库 + 邮件双通道 |
| [PRACTICE-MODE.md](./PRACTICE-MODE.md) | 练手 vs 转正 |
| [PRODUCTION-CHECKLIST.md](./PRODUCTION-CHECKLIST.md) | 正式上线检查 |
| [I18N-DECISIONS.md](./I18N-DECISIONS.md) | 多语言技术约定 |

---

## 9. 常用命令

```powershell
cd "E:\FC web\web"
pnpm dev                    # 本地开发
pnpm build                  # 构建检查
pnpm seed:reset             # 本地灌分类（.env 需 Neon DATABASE_URI）
# 产品 CSV 就绪后：
$env:SEED_PRODUCTS="true"; pnpm seed
```

**线上灌分类**（无需本机数据库密码）：见 [SEED-数据库一步操作.md](./SEED-数据库一步操作.md)。
