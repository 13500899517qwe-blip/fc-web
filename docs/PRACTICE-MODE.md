# 练手 vs 转正 — 项目定位（2026-06-04 修订）

## 原则

- **练手**：学习开发、部署、配置真实服务，**不删减产品功能**。
- **转正**：同一套代码与架构，补上域名、邮箱、API Key 即可上线，**不必推倒重做**。
- **暂缓的是「凭证」**（Resend Key、Turnstile、机翻 API），**不是「能力」**（询盘邮件、后台、多语言、询盘篮）。

## 访客完整路径（为何需要数据库 + 邮件）

```text
浏览产品（从 Postgres 读 CMS 数据）
  → 加入询盘篮
  → 提交表单
  → ① 写入 inquiries 表（永久留存，后台可查）
  → ② Resend 发邮件到销售邮箱（即时通知，你理解的「邮箱询盘」）
  → ③ Turnstile 防垃圾（上线后建议开启）
```

| 环节 | 作用 | 练手能否先不配 Key |
|------|------|-------------------|
| **Neon / Postgres** | 产品、分类、询盘、Admin 用户 | **不能省** — 没库站无法按设计运行 |
| **Resend 邮件** | 提交后发到你的邮箱 | 可先不配；**后台仍能看到询盘** |
| **Turnstile** | 防刷表单 | 可先不配（无 Secret 时跳过校验） |
| **机翻 API** | 多语言产品文案 | 可先不配（复制英文） |
| **Vercel Blob** | 产品图持久化 | 可先文字产品；转正时再接 |

## 部署架构（练手与转正相同）

| 组件 | 服务 | 练手 | 转正 |
|------|------|------|------|
| 托管 | Vercel | `*.vercel.app` | 绑定自有 `.com` |
| 数据库 | Neon Postgres | 免费档 | 可升级额度 |
| 询盘邮件 | Resend | 个人 Gmail 即可收信 | `sales@域名` + 域名验证 |
| 防垃圾 | Cloudflare Turnstile | 免费注册 | 同左 |
| 媒体 | 本地 `media/` | 仅本地/dev 可靠 | **Vercel Blob**（转正建议） |

## 练手最低验收（功能不砍）

1. Vercel 站点 `/en` 可访问  
2. Neon + `pnpm seed` → `/en/products` 有数据  
3. 询盘提交 → `/admin` → **Inquiries** 有记录  
4. 全站无价格  

## 转正追加验收（补配置即可）

5. 配置 `RESEND_API_KEY` + `INQUIRY_TO_EMAIL` → 提交询盘 **收到邮件**  
6. 配置 Turnstile → 无 Key 无法绕过（生产环境）  
7. `NEXT_PUBLIC_SERVER_URL` 改为正式域名  
8. （建议）Vercel Blob + 产品主图  
9. （建议）Google 机翻或人工译文  

详见 [PRODUCTION-CHECKLIST.md](./PRODUCTION-CHECKLIST.md)。

## 相关文档

- [ARCHITECTURE.md](./ARCHITECTURE.md) — 数据流说明  
- [web/docs/DEPLOY-VERCEL.md](../web/docs/DEPLOY-VERCEL.md) — 部署步骤  
- [web/ACCEPTANCE.md](../web/ACCEPTANCE.md) — 验收项
