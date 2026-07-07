


const API_KEY = "mU9zbe5WjHtdWsHJzzlChacuCRm8WqHQyDUMSbr6";


const app = document.getElementById("app");



app.innerHTML = `

<h1>
🚀 Loading NASA Data...
</h1>

`;



const url =
`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;



fetch(url)


.then(response => {


    console.log("NASA STATUS:", response.status);


    if(!response.ok){

        throw new Error(
            "NASA API Error: " + response.status
        );

    }


    return response.json();


})


.then(data => {


    console.log(data);



    let mediaHTML = "";



    if(data.media_type === "image"){


        mediaHTML = `

        <img 
        src="${data.hdurl || data.url}"
        alt="${data.title}"
        >

        `;


    }



    else if(data.media_type === "video"){


        if(data.url.includes("youtube")){


            const videoID =
            data.url.split("v=")[1];


            mediaHTML = `

            <iframe

            src="https://www.youtube.com/embed/${videoID}"

            allowfullscreen>

            </iframe>


            `;


        }


        else {


            mediaHTML = `

            <video controls>

            <source src="${data.url}">

            </video>


            `;


        }


    }



    app.innerHTML = `


    <h1>
    ${data.title}
    </h1>



    <div class="date">

    📅 ${data.date}

    </div>



    ${mediaHTML}




    <p>

    ${data.explanation}

    </p>



    `;



})


.catch(error => {


    console.error(error);



    app.innerHTML = `


    <h1 class="error">

    ❌ Something went wrong

    </h1>


    <p>

    ${error.message}

    </p>



    <p>

    Check your NASA API key.

    </p>


    `;



});
