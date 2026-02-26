import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PaymentModal from './PaymentModal';
import LoginModal from './LoginModal';
import './Home.css';

function WordCategorySelection() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [showPayment, setShowPayment] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [selectedPremiumTier, setSelectedPremiumTier] = useState(null);

    const categories = [
        { id: 'age-3-5', count: 100, label: 'Ages 3-5 (100+ Words)', isPremium: false, colorClass: 'btn-100' },
        { id: 'age-6-10', count: 500, label: 'Ages 6-10 (500+ Words)', isPremium: false, colorClass: 'btn-1000' },
        { id: 'age-10-12', count: 1500, label: 'Ages 10-12 (1500+ Words)', isPremium: true, colorClass: 'btn-3000' },
        { id: 'age-12-16', count: 3000, label: 'Ages 12-16 (3000+ Words)', isPremium: true, colorClass: 'btn-purple' },
        { id: 'age-16-18', count: 5000, label: 'Ages 16-18 (5000+ Words)', isPremium: true, colorClass: 'btn-gold' },
    ];

    const isPremiumUnlocked = () => {
        return user && user.membership === 'premium';
    };

    const handleSelect = (category) => {
        if (category.isPremium) {
            if (isPremiumUnlocked()) {
                navigate(`/scenarios/${category.id}`);
            } else if (!user) {
                // Not logged in – show login first
                setSelectedPremiumTier(category);
                setShowLogin(true);
            } else {
                // Logged in but not premium – show payment
                setSelectedPremiumTier(category);
                setShowPayment(true);
            }
        } else {
            navigate(`/scenarios/${category.id}`);
        }
    };

    const handlePaymentSuccess = () => {
        setShowPayment(false);
        if (selectedPremiumTier) {
            navigate(`/scenarios/${selectedPremiumTier.id}`);
        }
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
                        {cat.label} {cat.isPremium && !isPremiumUnlocked() && '🔒'}
                    </button>
                ))}
            </div>
            <div className="decoration">
                <div className="cloud"></div>
                <div className="sun"></div>
            </div>

            {showPayment && selectedPremiumTier && (
                <PaymentModal
                    tier={selectedPremiumTier}
                    onClose={() => setShowPayment(false)}
                    onSuccess={handlePaymentSuccess}
                />
            )}

            {showLogin && (
                <LoginModal
                    onClose={() => {
                        setShowLogin(false);
                        // After successful login, if premium, navigate; else show payment
                    }}
                />
            )}
        </div>
    );
}

export default WordCategorySelection;
