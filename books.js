// Affiliate IDs - Replace with your own
const AMAZON_TAG = "YOUR_AMAZON_TAG-20";  // Get from Amazon Associates
const LIBRO_AFF_ID = "";  // Get from Awin when approved

// Book data - now includes title/author for robust API lookups
// No more relying on ISBN accuracy!
const booksData = [
  {
    title: "Project Hail Mary",
    author: "Andy Weir",
    narrator: "Ray Porter",
    year: 2021,
    audible_asin: "B08G9PRS1K",
    google_id: "",
    libro_slug: "9780593395561-project-hail-mary"
  },
  {
    title: "The Martian",
    author: "Andy Weir",
    narrator: "Wil Wheaton",
    year: 2014,
    audible_asin: "B00B5HZGUG",
    google_id: "",
    libro_slug: "9781549104879-the-martian"
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    narrator: "Scott Brick",
    year: 1965,
    audible_asin: "B002V1OF70",
    google_id: "",
    libro_slug: "9781427201447-dune"
  },
  {
    title: "Ready Player One",
    author: "Ernest Cline",
    narrator: "Wil Wheaton",
    year: 2011,
    audible_asin: "B005FRGT44",
    google_id: "",
    libro_slug: "9780307913159-ready-player-one"
  },
  {
    title: "Ender's Game",
    author: "Orson Scott Card",
    narrator: "Stefan Rudnicki",
    year: 1985,
    audible_asin: "B002V5GWHM",
    google_id: "",
    libro_slug: "9781250244161-ender-s-game"
  },
  {
    title: "1984",
    author: "George Orwell",
    narrator: "Simon Prebble",
    year: 1949,
    audible_asin: "B002UZDRK8",
    google_id: "",
    libro_slug: "9798212241298-1984"
  },
  {
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    narrator: "Stephen Fry",
    year: 1979,
    audible_asin: "B002VA9SWS",
    google_id: "",
    libro_slug: "9780739349380-the-hitchhiker-s-guide-to-the-galaxy"
  },
  {
    title: "Foundation",
    author: "Isaac Asimov",
    narrator: "Scott Brick",
    year: 1951,
    audible_asin: "B003XNTR88",
    google_id: "",
    libro_slug: "9781501238048-foundation"
  },
  {
    title: "Neuromancer",
    author: "William Gibson",
    narrator: "Robertson Dean",
    year: 1984,
    audible_asin: "B000SEWY9M",
    google_id: "",
    libro_slug: "9781101624609-neuromancer"
  },
  {
    title: "Snow Crash",
    author: "Neal Stephenson",
    narrator: "Jonathan Davis",
    year: 1992,
    audible_asin: "B002UUKWCY",
    google_id: "",
    libro_slug: "9780739346679-snow-crash"
  },
  {
    title: "Leviathan Wakes",
    author: "James S.A. Corey",
    narrator: "Jefferson Mays",
    year: 2011,
    audible_asin: "B008MU5IVU",
    google_id: "",
    libro_slug: "9781478999867-leviathan-wakes"
  },
  {
    title: "Red Rising",
    author: "Pierce Brown",
    narrator: "Tim Gerard Reynolds",
    year: 2014,
    audible_asin: "B00I2VWW5U",
    google_id: "",
    libro_slug: "9781478998990-red-rising"
  },
  {
    title: "The Left Hand of Darkness",
    author: "Ursula K. Le Guin",
    narrator: "George Guidall",
    year: 1969,
    audible_asin: "B002UZLSYM",
    google_id: "",
    libro_slug: "9781427212573-the-left-hand-of-darkness"
  },
  {
    title: "Hyperion",
    author: "Dan Simmons",
    narrator: "Marc Vietor",
    year: 1989,
    audible_asin: "B002V5BLIW",
    google_id: "",
    libro_slug: "9781427255020-hyperion"
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    narrator: "Michael York",
    year: 1932,
    audible_asin: "B002V01IJY",
    google_id: "",
    libro_slug: "9780061989926-brave-new-world"
  },
  {
    title: "Do Androids Dream of Electric Sheep?",
    author: "Philip K. Dick",
    narrator: "Scott Brick",
    year: 1968,
    audible_asin: "B002V1BQN6",
    google_id: "",
    libro_slug: "9781682624821-do-androids-dream-of-electric-sheep"
  },
  {
    title: "The Three-Body Problem",
    author: "Liu Cixin",
    narrator: "Luke Daniels",
    year: 2008,
    audible_asin: "B00P0277C2",
    google_id: "",
    libro_slug: "9781427263803-the-three-body-problem"
  },
  {
    title: "Old Man's War",
    author: "John Scalzi",
    narrator: "William Dufris",
    year: 2005,
    audible_asin: "B002V5GX40",
    google_id: "",
    libro_slug: "9781400152230-old-man-s-war"
  },
  {
    title: "Children of Time",
    author: "Adrian Tchaikovsky",
    narrator: "Mel Hudson",
    year: 2015,
    audible_asin: "B071Y9TTHC",
    google_id: "",
    libro_slug: "9781509865499-children-of-time"
  },
  {
    title: "Dark Matter",
    author: "Blake Crouch",
    narrator: "Jon Lindstrom",
    year: 2016,
    audible_asin: "B01CUKULGA",
    google_id: "",
    libro_slug: "9780451496171-dark-matter"
  },
  {
    title: "Recursion",
    author: "Blake Crouch",
    narrator: "Abby Craden",
    year: 2019,
    audible_asin: "B07NKJLZ5H",
    google_id: "",
    libro_slug: "9780593103760-recursion"
  },
  {
    title: "The Forever War",
    author: "Joe Haldeman",
    narrator: "George Wilson",
    year: 1974,
    audible_asin: "B004QDTA24",
    google_id: "",
    libro_slug: "9781400132997-the-forever-war"
  },
  {
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    narrator: "Tim Robbins",
    year: 1953,
    audible_asin: "B00M4OB3IC",
    google_id: "",
    libro_slug: "9781508288596-fahrenheit-451"
  },
  {
    title: "Ancillary Justice",
    author: "Ann Leckie",
    narrator: "Adjoa Andoh",
    year: 2013,
    audible_asin: "B00FYFKXRA",
    google_id: "",
    libro_slug: "9781478955573-ancillary-justice"
  },
  {
    title: "The Long Way to a Small, Angry Planet",
    author: "Becky Chambers",
    narrator: "Rachel Dulude",
    year: 2014,
    audible_asin: "B013VO4A0E",
    google_id: "",
    libro_slug: "9780062964878-the-long-way-to-a-small-angry-planet"
  },
  {
    title: "All Systems Red",
    author: "Martha Wells",
    narrator: "Kevin R. Free",
    year: 2017,
    audible_asin: "B0722XHWRF",
    google_id: "",
    libro_slug: "9781508236511-all-systems-red"
  },
  {
    title: "Altered Carbon",
    author: "Richard K. Morgan",
    narrator: "Todd McLaren",
    year: 2002,
    audible_asin: "B002V1O6X8",
    google_id: "",
    libro_slug: "9781400107933-altered-carbon"
  },
  {
    title: "2001: A Space Odyssey",
    author: "Arthur C. Clarke",
    narrator: "Dick Hill",
    year: 1968,
    audible_asin: "B002V8MIHY",
    google_id: "",
    libro_slug: "9781598872972-2001"
  },
  {
    title: "Contact",
    author: "Carl Sagan",
    narrator: "Laurel Lefkow",
    year: 1985,
    audible_asin: "B002UZJGYY",
    google_id: "",
    libro_slug: "9781508299196-contact"
  },
  {
    title: "Slaughterhouse-Five",
    author: "Kurt Vonnegut",
    narrator: "James Franco",
    year: 1969,
    audible_asin: "B015ELUV9G",
    google_id: "",
    libro_slug: "9780593152126-slaughterhouse-five"
  }
];

// Build dynamic affiliate URLs
function buildAudibleUrl(asin) {
  if (!asin) return null;
  return `https://www.audible.com/pd/${asin}?tag=${AMAZON_TAG}`;
}

function buildLibroUrl(libroSlug) {
  if (!libroSlug) return null;
  const baseUrl = `https://libro.fm/audiobooks/${libroSlug}`;
  // Add affiliate ID if set
  return LIBRO_AFF_ID ? `${baseUrl}?aff=${LIBRO_AFF_ID}` : baseUrl;
}

function buildGoogleUrl(googleId) {
  if (!googleId) return null;
  return `https://play.google.com/store/audiobooks/details?id=${googleId}`;
}
