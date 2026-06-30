import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { models3d } from '../data/modelsData';
import '../styles/Models.css';

import umbrellaLogo from '../assets/images/brand/umbrella-logo.png';

export default function Models() {
    const [started, setStarted] = useState(false);
    const [muted, setMuted] = useState(false);
    const [imgToggle, setImgToggle] = useState(0);

    const bgAudioRef = useRef(null);

    // Timer to cycle through multiple images
    useEffect(() => {
        const interval = setInterval(() => {
            setImgToggle(prev => prev + 1);
        }, 3500);
        return () => clearInterval(interval);
    }, []);

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

    const toggleMute = () => {
        const audio = bgAudioRef.current;
        if (!audio) return;
        audio.muted = !audio.muted;
        setMuted(audio.muted);
    };

    return (
        <div className="models-page fade-in">
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
                        <p className="warning-headline">RESEARCH & DEVELOPMENT</p>
                        <div className="warning-divider" />
                        <p className="warning-msg">
                            Establishing secure connection to holographic projector...<br />
                            Retrieving 3D structural blueprints and physical assets.
                        </p>
                        <p className="warning-sub">
                            WARNING: Prototyping data is classified.<br />
                            Unauthorized reproduction will result in severe penalties.
                        </p>
                        <button className="warning-btn" onClick={handleStart}>
                            ▶ INITIALIZE VIEWER
                        </button>
                    </div>
                </div>
            )}

            {/* Holographic background effects */}
            <div className="models-grid-bg" />
            <div className="models-vignette" />

            {/* Header */}
            <header className="models-header">
                <div className="models-header-left">
                    <img src={umbrellaLogo} alt="Umbrella R&D" className="models-umbrella-logo" />
                    <div className="models-title-block">
                        <h1 className="models-title">3D ASSET ARCHIVE</h1>
                        <p className="models-subtitle">UMBRELLA R&D — VISUALIZATION TERMINAL</p>
                    </div>
                </div>
                <div className="models-header-right">
                    <button className="models-back-btn" onClick={toggleMute} style={{ marginRight: '10px' }}>
                        {muted ? '🔊 UNMUTE' : '🔇 MUTE'}
                    </button>
                    <Link to="/" className="models-back-btn">◀ TERMINATE CONNECTION</Link>
                </div>
            </header>

            {/* Models Grid */}
            <main className="models-container">
                {models3d.map(model => {
                    const currentImg = model.images[imgToggle % model.images.length];
                    
                    return (
                        <article key={model.id} className="models-card">
                            <div className="models-image-wrap">
                                <img 
                                    key={currentImg} // Force re-render for fade-in effect on change
                                    src={currentImg} 
                                    alt={model.name} 
                                    className="models-image fade-in" 
                                />
                                {model.images.length > 1 && (
                                    <div className="models-image-indicators">
                                        {model.images.map((_, idx) => (
                                            <span 
                                                key={idx} 
                                                className={`model-dot ${idx === (imgToggle % model.images.length) ? 'active' : ''}`} 
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            <div className="models-info">
                                <h2 className="models-card-title">{model.name}</h2>
                                <p className="models-card-desc">{model.description}</p>
                                
                                <div className="models-meta-grid">
                                    <div className="models-meta-item">
                                        <span className="models-meta-label">SOURCE</span>
                                        <span className="models-meta-value">{model.author}</span>
                                    </div>
                                    <div className="models-meta-item">
                                        <span className="models-meta-label">GEOMETRY</span>
                                        <span className="models-meta-value">{model.polyCount} Tris</span>
                                    </div>
                                </div>
                                
                                <a 
                                    href={model.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="models-link-btn"
                                    title={`View ${model.name} in 3D Viewer`}
                                >
                                    <span className="models-link-icon">⬡</span>
                                    VIEW 3D MODEL
                                </a>
                            </div>
                        </article>
                    );
                })}
            </main>
        </div>
    );
}
