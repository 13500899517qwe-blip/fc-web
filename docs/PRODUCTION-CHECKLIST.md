# 转正清单（在练手验收通过之后）

与 [PRACTICE-MODE.md](./PRACTICE-MODE.md) 使用**同一套代码**，按顺序勾选。

## 1. 域名与 URL

- [ ] 注册品牌 `.com`，DNS 指向 Vercel  
- [ ] Vercel 项目添加 Domain  
- [ ] `NEXT_PUBLIC_SERVER_URL` = `https://www.你的域名.com`  
- [ ] Redeploy

## 2. 数据库（通常已满足）

- [ ] Neon 项目保留（或升级计划）  
- [ ] `DATABASE_URI` 生产环境变量正确  
- [ ] 定期备份 / 导出重要询盘

## 3. 邮件询盘（核心转正项）

- [ ] [Resend](https://resend.com) 账号 + API Key → `RESEND_API_KEY`  
- [ ] `INQUIRY_TO_EMAIL` = 接收询盘的邮箱（可先 Gmail，后改 sales@域名）  
- [ ] `INQUIRY_FROM_EMAIL` = 已验证发件域（转正建议用 `@你的域名`）  
- [ ] 提交测试询盘 → **收件箱收到** + Admin Inquiries 仍有记录

## 4. 安全

- [ ] `PAYLOAD_SECRET` 强随机（生产独立值）  
- [ ] Admin 账号强密码，删除默认 `changeme123`  
- [ ] Cloudflare Turnstile → `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`  
- [ ] （可选）Vercel Deployment Protection

## 5. 内容与媒体

- [ ] 产品图：接入 **Vercel Blob** 或 CDN（替代仅本地 `media/`）  
- [ ] `GOOGLE_TRANSLATE_API_KEY` 或人工译文替换机翻  
- [ ] 更新 `网站资料/` 真实 SKU、公司信息、WhatsApp

## 6. 后续 Phase（不挡转正）

- [ ] MeiliSearch 搜索  
- [ ] Blog / 下载中心 / 证书墙  
- [ ] 询盘附件上传  

## 7. 上线后 smoke test

- [ ] `/en` → 产品 → 询盘篮 → 提交  
- [ ] 邮件 + 后台双收到  
- [ ] `/fr`、`/ar`（RTL）正常  
- [ ] Google Search Console 提交 sitemap
