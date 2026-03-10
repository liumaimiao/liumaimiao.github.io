import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function WordCategorySelection() {
    const navigate = useNavigate();

    const categories = [
        { id: 'age-3-5', count: 200, label: 'Ages 3-5 (Foundational Words) 👶', colorClass: 'btn-100' },
        { id: 'age-6-10', count: 200, label: 'Ages 6-10 (Beginner Words) 👦', colorClass: 'btn-1000' },
        { id: 'age-10-12', count: 200, label: 'Ages 10-12 (Intermediate Words) 👨', colorClass: 'btn-3000' },
        { id: 'age-12-16', count: 200, label: 'Ages 12-16 (Academic Words) 👩‍🎓', colorClass: 'btn-purple' },
        { id: 'age-16-18', count: 200, label: 'Ages 16-18 (Mastery Words) 🎓', colorClass: 'btn-gold' },
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

            <div className="video-section">
                <h2 className="video-title">少儿英文启蒙短视频</h2>
                <div className="video-thumbnails">
                    <img src="/video_placeholder_1.jpg" alt="启蒙短视频 1" className="video-img" />
                    <img src="/video_placeholder_2.jpg" alt="启蒙短视频 2" className="video-img" />
                </div>
            </div>

            <div className="decoration">
                <div className="cloud"></div>
                <div className="sun"></div>
            </div>
        </div>
    );
}

export default WordCategorySelection;
