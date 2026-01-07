// Cache for fetched metadata
const metadataCache = {};

// Fetch metadata from Open Library by title/author (more robust than ISBN)
async function fetchMetadata(book) {
  const cacheKey = `${book.title}-${book.author}`;
  
  // Check cache first
  if (metadataCache[cacheKey]) {
    return metadataCache[cacheKey];
  }

  try {
    // Search by title and author
    const query = encodeURIComponent(`${book.title} ${book.author}`);
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${query}&limit=1`
    );
    const data = await response.json();
    
    if (!data.docs || data.docs.length === 0) {
      console.warn(`No data found for: ${book.title}`);
      return getFallbackMetadata(book);
    }

    const doc = data.docs[0];
    
    // Build cover URL from cover_i or ISBN
    let coverUrl = null;
    if (doc.cover_i) {
      coverUrl = `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`;
    } else if (doc.isbn && doc.isbn[0]) {
      coverUrl = `https://covers.openlibrary.org/b/isbn/${doc.isbn[0]}-M.jpg`;
    }

    const metadata = {
      title: doc.title || book.title,
      authors: doc.author_name?.join(', ') || book.author,
      cover: coverUrl,
      publishYear: doc.first_publish_year || '',
      narrator: book.narrator || ''
    };

    // Cache it
    metadataCache[cacheKey] = metadata;
    return metadata;

  } catch (error) {
    console.error(`Error fetching metadata for ${book.title}:`, error);
    return getFallbackMetadata(book);
  }
}

// Fallback when API fails - use data from books.js
function getFallbackMetadata(book) {
  return {
    title: book.title,
    authors: book.author,
    cover: null,
    publishYear: '',
    narrator: book.narrator || ''
  };
}

// Render a single book card
function renderBookCard(book, metadata) {
  const card = document.createElement('div');
  card.className = 'book-card';
  
  // Build affiliate links
  const audibleUrl = buildAudibleUrl(book.audible_asin);
  const libroUrl = buildLibroUrl(book.libro_slug);
  const googleUrl = buildGoogleUrl(book.google_id);

  let buyLinks = '';
  if (audibleUrl) {
    buyLinks += `<a href="${audibleUrl}" target="_blank" rel="noopener sponsored" class="buy-btn audible">Audible</a>`;
  }
  if (googleUrl) {
    buyLinks += `<a href="${googleUrl}" target="_blank" rel="noopener sponsored" class="buy-btn google">Google Play</a>`;
  }
  if (libroUrl) {
    buyLinks += `<a href="${libroUrl}" target="_blank" rel="noopener sponsored" class="buy-btn libro">Libro.fm</a>`;
  }

  // Placeholder image if no cover
  const coverSrc = metadata.cover || 'https://via.placeholder.com/128x192/2a2a4a/666?text=No+Cover';
  
  card.innerHTML = `
    <img 
      src="${coverSrc}" 
      alt="${metadata.title} cover"
      class="book-cover"
      loading="lazy"
      onerror="this.src='https://via.placeholder.com/128x192/2a2a4a/666?text=No+Cover'"
    >
    <div class="book-info">
      <h2>${metadata.title}</h2>
      <p class="author">${metadata.authors}</p>
      ${metadata.narrator ? `<p class="narrator">Narrated by ${metadata.narrator}</p>` : ''}
      ${metadata.publishYear ? `<p class="meta">${metadata.publishYear}</p>` : ''}
      <div class="buy-links">
        ${buyLinks}
      </div>
    </div>
  `;

  return card;
}

// Render loading placeholder
function renderLoadingCard() {
  const card = document.createElement('div');
  card.className = 'book-card loading';
  card.innerHTML = `
    <div class="book-cover placeholder"></div>
    <div class="book-info">
      <div class="placeholder-text"></div>
      <div class="placeholder-text short"></div>
    </div>
  `;
  return card;
}

// Main render function
async function renderBooks(searchQuery = '', sortBy = 'title') {
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  // Filter books by search query first (using local data)
  let filtered = booksData;
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    filtered = booksData.filter(book => 
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      (book.narrator && book.narrator.toLowerCase().includes(q))
    );
  }

  // Sort using local data
  filtered = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'author':
        return a.author.localeCompare(b.author);
      case 'year':
        return (b.year || 0) - (a.year || 0);
      case 'title':
      default:
        return a.title.localeCompare(b.title);
    }
  });

  if (filtered.length === 0) {
    resultsContainer.innerHTML = '<p class="no-results">No books found.</p>';
    return;
  }

  // Show loading placeholders
  filtered.forEach(() => {
    resultsContainer.appendChild(renderLoadingCard());
  });

  // Fetch metadata and render each book
  const cards = await Promise.all(
    filtered.map(async (book) => {
      const metadata = await fetchMetadata(book);
      return renderBookCard(book, metadata);
    })
  );

  // Clear and render final cards
  resultsContainer.innerHTML = '';
  cards.forEach(card => resultsContainer.appendChild(card));
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search');
  const sortSelect = document.getElementById('sort');

  // Debounce search
  let searchTimeout;
  searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      renderBooks(searchInput.value, sortSelect.value);
    }, 300);
  });

  sortSelect.addEventListener('change', () => {
    renderBooks(searchInput.value, sortSelect.value);
  });

  // Initial render
  renderBooks();
});
