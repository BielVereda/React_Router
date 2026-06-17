import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';
import umbrellaLogo from '../assets/images/brand/umbrella-logo.png';

export default function About() {
    const [started, setStarted] = useState(false);
    const [redQueenActive, setRedQueenActive] = useState(false);
    const [redQueenState, setRedQueenState] = useState('fine'); // 'fine' | 'bad'
    const bgAudioRef = useRef(null);
    const glitchAudioRef = useRef(null);
    const badAudioRef = useRef(null);
    const intervalRef = useRef(null);

    // Start alternating Red Queen image when mode is active
    useEffect(() => {
        if (redQueenActive) {
            setRedQueenState('fine');
            intervalRef.current = setInterval(() => {
                setRedQueenState(prev => {
                    const next = prev === 'fine' ? 'bad' : 'fine';
                    if (next === 'bad') {
                        const sfx = badAudioRef.current;
                        if (sfx) {
                            sfx.currentTime = 0;
                            sfx.volume = 0.8;
                            sfx.play().catch(() => {});
                        }
                    }
                    return next;
                });
            }, 5000);
        } else {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);
    }, [redQueenActive]);

    const handleStart = () => {
        setStarted(true);
        const audio = bgAudioRef.current;
        if (audio) {
            audio.volume = 0;
            audio.play().then(() => {
                let vol = 0;
                const fade = setInterval(() => {
                    vol = Math.min(vol + 0.05, 0.4);
                    audio.volume = vol;
                    if (vol >= 0.4) clearInterval(fade);
                }, 100);
            }).catch(() => {});
        }
    };

    const activateRedQueen = () => {
        setRedQueenActive(true);
        if (glitchAudioRef.current) {
            glitchAudioRef.current.currentTime = 0;
            glitchAudioRef.current.volume = 0.7;
            glitchAudioRef.current.play().catch(() => {});
        }
        if (bgAudioRef.current) bgAudioRef.current.pause();
    };

    const deployAntivirus = () => {
        setRedQueenActive(false);
        setRedQueenState('fine');
        if (glitchAudioRef.current) glitchAudioRef.current.pause();
        if (badAudioRef.current) badAudioRef.current.pause();
        const audio = bgAudioRef.current;
        if (audio) {
            audio.volume = 0;
            audio.play().then(() => {
                let vol = 0;
                const fade = setInterval(() => {
                    vol = Math.min(vol + 0.05, 0.4);
                    audio.volume = vol;
                    if (vol >= 0.4) clearInterval(fade);
                }, 100);
            }).catch(() => {});
        }
    };

    if (!started) {
        return (
            <div className="warning-overlay" style={{ background: 'rgba(255,255,255,0.97)' }}>
                <div className="warning-box" style={{ background: '#ffffff', borderColor: '#0055a4', boxShadow: '0 0 40px rgba(0,85,164,0.2)' }}>
                    <div className="warning-scanlines" style={{ opacity: 0.03 }} />
                    <img src={umbrellaLogo} alt="Umbrella" className="warning-umbrella"
                        style={{ filter: 'brightness(0) saturate(100%) invert(17%) sepia(97%) saturate(1600%) hue-rotate(197deg) brightness(80%)', animation: 'none' }} />
                    <p className="warning-headline" style={{ marginTop: '10px', color: '#0055a4', textShadow: 'none' }}>
                        PUBLIC RELATIONS PORTAL
                    </p>
                    <div className="warning-divider" style={{ background: 'linear-gradient(to right, transparent, #0055a4, transparent)' }} />
                    <p className="warning-msg" style={{ margin: '20px 0', color: '#444' }}>
                        Connecting to Umbrella Corporation public servers.<br />
                        Corporate presentation is ready for viewing.
                    </p>
                    <button className="warning-btn" onClick={handleStart}
                        style={{ background: '#0055a4', border: '1px solid #003366', color: '#fff', textShadow: 'none', boxShadow: 'none' }}>
                        ▶ ENTER PORTAL
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`about-container ${redQueenActive ? 'red-queen-mode' : ''} fade-in`}>

            {/* Audios */}
            <audio ref={bgAudioRef} loop preload="auto">
                <source src="/audio/Safe_Room.mp3" type="audio/mpeg" />
            </audio>
            <audio ref={glitchAudioRef} loop preload="auto">
                <source src="/audio/zombieVoice.mp3" type="audio/mpeg" />
            </audio>
            <audio ref={badAudioRef} preload="auto">
                <source src="/audio/Nemesis _S.T.A.R.S.mp3" type="audio/mpeg" />
            </audio>

            {/* Red Queen overlays */}
            {redQueenActive && <div className="rq-scanlines-overlay" />}
            {redQueenActive && <div className="rq-vignette" />}

            {/* ── HEADER ── */}
            <header className="about-header">
                {/* Left: logo + title */}
                <div className="about-header-content">
                    <img src={umbrellaLogo} alt="Umbrella Corporation" className="about-logo" />
                    <div className="about-titles">
                        <h1 className="about-title">
                            {redQueenActive ? 'RED QUEEN — SYSTEM BREACH' : 'UMBRELLA CORPORATION'}
                        </h1>
                        <p className="about-tagline">
                            {redQueenActive
                                ? '⚠ CLASSIFIED DATA EXPOSED — CONTAINMENT FAILURE'
                                : 'Preserving the Health of the People.'}
                        </p>
                    </div>
                </div>

                {/* Right: action buttons */}
                <div className="about-header-actions">
                    {redQueenActive ? (
                        <button className="antivirus-btn" onClick={deployAntivirus}>
                            💉 DEPLOY ANTIVIRUS
                        </button>
                    ) : (
                        <button className="restricted-btn" onClick={activateRedQueen}>
                            ⚠ RESTRICTED ACCESS
                        </button>
                    )}
                    <Link to="/" className="about-back-btn">
                        {redQueenActive ? '🚨 EMERGENCY EXIT' : '◀ EXIT PORTAL'}
                    </Link>
                </div>
            </header>

            {/* ── PAGE BODY: sidebar + content ── */}
            <div className="about-body">

                {/* Red Queen portrait sidebar */}
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
                            <p>&gt; CONTAINMENT LEVEL: <span className="rq-hi">OMEGA</span></p>
                            <p>&gt; EXITS: <span className="rq-hi">SEALED</span></p>
                            <p>&gt; STATUS: <span className={redQueenState === 'bad' ? 'rq-bad' : 'rq-hi'}>
                                {redQueenState === 'bad' ? 'CRITICAL' : 'MONITORING'}
                            </span></p>
                        </div>
                    </aside>
                )}

                <main className="about-main">

                    {/* Section 1 */}
                    <section className="about-section">
                        <h2>{redQueenActive ? 'GLOBAL BIO-TERROR NETWORK' : 'GLOBAL REACH'}</h2>
                        <div className="about-section-content">
                            <p>
                                {redQueenActive
                                    ? 'Umbrella Corporation operates 23 clandestine underground facilities across six continents. All research is conducted outside the jurisdiction of international law. The T-Virus project has been authorized at the highest levels of corporate leadership.'
                                    : 'Umbrella Corporation operates state-of-the-art research facilities across the globe, bringing life-saving medicines and consumer products to millions of people every day. Our dedication to human health knows no borders.'}
                            </p>
                            <div className="about-stat-grid">
                                <div className="about-stat">
                                    <span className="stat-num">{redQueenActive ? '97%' : '160+'}</span>
                                    <span className="stat-label">{redQueenActive ? 'LETHALITY RATE' : 'Countries Reached'}</span>
                                </div>
                                <div className="about-stat">
                                    <span className="stat-num">{redQueenActive ? '23' : '500+'}</span>
                                    <span className="stat-label">{redQueenActive ? 'BLACK SITES' : 'Research Labs'}</span>
                                </div>
                                <div className="about-stat">
                                    <span className="stat-num">{redQueenActive ? '∞' : '$4.2B'}</span>
                                    <span className="stat-label">{redQueenActive ? 'CLASSIFIED FUNDS' : 'Annual Revenue'}</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section className="about-section">
                        <h2>{redQueenActive ? 'THE T-VIRUS PROJECT — PROGENITOR ORIGIN' : 'PHARMACEUTICAL INNOVATIONS'}</h2>
                        <div className="about-section-content two-col">
                            <p>
                                {redQueenActive
                                    ? 'The Progenitor Virus was discovered in the Arklay Mountains in 1978. Dr. James Marcus and Oswell E. Spencer authorized weaponization in 1988. The resulting T-Virus causes complete necrotic reanimation of deceased hosts. INCIDENT STATUS: RACCOON CITY — TOTAL POPULATION LOSS.'
                                    : "At the heart of Umbrella's success lies a relentless pursuit of medical breakthroughs. Our proprietary research has eliminated countless ailments, improving longevity and quality of life for families everywhere. We invest over $1.2B annually in R&D."}
                            </p>
                            <div className="about-classified-box">
                                {redQueenActive
                                    ? <><div className="classified-stamp">CLASSIFIED</div><p>FILE: T-VIRUS MUTATION LOG — SUBJECTS 0001 to 8432<br />SURVIVAL RATE: 0.00%<br />B.O.W. YIELD: SATISFACTORY</p></>
                                    : <><div className="corporate-quote">"Science in the service of humanity."</div><p>— Dr. Oswell E. Spencer, Umbrella Founder</p></>
                                }
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section className="about-section">
                        <h2>{redQueenActive ? 'COVER-UP & TERMINATION ORDERS' : 'OUR COMMITMENT TO SAFETY'}</h2>
                        <p>
                            {redQueenActive
                                ? 'All civilian witnesses to the Arklay Laboratory incident have been assigned for elimination by U.S.S. Alpha Team. The nuclear detonation of Raccoon City on October 1st, 1998, was authorized to prevent further T-Virus spread. SURVIVORS: STILL AT LARGE.'
                                : 'We believe innovation comes with an absolute responsibility to the public. Every product developed in Umbrella laboratories undergoes rigorous safety evaluation by an independent review board, ensuring complete consumer trust and regulatory compliance.'}
                        </p>
                        <div className="about-footer-bar">
                            {redQueenActive
                                ? <span>🔴 RED QUEEN ONLINE — ALL EXITS SEALED — CONTAINMENT LEVEL: OMEGA</span>
                                : <span>© {new Date().getFullYear()} Umbrella Corporation. All rights reserved. Member of the Global Pharmaceutical Alliance.</span>
                            }
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
}