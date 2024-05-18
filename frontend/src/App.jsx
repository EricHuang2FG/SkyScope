import { useState, useEffect } from 'react'
import './styles/App.css'
import Navbar from './components/Navbar'
import Section from './components/Section'


function App() {

  const celestial_bodies = [
    {
      name: "The Moon",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/1200px-FullMoon2010.jpg"
    }, 
    {
      name: "Jupiter",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Jupiter_New_Horizons.jpg/290px-Jupiter_New_Horizons.jpg"
    }, 
    {
      name: "Saturn",
      image: "https://cdn.mos.cms.futurecdn.net/TWpr5dTCno77m2J2aFgLxD-1200-80.jpg"
    },
    {
      name: "Uranus",
      image: "https://c02.purpledshub.com/uploads/sites/48/2020/04/Hubble_Uranus-7f9693c.jpg?w=1029&webp=1"
    }, 
    {
      name: "Neptune",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg/200px-Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg"
    }, 
    {
      name: "Mercury",
      image: "https://cdn.mos.cms.futurecdn.net/fjbeeRiPRQjQNhizwy7cWX-1200-80.jpg"
    },
    {
      name: "Venus",
      image: "https://c02.purpledshub.com/uploads/sites/48/2020/04/Hubble_Uranus-7f9693c.jpg?w=1029&webp=1"
    }, 
    {
      name: "Mars",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYwt8timVtSWNmBhA4tIGxuG22fVU0eOnBOSJA-QQmeg&s"
    },
    {
      name: "ISS (ZARYA)",
      image: "https://upload.wikimedia.org/wikipedia/commons/d/db/Zarya_from_STS-88.jpg"
    },
    {
      name: "CSS (TIANHE)",
      image: "https://db-satnogs.freetls.fastly.net/media/satellites/css.jpg"
    },
    {
      name: "Pluto",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2WpyWoeHPCAc4mFrt1lhGwtgxfEuRLuqdALzvSLrcRg&s"
    },
    {
      name: "The Sun",
      image: "https://images.nationalgeographic.org/image/upload/t_edhub_resource_key_image/v1638882786/EducationHub/photos/sun-blasts-a-m66-flare.jpg"
    }

  ]
  

  // generate random number from 0 to 10
  const random_num = () => {
    return Math.floor(Math.random() * (celestial_bodies.length - 1));
  }
  

  // Data taken from local storage for most recent searches
  const recent_data = [celestial_bodies[0], celestial_bodies[1], celestial_bodies[2]];
  const random_data = [celestial_bodies[4], celestial_bodies[7], celestial_bodies[9]];



  return (
    <div className="App container">
      <Navbar />
      <Section title="Most recent searches" celestialBodies={recent_data}/>
      <Section title="Random finds" celestialBodies={random_data}/>
    </div>
  )
}

export default App
