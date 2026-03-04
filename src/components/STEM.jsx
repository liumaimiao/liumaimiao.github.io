import React from 'react';
import { Link } from 'react-router-dom';
import './STEM.css';

const STEM = () => {
    return (
        <div className="stem-container">
            <div className="stem-content">
                <div className="labels-container">
                    <div className="beautiful-label math">Math</div>
                    <div className="beautiful-label software">Software and Network</div>
                    <div className="beautiful-label physics">Physics and Hardware</div>
                </div>

                <div className="stem-text-card card">
                    <p>
                        作者毕业于新加坡国立大学，详情请见 <Link to="/about">About</Link>，虽然作者坚持免费开放资源，比如 <a href="https://lyhistory.com/docs/" target="_blank" rel="noopener noreferrer">lyhistory.com</a> 是我分享的行业领域的计算机知识，但是网站大量消耗服务器设施资源，所以作者不得不把少儿启蒙的内容放在 <a href="https://t.zsxq.com/6Af7d" target="_blank" rel="noopener noreferrer">知识星球</a> 上。
                    </p>
                </div>

                <div className="qrcode-section card">
                    <h2>少儿启蒙空间</h2>
                    <div className="qrcode-wrapper">
                        <img src="/qrcode.jpg" alt="QR Code Place Holder" className="qrcode-image" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default STEM;
