import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentModal from './PaymentModal';
import './Home.css'; // Reuse home styles

function WordCategorySelection() {
    const navigate = useNavigate();
    const [showPayment, setShowPayment] = useState(false);
    const [selectedPremiumTier, setSelectedPremiumTier] = useState(null);

    const categories = [
        { id: 'age-3-5', count: 100, label: 'Ages 3-5 (100+ Words)', isPremium: false, colorClass: 'btn-100' },
        { id: 'age-6-10', count: 500, label: 'Ages 6-10 (500+ Words)', isPremium: false, colorClass: 'btn-1000' },
        { id: 'age-10-12', count: 1500, label: 'Ages 10-12 (1500+ Words)', isPremium: true, colorClass: 'btn-3000' },
        { id: 'age-12-16', count: 3000, label: 'Ages 12-16 (3000+ Words)', isPremium: true, colorClass: 'btn-purple' },
        { id: 'age-16-18', count: 5000, label: 'Ages 16-18 (5000+ Words)', isPremium: true, colorClass: 'btn-gold' },
    ];

    const handleSelect = (category) => {
        if (category.isPremium) {
            // Check if unlocked (in a real app, this would check user state/backend)
            const isUnlocked = localStorage.getItem(`unlocked_${category.id}`);
            if (isUnlocked) {
                navigate(`/scenarios/${category.id}`);
            } else {
                setSelectedPremiumTier(category);
                setShowPayment(true);
            }
        } else {
            navigate(`/scenarios/${category.id}`);
        }
    };

    const handlePaymentSuccess = () => {
        // Mock unlock: save to local storage
        localStorage.setItem(`unlocked_${selectedPremiumTier.id}`, 'true');
        setShowPayment(false);
        navigate(`/scenarios/${selectedPremiumTier.id}`);
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
                        {cat.label} {cat.isPremium && !localStorage.getItem(`unlocked_${cat.id}`) && '🔒'}
                    </button>
                ))}
            </div>
            <div className="decoration">
                <div className="cloud"></div>
                <div className="sun"></div>
            </div>

            {showPayment && (
                <PaymentModal
                    tier={selectedPremiumTier}
                    onClose={() => setShowPayment(false)}
                    onSuccess={handlePaymentSuccess}
                />
            )}
        </div>
    );
}

export default WordCategorySelection;
