import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { games } from '../data/gamesData';
import { characters } from '../data/charactersData';
import '../styles/Games.css';

import umbrellaLogo from '../assets/images/brand/umbrella-logo.png';
import residentEvilLogo from '../assets/images/brand/resident-evil-logo.png';

export default function Games() {
    const [started, setStarted] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [muted, setMuted] = useState(false);
    const [coverToggle, setCoverToggle] = useState(0); // For alternating covers

    const bgAudioRef = useRef(null);
    const selectAudioRef = useRef(null);
    const gameRefs = useRef([]);

    const activeGame = games[activeIndex];

    // Alternating covers timer (every 4 seconds)
    useEffect(() => {
        const interval = setInterval(() => {
            setCoverToggle(prev => prev + 1);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    // Scroll active card to center
    useEffect(() => {
        if (gameRefs.current[activeIndex]) {
            gameRefs.current[activeIndex].scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest',
            });
        }
    }, [activeIndex]);

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

    const playSelectSound = () => {
        const sfx = selectAudioRef.current;
        if (sfx) { sfx.currentTime = 0; sfx.play().catch(() => {}); }
    };

    const prevGame = () => { playSelectSound(); setActiveIndex(p => (p - 1 + games.length) % games.length); };
    const nextGame = () => { playSelectSound(); setActiveIndex(p => (p + 1) % games.length); };
    const selectGame = (i) => { if (i === activeIndex) return; playSelectSound(); setActiveIndex(i); };

    const toggleMute = () => {
        const audio = bgAudioRef.current;
        if (!audio) return;
        audio.muted = !audio.muted;
        setMuted(audio.muted);
    };

    return (
        <div className="games-page fade-in">
            {/* Audio */}
            <audio ref={bgAudioRef} loop preload="auto">
                <source src="/audio/Safe_Room.mp3" type="audio/mpeg" />
            </audio>
            <audio ref={selectAudioRef} preload="auto">
                <source src="/audio/cursorSelect.mp3" type="audio/mpeg" />
            </audio>

            {/* Warning Overlay */}
            {!started && (
                <div className="warning-overlay">
                    <div className="warning-box">
                        <div className="warning-scanlines" />
                        <img src={umbrellaLogo} alt="Umbrella" className="warning-umbrella" />
                        <p className="warning-headline">GAME ARCHIVE — CLASSIFIED</p>
                        <div className="warning-divider" />
                        <p className="warning-msg">
                            Accessing Umbrella Corporation internal records.<br />
                            All game data is classified. Operative clearance required.
                        </p>
                        <button className="warning-btn" onClick={handleStart}>
                            ▶ ACCESS ARCHIVE
                        </button>
                    </div>
                </div>
            )}

            {/* Noise overlay */}
            <div className="games-noise" />

            {/* Header */}
            <header className="games-header">
                <div className="games-header-left">
                    <img src={umbrellaLogo} alt="Umbrella" className="games-umbrella-logo" />
                    <img src={residentEvilLogo} alt="Resident Evil" className="games-re-logo" />
                </div>
                <div className="games-header-right">
                    <button className="games-mute-btn" onClick={toggleMute}>
                        {muted ? '🔊 UNMUTE' : '🔇 MUTE'}
                    </button>
                    <Link to="/" className="games-back-btn">◀ SAFEROOM</Link>
                </div>
            </header>

            {/* Carousel */}
            <section className="games-carousel-section">
                <button className="games-arrow" onClick={prevGame} aria-label="Previous">◀</button>

                <div className="games-carousel">
                    {games.map((game, i) => {
                        const isActive = i === activeIndex;
                        const currentCover = game.covers[coverToggle % game.covers.length];
                        
                        return (
                            <div
                                key={game.id}
                                ref={el => (gameRefs.current[i] = el)}
                                className={`games-card ${isActive ? 'active' : ''}`}
                                onClick={() => selectGame(i)}
                            >
                                <div className="games-card-frame">
                                    <img 
                                        key={currentCover} // Force re-render for animation on change
                                        src={currentCover} 
                                        alt={game.title} 
                                        className="games-card-img fade-in" 
                                    />
                                    <div className="games-card-overlay">
                                        <span className={`games-type-badge ${game.type === 'MAINLINE' ? 'mainline' : 'spinoff'}`}>
                                            {game.type}
                                        </span>
                                    </div>
                                    {game.covers.length > 1 && (
                                        <div className="games-card-version-indicator">
                                            {game.covers.map((_, idx) => (
                                                <span key={idx} className={`version-dot ${idx === (coverToggle % game.covers.length) ? 'active' : ''}`} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="games-card-year">{game.year}</div>
                            </div>
                        );
                    })}
                </div>

                <button className="games-arrow" onClick={nextGame} aria-label="Next">▶</button>
            </section>

            {/* Detail Panel */}
            <main key={activeGame.id} className="games-detail-panel panel-transition">

                {/* Title */}
                <div className="games-detail-header">
                    <h2 className="games-detail-title">{activeGame.title}</h2>
                    {activeGame.subtitle && (
                        <h3 className="games-detail-subtitle">{activeGame.subtitle}</h3>
                    )}
                    <div className="games-detail-meta">
                        <span className="games-meta-year">📅 {activeGame.year}</span>
                        <span className={`games-meta-type ${activeGame.type === 'MAINLINE' ? 'mainline' : 'spinoff'}`}>
                            {activeGame.type}
                        </span>
                        <span className="games-meta-platforms">
                            🎮 {activeGame.platform.join(' · ')}
                        </span>
                    </div>
                </div>

                <div className="games-detail-grid">
                    {/* Left: description */}
                    <section className="games-detail-left">
                        <div className="games-section-label">MISSION BRIEFING</div>
                        <div className="games-description-box">
                            {activeGame.description}
                        </div>
                    </section>

                    {/* Right: characters */}
                    <section className="games-detail-right">
                        <div className="games-section-label">OPERATIVE ROSTER & ENTITIES</div>
                        
                        {!activeGame.characters || activeGame.characters.length === 0 ? (
                            <div className="games-no-chars">NO OPERATIVE DATA AVAILABLE</div>
                        ) : (
                            <div className="games-chars-classes-container">
                                {activeGame.characters.map(charGroup => {
                                    const groupChars = charGroup.ids
                                        .map(id => characters.find(c => c.id === id))
                                        .filter(Boolean);

                                    if (groupChars.length === 0) return null;

                                    return (
                                        <div key={charGroup.class} className="games-char-class-group">
                                            <h4 className="games-char-class-title">{charGroup.class}</h4>
                                            <div className="games-chars-grid">
                                                {groupChars.map(char => (
                                                    <Link
                                                        key={char.id}
                                                        to={`/characters?id=${char.id}`}
                                                        className="games-char-card"
                                                        title={`View ${char.name}`}
                                                    >
                                                        <div className="games-char-img-wrap">
                                                            <img src={char.image} alt={char.name} className="games-char-img" />
                                                            <div className="games-char-hover-label">VIEW FILE</div>
                                                        </div>
                                                        <span className="games-char-name">{char.name}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
}
