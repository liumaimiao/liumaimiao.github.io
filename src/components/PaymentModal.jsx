import React, { useState } from 'react';
import './PaymentModal.css';

function PaymentModal({ tier, onClose, onSuccess }) {
    const [method, setMethod] = useState('alipay');

    const prices = {
        'age-10-12': '¥29.90',
        'age-12-16': '¥49.90',
        'age-16-18': '¥89.90'
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>Unlock {tier.label}</h2>
                <p className="price-tag">Price: <span>{prices[tier.count]}</span></p>

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
                    <label className={`method ${method === 'wechat' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="payment"
                            checked={method === 'wechat'}
                            onChange={() => setMethod('wechat')}
                        />
                        WeChat 微信支付
                    </label>
                </div>

                <div className="qr-container">
                    <div className="mock-qr">
                        [ Scan {method === 'alipay' ? 'Alipay' : 'WeChat'} QR Code ]
                    </div>
                    <p className="scan-hint">Please scan the QR code to proceed</p>
                </div>

                {/* This button exists only for demo purposes to simulate a successful webhook response */}
                <button className="simulate-btn" onClick={onSuccess}>
                    (Demo) Simulate Payment Success
                </button>
            </div>
        </div>
    );
}

export default PaymentModal;
