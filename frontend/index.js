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
  let buttonTrack = document.createElement("button");
  let buttonDescription = document.createElement("button");

  card.classList.add("card");
  pElement.textContent = name;
  imgElement.src = `assets/${imagePath}`;
  buttonTrack.classList.add("track");
  buttonTrack.textContent = "Track"; 
  buttonDescription.classList.add("description");
  buttonDescription.textContent = "Description"; 

  card.appendChild(pElement);
  card.appendChild(imgElement);
  card.appendChild(buttonTrack);
  card.appendChild(buttonDescription);
  console.log("Hello");

  cardsElement.appendChild(card);
}

createCard("Jupiter", "jupiter.jpg");

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

  fetch("localhost:8080/skyscope", {
    method: "POST",
    headers: {
      "Content-Type": "applications/json"
    },
    body: JSON.stringify(data);
  }) 
    .then(response => {
      if (!response.ok) {
        throw new Error("network error saar");
      }
      return response.json();
    })
}

document.addEventListener('DOMContentLoaded', (event) => {
  let trackers = document.getElementsByClassName("track");
  for (let i = 0; i < trackers.length; ++i) {
    trackers[i].addEventListener("click", getPosition);
  }
});
