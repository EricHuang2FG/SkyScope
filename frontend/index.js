const choices = ['Space Stations', 'Planets', 'Even more!', 'Stars'];
let cardsElement = document.querySelector(".cards");
let index = 0;
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
let input;
searchInput.value = "";

const available_names = ["Sun", "The Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto", "ISS", "International Space Station", "Zarya", "CSS", "Tinahe"];
const available_objects = [
  {
  names: ["Sun", "The Sun"],
  image: "./media/sun.jpeg"
  },
  {
    names: ["Moon"],
    image: "./media/moon.jpeg"
  },
  {
    names:["Mercury"],
    image: "./media/mercury.jpeg"
  },
  {
    names: ["Venus"],
    image: "./media/venus.jpeg"
  },
  {
    names: ["Mars"],
    image: "./media/mars.jpeg"
  },
  {
    names:["Jupiter"],
    image: "./media/jupiter.jpeg"
  }, 
  {
    names: ["Saturn"],
    image: "./media/saturn.jpeg"
  },
  {
    names: ["Uranus"],
    image: "./media/uranus.jpeg"
  },
  {
    names: ["Neptune"],
    image: "./media/neptune.jpeg"
  },
  {
    names: ["Pluto"],
    image: "./media/pluto.jpeg"
  },
  {
    names: ["ISS", "International Space Station", "Zarya"],
    image: "./media/iss.jpeg"
  },
  {
    names: ["css", "Tinahe"],
    image: "./media/css.png"
  }
];

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

  cardsElement.appendChild(card);
}

function createDefaultCards() {
  for(let i = 0; i < available_objects.length; i++)
  {
    createCard(available_objects[i].names[0], available_objects[i].image);
  }
}


function changeText() {
  const switchBody = document.querySelector('.switch-body');
  switchBody.textContent = choices[index];
  switchBody.className = `switch-body ${choices[index]}`;
  index = (index + 1) % choices.length;
}

setInterval(changeText, 2500);



/*createCard("Sun", "./media/sun.jpeg");
createCard("Moon", "./media/moon.jpeg");
createCard("ISS (ZARYA)", "./media/iss.jpeg");
createCard("CSS (TIANHE)", "./media/css.png");
createCard("Mercury", "./media/mercury.jpeg");
createCard("Venus", "./media/venus.jpeg");
createCard("Mars", "./media/mars.jpeg");
createCard("Jupiter", "./media/jupiter.jpeg");
createCard("Saturn", "./media/saturn.jpeg");
createCard("Uranus", "./media/uranus.jpeg");
createCard("Neptune", "./media/neptune.jpeg");
createCard("Pluto", "./media/pluto.jpeg");*/

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
  createDefaultCards();
  for (let i = 0; i < trackers.length; ++i) {
    trackers[i].addEventListener("click", getPosition);
  }
});

/*  search */

function isObjectFound(name) {
  for(let i = 0; i < available_objects.length; i++) {
    if(available_names[i].toLocaleLowerCase() == name.toLowerCase())
    {
      return true;
    }
  }
  return false;
}

searchInput.addEventListener('input', (e) => {
  if(input != "")
  {
    input = e.target.value;
  }
  else
  {
    createDefaultCards();
  }

})

searchButton.addEventListener('click', (e) => {
  console.log(1);
  if(isObjectFound(input))
  {
    // delete current shown cards
    cardsElement.innerHTML = '';
    // show a card
    // get input and find a name from associated object that matches it
    for(let i = 0; i < available_objects.length; i++)
    {
      for(let j = 0; j < available_objects[i].names.length; j++)
      {
        // if input matches one of the names in the object
        if(available_objects[i].names[j].toLocaleLowerCase() == input.toLocaleLowerCase())
        {
          // create a card 
          createCard(available_objects[i].names[0], available_objects[i].image);
        }
      }
    }
    
  }
  else
  {
    // return object not found
    // show object not found
    cardsElement.innerHTML = '';
    const objectNotFound = document.createElement('h3');
    objectNotFound.textContent = "Object Not Found. Please try again later."
    cardsElement.appendChild(objectNotFound);
  }
})




