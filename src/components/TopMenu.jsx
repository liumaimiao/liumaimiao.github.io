import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './TopMenu.css';

const TopMenu = () => {
    const location = useLocation();
    const isEnglishActive = location.pathname === '/' ||
        ['/scenario', '/dictionary', '/phrases'].some(p => location.pathname.startsWith(p));

    return (
        <nav className="top-menu">
            <div className="menu-container">
                <NavLink to="/" className={`menu-item ${isEnglishActive ? 'active' : ''}`}>
                    English
                </NavLink>
                <NavLink to="/stem" className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}>
                    STEM
                </NavLink>
                <NavLink to="/about" className={({ isActive }) => (isActive ? 'menu-item active' : 'menu-item')}>
                    About
                </NavLink>
            </div>
        </nav>
    );
};

export default TopMenu;
