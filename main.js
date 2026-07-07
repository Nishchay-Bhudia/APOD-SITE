// 1. Safe extraction of your environment variable via Vite structures
const API_KEY = import.meta.env.VITE_NASA_API_KEY;

// 2. Set structural placeholder to present clean loading state instantly
document.querySelector("#app").innerHTML = `
  <div class="loader-container">
    <p class="loading-text">FETCHING COSMIC DATA...</p>
  </div>
`;

// 3. Initiate pipeline fetch request towards NASA servers
fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
  .then((response) => {
    // Gracefully parse problems if HTTP communication breaks
    if (!response.ok) {
      throw new Error(`HTTP Error Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    let mediaHTML = "";

    // 4. Handle three potential media formats: regular images, YouTube embeds, or custom direct videos
    if (data.media_type === "image") {
      mediaHTML = `<img class="apod-media" src="${data.url}" alt="${data.title}" />`;
    } else if (data.media_type === "video" && data.url.includes("youtube")) {
      mediaHTML = `
        <div class="video-wrapper">
          <iframe src="${data.url}" allowfullscreen></iframe>
        </div>`;
    } else if (data.media_type === "video") {
      mediaHTML = `<video class="apod-media" src="${data.url}" controls></video>`;
    } else {
      mediaHTML = `<p style="padding: 2rem;">Detected unrenderable interstellar format.</p>`;
    }

    // 5. Build presentation wrapper and output to DOM in one clean injection pass
    document.querySelector("#app").innerHTML = `
      <main class="content-container">
        <h1 class="apod-title">${data.title}</h1>
        <div class="media-container">
          ${mediaHTML}
        </div>
        <p class="apod-explanation">${data.explanation}</p>
      </main>
    `;
  })
  .catch((err) => {
    // 6. Handle runtime network discrepancies or missing application keys seamlessly
    document.querySelector("#app").innerHTML = `
      <div class="error-container">
        <div class="error-card">
          <p style="font-weight: 900; margin-bottom: 0.5rem;">MISSION MALFUNCTION</p>
          <p style="font-size: 0.9rem; opacity: 0.85;">${err.message}</p>
        </div>
      </div>
    `;
  });
