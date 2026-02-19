import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './LearningCanvas.css';

// Simple word list for demo purposes
const WORD_DATA = {
    100: ['Apple', 'Ball', 'Cat', 'Dog', 'Elephant', 'Fish', 'Grape', 'Hat', 'Ice Cream', 'Juice'],
    1000: ['Astronaut', 'Butterfly', 'Crocodile', 'Dinosaur', 'Engineer'],
    3000: ['Architecture', 'Biodiversity', 'Constellation', 'Democracy']
};

function LearningCanvas() {
    const { count } = useParams();
    const words = WORD_DATA[count] || WORD_DATA[100]; // Default to 100 if not found
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const currentWord = words[currentIndex];

    const nextWord = () => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsPlaying(true);
        // Reset animation trigger
        setTimeout(() => setIsPlaying(false), 1000);
    };

    const prevWord = () => {
        setCurrentIndex((prev) => (prev - 1 + words.length) % words.length);
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 1000);
    };

    return (
        <div className="canvas-container">
            <Link to="/" className="back-btn">🏠 Home</Link>

            <div className="stage">
                <h2 className="current-word">{currentWord}</h2>

                <div className={`character ${isPlaying ? 'jump' : ''}`}>
                    {/* Simple CSS Character */}
                    <div className="face">😲</div>
                    <div className="body"></div>
                </div>

                <div className="controls">
                    <button onClick={prevWord} className="control-btn">⬅️ Previous</button>
                    <button onClick={nextWord} className="control-btn main">Next Word ➡️</button>
                </div>
            </div>
        </div>
    );
}

export default LearningCanvas;
