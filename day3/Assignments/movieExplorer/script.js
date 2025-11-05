
const OMDB_API_KEY = 'd0865f9b'; 
if (!OMDB_API_KEY || OMDB_API_KEY === 'd0865f9b') {
  console.warn('Please set OMDB_API_KEY in script.js to your OMDb API key.');
}

/* Elements */
const searchInput = document.getElementById('search');
const moviesContainer = document.getElementById('movies-container');
const statusEl = document.getElementById('status');
const loadingEl = document.getElementById('loading-indicator');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentPageEl = document.getElementById('current-page');
const totalPagesEl = document.getElementById('total-pages');

/* App State */
let currentQuery = '';
let currentPage = 1;
let totalPages = 1;
let lastSearchTimestamp = 0;


const defaultQueries = ['Harry Potter', 'Avengers', 'Marvel', 'Batman', 'Inception', 'Lord of the Rings'];

/* Utility: show/hide loading */
function showLoading(show = true) {
  loadingEl.setAttribute('aria-hidden', String(!show));
}

/* Utility: show status message */
function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.style.color = isError ? '#ffb4b4' : '';
}

/* Debounce implementation */
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

/* Throttle implementation (calls allowed at most once per limit ms) */
function throttle(fn, limit) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

/* Fetch movies using OMDb search endpoint */
async function fetchMovies(query, page = 1) {
  if (!OMDB_API_KEY || OMDB_API_KEY === 'YOUR_OMDB_API_KEY') {
    setStatus('Missing OMDb API key. Add it to script.js to fetch live data.', true);
    moviesContainer.innerHTML = placeholderCards();
    return;
  }

  showLoading(true);
  setStatus('');
  try {
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&page=${page}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();

    if (data.Response === 'False') {
      // OMDb returns Response: "False" with an Error message
      setStatus(data.Error || 'No movies found.', true);
      moviesContainer.innerHTML = noResultsMarkup();
      totalPages = 1;
      updatePagination();
    } else {
      const movies = data.Search || [];
      const totalResults = parseInt(data.totalResults || '0', 10);
      totalPages = Math.ceil(totalResults / 10) || 1;
      renderMovies(movies);
      setStatus(`${totalResults} result${totalResults !== 1 ? 's' : ''} for "${query}"`);
      updatePagination();
    }
  } catch (err) {
    console.error(err);
    setStatus('An error occurred while fetching movies. Try again later.', true);
    moviesContainer.innerHTML = noResultsMarkup();
  } finally {
    showLoading(false);
  }
}

function placeholderCards() {
  // small friendly placeholders for when API key missing
  return `
    <div class="card"><div class="poster"><div style="padding:12px;color:var(--muted)">No API key</div></div>
      <h3>Local placeholder</h3><div class="meta">Set your OMDb API key</div></div>
  `;
}

function noResultsMarkup(){
  return `<div style="grid-column:1/-1; padding:18px; color:var(--muted); text-align:center;">
    No movies to show.
  </div>`;
}

/* Render movie cards from OMDb search (no long plot available in search) */
function renderMovies(movies) {
  if (!movies || movies.length === 0) {
    moviesContainer.innerHTML = noResultsMarkup();
    return;
  }

  const html = movies.map(m => {
    const poster = (m.Poster && m.Poster !== 'N/A') ? `<img src="${m.Poster}" alt="${escapeHtml(m.Title)} poster" loading="lazy">` : `<div style="padding:12px;color:var(--muted)">No Image</div>`;
    const title = escapeHtml(m.Title);
    const year = escapeHtml(m.Year || '');
    const type = escapeHtml(m.Type || '');
    return `
      <article class="card" role="article" tabindex="0" aria-label="${title} (${year})">
        <div class="poster">${poster}</div>
        <h3>${title}</h3>
        <div class="meta">${year} · ${type}</div>
      </article>
    `;
  }).join('');
  moviesContainer.innerHTML = html;
}

/* Escape helper to avoid accidental injection */
function escapeHtml(s = '') {
  return String(s).replace(/[&<>"']/g, function (m) {
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m];
  });
}

/* Update pagination UI */
function updatePagination() {
  currentPageEl.textContent = currentPage;
  totalPagesEl.textContent = totalPages;
  prevBtn.disabled = currentPage <= 1;
  nextBtn.disabled = currentPage >= totalPages;
}

/* Handler to perform a search and reset page */
function doSearch(query) {
  query = (query || '').trim();
  currentPage = 1;
  currentQuery = query;
  if (!query) {
    // If user cleared search, show default popular
    loadInitial();
    return;
  }
  fetchMovies(query, currentPage);
}

/* Pagination actions (throttled) */
const changePage = throttle((direction) => {
  if (direction === 'next' && currentPage < totalPages) {
    currentPage++;
    fetchMovies(currentQuery || defaultQueries[0], currentPage);
  } else if (direction === 'prev' && currentPage > 1) {
    currentPage--;
    fetchMovies(currentQuery || defaultQueries[0], currentPage);
  }
}, 800);

/* On load: pick a random default query and display page 1 */
function loadInitial() {
  const q = defaultQueries[Math.floor(Math.random() * defaultQueries.length)];
  currentQuery = q;
  currentPage = 1;
  fetchMovies(q, 1);
}

/* Wiring events */
const debouncedSearch = debounce((ev) => {
  const q = ev.target.value;
  doSearch(q);
}, 500);

searchInput.addEventListener('input', debouncedSearch);

prevBtn.addEventListener('click', () => changePage('prev'));
nextBtn.addEventListener('click', () => changePage('next'));

/* Start */
document.addEventListener('DOMContentLoaded', () => {
  updatePagination();
  loadInitial();
});
