import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import avatar from '../Assets/images/avatar-icon.png'

export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
    
    return (
        <>
        <header>
            <Link className="site-logo" to="/">#<span>RentNow</span></Link>
            <nav className="nav-bar">
                <NavLink 
                    to="host"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Host
                </NavLink>
                <NavLink 
                    to="about"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    About
                </NavLink>
                <NavLink 
                    to="rooms"
                    style={({isActive}) => isActive ? activeStyles : null}
                >
                    Rooms
                </NavLink>
                <Link to="login" className="login-link">
                    <img 
                        src={avatar} 
                        alt='Login'
                        className="login-icon"
                    />
                </Link>
            </nav>
        </header>
        <hr className="header-divider" />
        </>
    )
}