import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadTierData, SCENARIO_METADATA } from '../data/dictionary.js';
import './Scenario.css';

function Scenario() {
    const { wordCount, id } = useParams();
    // Fallback to a default scenario if the ID is not found in metadata
    const scenarioMeta = SCENARIO_METADATA[id] || SCENARIO_METADATA.home;
    // Fallback to an empty array if wordCount or ID is not found in DICTIONARY
    const [items, setItems] = useState(null);
    const [activeItem, setActiveItem] = useState(null);
    const [lockedItem, setLockedItem] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadTierData(wordCount);
            setItems(data.dictionary[id] || []);
        };
        fetchData();
    }, [wordCount, id]);

    const timeoutRef = useRef(null);

    // Stop speech synthesis when component unmounts
    useEffect(() => {
        return () => {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
            }
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const playSpeech = (item) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Stop any current speech
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }

            const utterWord = new SpeechSynthesisUtterance(item.word);
            const utterSentence = new SpeechSynthesisUtterance(item.sentence);

            // Forcing British English to fix the default OS synthesizer mispronouncing phonetic "Yak"
            utterWord.lang = 'en-GB';
            utterSentence.lang = 'en-GB';

            // Make the voice sound a bit friendlier for kids if possible
            utterWord.rate = 0.9;
            utterSentence.rate = 0.85;

            window.speechSynthesis.speak(utterWord);

            // Small pause before reading the sentence
            timeoutRef.current = setTimeout(() => {
                window.speechSynthesis.speak(utterSentence);
            }, 1000);
        }
    };

    const handleInteract = (item) => {
        // Do not interrupt the user's explicit selection if there's a locked item
        if (lockedItem) return;

        setActiveItem(item);
        playSpeech(item);
    };

    const handleClick = (item) => {
        // Toggle the lock off if they click it again
        if (lockedItem?.id === item.id) {
            setLockedItem(null);
            return;
        }

        setLockedItem(item);
        setActiveItem(item);
        playSpeech(item);
    };

    const handleMouseLeave = () => {
        if (lockedItem) {
            setActiveItem(lockedItem);
        } else {
            setActiveItem(null);
        }

        // Don't cancel speech on mouse leave so they can hear the full sentence
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

            {/* Moved learning-panel to the top immediately below header */}
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

            <div className="items-grid">
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={`item-card ${activeItem?.id === item.id ? 'active' : ''}`}
                        onClick={() => handleClick(item)}
                        onMouseEnter={() => handleInteract(item)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Render strings conditionally for advanced tiers vs emojis */}
                        {item.emoji === '' ? (
                            <div className="item-text-fallback" style={{ fontSize: '1.2rem', fontWeight: 'bold', padding: '10px' }}>{item.word}</div>
                        ) : (
                            <div className="item-icon">{item.emoji}</div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Scenario;
