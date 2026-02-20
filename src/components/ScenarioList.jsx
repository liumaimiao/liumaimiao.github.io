import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { loadTierData, getAvailableScenarios } from '../data/dictionary';
import './Scenario.css'; // Reusing scenario styles for grid layout

function ScenarioList() {
    const { wordCount } = useParams();
    const navigate = useNavigate();
    const [scenarios, setScenarios] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const data = await loadTierData(wordCount);
            setScenarios(getAvailableScenarios(data.dictionary));
        };
        fetchData();
    }, [wordCount]);

    // Formatting "age-3-5" to "Ages 3-5" for beautiful display
    const displayTitle = wordCount.replace('age-', 'Ages ').replace('-', '-');

    if (scenarios === null) {
        return <div className="scenario-container" style={{ backgroundColor: '#E0F7FA', textAlign: 'center', paddingTop: '50px' }}><h2>Loading topics...</h2></div>;
    }

    return (
        <div className="scenario-container" style={{ backgroundColor: '#E0F7FA' }}>
            <header className="scenario-header">
                <Link to="/" className="back-btn">⬅️ Back to Word Levels</Link>
                <h1>{displayTitle}: Choose a Scenario</h1>

                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to={`/dictionary/${wordCount}`} className="back-btn" style={{ background: '#9C27B0', color: 'white' }}>
                        📖 Dictionary View
                    </Link>
                    <Link to={`/phrases/${wordCount}`} className="back-btn" style={{ background: '#F57C00', color: 'white' }}>
                        💬 Functional Phrases
                    </Link>
                </div>
            </header>

            <div className="items-grid">
                {scenarios.map((s) => (
                    <div
                        key={s.id}
                        className="item-card"
                        onClick={() => navigate(`/scenario/${wordCount}/${s.id}`)}
                    >
                        <div style={{ textAlign: 'center' }}>
                            <div className="item-icon">{s.emoji}</div>
                            <h3 style={{ margin: '10px 0 0 0', color: '#555' }}>{s.title}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ScenarioList;
