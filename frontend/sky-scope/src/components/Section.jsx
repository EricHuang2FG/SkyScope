import { useState, useEffect } from 'react'
import Card from './Card'

function Section({title, data}) {
    return(
        <div className="section">
            <h2>{title}</h2>
            <div className="cards-section">
            </div>
        </div>
    )
}

export default Card