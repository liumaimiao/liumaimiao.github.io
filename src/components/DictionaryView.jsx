import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { loadTierData, getSortedDictionary } from '../data/dictionary';
import './DictionaryView.css';

function DictionaryView() {
    const { wordCount } = useParams();
    const [words, setWords] = useState(null);
    const displayTitle = wordCount.replace('age-', 'Ages ').replace('-', '-');

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadTierData(wordCount);
            setWords(getSortedDictionary(data.dictionary));
        };
        fetchData();
    }, [wordCount]);

    const handleSpeak = (word, sentence) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterWord = new SpeechSynthesisUtterance(word);
            const utterSentence = new SpeechSynthesisUtterance(sentence);
            utterWord.rate = 0.9;
            utterSentence.rate = 0.85;
            window.speechSynthesis.speak(utterWord);
            setTimeout(() => {
                window.speechSynthesis.speak(utterSentence);
            }, 1000);
        }
    };

    if (words === null) {
        return <div className="dictionary-container" style={{ textAlign: 'center', paddingTop: '50px' }}><h2>Loading dictionary...</h2></div>;
    }

    return (
        <div className="dictionary-container">
            <header className="dictionary-header">
                <Link to={`/scenarios/${wordCount}`} className="back-btn">⬅️ Back to Scenarios</Link>
                <h1>Dictionary ({displayTitle})</h1>
            </header>

            <div className="dictionary-list">
                {words.length === 0 ? (
                    <p className="empty-state">No words found for this tier yet!</p>
                ) : (
                    words.map((item) => (
                        <div key={item.id} className="dictionary-card">
                            <div className="dict-icon">{item.emoji}</div>
                            <div className="dict-content">
                                <h2 className="dict-word">{item.word}</h2>
                                <p className="dict-sentence">{item.sentence}</p>
                            </div>
                            <button className="listen-btn" onClick={() => handleSpeak(item.word, item.sentence)}>
                                🔊 Listen
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default DictionaryView;
