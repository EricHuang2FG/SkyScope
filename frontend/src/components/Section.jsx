import { useState, useEffect } from 'react'
import Card from './Card'

function Section({title, celestialBodies}) {

    return(
        <section className="section">
            <h2>{title}</h2>
            <div className="cards-section">
                {celestialBodies.map((body) => {
                    return <Card celestialBody={body}/>
                })}
            </div>
        </section>
    )
}

export default Section