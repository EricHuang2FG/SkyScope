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
  buttonTrack.classList.add("track")
  buttonTrack.classList.add("description")

  card.appendChild(pElement);
  card.appendChild(imgElement);
  card.appendChild(buttonTrack);
  card.appendChild(buttonDescription);

  return card;
}
