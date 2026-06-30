import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Contact.css';
import umbrellaLogo from '../assets/images/brand/umbrella-logo.png';

const SOCIALS = [
    {
        id: 'github',
        label: 'GitHub',
        handle: '@BielVereda',
        url: 'https://github.com/BielVereda',
        icon: '⬡',
        color: '#6e40c9',
        glowColor: 'rgba(110,64,201,0.5)',
        borderColor: '#3a1f80',
        desc: 'Source code, repositories and projects.',
    },
    {
        id: 'linkedin',
        label: 'LinkedIn',
        handle: 'gabriel-vereda',
        url: 'https://www.linkedin.com/in/gabriel-vereda',
        icon: '▣',
        color: '#0077b5',
        glowColor: 'rgba(0,119,181,0.5)',
        borderColor: '#004f7c',
        desc: 'Professional profile and career history.',
    },
    {
        id: 'instagram',
        label: 'Instagram',
        handle: '@biel.vereda',
        url: 'https://www.instagram.com/biel.vereda/',
        icon: '◈',
        color: '#e1306c',
        glowColor: 'rgba(225,48,108,0.5)',
        borderColor: '#8a0032',
        desc: 'Personal feed and behind-the-scenes.',
    },
];

export default function Contact() {
    const [started, setStarted] = useState(false);
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
        <div className="contact-container fade-in">
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
                        <p className="warning-headline">COMMUNICATIONS TERMINAL</p>
                        <div className="warning-divider" />
                        <p className="warning-msg">
                            Establishing secure connection to Umbrella Corp Operative Network...<br />
                            Awaiting clearance for direct channel transmission.
                        </p>
                        <button className="warning-btn" onClick={handleStart}>
                            ▶ INITIATE CONNECTION
                        </button>
                    </div>
                </div>
            )}

            {/* CRT overlay effects */}
            <div className="crt-scanlines" />
            <div className="crt-flicker" />
            <div className="crt-vignette" />

            <div className="terminal-window">
                {/* Title bar */}
                <div className="terminal-titlebar">
                    <div className="terminal-dots">
                        <span className="dot red-dot" />
                        <span className="dot yellow-dot" />
                        <span className="dot green-dot" />
                    </div>
                    <span className="terminal-name">UMBRELLA CORP — OPERATIVE CONTACT DIRECTORY</span>
                    <Link to="/" className="terminal-back-btn">✕ DISCONNECT</Link>
                </div>

                {/* Terminal body */}
                <div className="terminal-body">
                    {/* Header */}
                    <div className="contact-header">
                        <img src={umbrellaLogo} alt="Umbrella" className="contact-logo" />
                        <div className="contact-header-text">
                            <p className="contact-terminal-line">&gt; OPERATIVE: <span className="hl">GABRIEL VEREDA</span></p>
                            <p className="contact-terminal-line">&gt; DESIGNATION: <span className="hl">FRONT-END DEVELOPER</span></p>
                            <p className="contact-terminal-line">&gt; STATUS: <span className="hl-green">ACTIVE</span></p>
                            <p className="contact-terminal-line">&gt; SELECT A CHANNEL TO ESTABLISH CONTACT:</p>
                        </div>
                    </div>

                    <div className="contact-divider" />

                    {/* Social cards */}
                    <div className="contact-grid">
                        {SOCIALS.map(s => (
                            <a
                                key={s.id}
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-card"
                                style={{
                                    '--card-color': s.color,
                                    '--card-glow': s.glowColor,
                                    '--card-border': s.borderColor,
                                }}
                            >
                                <div className="contact-card-icon">{s.icon}</div>
                                <div className="contact-card-info">
                                    <span className="contact-card-label">{s.label}</span>
                                    <span className="contact-card-handle">{s.handle}</span>
                                    <span className="contact-card-desc">{s.desc}</span>
                                </div>
                                <div className="contact-card-arrow">→</div>
                            </a>
                        ))}
                    </div>

                    <div className="contact-footer">
                        <span className="blink-cursor">█</span>
                        <span>&gt; AWAITING CHANNEL SELECTION...</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
