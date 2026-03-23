import { getMovieById } from './data/movies.js';
import { createStars, formatRating } from './utils/helpers.js';

const detailPage = document.querySelector('#detail-page');
const movieId = new URLSearchParams(window.location.search).get('id');
const movie = getMovieById(movieId);

function renderNotFound() {
  detailPage.innerHTML = `
    <section class="detail-empty panel">
      <a class="button button--ghost" href="./index.html">← 返回首页</a>
      <h1>没有找到这部电影</h1>
      <p>你访问的影片可能不存在，或者链接参数已经失效。可以返回首页继续浏览精选片单。</p>
    </section>
  `;
}

function renderDetail(movieItem) {
  document.title = `${movieItem.title} | 幕光电影`;

  detailPage.innerHTML = `
    <section class="detail-hero panel">
      <div class="detail-hero__backdrop" style="background-image:linear-gradient(90deg, rgba(8,11,20,0.92), rgba(8,11,20,0.45)), url(${movieItem.backdropImage})"></div>
      <div class="detail-hero__content">
        <a class="button button--ghost" href="./index.html#movie-grid-section">← 返回电影库</a>
        <div class="detail-hero__layout">
          <div class="detail-poster-card">
            <img src="${movieItem.posterImage}" alt="${movieItem.title} 高清海报" />
          </div>
          <div class="detail-copy">
            <span class="eyebrow">${movieItem.tag}</span>
            <h1>${movieItem.title}</h1>
            <p class="detail-copy__subtitle">${movieItem.englishTitle}</p>
            <div class="detail-copy__meta">
              <span>${movieItem.year} · ${movieItem.runtime}</span>
              <span>${movieItem.country}</span>
              <span>${movieItem.language}</span>
            </div>
            <div class="movie-rating movie-rating--large">${createStars(movieItem.rating)} ${formatRating(movieItem.rating)}</div>
            <p class="detail-copy__overview">${movieItem.overview}</p>
            <div class="detail-badges">
              ${movieItem.badges.map((badge) => `<span class="detail-chip">${badge}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="detail-content-grid">
      <article class="panel detail-section">
        <div class="detail-section__header">
          <span class="eyebrow">Story</span>
          <h2>剧情简介</h2>
        </div>
        <p class="detail-description">${movieItem.summary}</p>
        <p class="detail-description">${movieItem.overview}</p>
      </article>

      <aside class="panel detail-section detail-section--sidebar">
        <div class="detail-info-list">
          <div>
            <span>导演</span>
            <strong>${movieItem.director}</strong>
          </div>
          <div>
            <span>上映日期</span>
            <strong>${movieItem.releaseDate}</strong>
          </div>
          <div>
            <span>类型</span>
            <strong>${movieItem.genre.join(' / ')}</strong>
          </div>
          <div>
            <span>片长</span>
            <strong>${movieItem.runtime}</strong>
          </div>
        </div>
      </aside>

      <article class="panel detail-section">
        <div class="detail-section__header">
          <span class="eyebrow">Highlights</span>
          <h2>推荐理由</h2>
        </div>
        <ul class="detail-highlight-list">
          ${movieItem.highlights.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </article>

      <article class="panel detail-section">
        <div class="detail-section__header">
          <span class="eyebrow">Cast</span>
          <h2>主演阵容</h2>
        </div>
        <ul class="detail-cast detail-cast--cards">
          ${movieItem.cast.map((member) => `<li><strong>${member}</strong><span>主演</span></li>`).join('')}
        </ul>
      </article>
    </section>
  `;
}

if (!movie) {
  renderNotFound();
} else {
  renderDetail(movie);
}
