import { useState, useEffect } from 'react'

function Card({ celestialBody }) {
    return(
        <div className="card">
            <img src={celestialBody.image} />
            <h3>{celestialBody.name}</h3>
            <div className="overlay">
                <button id="tracking-button">Track Me</button>
                <button id="learning-button">Learn More</button>
            </div>
        </div>
    )
}

export default Card