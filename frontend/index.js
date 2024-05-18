const choices = ['Comets', 'Planets', 'Even more!', 'Stars'];
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
  imgElement.src = `${imagePath}`;
  buttonTrack.classList.add("track");
  buttonDescription.classList.add("description"); 
  overlayDiv.classList.add("overlay");

  card.appendChild(imgElement);
  card.appendChild(pElement);
  overlayDiv.appendChild(buttonTrack);
  overlayDiv.appendChild(buttonDescription);
  card.appendChild(overlayDiv);
  console.log("Hello");

  cardsElement.appendChild(card);
}

createCard("The Sun", "./media/sun.jpeg");
createCard("The Moon", "./media/moon.jpeg");
createCard("ISS (ZARYA)", "./media/iss.jpeg");
createCard("CSS (TIANHE)", "./media/css.png");
createCard("Mercury", "./media/mercury.jpeg");
createCard("Venus", "./media/venus.jpeg");
createCard("Mars", "./media/mars.jpeg");
createCard("Jupiter", "./media/jupiter.jpeg");
createCard("Saturn", "./media/saturn.jpeg");
createCard("Uranus", "./media/uranus.jpeg");
createCard("Neptune", "./media/neptune.jpeg");
createCard("Pluto", "./media/pluto.jpeg");

let trackers = document.getElementsByClassName("track"); 

function getPosition(event) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("Latitude:", position.coords.latitude);
      console.log("Longitude:", position.coords.longitude);
    },
    (error) => {
      console.error("Error getting position:", error);
    }
  );
}

function sendPositionToBackend(target, longitude, latitude, elevation) {
  let data = {
    "target": target,
    "longitude": longitude,
    "latitude": latitude,
    "elevation": elevation
  };

  fetch("http://localhost:8080/skyscope", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(data) 
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("network error saar");
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

document.addEventListener('DOMContentLoaded', (event) => {
  let trackers = document.getElementsByClassName("track");
  for (let i = 0; i < trackers.length; ++i) {
    trackers[i].addEventListener("click", getPosition);
  }
});
