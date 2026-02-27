import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { checkoutAlipay } from '../services/api';
import './PaymentModal.css';

function PaymentModal({ tier, onClose, onSuccess }) {
    const { user, refreshUser } = useAuth();
    const [method, setMethod] = useState('alipay');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const prices = {
        'age-10-12': '¥29.90',
        'age-12-16': '¥49.90',
        'age-16-18': '¥89.90'
    };

    const handleCheckout = async () => {
        if (!user) {
            setError('请先登录 / Please login first');
            return;
        }
        setLoading(true);
        setError('');
        try {
            if (method === 'alipay') {
                const data = await checkoutAlipay(tier.id);
                if (data.checkoutUrl) {
                    window.location.href = data.checkoutUrl;
                }
            }
        } catch (e) {
            setError(e.message || '支付失败 / Payment failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>解锁 / Unlock {tier.label}</h2>
                <p className="price-tag">价格 / Price: <span>{prices[tier.id] || '¥29.90'}</span></p>

                <div className="payment-methods">
                    <label className={`method ${method === 'alipay' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="payment"
                            checked={method === 'alipay'}
                            onChange={() => setMethod('alipay')}
                        />
                        Alipay 支付宝
                    </label>

                </div>

                {error && <p className="error-msg" style={{ color: '#f44336', margin: '0.5rem 0' }}>{error}</p>}

                <button
                    className="checkout-btn"
                    onClick={handleCheckout}
                    disabled={loading}
                >
                    {loading ? '处理中...' : `立即支付 / Pay Now ${prices[tier.id] || ''}`}
                </button>
            </div>
        </div>
    );
}

export default PaymentModal;
