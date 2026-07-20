# NASA Astronomy Picture of the Day (APOD)

A website that uses NASA's Astronomy Picture of the Day API to display the latest astronomy image or video from NASA. The website shows the title, date, media, and explanation behind each daily astronomy feature.

This project was created using HTML, CSS, and JavaScript and deployed using Vercel.

---

## About the Project

The aim of this project was to create an interactive website that automatically updates with new content from NASA. Instead of manually adding new images and information, the website connects to NASA's APOD API and retrieves the latest data whenever the page is loaded.

The project helped develop my understanding of JavaScript, APIs, responsive design, and creating websites that work with external data.

---

## Features

- Connects to NASA's Astronomy Picture of the Day API
- Automatically displays the latest astronomy content
- Shows the image or video provided by NASA
- Displays the title, date, and explanation
- Handles different media types including images and videos
- Includes a loading message while data is being fetched
- Includes error handling if the API request fails
- Responsive design for desktop and mobile devices
- Space-themed styling and layout

---

## Technologies Used

HTML5

CSS3

JavaScript

NASA APOD API

Vercel for deployment

---

## Project Structure
APOD-SITE/
|
|-- index.html
|-- style.css
|-- main.js
|-- README.md

## How It Works

When the website loads, JavaScript sends a request to the NASA APOD API.

The API returns information including:

- The astronomy image or video
- The title
- The date
- The explanation

The website then takes this information and displays it automatically on the page.

If the API returns an image, the website displays it as an image.

If the API returns a video, the website changes the display to support video content.

---

## Design

The website is styled like a dark astronomy journal rather than a typical space-themed dashboard.

The design includes:

- A near-black background with a single warm accent colour
- A serif display font for titles, monospace for the date/label
- A two-column layout for the image and explanation on larger screens
- Hairline borders instead of glow/blur effects
- Responsive layouts for different screen sizes

The goal was to create a design that matches the theme of astronomy while keeping the information easy to read.

---
