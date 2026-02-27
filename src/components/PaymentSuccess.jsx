import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PaymentSuccess() {
    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    useEffect(() => {
        // Refresh the user context so the app knows about the new premium membership tier
        refreshUser().then(() => {
            setTimeout(() => {
                navigate('/');
            }, 3000);
        });
    }, [refreshUser, navigate]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
            <h1 style={{ color: '#4CAF50', fontSize: '3rem', marginBottom: '1rem' }}>✅</h1>
            <h2>Payment Successful!</h2>
            <p>Your premium membership has been activated.</p>
            <p style={{ color: '#888', marginTop: '1rem', fontSize: '0.9rem' }}>Redirecting to home...</p>
        </div>
    );
}

export default PaymentSuccess;
