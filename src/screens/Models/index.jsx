import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { models3d } from '../../data/modelsData';
import ModelViewer from '../../components/ModelViewer';
import BotaoSaferoom from '../../components/BotaoSaferoom';
import './style.css';
import umbrellaLogo from '../../assets/images/brand/umbrella-logo.png';

export default function Models() {
    const [started, setStarted] = useState(false);
    const [muted, setMuted] = useState(false);

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
                    <BotaoSaferoom muted={muted} onToggleMute={toggleMute} />
                    <Link to="/" className="models-back-btn">◀ TERMINATE CONNECTION</Link>
                </div>
            </header>

            {/* Models Grid */}
            <main className="models-container">
                {models3d.map(model => {
                    const fallbackImg = model.images && model.images.length > 0 ? model.images[0] : null;

                    return (
                        <article key={model.id} className="models-card">
                            {/* 3D Real OBJ / Holographic Interactive Viewer */}
                            <div className="models-viewer-container">
                                <ModelViewer
                                    modelId={model.id}
                                    objPath={model.objPath}
                                    modelName={model.name}
                                    fallbackImage={fallbackImg}
                                    initialRotation={model.initialRotation}
                                    initialPosition={model.initialPosition}
                                />
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
                                    title={`View ${model.name} on external repository`}
                                >
                                    <span className="models-link-icon">⬡</span>
                                    EXTERNAL REPO
                                </a>
                            </div>
                        </article>
                    );
                })}
            </main>
        </div>
    );
}
