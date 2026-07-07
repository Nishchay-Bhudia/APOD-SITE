// Safely pulls key initialized by Vite's build tooling
const API_KEY = import.meta.env.VITE_NASA_API_KEY;

// Immediate layout visual placeholder to guarantee screen isn't blank
document.querySelector("#app").innerHTML = "<p class='loading'>loading...</p>";

// Initialize modern asynchronous network channel pipelines
fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
  .then(response => response.json())
  .then(data => {
    let media;

    // Challenge Evaluation: Check file media profile structure
    if (data.media_type === "image") {
      media = `<img src="${data.url}" alt="${data.title}" />`;
    } else if (data.media_type === "video" && data.url.includes("youtube")) {
      // Formats embedded responsive frames for YouTube video sources
      media = `<iframe src="${data.url}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else {
      // Fallback architecture for default raw video streams
      media = `<video src="${data.url}" controls></video>`;
    }

    // Unified DOM injection ensures elements append cleanly together
    document.querySelector("#app").innerHTML = `
      <h1>${data.title}</h1>
      ${media}
      <p>${data.explanation}</p>
    `;
  })
  .catch(err => {
    // Graceful visual safety fallback routing
    document.querySelector("#app").innerHTML = `<p class='error'>Error: ${err.message}</p>`;
  });
