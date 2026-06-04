# 数据库 Seed 一步操作（给非技术同事）

线上数据库在 **Vercel + Neon**，本机通常**拿不到**连接密码，所以推荐用 **浏览器点一次** 完成分类导入。

---

## 方法 A：浏览器一键（推荐）

### 1. 打开 Vercel 环境变量

1. 浏览器打开：https://vercel.com/dongli-s-projects/web/settings/environment-variables  
2. 点 **Add New**  
3. Name：`SEED_CATALOG_ENABLED`  
4. Value：`true`  
5. Environment 只勾选 **Production** → Save  

### 2. 重新部署

1. 打开：https://vercel.com/dongli-s-projects/web/deployments  
2. 最新一条 Deployment 右侧 **⋯** → **Redeploy**  

等 2～3 分钟变成 Ready。

### 3. 复制你的 PAYLOAD_SECRET

仍在 Environment Variables 页面，找到 **PAYLOAD_SECRET** → 点眼睛图标复制（不要发给别人）。

### 4. 浏览器执行 Seed（清空旧数据 + 灌分类）

把下面地址里的 `粘贴你的密钥` 换成刚复制的 PAYLOAD_SECRET，整段复制到浏览器地址栏打开：

```
https://web-kf1tutl5w-dongli-s-projects.vercel.app/api/seed-catalog?reset=1&key=粘贴你的密钥
```

成功会看到 JSON，例如：`"ok": true`，`"categoriesUpserted": 11` 等。

### 5. 关掉开关（安全）

回到 Vercel 环境变量：

- 删除 `SEED_CATALOG_ENABLED`，或改成 `false`  
- 再 **Redeploy** 一次  

### 6. 检查网站

- https://web-kf1tutl5w-dongli-s-projects.vercel.app/en/products  
- 左侧应有 **BODY PARTS**、**LIGHTS & LIGHTING** 分类  
- 产品列表可为空（正常，等阿里 CSV）  

---

## 方法 B：本机命令行（仅当你有 Neon 连接串）

1. Vercel → **Storage** → 你的 Neon → **.env.local** 或 **Connection string**  
2. 复制 `DATABASE_URI` 或 `POSTGRES_URL`（以 `postgresql://` 开头）  
3. 在 `E:\FC web\web` 新建 `.env` 文件，写入：

```env
DATABASE_URI=这里粘贴连接串
PAYLOAD_SECRET=与 Vercel 里相同
```

4. PowerShell：

```powershell
cd "E:\FC web\web"
pnpm seed:reset
```

---

## 常见问题

| 现象 | 原因 |
|------|------|
| `Invalid key` | URL 里的 key 与 PAYLOAD_SECRET 不一致 |
| `SEED_CATALOG_ENABLED is not true` | 未设变量或未 Redeploy |
| 本机 seed 连 localhost:5432 | `.env` 里没有 Neon 连接串 |
| `vercel env pull` 数据库为空 | Neon 集成变量不会下到本地，属正常 |
