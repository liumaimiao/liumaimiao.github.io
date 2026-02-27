import React, { useState } from 'react';
import { sendMagicLink } from '../services/api';
import './LoginModal.css';

function LoginModal({ onClose }) {
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendLink = async () => {
        if (!email) return setError('请输入邮箱 / Please enter your email');
        setLoading(true);
        setError('');
        try {
            await sendMagicLink(email);
            setSent(true);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="modal-overlay">
            <div className="modal-content login-modal">
                <button className="close-btn" onClick={onClose}>×</button>
                <h2>登录 / Login</h2>

                {sent ? (
                    <div className="magic-link-sent">
                        <p className="success-msg">✅ 邮件已发送！</p>
                        <p>请查看 <strong>{email}</strong> 的收件箱，点击链接完成登录。</p>
                        <p className="hint">Check your inbox and click the magic link to log in.</p>
                    </div>
                ) : (
                    <>
                        {/* Email Magic Link */}
                        <div className="email-login">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSendLink()}
                            />
                            <button onClick={handleSendLink} disabled={loading}>
                                {loading ? '发送中...' : '发送登录链接 / Send Magic Link'}
                            </button>
                        </div>
                        {error && <p className="error-msg">{error}</p>}
                    </>
                )}
            </div>
        </div>
    );
}

export default LoginModal;
