
// Vite exposes environment variables via import.meta.env
const API_KEY = import.meta.env.VITE_NASA_API_KEY; 
const BASE_URL = 'https://api.nasa.gov/planetary/apod';

async function fetchApod() {
  const loaderEl = document.getElementById('loader');
  const cardEl = document.getElementById('apod-card');

  try {
    // If the API Key isn't configured yet in the .env file
    if (!API_KEY) {
      throw new Error("Missing NASA API Key. Please add it to your .env file.");
    }

    const response = await fetch(`${BASE_URL}?api_key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();
    renderApod(data);

    // Hide loader smoothly and display content card
    loaderEl.classList.add('hidden');
    cardEl.classList.remove('hidden');

  } catch (error) {
    console.error("Error fetching NASA APOD:", error);
    showErrorState(error.message);
  }
}

function renderApod(data) {
  const mediaContainer = document.getElementById('media-container');
  const dateEl = document.getElementById('apod-date');
  const copyrightEl = document.getElementById('apod-copyright');
  const titleEl = document.getElementById('apod-title');
  const explanationEl = document.getElementById('apod-explanation');

  // 1. Render modern Media Content conditionally (Handles Images and YouTube Video embeds)
  if (data.media_type === 'image') {
    mediaContainer.innerHTML = `<img src="${data.hdurl || data.url}" alt="${data.title}" loading="lazy" />`;
  } else if (data.media_type === 'video') {
    mediaContainer.innerHTML = `
      <iframe src="${data.url}" title="${data.title}" allowfullscreen></iframe>
    `;
  } else {
    mediaContainer.innerHTML = `<p style="padding: 2rem; text-align:center;">Unsupported media formats.</p>`;
  }

  // 2. Populate texts smoothly
  titleEl.textContent = data.title;
  explanationEl.textContent = data.explanation;
  
  // Format Date gracefully (e.g., "YYYY-MM-DD")
  dateEl.textContent = data.date;

  // Render Copyright text if it is available inside JSON payload
  if (data.copyright) {
    copyrightEl.textContent = `© ${data.copyright.replace(/[\n\r]/g, '')}`;
  } else {
    copyrightEl.textContent = 'Public Domain';
  }
}

function showErrorState(message) {
  const loaderEl = document.getElementById('loader');
  loaderEl.innerHTML = `
    <div style="text-align: center; padding: 2rem; border-radius: 12px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2);">
      <p style="color: #ef4444; font-weight: 600; margin-bottom: 0.5rem;">Failed to fetch Cosmic Content</p>
      <p style="color: #94a3b8; font-size: 0.9rem;">${message}</p>
    </div>
  `;
}

// Fire up the logic on load
document.addEventListener('DOMContentLoaded', fetchApod);
