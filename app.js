// DOM elements
const searchInput = document.getElementById('search');
const sortSelect = document.getElementById('sort');
const resultsContainer = document.getElementById('results');

// Build affiliate URLs
function getAudibleUrl(asin) {
  return `https://www.audible.com/pd/${asin}?tag=${AMAZON_TAG}`;
}

function getLibroUrl(url) {
  // Add Awin tracking when you have it
  // For now, direct link
  return url;
}

function getGoogleUrl(id) {
  if (!id) return null;
  return `https://play.google.com/store/audiobooks/details?id=${id}`;
}

// Render a single book card
function renderBook(book) {
  const card = document.createElement('div');
  card.className = 'book-card';
  
  let buyLinks = '';
  
  if (book.audible_asin) {
    buyLinks += `<a href="${getAudibleUrl(book.audible_asin)}" target="_blank" rel="noopener noreferrer" class="buy-btn audible">Audible</a>`;
  }
  
  if (book.google_play_id) {
    const priceText = book.google_price ? ` $${book.google_price}` : '';
    buyLinks += `<a href="${getGoogleUrl(book.google_play_id)}" target="_blank" rel="noopener noreferrer" class="buy-btn google">Google${priceText}</a>`;
  }
  
  if (book.librofm_url) {
    buyLinks += `<a href="${getLibroUrl(book.librofm_url)}" target="_blank" rel="noopener noreferrer" class="buy-btn libro">Libro.fm</a>`;
  }
  
  card.innerHTML = `
    <h2>${book.title}</h2>
    <p class="author">${book.author}</p>
    <p class="narrator">Narrated by ${book.narrator}</p>
    <p class="meta">${book.year} · ${book.duration} hrs</p>
    <div class="buy-links">
      ${buyLinks}
    </div>
  `;
  
  return card;
}

// Filter books by search query
function filterBooks(query) {
  const q = query.toLowerCase().trim();
  if (!q) return books;
  
  return books.filter(book => 
    book.title.toLowerCase().includes(q) ||
    book.author.toLowerCase().includes(q) ||
    book.narrator.toLowerCase().includes(q)
  );
}

// Sort books
function sortBooks(bookList, sortBy) {
  return [...bookList].sort((a, b) => {
    switch (sortBy) {
      case 'author':
        return a.author.localeCompare(b.author);
      case 'year':
        return b.year - a.year;
      case 'duration':
        return b.duration - a.duration;
      case 'title':
      default:
        return a.title.localeCompare(b.title);
    }
  });
}

// Render all books
function render() {
  const query = searchInput.value;
  const sortBy = sortSelect.value;
  
  let filtered = filterBooks(query);
  let sorted = sortBooks(filtered, sortBy);
  
  resultsContainer.innerHTML = '';
  
  if (sorted.length === 0) {
    resultsContainer.innerHTML = '<p class="no-results">No books found. Try a different search.</p>';
    return;
  }
  
  sorted.forEach(book => {
    resultsContainer.appendChild(renderBook(book));
  });
}

// Event listeners
searchInput.addEventListener('input', render);
sortSelect.addEventListener('change', render);

// Initial render
render();
