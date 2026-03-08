import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function WordCategorySelection() {
    const navigate = useNavigate();

    const categories = [
        { id: 'age-3-5', count: 100, label: 'Ages 3-5 (100+ Words) 👶', colorClass: 'btn-100' },
        { id: 'age-6-10', count: 500, label: 'Ages 6-10 (500+ Words) 🧒', colorClass: 'btn-1000' },
        { id: 'age-10-12', count: 1500, label: 'Ages 10-12 (1500+ Words) 🧑', colorClass: 'btn-3000' },
        { id: 'age-12-16', count: 3000, label: 'Ages 12-16 (3000+ Words) 🧑‍🎓', colorClass: 'btn-purple' },
        { id: 'age-16-18', count: 5000, label: 'Ages 16-18 (5000+ Words) 🎓', colorClass: 'btn-gold' },
    ];

    const handleSelect = (category) => {
        navigate(`/scenarios/${category.id}`);
    };

    return (
        <div className="home-container">
            <h1 className="title">Select Your Level!</h1>
            <div className="button-group">
                {categories.map(cat => (
                    <button
                        key={cat.id}
                        className={`level-btn ${cat.colorClass}`}
                        onClick={() => handleSelect(cat)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>
            <div className="decoration">
                <div className="cloud"></div>
                <div className="sun"></div>
            </div>
        </div>
    );
}

export default WordCategorySelection;
