// NASA API KEY
// Replace this with your actual NASA API key
const API_KEY = "YOUR_NASA_API_KEY";


const app = document.querySelector("#app");


// Loading screen
app.innerHTML = `
    <p class="loading">
        Loading NASA image...
    </p>
`;


// Fetch APOD data

fetch(
    `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
)

.then(response => {

    if (!response.ok) {
        throw new Error("NASA API request failed");
    }

    return response.json();

})


.then(data => {


    let media;


    // Image

    if (data.media_type === "image") {


        media = `
            <img 
                src="${data.hdurl || data.url}"
                alt="${data.title}"
            >
        `;


    }


    // Youtube video

    else if (
        data.media_type === "video" &&
        data.url.includes("youtube")
    ) {


        let videoID = data.url.split("v=")[1];


        media = `
            <iframe
                src="https://www.youtube.com/embed/${videoID}"
                allowfullscreen>
            </iframe>
        `;


    }


    // Other videos

    else {


        media = `
            <video controls>
                <source src="${data.url}">
            </video>
        `;


    }



    app.innerHTML = `

        <h1>
            ${data.title}
        </h1>


        ${media}


        <p>
            ${data.explanation}
        </p>

    `;



})


.catch(error => {


    app.innerHTML = `

        <p class="error">
            Error: ${error.message}
        </p>

    `;


});
