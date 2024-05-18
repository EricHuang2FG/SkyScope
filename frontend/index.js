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
  imgElement.src = `assets/${imagePath}`;
  buttonTrack.classList.add("track");
  buttonTrack.classList.add("description");
  overlayDiv.classList.add("overlay");

  card.appendChild(imgElement);
  card.appendChild(pElement);
  overlayDiv.appendChild(buttonTrack);
  overlayDiv.appendChild(buttonDescription);
  card.appendChild(overlayDiv);
  console.log("Hello");

  cardsElement.appendChild(card);
}

createCard("Jupiter", "jupiter.jpg");

let trackers = document.getElementsByClassName("tracker");

function getPosition(event) {
  let position = navigator.geolocation.getCurrentPosition;
  console.log("Latitude", position.coords.latitude);
  console.log("Longitude", position.coords.longitude);
}

for (let i=0; i<trackers.length; ++i) {
  trackers[i].addEventListener("click", event => getPosition(event));
}
