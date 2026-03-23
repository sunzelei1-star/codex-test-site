# codex-test-site

一个无需额外依赖即可直接运行的简洁电影网站示例，包含：

- 首页电影列表
- 实时搜索
- 电影详情页
- 现代深色视觉风格

## 本地启动

```bash
npm run dev
```

或直接使用：

```bash
python3 -m http.server 4173
```

然后访问 `http://localhost:4173`。

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
