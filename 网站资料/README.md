# 网站资料（运营导入源）

本目录供 **运营维护**，与部署包内 `web/seed-data/` 保持同步（改分类/FAQ 时两处一起改）。

| 文件 | 说明 |
|------|------|
| `分类树.txt` | 一～三级分类（BODY PARTS / LIGHTS & LIGHTING） |
| `产品主数据.csv` | 产品 SKU（**当前仅表头，等有阿里数据再填**） |
| `公司信息.txt` | 品牌与对外文案参考 |
| `FAQ.txt` | 常见问题 |

## 导入方式

| 内容 | 命令 / 操作 |
|------|-------------|
| 分类 + FAQ | 线上：[SEED-数据库一步操作.md](../docs/SEED-数据库一步操作.md)；本地：`cd web` → `pnpm seed:reset` |
| 产品 | Admin → Products；或填 CSV 后 `SEED_PRODUCTS=true pnpm seed` |
| 图片 | Admin → Media（生产环境存 Vercel Blob） |

详见 [docs/PROJECT-SUMMARY.md](../docs/PROJECT-SUMMARY.md)。
