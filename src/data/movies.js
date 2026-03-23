export const movies = [
  {
    id: 'dune-part-two',
    title: '沙丘 2',
    year: 2024,
    runtime: '166 分钟',
    genre: ['科幻', '冒险', '史诗'],
    director: '丹尼斯·维伦纽瓦',
    rating: 8.7,
    tag: '宏大史诗',
    colors: ['#6d4c41', '#cf9f6a'],
    summary:
      '保罗在沙丘深处与弗雷曼人并肩作战，在命运、信仰与复仇之间做出选择。',
    highlight:
      '视觉风格震撼，世界观完整，战斗场面与人物情绪都具备强烈沉浸感。',
    cast: ['提莫西·查拉梅', '赞达亚', '丽贝卡·弗格森'],
  },
  {
    id: 'spider-verse',
    title: '蜘蛛侠：纵横宇宙',
    year: 2023,
    runtime: '140 分钟',
    genre: ['动画', '超级英雄', '冒险'],
    director: '华金·多斯·桑托斯',
    rating: 8.9,
    tag: '动画必看',
    colors: ['#1a237e', '#ec407a'],
    summary:
      '迈尔斯再次穿梭多元宇宙，却发现自己必须在守护家人与拯救世界之间做出艰难抉择。',
    highlight:
      '多种动画风格交织，节奏极具张力，角色成长与情感冲突格外动人。',
    cast: ['沙梅克·摩尔', '海莉·斯坦菲尔德', '奥斯卡·伊萨克'],
  },
  {
    id: 'interstellar',
    title: '星际穿越',
    year: 2014,
    runtime: '169 分钟',
    genre: ['科幻', '剧情'],
    director: '克里斯托弗·诺兰',
    rating: 9.1,
    tag: '高分经典',
    colors: ['#0f2027', '#2c5364'],
    summary:
      '在地球环境濒临崩溃时，一支宇航队穿越虫洞，寻找人类新的生存希望。',
    highlight:
      '兼具硬核科幻与情感力量，音乐、摄影和主题表达都极具代表性。',
    cast: ['马修·麦康纳', '安妮·海瑟薇', '杰西卡·查斯坦'],
  },
  {
    id: 'la-la-land',
    title: '爱乐之城',
    year: 2016,
    runtime: '128 分钟',
    genre: ['爱情', '歌舞', '剧情'],
    director: '达米恩·查泽雷',
    rating: 8.3,
    tag: '浪漫佳作',
    colors: ['#6a11cb', '#2575fc'],
    summary:
      '一位钢琴家和一位演员在洛杉矶相遇，在梦想与爱情的交错中逐渐成长。',
    highlight:
      '色彩与配乐极具辨识度，轻盈浪漫中带着现实感的余韵。',
    cast: ['瑞恩·高斯林', '艾玛·斯通', '约翰·传奇'],
  },
  {
    id: 'parasite',
    title: '寄生虫',
    year: 2019,
    runtime: '132 分钟',
    genre: ['剧情', '惊悚', '黑色幽默'],
    director: '奉俊昊',
    rating: 8.8,
    tag: '口碑神作',
    colors: ['#28313b', '#485461'],
    summary:
      '贫富阶层的两户家庭因一场精心设计的“渗透”而产生错综复杂的碰撞。',
    highlight:
      '叙事层次精妙，主题尖锐有力，在娱乐性与批判性之间取得极佳平衡。',
    cast: ['宋康昊', '李善均', '赵汝贞'],
  },
  {
    id: 'the-batman',
    title: '新蝙蝠侠',
    year: 2022,
    runtime: '176 分钟',
    genre: ['犯罪', '动作', '悬疑'],
    director: '马特·里夫斯',
    rating: 8.1,
    tag: '暗黑侦探',
    colors: ['#111111', '#8e0e00'],
    summary:
      '初出茅庐的蝙蝠侠在哥谭追查连环谜案，逐步揭开城市深处的腐败秘密。',
    highlight:
      '氛围冷峻，侦探线索扎实，城市视觉与角色塑造都十分鲜明。',
    cast: ['罗伯特·帕丁森', '佐伊·克拉维兹', '保罗·达诺'],
  },
];

export function getMovieById(id) {
  return movies.find((movie) => movie.id === id);
}
