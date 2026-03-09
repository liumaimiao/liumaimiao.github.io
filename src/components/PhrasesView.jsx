import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadTierData } from '../data/dictionary.js';
import './DictionaryView.css'; // Reusing dictionary styles where applicable

function PhrasesView() {
    const { wordCount } = useParams();
    const [phraseGroups, setPhraseGroups] = useState(null);
    const displayTitle = wordCount.replace('age-', 'Ages ').replace('-', '-');

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadTierData(wordCount);
            setPhraseGroups(data.phrases);
        };
        fetchData();
    }, [wordCount]);

    const handleSpeak = (text) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            // Attempt to use a British voice if available
            const voices = window.speechSynthesis.getVoices();
            const ukVoice = voices.find(v => v.lang === 'en-GB' || v.lang === 'en_GB');
            if (ukVoice) {
                utterance.voice = ukVoice;
            }
            utterance.rate = 0.85;
            window.speechSynthesis.speak(utterance);
        }
    };

    if (phraseGroups === null) {
        return <div className="dictionary-container" style={{ textAlign: 'center', paddingTop: '50px' }}><h2>Loading phrases...</h2></div>;
    }

    return (
        <div className="dictionary-container">
            <header className="dictionary-header">
                <Link to={`/scenarios/${wordCount}`} className="back-btn">⬅️ Back to Scenarios</Link>
                <h1>Functional Phrases ({displayTitle})</h1>
            </header>

            <div className="dictionary-list">
                {phraseGroups.length === 0 ? (
                    <p className="empty-state">No phrases found for this tier yet!</p>
                ) : (
                    phraseGroups.map((group) => (
                        <div key={group.id} className="phrase-group-card">
                            <div className="phrase-group-header">
                                <span className="group-emoji">{group.emoji}</span>
                                <h2>{group.title}</h2>
                            </div>
                            <div className="phrases-list">
                                {group.phrases.map((phrase, idx) => (
                                    <div key={idx} className={`phrase-row ${phrase.q ? 'qa-row' : ''}`}>
                                        {phrase.q ? (
                                            <div className="qa-container">
                                                <div className="qa-item">
                                                    <span className="qa-label q-label">Q:</span>
                                                    <p className="qa-text">{phrase.q}</p>
                                                    <button className="listen-mini-btn" onClick={() => handleSpeak(phrase.q)}>🔊</button>
                                                </div>
                                                <div className="qa-item">
                                                    <span className="qa-label a-label">A:</span>
                                                    <p className="qa-text">{phrase.a}</p>
                                                    <button className="listen-mini-btn" onClick={() => handleSpeak(phrase.a)}>🔊</button>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <p>{phrase.text || phrase}</p>
                                                <button className="listen-mini-btn" onClick={() => handleSpeak(phrase.text || phrase)}>🔊</button>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default PhrasesView;
