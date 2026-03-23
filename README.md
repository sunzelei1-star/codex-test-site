# codex-test-site

一个更像真实产品页的静态电影网站示例，包含：

- 顶部导航栏与沉浸式首页 Hero 区
- 高清电影封面与专题推荐模块
- 实时搜索、分类筛选、排序功能
- 更完整的电影详情页排版

## 本地启动

```bash
npm run dev
```

然后访问：

```text
http://localhost:4173
```

## 可用功能

- 首页浏览精选电影与专题推荐
- 按关键词搜索片名、导演、国家和标签
- 按类型筛选
- 按评分、年份、片名字母排序
- 打开详情页查看剧情简介、推荐理由与主演阵容

## 项目结构

```text
.
├── index.html
├── movie.html
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── data/
    │   └── movies.js
    ├── detail.js
    ├── main.js
    ├── styles/
    │   └── main.css
    └── utils/
        └── helpers.js
```
