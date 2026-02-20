import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    const handleStart = (scenarioId) => {
        navigate(`/scenario/${scenarioId}`);
    };

    return (
        <div className="home-container">
            <h1 className="title">Fun English Scenarios!</h1>
            <div className="button-group">
                <button className="level-btn btn-100" onClick={() => handleStart('house')}>
                    🏠 In the House
                </button>
                <button className="level-btn btn-1000" onClick={() => handleStart('park')}>
                    🌳 At the Park
                </button>
                <button className="level-btn btn-3000" onClick={() => handleStart('school')}>
                    🏫 At School
                </button>
            </div>
            <div className="decoration">
                <div className="cloud"></div>
                <div className="sun"></div>
            </div>
        </div>
    );
}

export default Home;
