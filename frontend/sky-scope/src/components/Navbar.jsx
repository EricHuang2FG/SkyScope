import { useState, useEffect } from 'react'

function Navbar() {
    return(
        <div className="nav-bar">
            <h1>SkyScope</h1>
            <div className="search-bar">
                <input type="text"  onKeyDown={console.log("working")}  id="search" name="search" onChange={console.log("working")} value={""} placeholder="Search over 100+ celestial bodies: planets, moons, satellites, etc..." aria-label="Search bar" required/>
                <button type="submit" className="search-button" onClick={console.log("working")}>
                    <i className="fa fa-search"></i>
                </button>
            </div>
        </div>
    )
}

export default Navbar