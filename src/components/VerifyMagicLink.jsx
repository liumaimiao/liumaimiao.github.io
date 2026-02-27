import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyMagicLink } from '../services/api';
import { useAuth } from '../context/AuthContext';

function VerifyMagicLink() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { refreshUser } = useAuth();
    const [status, setStatus] = useState('Verifying your login...');

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            setStatus('Error: Missing token');
            return;
        }

        const verify = async () => {
            try {
                await verifyMagicLink(token);
                setStatus('Login successful! Redirecting...');
                await refreshUser();

                // Add a small delay so user sees success message
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } catch (err) {
                setStatus(`Error: ${err.message || 'Invalid or expired token'}`);
            }
        };

        verify();
    }, [searchParams, navigate, refreshUser]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center' }}>
            <h2>{status}</h2>
            {status.startsWith('Error') && (
                <button
                    onClick={() => navigate('/')}
                    style={{ marginTop: '20px', padding: '10px 20px', borderRadius: '8px', background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                    Return Home
                </button>
            )}
        </div>
    );
}

export default VerifyMagicLink;
