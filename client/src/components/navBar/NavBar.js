import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css';

export default function NavBar(){
    return (
        <div className={styles.container}>       
            <nav className={styles.navbar}>   
                <ul>
                <li> <NavLink to="/home">Home</NavLink></li>
                <li className={styles.createAct}> <NavLink to={`/create-activity`}>Create Activity</NavLink></li>
                <li> <NavLink exact to="/about">About</NavLink></li>
                </ul> 
            </nav>
        </div>
        
    )
}