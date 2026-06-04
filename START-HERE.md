# 从这里开始（唯一入口）

> 其它 `.md` 多为补充说明；**日常只看本文件 + [网站资料/公司信息.txt](网站资料/公司信息.txt)** 即可。

## 项目是什么

B2B 汽配 LED **询盘展示站**（无价格、无购物车）：8 语言子目录 + 产品 CMS + 询盘篮 + **邮件 + 后台**双通道。  
练手与转正 **同一套代码**，转正只补配置，见 [docs/PRODUCTION-CHECKLIST.md](docs/PRODUCTION-CHECKLIST.md)。

## 目录结构（只需记住这些）

| 路径 | 用途 |
|------|------|
| **[web/](web/)** | 全部代码，`pnpm dev` / Vercel 根目录选 `web` |
| **[网站资料/](网站资料/)** | 你提供的产品 CSV、公司信息、FAQ |
| **docs/** | 架构、转正清单（需要时再打开） |
| **桌面 `汽配外贸站-项目文档/`** | 早期讨论与竞品调研（**归档**，不必常看） |

## 现在需要你提供什么（最少 4 项）

| # | 提供什么 | 放哪里 / 用途 |
|---|----------|----------------|
| 1 | **GitHub 账号 + 仓库** | 推 `E:\FC web` 后给 Vercel 导入 |
| 2 | **Neon 注册** | 免费 Postgres → 得到 `DATABASE_URI` |
| 3 | **Resend 注册**（免费） | API Key + 你的 **Gmail** 作 `INQUIRY_TO_EMAIL`，测邮件询盘 |
| 4 | **公司信息** | 编辑 [网站资料/公司信息.txt](网站资料/公司信息.txt)（品牌名、简介；电话/WhatsApp 可占位） |

可选（不挡进度）：

- 真实产品图 → 转正时接 Vercel Blob  
- 机翻 API、Turnstile、自有域名 → [docs/PRODUCTION-CHECKLIST.md](docs/PRODUCTION-CHECKLIST.md)  
- 更新 [网站资料/产品主数据.csv](网站资料/产品主数据.csv) 为你真实 SKU（现已有 10 条样本）

**暂不需要：** 企业邮箱、`.com` 域名、Cloudflare（Turnstile 可后配）。

## 下一步做什么（按顺序）

### 第一步：本地跑通（约 30 分钟）

```bash
cd E:\FC web\web
cp .env.example .env
```

在 `.env` 填写：

- `DATABASE_URI` = Neon 连接串  
- `PAYLOAD_SECRET` = 随便一长串字母数字  
- `RESEND_API_KEY` + `INQUIRY_TO_EMAIL` = 你的 Gmail  

```bash
pnpm install
pnpm seed
pnpm dev
```

验收：打开 http://localhost:3000/en/products → 加询盘篮 → 提交 → 邮箱收到 + http://localhost:3000/admin 有记录。

### 第二步：部署 Vercel（约 20 分钟）

1. 代码推 GitHub  
2. Vercel Import，**Root Directory = `web`**  
3. 环境变量与本地 `.env` 相同（`NEXT_PUBLIC_SERVER_URL` 先 deploy 后改成 `https://xxx.vercel.app` 再 Redeploy）  
4. 详细：[web/docs/DEPLOY-VERCEL.md](web/docs/DEPLOY-VERCEL.md)

### 第三步：继续开发（功能路线图）

| 优先级 | 内容 | 状态 |
|--------|------|------|
| P0 | 8 语、产品、询盘篮、邮件、后台 | 已有 |
| P1 | UI 对标同行、产品图（Vercel Blob） | 待做 |
| P2 | MeiliSearch 搜索、Blog、下载中心 | 待做 |
| P3 | 询盘附件、Turnstile 生产强制、自有域名 | 转正 |

你说 **「开始执行 P1」** 时，再按同行结构改首页/产品页即可。

## 文档地图（避免迷路）

| 何时看 | 文件 |
|--------|------|
| **始终** | 本文件 `START-HERE.md` |
| 不懂为何要数据库 | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| 部署报错 | [web/docs/DEPLOY-VERCEL.md](web/docs/DEPLOY-VERCEL.md) |
| 准备上线 | [docs/PRODUCTION-CHECKLIST.md](docs/PRODUCTION-CHECKLIST.md) |
| 验收打勾 | [web/ACCEPTANCE.md](web/ACCEPTANCE.md) |
| 技术细节（URL/机翻） | [docs/I18N-DECISIONS.md](docs/I18N-DECISIONS.md) |
| 练手原则 | [docs/PRACTICE-MODE.md](docs/PRACTICE-MODE.md) |
| 竞品/历史决策 | 桌面 `汽配外贸站-项目文档/` 03–06 |

## 已拍板的技术方向（不再讨论）

- Next.js + Payload + Neon + Resend  
- 8 语言子目录 `/en/` … `/pt/`，`ar` RTL  
- 不删功能，可随时转正  
- 部署入口：Vercel Hobby（+ Neon 免费库）

---

**你完成第一步后**，把 Neon 是否连通、本地询盘+邮件是否成功告诉我，我们再排 P1 UI 或 Blob 图片。
