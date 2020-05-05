import React from 'react';
import { Link } from 'react-router-dom'
import icon from '../Pizza.jpg'

const HomePage = () => {

    return (
        <nav>

            <h1>Lambda Eats The Best Pizza in Town</h1>
            <img src={icon}/>
            

        </nav>

    )
}

export default HomePage;
