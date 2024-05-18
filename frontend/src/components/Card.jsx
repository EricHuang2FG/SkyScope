import { useState, useEffect } from 'react'

function Card({ celestialBody }) {
    return(
        <div className="card">
            <img src={celestialBody.image} />
            <h3>{celestialBody.name}</h3>
        </div>
    )
}

export default Card