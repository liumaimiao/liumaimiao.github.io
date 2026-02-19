import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    const handleStart = (wordCount) => {
        navigate(`/learn/${wordCount}`);
    };

    return (
        <div className="home-container">
            <h1 className="title">Fun English for Kids!</h1>
            <div className="button-group">
                <button className="level-btn btn-100" onClick={() => handleStart(100)}>
                    100 Words
                </button>
                <button className="level-btn btn-1000" onClick={() => handleStart(1000)}>
                    1000 Words
                </button>
                <button className="level-btn btn-3000" onClick={() => handleStart(3000)}>
                    3000 Words
                </button>
            </div>
            <div className="decoration">
                {/* Placeholder for cartoon assets */}
                <div className="cloud"></div>
                <div className="sun"></div>
            </div>
        </div>
    );
}

export default Home;
