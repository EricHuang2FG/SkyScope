const choices = ['Space Stations', 'Planets', 'Even more!', 'Stars'];

let cardsElement = document.querySelector(".cards");
let index = 0;

function changeText() {
  const switchBody = document.querySelector('.switch-body');
  switchBody.textContent = choices[index];
  switchBody.className = `switch-body ${choices[index]}`;
  index = (index + 1) % choices.length;
}

setInterval(changeText, 2500);

function createCard(name, imagePath) {
  let card = document.createElement("div");
  let pElement = document.createElement("p");
  let imgElement = document.createElement("img");
  let overlayDiv = document.createElement("div");
  let buttonTrack = document.createElement("button");
  let buttonDescription = document.createElement("button");

  buttonTrack.textContent = "Track";
  buttonDescription.textContent = "Description";

  card.classList.add("card");
  pElement.textContent = name;
  imgElement.src = `${staticBaseURL}${imagePath}`; 
  buttonTrack.classList.add("track");
  buttonDescription.classList.add("description");
  overlayDiv.classList.add("overlay");

  card.appendChild(imgElement);
  card.appendChild(pElement);
  overlayDiv.appendChild(buttonTrack);
  overlayDiv.appendChild(buttonDescription);
  card.appendChild(overlayDiv);
  cardsElement.appendChild(card);
}

const cards = [
  { name: "ISS (ZARYA)", image: "iss.png" },
  { name: "CSS (TIANHE)", image: "css.png" },
  { name: "Mercury", image: "mercury.jpeg" },
  { name: "Venus", image: "venus.jpeg" },
  { name: "Mars", image: "mars.jpeg" },
  { name: "Jupiter", image: "jupiter.jpeg" },
  { name: "Saturn", image: "saturn.jpeg" },
  { name: "Uranus", image: "uranus.jpeg" },
  { name: "Neptune", image: "neptune.jpeg" },
  { name: "Pluto", image: "pluto.jpeg" },
  { name: "The Moon", image: "moon.jpeg" }
];

cards.forEach(card => createCard(card.name, card.image));

function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.error("Error getting position:", error);
        reject(error);
      }
    );
  });
}

function sendPositionToBackend(target, longitude, latitude, elevation) {
  let data = {
    "target": target,
    "longitude": longitude,
    "latitude": latitude,
    "elevation": elevation
  };

  fetch("https://localhost:9001/skyscope", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Network error");
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error("Error:", error);
  });
}

function gatherData(event) {
  const card = event.target.closest(".card");
  const target = card.querySelector("p").textContent;
  const elevation = 45.72;

  getPosition()
    .then(position => {
      const { longitude, latitude } = position;
      sendPositionToBackend(target, longitude, latitude, elevation);
      console.log("Successfully Sent information");
      console.log(target, longitude, latitude, elevation);
    })
    .catch(error => {
      console.error("Failed to get position:", error);
    });
}

let trackElements = document.getElementsByClassName("track");
for (let i = 0; i < trackElements.length; ++i) {
  trackElements[i].addEventListener("click", (event) => gatherData(event));
}
