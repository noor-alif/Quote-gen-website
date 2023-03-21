const quote = document.getElementById("quote");
const author = document.getElementById("author");
const toggle = document.getElementById("toggle");

// Fetch a random quote from the API
async function getQuote() {
  const url = "https://api.quotable.io/random";
  try {
    const response = await fetch(url);
    const data = await response.json();
    quote.innerHTML = data.content;
    author.innerHTML = "- " + data.author;
  } catch (error) {
    console.log(error);
  }
}

// Toggle between dark and light mode themes
function toggleTheme() {
  const body = document.body;
  const toggleContainer = document.querySelector(".toggle-container");
  body.classList.toggle("dark");
  toggleContainer.classList.toggle("dark");
}

// Event listeners
toggle.addEventListener("click", toggleTheme);
getQuote();
