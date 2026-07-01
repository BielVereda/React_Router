import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';
import umbrellaLogo from '../assets/images/brand/umbrella-logo.png';

const TECH_STACK = [
    { name: 'React 18', icon: '⚛', desc: 'Component-based UI library' },
    { name: 'React Router v6', icon: '🔀', desc: 'Client-side routing & navigation' },
    { name: 'Vite', icon: '⚡', desc: 'Lightning-fast build tool' },
    { name: 'Vanilla CSS', icon: '🎨', desc: 'Custom styles, animations & themes' },
    { name: 'JavaScript (ES6+)', icon: '𝐉𝐒', desc: 'Modern JS with hooks & refs' },
    { name: 'Git & GitHub', icon: '⬡', desc: 'Version control & hosting' },
];

export default function About() {
    const [started, setStarted] = useState(false);
    const [redQueenActive, setRedQueenActive] = useState(false);
    const [redQueenState, setRedQueenState] = useState('fine');
    const intervalRef = useState(null);
    const bgAudioRef = useRef(null);

    const handleStart = () => {
        setStarted(true);
        const audio = bgAudioRef.current;
        if (audio) {
            audio.volume = 0;
            audio.play().then(() => {
                let vol = 0;
                const fade = setInterval(() => {
                    vol = Math.min(vol + 0.05, 0.65);
                    audio.volume = vol;
                    if (vol >= 0.65) clearInterval(fade);
                }, 100);
            }).catch(() => {});
        }
    };

    return (
        <div className={`about-container ${redQueenActive ? 'red-queen-mode' : ''} fade-in`}>
            
            {/* Audio */}
            <audio ref={bgAudioRef} loop preload="auto">
                <source src="/audio/Safe_Room.mp3" type="audio/mpeg" />
            </audio>

            {/* Warning Overlay */}
            {!started && (
                <div className="warning-overlay">
                    <div className="warning-box">
                        <div className="warning-scanlines" />
                        <img src={umbrellaLogo} alt="Umbrella" className="warning-umbrella" />
                        <p className="warning-headline">ABOUT THIS PROJECT</p>
                        <div className="warning-divider" />
                        <p className="warning-msg">
                            Connecting to developer profile database.<br />
                            Project information is ready for viewing.
                        </p>
                        <button className="warning-btn" onClick={handleStart}>
                            ▶ ENTER PORTAL
                        </button>
                    </div>
                </div>
            )}

            {redQueenActive && <div className="rq-scanlines-overlay" />}
            {redQueenActive && <div className="rq-vignette" />}

            {/* Header */}
            <header className="about-header">
                <div className="about-header-content">
                    <img src={umbrellaLogo} alt="Umbrella Corporation" className="about-logo" />
                    <div className="about-titles">
                        <h1 className="about-title">
                            {redQueenActive ? 'RED QUEEN — SYSTEM BREACH' : 'UMBRELLA FAN ARCHIVE'}
                        </h1>
                        <p className="about-tagline">
                            {redQueenActive
                                ? '⚠ CLASSIFIED DATA EXPOSED'
                                : 'A React Project by Gabriel Vereda'}
                        </p>
                    </div>
                </div>
                <div className="about-header-actions">
                    {redQueenActive ? (
                        <button className="antivirus-btn" onClick={() => setRedQueenActive(false)}>
                            💉 DEPLOY ANTIVIRUS
                        </button>
                    ) : (
                        <button className="restricted-btn" onClick={() => setRedQueenActive(true)}>
                            ⚠ RESTRICTED ACCESS
                        </button>
                    )}
                    <Link to="/" className="about-back-btn">◀ EXIT PORTAL</Link>
                </div>
            </header>

            <div className="about-body">
                {/* Red Queen sidebar */}
                {redQueenActive && (
                    <aside className="rq-sidebar">
                        <div className="rq-portrait-frame">
                            <img
                                key={redQueenState}
                                src={`/images/RedQueen${redQueenState === 'fine' ? 'Fine' : 'Bad'}.jpg`}
                                alt={`Red Queen ${redQueenState}`}
                                className={`rq-portrait ${redQueenState === 'bad' ? 'rq-portrait-bad' : ''}`}
                            />
                            <div className="rq-portrait-label">
                                {redQueenState === 'bad' ? '⚠ LETHAL THREAT DETECTED' : 'SYSTEM NOMINAL'}
                            </div>
                        </div>
                        <div className="rq-status-lines">
                            <p>&gt; CONTAINMENT: <span className="rq-hi">OMEGA</span></p>
                            <p>&gt; EXITS: <span className="rq-hi">SEALED</span></p>
                        </div>
                    </aside>
                )}

                <main className="about-main">

                    {/* Section 1 — Developer */}
                    <section className="about-section">
                        <h2>{redQueenActive ? 'OPERATIVE FILE — CLASSIFIED' : 'THE DEVELOPER'}</h2>
                        <div className="about-section-content">
                            <p>
                                {redQueenActive
                                    ? 'Subject: GABRIEL VEREDA. Front-end operative with knowledge of React, JavaScript and CSS. Created this archive to catalogue all known Umbrella-related incidents. Threat level: MODERATE. Do not engage.'
                                    : 'Hi! My name is Gabriel Vereda, a front-end developer passionate about building immersive, creative web experiences. I have a strong interest in UI design, animations and themed interfaces that go beyond the ordinary. This project was my playground to push the boundaries of what a fan site can look and feel like.'}
                            </p>
                        </div>
                    </section>

                    {/* Section 2 — Project */}
                    <section className="about-section">
                        <h2>{redQueenActive ? 'PROJECT ORIGIN — CODENAME: BIOHAZARD' : 'ABOUT THE PROJECT'}</h2>
                        <div className="about-section-content two-col">
                            <p>
                                {redQueenActive
                                    ? 'This archive was constructed to catalogue every known Umbrella incident, B.O.W. encounter and operative record. All data has been extracted from classified Umbrella servers and cross-referenced with field reports. The archive is growing.'
                                    : 'The Umbrella Fan Archive was built as a personal React Router learning project. The goal was to go far beyond a simple tutorial and create a real, polished web experience inspired by the world of Resident Evil — complete with themed pages for movies, games, characters and more. Every design decision (dark aesthetics, glitch effects, sound, the RE5 chapter-select inspiration) was intentional.'}
                            </p>
                            <div className="about-classified-box">
                                {redQueenActive
                                    ? <><div className="classified-stamp">CLASSIFIED</div><p>Project genesis confirmed.<br />Origin: Arklay County, 1998.<br />Containment: FAILED.</p></>
                                    : <><div className="corporate-quote">"Learn by building something you actually care about."</div><p>— The reason this project exists.</p></>
                                }
                            </div>
                        </div>
                    </section>

                    {/* Section 3 — Tech Stack */}
                    <section className="about-section">
                        <h2>{redQueenActive ? 'WEAPONIZED TECHNOLOGIES' : 'TECH STACK'}</h2>
                        <div className="about-tech-grid">
                            {TECH_STACK.map(tech => (
                                <div key={tech.name} className="about-tech-card">
                                    <div className="about-tech-icon">{tech.icon}</div>
                                    <div className="about-tech-info">
                                        <div className="about-tech-name">{tech.name}</div>
                                        <div className="about-tech-desc">{tech.desc}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Section 4 — Footer */}
                    <section className="about-section">
                        <h2>{redQueenActive ? 'COVER-UP NOTICE' : 'DISCLAIMER'}</h2>
                        <p>
                            {redQueenActive
                                ? 'All data in this archive is property of Umbrella Corporation. Unauthorized access is punishable by termination. U.S.S. has been notified of your intrusion.'
                                : 'This is a fan-made project created for educational and portfolio purposes. Resident Evil, Umbrella Corporation, and all related trademarks are the property of Capcom Co., Ltd. This site is not affiliated with or endorsed by Capcom.'}
                        </p>
                        <div className="about-footer-bar">
                            {redQueenActive
                                ? <span>🔴 RED QUEEN ONLINE — ALL EXITS SEALED</span>
                                : <span>© {new Date().getFullYear()} Biel Vereda · <a href="https://github.com/BielVereda" target="_blank" rel="noreferrer" style={{ color: '#0055a4' }}>GitHub</a></span>
                            }
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
}