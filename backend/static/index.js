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

  // buttonTrack.addEventListener("click", (event) => trackCard(name, imagePath));
  buttonDescription.addEventListener("click", (event) => showDescription(name));
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
  { name: "Moon", image: "moon.jpeg" }
];

cards.forEach(card => createCard(card.name, card.image));

function trackCard(name, imagePath) {
  const url = new URL(window.location.href);
  url.pathname = '/results';
  url.searchParams.set('name', name);
  url.searchParams.set('image', imagePath);
  window.location.href = url.toString();
}

function showDescription(name) {
  const wikiURLs = {
    "ISS (ZARYA)": "https://en.wikipedia.org/wiki/Zarya_(ISS_module)",
    "CSS (TIANHE)": "https://en.wikipedia.org/wiki/Tianhe_core_module",
    "Mercury": "https://en.wikipedia.org/wiki/Mercury_(planet)",
    "Venus": "https://en.wikipedia.org/wiki/Venus",
    "Mars": "https://en.wikipedia.org/wiki/Mars",
    "Jupiter": "https://en.wikipedia.org/wiki/Jupiter",
    "Saturn": "https://en.wikipedia.org/wiki/Saturn",
    "Uranus": "https://en.wikipedia.org/wiki/Uranus",
    "Neptune": "https://en.wikipedia.org/wiki/Neptune",
    "Pluto": "https://en.wikipedia.org/wiki/Pluto",
    "Moon": "https://en.wikipedia.org/wiki/Moon"
  };

  const url = wikiURLs[name];
  if (url) {
    window.location.href = url;
  } else {
    alert(`No Wikipedia page found for ${name}`);
  }
}

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

function sendPositionToBackend(target, latitude, longitude, elevation) {
  return new Promise((resolve, reject) => {
    let data = {
      "target": target,
      "latitude": latitude,
      "longitude": longitude,
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
      resolve(data)
    })
    .catch(error => {
      console.error("Error:", error);
      reject(error)
    });
  })
  
}

function gatherData(event) {
  const card = event.target.closest(".card");
  const target = card.querySelector("p").textContent;
  const elevation = 338;

  document.getElementById("loading").style.display = "block"

  getPosition()
    .then(position => {
      const { latitude, longitude } = position;
      return sendPositionToBackend(target, latitude, longitude, elevation);
    }).then(data => {
      console.log("Successfully Sent information");
      console.log(target);

      let image = ''

      for(const object of cards) {
        if(object.name == target) {
          image = object.image
          break;
        }
      }

      console.log(`track ${target} ${image}`)

      trackCard(target, image)
    })
    .catch(error => {
      console.error("Failed to get position:", error);
    });
}

let trackElements = document.getElementsByClassName("track");
for (let i = 0; i < trackElements.length; ++i) {
  trackElements[i].addEventListener("click", (event) => gatherData(event));
}

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const cardElements = document.querySelectorAll(".card");
  
  cardElements.forEach(card => {
    const cardName = card.querySelector("p").textContent.toLowerCase();
    if (cardName.includes(searchTerm)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});