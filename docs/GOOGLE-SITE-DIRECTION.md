# Google 独立站方向（基于阿里巴巴店 + 6 家同行）

> 数据来源：[fengchengcar.en.alibaba.com](http://fengchengcar.en.alibaba.com)（2026-06-04 Firecrawl）  
> 结构参考：jg-ledlight、carlight-led、autoandmotor 等 LTD 同行

---

## 一、你们阿里巴巴店「真实定位」

| 维度 | 事实（阿里店） |
|------|----------------|
| 公司 | **Changzhou Fengcheng Import And Export Co., Ltd.**（常州丰成进出口） |
| 类型 | Custom Manufacturer，江苏，SGS，约 **23,575㎡** 厂房 |
| 阿里主类目 | **Car Bumper、Car Body Kit、Car Hoods、Car Grille**（车身件为主） |
| 导航逻辑 | **先按车企**（Toyota / Jeep / Hyundai / Mercedes…），再按车型细分 |
| 灯光线 | 独立大类 **car modified lights**（含 headlight、tail light，下挂 Honda/BMW/Jeep 等） |
| 首页主推 | 翼子板、车门、尾门等 **钣金车身件**（非仅 LED） |
| 转化 | Contact supplier / Chat；多语言子路径（de/es/fr/ru/ar/ja/ko…） |

**结论：** 阿里店是「**按车型适配的改装车身件 + 改装灯**」综合供应商，**不等于** 文档里原先写的「只做全品类 LED 车灯 + 支架」。

若 Google 独立站只做成纯 LED 站，会和阿里店主类目 **不一致**，买家从 Google 进来会有预期落差。

---

## 二、和原「LED 独立站」规划的差异

| 原规划（竞品 LED 站） | 丰成阿里店实际 |
|----------------------|----------------|
| 品类树：LED 大灯 / 雾灯 / 支架 | 品类树：**保险杠、包围、机盖、中网** + 灯光子类 |
| 参考 jg-ledlight、carlight-led | 更接近 **车型件目录商** + 灯光配件 |
| 样本 seed：10 个 LED SKU | 应逐步换成 **真实阿里热销 SKU**（车身 + 灯） |

**需要你拍板的一条（最重要）：**

- **方案 A — 与阿里一致（推荐）**  
  Google 站 = **丰成全产品线**：车身件为主导航 + 灯光为一大分支。  
  SEO 覆盖「Toyota Camry fender」「Jeep JL headlight」等长尾。

- **方案 B — 聚焦灯光**  
  Google 站只做 **car modified lights**，车身件仅放阿里链接或「更多产品在 Alibaba」。  
  适合：灯光毛利高、想和对标 LED 同行直接比。

- **方案 C — 双品牌站**  
  同一公司，两个入口：`/body-parts` 与 `/lights`（仍是一个域、一套 CMS）。

未拍板前，**不要** 继续用纯 LED 样本分类灌满整站。

---

## 三、Google 独立站应对齐什么（内容 = 阿里，形式 = 同行）

### 内容侧：以阿里为「单一事实来源」

- 公司名、工厂面积、定制能力、QC、响应速度 → **About / 首页信任条** 与阿里文案一致  
- 产品：优先同步阿里 **按车型分组** 的结构（不必一次上千 SKU，先 Top 50–100）  
- MOQ、样品、定制 → FAQ 与阿里店铺政策对齐  

### 形式侧：以 LTD 同行为准（更专业）

| 能力 | 阿里店 | Google 独立站（同行标准） |
|------|--------|---------------------------|
| 价格 | 列表可见 | **不标价**，Quote / Inquiry |
| 转化 | Chat、Contact | **询盘篮 + 表单 + 邮件**（已实现） |
| 导航 | 平台左侧树 | **Mega Menu：车企 + 品类** |
| 速度/SEO | 平台 URL | 语义 slug、`hreflang`、Blog（Phase 2） |
| 信任 | SGS、评分、厂房 | 证书墙、工厂图、数字条（4.8 / 92.9% OTD） |

```text
推荐信息架构（方案 A）

Home
├── Products
│   ├── By Vehicle          ← 阿里主逻辑（Toyota → Camry → …）
│   └── By Category         ← 同行逻辑
│         ├── Body Parts    (Bumper / Body Kit / Hood / Grille / Fender …)
│         └── Lights        (Headlight / Tail Light / Fog …)
├── About                   ← 23,575㎡、Custom Manufacturer、QC
├── FAQ                     ← MOQ、样品、OEM（与阿里一致）
├── Contact / Inquiry
└── News & Blog (Phase 2)   ← 学 weiyaoled，做 Google 自然流量
```

### 多语言

- 阿里已开：de、es、fr、pt、it、ru、ja、ko、ar、vi、tr…  
- 你们独立站 **8 语子目录**（en/fr/de/es/ru/ja/ar/pt）与阿里主力市场 **高度重合**，方向正确。  
- 英文为源，产品描述从 **阿里英文标题** 抽取，再机翻/人工校对。

---

## 四、和 6 家同行的分工参考（改版后）

| 同行 | 丰成 Google 站可借鉴 |
|------|---------------------|
| **carlight-led / jg-ledlight** | 灯光子站下的分类深度、规格表 |
| **autoandmotor** | 支架/安装件按品牌拆（若保留 LED 支架线） |
| **weibo4x4** | 车企 + 品类双导航、目录下载 |
| **weiyaoled** | **Blog / 技术文章**（Google 引流，阿里店几乎没有） |
| **jiashengauto** | 单品类深耕叙事（若选方案 B 灯光专注） |

**Google 站相对阿里的差异化（值得做）：**

1. 更快、更干净的页面（Core Web Vitals）  
2. 无平台比价干扰，强化 **工厂直供 / 定制** 故事  
3. 内容 SEO（车型 + 部件英文长尾）  
4. 询盘进自有 CRM（邮件 + 后台），不依赖阿里站内信  

---

## 五、对当前代码库的具体调整建议（P1 起）

1. **改分类树**  
   - 一级：`Body Parts` | `Lights & Lighting`  
   - 二级：Body → Bumper / Body Kit / Hood / Grille / Fender…  
   - 二级：Lights → Headlight / Tail Light / Fog…  
   - 交叉：**Vehicle Brand** 标签（Toyota、Jeep…）用于筛选  

2. **改品牌与文案**  
   - 默认品牌从占位「LumaDrive」改为 **Fengcheng / 丰成**（与阿里一致）  

3. **产品数据**  
   - 用 Firecrawl 已抓的竞品 + **阿里产品英文标题** 做 seed（Claude Code 已做过 15 条，可并入 CMS）  

4. **首页模块（同行模板）**  
   - Banner：Custom auto body parts & modified lights  
   - 信任条：23,575㎡ · SGS · ≤4h response · Custom/OEM  
   - 热销：阿里首页同款车身件 + 2–4 款灯光  
   - OEM/定制 CTA → 询盘篮  

5. **暂不做的（不影响方向）**  
   - 阿里在线交易、价格展示、Trade Assurance 徽章链接即可，不必复制  

---

## 六、请你确认 1 个问题（决定整站 IA）

**Google 独立站产品范围选哪一个？**

- **A** 与阿里一致：车身件 + 灯光（推荐，长期一致）  
- **B** 只做灯光，车身引导去阿里  
- **C** 双入口同域（/body-parts 与 /lights）  

确认后，可更新 `网站资料/分类树.txt` 与 Payload 分类，并启动 P1 UI。

---

## 附录：阿里店抓取摘要

完整导航抓取见 [alibaba-fengchengcar.md](./alibaba-fengchengcar.md)
