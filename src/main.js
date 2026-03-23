import { movies } from './data/movies.js';
import { createPosterGradient, createStars } from './utils/helpers.js';

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const movieGrid = document.querySelector('#movie-grid');
const resultsText = document.querySelector('#results-text');
const featuredTitle = document.querySelector('#featured-title');
const featuredSummary = document.querySelector('#featured-summary');
const featuredLink = document.querySelector('#featured-link');
const featuredTag = document.querySelector('#featured-tag');
const featuredRating = document.querySelector('#featured-rating');
const genreFilters = document.querySelector('#genre-filters');
const sortSelect = document.querySelector('#sort-select');
const statsTotal = document.querySelector('#stats-total');
const statsGenres = document.querySelector('#stats-genres');
const statsRating = document.querySelector('#stats-rating');

const state = {
  query: '',
  genre: '全部',
  sort: 'rating-desc',
};

const featuredMovie = [...movies].sort((a, b) => b.rating - a.rating)[0];
const genres = ['全部', ...new Set(movies.flatMap((movie) => movie.genre))];

featuredTitle.textContent = `${featuredMovie.title} · ${featuredMovie.year}`;
featuredSummary.textContent = featuredMovie.highlight;
featuredLink.href = `./movie.html?id=${featuredMovie.id}`;
featuredTag.textContent = featuredMovie.tag;
featuredRating.textContent = `评分 ${featuredMovie.rating.toFixed(1)}`;

statsTotal.textContent = String(movies.length);
statsGenres.textContent = String(genres.length - 1);
statsRating.textContent = (movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length).toFixed(1);

function createMovieCard(movie) {
  return `
    <article class="movie-card">
      <div class="movie-poster" style="background:${createPosterGradient(movie.colors)}">
        <span class="movie-poster__badge">${movie.tag}</span>
      </div>
      <div class="movie-card__content">
        <div class="movie-card__header">
          <h3>${movie.title}</h3>
          <span class="movie-year">${movie.year}</span>
        </div>
        <p class="movie-meta">${movie.runtime} · ${movie.director}</p>
        <p class="movie-summary">${movie.summary}</p>
        <div class="movie-card__footer">
          <div>
            <div class="movie-rating">${createStars(movie.rating)} ${movie.rating.toFixed(1)}</div>
            <div class="movie-meta">${movie.genre.join(' / ')}</div>
          </div>
          <a class="card-link" href="./movie.html?id=${movie.id}">查看详情</a>
        </div>
      </div>
    </article>
  `;
}

function renderGenreFilters() {
  genreFilters.innerHTML = genres
    .map(
      (genre) => `
        <button
          type="button"
          class="filter-pill${genre === state.genre ? ' is-active' : ''}"
          data-genre="${genre}"
          aria-pressed="${genre === state.genre}"
        >
          ${genre}
        </button>
      `,
    )
    .join('');
}

function sortMovies(list) {
  const sorted = [...list];

  switch (state.sort) {
    case 'rating-asc':
      return sorted.sort((a, b) => a.rating - b.rating);
    case 'year-desc':
      return sorted.sort((a, b) => b.year - a.year);
    case 'year-asc':
      return sorted.sort((a, b) => a.year - b.year);
    case 'title-asc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'));
    case 'rating-desc':
    default:
      return sorted.sort((a, b) => b.rating - a.rating);
  }
}

function getVisibleMovies() {
  const keyword = state.query.trim().toLowerCase();

  return sortMovies(
    movies.filter((movie) => {
      const haystack = [movie.title, movie.director, movie.genre.join(' '), movie.tag]
        .join(' ')
        .toLowerCase();
      const matchesQuery = haystack.includes(keyword);
      const matchesGenre = state.genre === '全部' || movie.genre.includes(state.genre);

      return matchesQuery && matchesGenre;
    }),
  );
}

function updateResultsText(filteredMovies) {
  const filters = [];

  if (state.genre !== '全部') {
    filters.push(`分类“${state.genre}”`);
  }

  if (state.query.trim()) {
    filters.push(`关键词“${state.query.trim()}”`);
  }

  resultsText.textContent = filters.length
    ? `当前为 ${filters.join(' + ')}，共找到 ${filteredMovies.length} 部电影`
    : `共收录 ${movies.length} 部精选电影，可按分类与排序快速浏览`;
}

function renderMovies() {
  const filteredMovies = getVisibleMovies();

  updateResultsText(filteredMovies);
  renderGenreFilters();

  if (!filteredMovies.length) {
    movieGrid.innerHTML = `
      <div class="empty-state">
        <h3>没有找到符合条件的电影</h3>
        <p>可以尝试切换分类、清空关键词，或按“评分从高到低”重新浏览推荐。</p>
      </div>
    `;
    return;
  }

  movieGrid.innerHTML = filteredMovies.map(createMovieCard).join('');
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  state.query = searchInput.value;
  renderMovies();
});

searchInput.addEventListener('input', (event) => {
  state.query = event.target.value;
  renderMovies();
});

genreFilters.addEventListener('click', (event) => {
  const trigger = event.target.closest('[data-genre]');

  if (!trigger) {
    return;
  }

  state.genre = trigger.dataset.genre;
  renderMovies();
});

sortSelect.addEventListener('change', (event) => {
  state.sort = event.target.value;
  renderMovies();
});

renderGenreFilters();
renderMovies();
