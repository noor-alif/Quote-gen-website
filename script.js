const quote = document.getElementById('quote');
const author = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const toggle = document.getElementById('toggle');
const readBtn = document.getElementById('read');
const listenBtn = document.getElementById('listen');
const container = document.querySelector('.container');

let isDarkMode = true;

// Function to toggle dark mode
function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  if (isDarkMode) {
    container.classList.add('dark-theme');
    container.classList.remove('light-theme');
  } else {
    container.classList.add('light-theme');
    container.classList.remove('dark-theme');
  }
}

// Function to get a new quote
async function getQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    quote.innerHTML = data.content;
    author.innerHTML = `- ${data.author}`;
    readQuote(data.content); // Call the readQuote function to read the quote
  } catch (error) {
    console.log(error);
  }
}

// Function to read a quote using text-to-speech
function readQuote(text) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = text;
  speech.volume = 1;
  speech.rate = 0.8;
  speech.pitch = 1;
  window.speechSynthesis.speak(speech);
}

// Function to generate an audio file from text using text-to-speech
function generateAudio(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  utterance.voice = voices[0];
  synth.speak(utterance);
  const audio = new Audio();
  audio.src = URL.createObjectURL(new Blob([new TextEncoder().encode(text)], { type: "audio/ogg" }));
  return audio;
}

