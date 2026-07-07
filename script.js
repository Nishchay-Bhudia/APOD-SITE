const API_KEY = import.meta.env.VITE_NASA_API_KEY;

const app = document.querySelector("#app");

app.innerHTML = "<p class='loading'>Loading...</p>";

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
    .then(response => {

        if (!response.ok) {
            throw new Error("NASA API request failed.");
        }

        return response.json();

    })

    .then(data => {

        let media = "";

        if (data.media_type === "image") {

            media = `
                <img
                    src="${data.hdurl || data.url}"
                    alt="${data.title}"
                >
            `;

        }

        else if (data.url.includes("youtube")) {

            media = `
                <iframe
                    src="${data.url}"
                    allowfullscreen>
                </iframe>
            `;

        }

        else if (data.url.includes("vimeo")) {

            media = `
                <iframe
                    src="${data.url}"
                    allowfullscreen>
                </iframe>
            `;

        }

        else {

            media = `
                <video controls>
                    <source src="${data.url}">
                </video>
            `;

        }

        app.innerHTML = `
            <h1>${data.title}</h1>

            ${media}

            <p>${data.explanation}</p>
        `;

    })

    .catch(error => {

        app.innerHTML = `
            <p class="error">
                ${error.message}
            </p>
        `;

    });
