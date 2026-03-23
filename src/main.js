import { getGenres, movies } from './data/movies.js';
import { createStars, formatRating } from './utils/helpers.js';

const state = {
  query: '',
  genre: '全部',
  sort: 'rating-desc',
};

const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const sortSelect = document.querySelector('#sort-select');
const movieGrid = document.querySelector('#movie-grid');
const resultsText = document.querySelector('#results-text');
const genreFilters = document.querySelector('#genre-filters');
const collectionGrid = document.querySelector('#collection-grid');
const heroBackdrop = document.querySelector('#hero-backdrop');
const heroTitle = document.querySelector('#hero-title');
const heroSummary = document.querySelector('#hero-summary');
const heroMeta = document.querySelector('#hero-meta');
const heroPrimaryLink = document.querySelector('#hero-primary-link');
const featuredPoster = document.querySelector('#featured-poster');
const featuredTitle = document.querySelector('#featured-title');
const featuredSummary = document.querySelector('#featured-summary');
const featuredLink = document.querySelector('#featured-link');

const featuredMovie = [...movies].sort((a, b) => b.popularity - a.popularity)[0];
const collections = [...movies].sort((a, b) => b.rating - a.rating).slice(0, 3);

function compareMovies(a, b) {
  switch (state.sort) {
    case 'year-desc':
      return b.year - a.year || b.rating - a.rating;
    case 'title-asc':
      return a.englishTitle.localeCompare(b.englishTitle, 'en');
    case 'rating-desc':
    default:
      return b.rating - a.rating || b.year - a.year;
  }
}

function matchesQuery(movie) {
  const keyword = state.query.trim().toLowerCase();
  if (!keyword) return true;

  const haystack = [
    movie.title,
    movie.englishTitle,
    movie.director,
    movie.country,
    movie.language,
    movie.tag,
    movie.genre.join(' '),
    movie.highlights.join(' '),
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(keyword);
}

function matchesGenre(movie) {
  return state.genre === '全部' || movie.genre.includes(state.genre);
}

function getVisibleMovies() {
  return movies.filter((movie) => matchesQuery(movie) && matchesGenre(movie)).sort(compareMovies);
}

function createMetaPill(label) {
  return `<span class="meta-pill">${label}</span>`;
}

function createMovieCard(movie) {
  return `
    <article class="movie-card movie-card--premium">
      <div class="movie-card__media">
        <img class="movie-card__image" src="${movie.posterImage}" alt="${movie.title} 高清封面" loading="lazy" />
        <div class="movie-card__overlay">
          <span class="movie-poster__badge">${movie.tag}</span>
          <span class="movie-card__score">${formatRating(movie.rating)}</span>
        </div>
      </div>
      <div class="movie-card__content">
        <div class="movie-card__heading">
          <div>
            <h3>${movie.title}</h3>
            <p class="movie-card__subtitle">${movie.englishTitle}</p>
          </div>
          <span class="movie-card__year">${movie.year}</span>
        </div>
        <p class="movie-meta">${movie.runtime} · ${movie.director} · ${movie.country}</p>
        <p class="movie-summary">${movie.summary}</p>
        <div class="movie-rating">${createStars(movie.rating)} ${formatRating(movie.rating)}</div>
        <div class="movie-card__tags">
          ${movie.genre.map(createMetaPill).join('')}
        </div>
        <a class="card-link" href="./movie.html?id=${movie.id}">查看详情</a>
      </div>
    </article>
  `;
}

function renderHero(movie) {
  heroBackdrop.style.backgroundImage = `linear-gradient(90deg, rgba(8,11,20,0.82), rgba(8,11,20,0.2)), url(${movie.backdropImage})`;
  heroTitle.textContent = `${movie.title} · ${movie.englishTitle}`;
  heroSummary.textContent = movie.overview;
  heroMeta.innerHTML = [
    `${movie.year} 上映`,
    movie.runtime,
    `${formatRating(movie.rating)} 分`,
    movie.genre.join(' / '),
  ]
    .map(createMetaPill)
    .join('');
  heroPrimaryLink.href = `./movie.html?id=${movie.id}`;

  featuredPoster.src = movie.posterImage;
  featuredPoster.alt = `${movie.title} 高清推荐海报`;
  featuredTitle.textContent = movie.title;
  featuredSummary.textContent = movie.highlight;
  featuredLink.href = `./movie.html?id=${movie.id}`;
}

function renderCollections() {
  collectionGrid.innerHTML = collections
    .map(
      (movie, index) => `
        <article class="collection-card">
          <img src="${movie.backdropImage}" alt="${movie.title} 专题高清横幅" loading="lazy" />
          <div class="collection-card__content">
            <span class="eyebrow">0${index + 1} / Editor's Pick</span>
            <h3>${movie.title}</h3>
            <p>${movie.highlight}</p>
            <div class="collection-card__footer">
              <span>${movie.genre.join(' · ')}</span>
              <a href="./movie.html?id=${movie.id}">查看详情</a>
            </div>
          </div>
        </article>
      `,
    )
    .join('');
}

function renderGenreFilters() {
  const genres = getGenres();
  genreFilters.innerHTML = genres
    .map(
      (genre) => `
        <button
          class="filter-chip ${genre === state.genre ? 'is-active' : ''}"
          type="button"
          data-genre="${genre}"
        >
          ${genre}
        </button>
      `,
    )
    .join('');
}

function renderMovies() {
  const visibleMovies = getVisibleMovies();
  const keywordText = state.query ? `关键词“${state.query}”` : '全部影片';
  const genreText = state.genre === '全部' ? '全部分类' : `${state.genre} 分类`;
  resultsText.textContent = `${genreText} · ${keywordText} · 共 ${visibleMovies.length} 部结果`;

  if (!visibleMovies.length) {
    movieGrid.innerHTML = `
      <div class="empty-state">
        <h3>没有找到符合条件的电影</h3>
        <p>你可以尝试切换分类、修改搜索关键词，或恢复默认排序重新浏览。</p>
      </div>
    `;
    return;
  }

  movieGrid.innerHTML = visibleMovies.map(createMovieCard).join('');
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  state.query = searchInput.value.trim();
  renderMovies();
});

searchInput.addEventListener('input', (event) => {
  state.query = event.target.value.trim();
  renderMovies();
});

sortSelect.addEventListener('change', (event) => {
  state.sort = event.target.value;
  renderMovies();
});

genreFilters.addEventListener('click', (event) => {
  const button = event.target.closest('[data-genre]');
  if (!button) return;

  state.genre = button.dataset.genre;
  renderGenreFilters();
  renderMovies();
});

renderHero(featuredMovie);
renderCollections();
renderGenreFilters();
renderMovies();
