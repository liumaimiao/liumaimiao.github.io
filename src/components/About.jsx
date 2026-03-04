import React from 'react';
import './About.css';

const About = () => {
    return (
        <div className="about-container">
            <div className="about-content">
                <h1 className="page-title">About the Author</h1>

                <div className="bio-section card">
                    <p>
                        作者毕业于新加坡国立大学，在中国和新加坡两地的IT行业工作十多年，积累了丰富的计算机行业知识包括传统分布式系统、大数据(机器学习/AI人工智能)、网络渗透、区块链、物联网，作者一直钟爱数学物理，乐于分享知识，比如 <a href="https://lyhistory.com/docs/" target="_blank" rel="noopener noreferrer">lyhistory.com</a> 网站是分享的部分行业领域的计算机知识（由于敏感原因，作者还有大量的个人笔记要等待脱敏后才能分享，另外网络渗透方面的知识考虑到法律因素，暂时没有展开分享还躺在作者的个人设备上）。
                    </p>
                    <p>
                        作者也是一个新晋宝爸，所以才开始了这个 <a href="https://bitdriven.tech/" target="_blank" rel="noopener noreferrer">bitdriven.tech</a> 网站的少儿STEM启蒙的分享之旅，现在的时代知识碎片化，有些知识直到成人之后才发现用处，对于好奇心强烈的少儿，碎片化的知识会消磨好奇心和创造力。所以作者一直试图找到一竿子见底的路径把所谓高深的知识用创意项目的方式传授给下一代。
                    </p>
                    <p>
                        但是目前我没法直接放到这个网站上，大家知道网站需要大量消耗服务器资源，随着访问量上升，我这个是没有任何变现方式来维持的，所以初期只能放到 <a href="https://t.zsxq.com/6Af7d" target="_blank" rel="noopener noreferrer">知识星球</a> 上。
                    </p>
                </div>

                <div className="dialogue-section card">
                    <h2>对话录：下面是我跟一个老同学的对话</h2>
                    <div className="app-screenshots">
                        <img src="/app_screenshot_1.jpg" alt="App Screenshot 1 Placeholder" className="screenshot-image" />
                        <img src="/app_screenshot_2.jpg" alt="App Screenshot 2 Placeholder" className="screenshot-image" />
                    </div>
                </div>

                <div className="cert-section card">
                    <h2>Certificate</h2>
                    <img src="/cert.jpg" alt="Certificate Place Holder" className="cert-image" />
                </div>
            </div>
        </div>
    );
};

export default About;
