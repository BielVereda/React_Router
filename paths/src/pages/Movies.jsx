import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { movies } from '../data/moviesData';
import '../styles/Movies.css';

import umbrellaLogo from '../assets/images/brand/umbrella-logo.png';
import residentEvilLogo from '../assets/images/brand/resident-evil-logo.png';

export default function Movies() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [muted, setMuted] = useState(false);
    const [audioBlocked, setAudioBlocked] = useState(false);

    const bgAudioRef = useRef(null);
    const selectAudioRef = useRef(null);
    const cancelAudioRef = useRef(null);

    const activeMovie = movies[activeIndex];

    // Handle background music autoplay & browser policy
    useEffect(() => {
        const audio = bgAudioRef.current;
        if (audio) {
            audio.muted = true;
            audio.play()
                .then(() => {
                    setTimeout(() => {
                        audio.muted = false;
                    }, 500);
                })
                .catch(() => {
                    setAudioBlocked(true);
                });
        }
    }, []);

    // Play select sound
    const playSelectSound = () => {
        const selectSfx = selectAudioRef.current;
        if (selectSfx) {
            selectSfx.currentTime = 0;
            selectSfx.play().catch(() => {});
        }
    };

    // Play cancel/back sound
    const playCancelSound = () => {
        const cancelSfx = cancelAudioRef.current;
        if (cancelSfx) {
            cancelSfx.currentTime = 0;
            cancelSfx.play().catch(() => {});
        }
    };

    // Navigation handlers
    const nextMovie = () => {
        playSelectSound();
        setActiveIndex((prev) => (prev + 1) % movies.length);
    };

    const prevMovie = () => {
        playSelectSound();
        setActiveIndex((prev) => (prev - 1 + movies.length) % movies.length);
    };

    const selectMovie = (index) => {
        if (index === activeIndex) return;
        playSelectSound();
        setActiveIndex(index);
    };

    // Keyboard navigation (Arrow keys + A/D keys)
    useEffect(() => {
        const handleKeyDown = (e) => {
            const key = e.key.toLowerCase();
            if (key === 'arrowleft' || key === 'a') {
                prevMovie();
            } else if (key === 'arrowright' || key === 'd') {
                nextMovie();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeIndex]);

    // Audio Toggle
    const toggleMute = () => {
        const audio = bgAudioRef.current;
        if (!audio) return;

        if (audioBlocked) {
            audio.muted = false;
            audio.play();
            setAudioBlocked(false);
            setMuted(false);
        } else {
            audio.muted = !audio.muted;
            setMuted(audio.muted);
        }
    };

    return (
        <div className="movies-page-container">
            {/* Background Audio */}
            <audio ref={bgAudioRef} loop preload="auto">
                <source src="/audio/Safe_Room.mp3" type="audio/mpeg" />
            </audio>
            {/* SFX Audios */}
            <audio ref={selectAudioRef} preload="auto">
                <source src="/audio/cursorSelect.mp3" type="audio/mpeg" />
            </audio>
            <audio ref={cancelAudioRef} preload="auto">
                <source src="/audio/cursorCancel.mp3" type="audio/mpeg" />
            </audio>

            {/* Mute Button */}
            <button onClick={toggleMute} className="audio-btn" style={{ fontFamily: 'Resident Evil, sans-serif' }}>
                {audioBlocked ? '🔊 Unmute' : muted ? '🔊 Unmute' : '🔇 Mute'}
            </button>

            {/* Header branding */}
            <header className="site-header" style={{ width: '100%', maxWidth: '950px', marginBottom: '10px' }}>
                <div className="logo-row" style={{ display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center' }}>
                    <img src={umbrellaLogo} alt="Umbrella" className="umbrella-logo" style={{ height: '35px' }} />
                    <img src={residentEvilLogo} alt="Resident Evil" className="resident-logo" style={{ height: '30px' }} />
                </div>
            </header>

            {/* Biohazard styled screen title */}
            <h1 className="biohazard-title">MOVIE SELECT</h1>

            {/* Carousel Slider */}
            <section className="movies-slider-section">
                <button className="slider-arrow" onClick={prevMovie} aria-label="Previous Movie">◀</button>
                
                <div className="movies-carousel">
                    {movies.map((movie, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <div
                                key={movie.id}
                                className={`movie-card ${isActive ? 'active' : ''}`}
                                onClick={() => selectMovie(index)}
                            >
                                <div className="movie-card-frame">
                                    <img src={movie.image} alt={movie.fullTitle} className="movie-card-image" />
                                </div>
                                <div className="movie-card-indicators">
                                    <span className={`indicator-badge ${movie.type.includes('CGI') ? 'cgi' : 'live'}`}>
                                        {movie.type.includes('CGI') ? 'CGI' : 'LIVE'}
                                    </span>
                                    <span>{movie.year}</span>
                                    <span>{movie.duration}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button className="slider-arrow" onClick={nextMovie} aria-label="Next Movie">▶</button>
            </section>

            {/* Detail Panel */}
            <main className="movie-details-panel">
                <div className="details-header">
                    <h2 className="details-title-full">{activeMovie.fullTitle}</h2>
                    <h3 className="details-subtitle-game">
                        {activeMovie.title} : {activeMovie.subtitle}
                    </h3>
                </div>

                <div className="details-content-grid">
                    {/* Left Column */}
                    <section className="details-left-column">
                        <div>
                            <div className="left-section-title">Classificação Indicativa</div>
                            <div className="info-row-rating">
                                <div className={`age-badge age-${activeMovie.ageRating}`}>
                                    {activeMovie.ageRating}
                                </div>
                                <div className="age-label">
                                    Classificação Oficial: <strong>{activeMovie.ageRating === '18' ? '18+' : `${activeMovie.ageRating} Anos`}</strong>
                                    <br />Recomendado para maiores.
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="left-section-title">Avaliações das Plataformas</div>
                            <div className="ratings-container">
                                <div className="rating-box">
                                    <div className="rating-site">IMDb</div>
                                    <div className="rating-val">{activeMovie.ratings.imdb}</div>
                                </div>
                                <div className="rating-box">
                                    <div className="rating-site">Rotten T.</div>
                                    <div className="rating-val">{activeMovie.ratings.rotten}</div>
                                </div>
                                <div className="rating-box">
                                    <div className="rating-site">Metacritic</div>
                                    <div className="rating-val">{activeMovie.ratings.metacritic}</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="left-section-title">Onde Assistir</div>
                            <div className="streams-container">
                                {activeMovie.whereToWatch.map((stream) => (
                                    <span key={stream} className="stream-badge">
                                        🎬 {stream}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Right Column */}
                    <section className="details-right-column">
                        <div className="left-section-title">Prólogo do Filme</div>
                        <div className="prologue-box">
                            {activeMovie.description}
                        </div>
                    </section>
                </div>
            </main>

            {/* HUD Footer controls */}
            <footer className="movies-hud-footer">
                <div className="hud-left">
                    Select a movie archive to inspect details.
                </div>
                <div className="hud-right">
                    <div className="hud-btn" onClick={prevMovie}>
                        <span className="hud-key">A</span>
                        <span className="hud-key">◀</span>
                        <span>Mover</span>
                    </div>
                    <div className="hud-btn" onClick={nextMovie}>
                        <span className="hud-key">D</span>
                        <span className="hud-key">▶</span>
                        <span>Mover</span>
                    </div>
                    <Link to="/" className="hud-btn" onClick={playCancelSound}>
                        <span className="hud-key">ESC</span>
                        <span>Menu Inicial</span>
                    </Link>
                </div>
            </footer>
        </div>
    );
}
