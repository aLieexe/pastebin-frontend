import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
    return (
        <nav className="navigation">
            <Link to="/" className="navLink">view pastes</Link>
            <Link to="/create" className="navLink">create paste</Link>
        </nav>
    );
};

export default Navigation;