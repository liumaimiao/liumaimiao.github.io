import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadTierData, SCENARIO_METADATA } from '../data/dictionary';
import './Scenario.css';

function Scenario() {
    const { wordCount, id } = useParams();
    // Fallback to a default scenario if the ID is not found in metadata
    const scenarioMeta = SCENARIO_METADATA[id] || SCENARIO_METADATA.home;
    // Fallback to an empty array if wordCount or ID is not found in DICTIONARY
    const [items, setItems] = useState(null);
    const [activeItem, setActiveItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadTierData(wordCount);
            setItems(data.dictionary[id] || []);
        };
        fetchData();
    }, [wordCount, id]);

    const handleInteract = (item) => {
        setActiveItem(item);
        // Web Speech API for Text-to-Speech
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Stop any current speech

            const utterWord = new SpeechSynthesisUtterance(item.word);
            const utterSentence = new SpeechSynthesisUtterance(item.sentence);

            // Make the voice sound a bit friendlier for kids if possible
            utterWord.rate = 0.9;
            utterSentence.rate = 0.85;

            window.speechSynthesis.speak(utterWord);

            // Small pause before reading the sentence
            setTimeout(() => {
                window.speechSynthesis.speak(utterSentence);
            }, 1000);
        }
    };

    // Formatting "age-3-5" to "Ages 3-5" for beautiful display
    const displayTitle = wordCount.replace('age-', 'Ages ').replace('-', '-');

    if (items === null) {
        return <div className="scenario-container" style={{ backgroundColor: scenarioMeta.background, textAlign: 'center', paddingTop: '50px' }}><h2>Loading scene...</h2></div>;
    }

    return (
        <div className="scenario-container" style={{ backgroundColor: scenarioMeta.background }}>
            <header className="scenario-header">
                <Link to={`/scenarios/${wordCount}`} className="back-btn">⬅️ Back to {displayTitle}</Link>
                <h1>{scenarioMeta.title} ({displayTitle} Tier)</h1>
            </header>

            <div className="items-grid">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={`item-card ${activeItem?.id === item.id ? 'active' : ''}`}
                        onClick={() => handleInteract(item)}
                        onMouseEnter={() => handleInteract(item)}
                    >
                        <div className="item-icon">{item.emoji}</div>
                    </div>
                ))}
            </div>

            {activeItem ? (
                <div className="learning-panel">
                    <div className="panel-word">{activeItem.word}</div>
                    <div className="panel-sentence">{activeItem.sentence}</div>
                </div>
            ) : (
                <div className="learning-panel hint">
                    <div className="panel-sentence">Hover or tap an object to hear its name!</div>
                </div>
            )}
        </div>
    );
}

export default Scenario;
