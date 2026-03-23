import { getMovieById } from './data/movies.js';
import { createPosterGradient, createStars } from './utils/helpers.js';

const detailPage = document.querySelector('#detail-page');
const movieId = new URLSearchParams(window.location.search).get('id');
const movie = getMovieById(movieId);

if (!movie) {
  detailPage.innerHTML = `
    <section class="detail-card">
      <div class="detail-content">
        <a class="back-link" href="./index.html">返回首页</a>
        <h1>电影不存在</h1>
        <p class="detail-description">你访问的影片可能已下线，或者链接参数不正确。</p>
      </div>
    </section>
  `;
} else {
  document.title = `${movie.title} | 幕光电影`;

  detailPage.innerHTML = `
    <a class="back-link" href="./index.html">← 返回电影列表</a>
    <section class="detail-card">
      <div class="detail-poster" style="background:${createPosterGradient(movie.colors)}">
        <span class="detail-badge">${movie.tag}</span>
        <div class="movie-rating">${createStars(movie.rating)} ${movie.rating.toFixed(1)}</div>
      </div>
      <div class="detail-content">
        <h1>${movie.title}</h1>
        <div class="detail-meta">
          <span class="detail-chip">${movie.year}</span>
          <span class="detail-chip">${movie.runtime}</span>
          <span class="detail-chip">导演：${movie.director}</span>
        </div>
        <p class="detail-description">${movie.summary}</p>
        <p class="detail-description"><strong>推荐理由：</strong>${movie.highlight}</p>
        <div class="detail-meta">
          ${movie.genre.map((item) => `<span class="detail-chip">${item}</span>`).join('')}
        </div>
        <h2>主演阵容</h2>
        <ul class="detail-cast">
          ${movie.cast.map((member) => `<li>${member}</li>`).join('')}
        </ul>
      </div>
    </section>
  `;
}
