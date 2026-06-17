import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Contact.css';
import umbrellaLogo from '../assets/images/brand/umbrella-logo.png';

const CLEARANCE_LEVELS = ['GUEST', 'ALPHA', 'BRAVO', 'S.T.A.R.S.', 'UMBRELLA EXECUTIVE'];

const BOOT_SEQUENCE = [
    '> BOOTING RED QUEEN TERMINAL v4.2.1...',
    '> ENCRYPTION LAYER... [OK]',
    '> SATELLITE UPLINK... [CONNECTED]',
    '> IDENTITY VERIFICATION... [STANDBY]',
    '> SECURE CHANNEL ESTABLISHED.',
    '> READY FOR OPERATIVE INPUT.',
    '',
    '> TYPE YOUR MESSAGE AND TRANSMIT.',
];

export default function Contact() {
    const [started, setStarted] = useState(false);
    const [bootDone, setBootDone] = useState(false);
    const [bootLines, setBootLines] = useState([]);
    const [operativeId, setOperativeId] = useState('');
    const [clearance, setClearance] = useState(CLEARANCE_LEVELS[0]);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('idle'); // idle | sending | success | error
    const [charCount, setCharCount] = useState(0);

    const bgAudioRef = useRef(null);
    const typeAudioRef = useRef(null);

    const playTypeSound = () => {
        const sfx = typeAudioRef.current;
        if (sfx) {
            sfx.currentTime = 0;
            sfx.volume = 0.2;
            sfx.play().catch(() => {});
        }
    };

    const handleStart = () => {
        setStarted(true);
        const audio = bgAudioRef.current;
        if (audio) {
            audio.volume = 0;
            audio.play().then(() => {
                let vol = 0;
                const fade = setInterval(() => {
                    vol = Math.min(vol + 0.04, 0.35);
                    audio.volume = vol;
                    if (vol >= 0.35) clearInterval(fade);
                }, 120);
            }).catch(() => {});
        }

        // Boot sequence animation
        let i = 0;
        const interval = setInterval(() => {
            setBootLines(prev => [...prev, BOOT_SEQUENCE[i]]);
            i++;
            if (i >= BOOT_SEQUENCE.length) {
                clearInterval(interval);
                setTimeout(() => setBootDone(true), 600);
            }
        }, 350);
    };

    const handleTypeKey = (e, setter, maxLen = 200) => {
        if (e.target.value.length <= maxLen) {
            setter(e.target.value);
            playTypeSound();
        }
    };

    const handleMessageKey = (e) => {
        if (e.target.value.length <= 500) {
            setMessage(e.target.value);
            setCharCount(e.target.value.length);
            playTypeSound();
        }
    };

    const handleTransmit = (e) => {
        e.preventDefault();
        if (!operativeId.trim() || !message.trim()) return;

        setStatus('sending');

        // Simulate encrypted transmission
        setTimeout(() => {
            setStatus('success');
        }, 2800);
    };

    const resetForm = () => {
        setOperativeId('');
        setClearance(CLEARANCE_LEVELS[0]);
        setMessage('');
        setCharCount(0);
        setStatus('idle');
    };

    if (!started) {
        return (
            <div className="warning-overlay">
                <div className="warning-box">
                    <div className="warning-scanlines" />
                    <img src={umbrellaLogo} alt="Umbrella" className="warning-umbrella" />
                    <p className="warning-headline" style={{ marginTop: '10px' }}>SECURE TRANSMISSION SYSTEM</p>
                    <div className="warning-divider" />
                    <p className="warning-msg" style={{ margin: '20px 0' }}>
                        Establishing encrypted satellite link.<br />
                        All messages are monitored by the Umbrella Security Division.
                    </p>
                    <button className="warning-btn" onClick={handleStart}>
                        ▶ INITIALIZE TERMINAL
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="contact-container fade-in">
            {/* Audios */}
            <audio ref={bgAudioRef} loop preload="auto">
                <source src="/audio/Not_Found.mp3" type="audio/mpeg" />
            </audio>
            <audio ref={typeAudioRef} preload="auto">
                <source src="/audio/typewriter.mp3" type="audio/mpeg" />
            </audio>

            {/* CRT overlay effects */}
            <div className="crt-scanlines" />
            <div className="crt-flicker" />
            <div className="crt-vignette" />

            <div className="terminal-window">
                {/* Terminal top bar */}
                <div className="terminal-titlebar">
                    <div className="terminal-dots">
                        <span className="dot red-dot" />
                        <span className="dot yellow-dot" />
                        <span className="dot green-dot" />
                    </div>
                    <span className="terminal-name">UMBRELLA CORP — SECURE TRANSMISSION TERMINAL [v4.2.1]</span>
                    <Link to="/" className="terminal-back-btn">✕ DISCONNECT</Link>
                </div>

                {/* Boot sequence */}
                <div className="terminal-boot">
                    {bootLines.map((line, i) => (
                        <div key={i} className="boot-line">{line}</div>
                    ))}
                    {!bootDone && <span className="boot-cursor">█</span>}
                </div>

                {/* Main form — only after boot */}
                {bootDone && (
                    <div className="terminal-body">
                        {status === 'success' ? (
                            <div className="transmission-success">
                                <div className="success-header">
                                    <img src={umbrellaLogo} alt="Umbrella" className="success-logo" />
                                    <h2>TRANSMISSION ENCRYPTED</h2>
                                </div>
                                <div className="success-lines">
                                    <p>&gt; MESSAGE RECEIVED BY UMBRELLA CENTRAL COMMAND.</p>
                                    <p>&gt; OPERATIVE ID: <span className="highlight">{operativeId.toUpperCase()}</span></p>
                                    <p>&gt; CLEARANCE LEVEL: <span className="highlight">{clearance}</span></p>
                                    <p>&gt; ENCRYPTION HASH: <span className="highlight mono">
                                        {Math.random().toString(36).substring(2, 10).toUpperCase()}-
                                        {Math.random().toString(36).substring(2, 10).toUpperCase()}
                                    </span></p>
                                    <p>&gt; STATUS: <span className="success-ok">[ DELIVERED ]</span></p>
                                    <p>&gt; <em>Your transmission has been logged. An agent will respond if deemed necessary.</em></p>
                                </div>
                                <button className="terminal-btn secondary" onClick={resetForm}>
                                    NEW TRANSMISSION
                                </button>
                            </div>
                        ) : (
                            <form className="terminal-form" onSubmit={handleTransmit}>
                                <div className="terminal-prompt">
                                    &gt; OPERATIVE IDENTIFICATION REQUIRED
                                </div>

                                <div className="form-field">
                                    <label className="terminal-label">OPERATIVE ID</label>
                                    <div className="input-wrapper">
                                        <span className="input-prefix">&gt;_</span>
                                        <input
                                            type="text"
                                            className="terminal-input"
                                            value={operativeId}
                                            onChange={(e) => handleTypeKey(e, setOperativeId, 30)}
                                            placeholder="ENTER DESIGNATION..."
                                            spellCheck={false}
                                            autoComplete="off"
                                        />
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label className="terminal-label">SECURITY CLEARANCE</label>
                                    <div className="input-wrapper">
                                        <span className="input-prefix">&gt;_</span>
                                        <select
                                            className="terminal-input terminal-select"
                                            value={clearance}
                                            onChange={(e) => { setClearance(e.target.value); playTypeSound(); }}
                                        >
                                            {CLEARANCE_LEVELS.map(lvl => (
                                                <option key={lvl} value={lvl}>{lvl}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-field">
                                    <label className="terminal-label">
                                        TRANSMISSION LOG
                                        <span className="char-counter">[{charCount}/500]</span>
                                    </label>
                                    <div className="textarea-wrapper">
                                        <span className="textarea-prefix">&gt;_</span>
                                        <textarea
                                            className="terminal-textarea"
                                            value={message}
                                            onChange={handleMessageKey}
                                            placeholder="BEGIN TRANSMISSION..."
                                            rows={6}
                                            spellCheck={false}
                                        />
                                    </div>
                                </div>

                                <div className="terminal-form-footer">
                                    <span className="terminal-status-bar">
                                        {status === 'sending'
                                            ? '> ENCRYPTING PAYLOAD... ROUTING THROUGH SATELLITE...'
                                            : '> AWAITING OPERATIVE INPUT'}
                                        <span className="blink-cursor">█</span>
                                    </span>
                                    <button
                                        type="submit"
                                        className={`terminal-btn ${status === 'sending' ? 'sending' : ''}`}
                                        disabled={status === 'sending'}
                                    >
                                        {status === 'sending' ? '[ TRANSMITTING... ]' : '🔐 ENCRYPT & TRANSMIT'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
