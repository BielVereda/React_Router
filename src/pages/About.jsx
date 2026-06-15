import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/About.css';
import umbrellaLogo from '../assets/images/brand/umbrella-logo.png';

export default function About() {
    const [started, setStarted] = useState(false);
    const [glitchLevel, setGlitchLevel] = useState(0); // 0 = normal, 1 = minor, 2 = severe
    const bgAudioRef = useRef(null);
    const glitchAudioRef = useRef(null);

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

    const triggerMinorGlitch = () => setGlitchLevel(1);
    
    const triggerSevereGlitch = () => {
        setGlitchLevel(2);
        if (glitchAudioRef.current) {
            glitchAudioRef.current.currentTime = 0;
            glitchAudioRef.current.volume = 0.8;
            glitchAudioRef.current.play().catch(() => {});
        }
    };

    const stopGlitch = () => {
        setGlitchLevel(0);
        if (glitchAudioRef.current) {
            glitchAudioRef.current.pause();
        }
    };

    if (!started) {
        return (
            <div className="warning-overlay" style={{ background: 'rgba(255,255,255,0.95)' }}>
                <div className="warning-box" style={{ background: '#ffffff', borderColor: '#0055a4', boxShadow: '0 0 40px rgba(0,85,164,0.2)' }}>
                    <div className="warning-scanlines" style={{ opacity: 0.03 }} />
                    <img src={umbrellaLogo} alt="Umbrella" className="warning-umbrella" style={{ filter: 'brightness(0) invert(0)', animation: 'none' }} />
                    <p className="warning-headline" style={{ marginTop: '10px', color: '#0055a4', textShadow: 'none' }}>PUBLIC RELATIONS PORTAL</p>
                    <div className="warning-divider" style={{ background: 'linear-gradient(to right, transparent, #0055a4, transparent)' }} />
                    <p className="warning-msg" style={{ margin: '20px 0', color: '#333' }}>
                        Connecting to Umbrella Corporation public servers.<br />
                        Corporate presentation is ready for viewing.
                    </p>
                    <button className="warning-btn" onClick={handleStart} style={{ background: '#0055a4', border: '1px solid #003366', color: '#fff', textShadow: 'none', boxShadow: 'none' }}>
                        ▶ ENTER PORTAL
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`about-container ${glitchLevel > 0 ? 'glitching' : ''} fade-in`}>
            <audio ref={bgAudioRef} loop preload="auto">
                <source src="/audio/Safe_Room.mp3" type="audio/mpeg" />
            </audio>
            <audio ref={glitchAudioRef} preload="auto">
                <source src="/audio/zombieVoice.mp3" type="audio/mpeg" />
            </audio>

            {/* Red Queen overlay during severe glitch */}
            {glitchLevel === 2 && <div className="red-queen-overlay">YOU'RE ALL GOING TO DIE DOWN HERE</div>}

            <header className="about-header">
                <div className="about-header-content">
                    <img src={umbrellaLogo} alt="Umbrella Corporation" className="about-logo" />
                    <div className="about-titles">
                        <h1 className="about-title">{glitchLevel > 0 ? 'RED QUEEN SYSTEM' : 'UMBRELLA CORPORATION'}</h1>
                        <p className="about-tagline">{glitchLevel > 0 ? 'CONTAINMENT PROTOCOL INITIATED' : 'Preserving the Health of the People.'}</p>
                    </div>
                </div>
                <Link to="/" className="about-back-btn">
                    {glitchLevel > 0 ? 'ESCAPE WHILE YOU CAN' : '◀ EXIT PUBLIC PORTAL'}
                </Link>
            </header>

            <main className="about-main">
                <section className="about-section" onMouseEnter={triggerMinorGlitch} onMouseLeave={stopGlitch}>
                    <h2>{glitchLevel > 0 ? "GLOBAL BIO-TERROR" : "GLOBAL REACH"}</h2>
                    <p>
                        {glitchLevel > 0 
                            ? "Umbrella Corporation operates clandestine underground facilities worldwide, developing unauthorized Bio-Organic Weapons (B.O.W.s) away from the prying eyes of international law. The T-Virus project is just the beginning."
                            : "Umbrella Corporation operates state-of-the-art facilities across the globe, bringing life-saving medicines and consumer products to millions. Our dedication to human health knows no borders."}
                    </p>
                </section>

                <section className="about-section" onMouseEnter={triggerSevereGlitch} onMouseLeave={stopGlitch}>
                    <h2>{glitchLevel === 2 ? "THE T-VIRUS PROJECT" : "PHARMACEUTICAL INNOVATIONS"}</h2>
                    <p>
                        {glitchLevel === 2
                            ? "The Progenitor Virus was isolated to create the ultimate biological weapon. Side effects include aggressive necrotic cellular regeneration, leading to mass zombification. Incident in Raccoon City: TOTAL CASUALTIES UNKNOWN."
                            : "At the heart of Umbrella's success is our relentless pursuit of medical breakthroughs. Our proprietary research has eliminated countless ailments, improving longevity and quality of life for families everywhere."}
                    </p>
                    <div className="about-image-placeholder">
                        {glitchLevel === 2 ? "CLASSIFIED: B.O.W. MUTATION DATA REDACTED" : "Creating a brighter tomorrow, today."}
                    </div>
                </section>

                <section className="about-section" onMouseEnter={triggerMinorGlitch} onMouseLeave={stopGlitch}>
                    <h2>{glitchLevel > 0 ? "COVER-UP OPERATIONS" : "OUR COMMITMENT"}</h2>
                    <p>
                        {glitchLevel > 0
                            ? "U.S.S. (Umbrella Security Service) operatives are authorized to use lethal force to contain any information leaks. All witnesses to the Arklay Mountains incident have been marked for termination to protect corporate assets."
                            : "We believe that true innovation comes with a responsibility to the public. Every product developed in our laboratories undergoes rigorous safety testing to ensure absolute reliability and consumer trust."}
                    </p>
                </section>
            </main>
        </div>
    );  
}
