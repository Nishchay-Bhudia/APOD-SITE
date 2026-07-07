// 1. Import your API key safely using Vite's environment variable parser
const API_KEY = import.meta.env.VITE_NASA_API_KEY;

// 2. Set an immediate placeholder loading state so the screen isn't empty
document.querySelector("#app").innerHTML = `
  <div class="loader-container">
    <p class="loading-text">LOADING COSMOS DATA...</p>
  </div>
`;

// 3. Connect to the API and handle the data pipeline
fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    let mediaHTML = "";

    // EXTRA CHALLENGE COMPLETED: Check if it's an image, YouTube link, or direct video file
    if (data.media_type === "image") {
      mediaHTML = `<img class="apod-media" src="${data.url}" alt="${data.title}" />`;
    } else if (data.media_type === "video" && data.url.includes("youtube.com")) {
      mediaHTML = `
        <div class="video-wrapper">
          <iframe class="apod-media" src="${data.url}" frameborder="0" allowfullscreen></iframe>
        </div>`;
    } else if (data.media_type === "video") {
      mediaHTML = `<video class="apod-media" src="${data.url}" controls></video>`;
    } else {
      mediaHTML = `<p>Unsupported media type format.</p>`;
    }

    // 4. Inject everything into the DOM exactly once to avoid wiping data
    document.querySelector("#app").innerHTML = `
      <main class="content-container">
        <h1 class="apod-title">${data.title}</h1>
        <div class="media-container">${mediaHTML}</div>
        <p class="apod-explanation">${data.explanation}</p>
      </main>
    `;
  })
  .catch((err) => {
    // Elegant fallback if the internet disconnects or API key is broken
    document.querySelector("#app").innerHTML = `
      <div class="error-container">
        <p>Error loading space data: ${err.message}</p>
      </div>
    `;
  });
