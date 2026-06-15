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
    const [started, setStarted] = useState(false);

    const bgAudioRef = useRef(null);
    const selectAudioRef = useRef(null);
    const cancelAudioRef = useRef(null);

    const activeMovie = movies[activeIndex];
    const movieRefs = useRef([]);

    // Scroll active movie to center
    useEffect(() => {
        if (movieRefs.current[activeIndex]) {
            movieRefs.current[activeIndex].scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            });
        }
    }, [activeIndex]);

    // Handle start to satisfy browser audio policies
    // Background audio fade-in logic
    const handleStart = () => {
        setStarted(true);
        const audio = bgAudioRef.current;
        if (audio) {
            audio.volume = 0;
            audio.muted = false;
            audio.play().then(() => {
                let vol = 0;
                const fade = setInterval(() => {
                    vol = Math.min(vol + 0.05, 0.7);
                    audio.volume = vol;
                    if (vol >= 0.7) clearInterval(fade);
                }, 100);
            }).catch(() => {
                setAudioBlocked(true);
            });
        }
    };

    // Play select sound
    const playSelectSound = () => {
        const selectSfx = selectAudioRef.current;
        if (selectSfx) {
            selectSfx.currentTime = 0;
            selectSfx.play().catch(() => { });
        }
    };

    // Play cancel/back sound
    const playCancelSound = () => {
        const cancelSfx = cancelAudioRef.current;
        if (cancelSfx) {
            cancelSfx.currentTime = 0;
            cancelSfx.play().catch(() => { });
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

    // Audio Toggle
    const toggleMute = () => {
        const audio = bgAudioRef.current;
        if (!audio) return;

        if (audioBlocked) {
            audio.volume = 0.7;
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
        <div className="movies-page-container fade-in">
            {/* Background Audio */}
            <audio ref={bgAudioRef} loop preload="auto">
                <source src="/audio/Not_Found.mp3" type="audio/mpeg" />
            </audio>
            {/* SFX Audios */}
            <audio ref={selectAudioRef} preload="auto">
                <source src="/audio/cursorSelect.mp3" type="audio/mpeg" />
            </audio>
            <audio ref={cancelAudioRef} preload="auto">
                <source src="/audio/cursorCancel.mp3" type="audio/mpeg" />
            </audio>

            {!started && (
                <div className="warning-overlay">
                    <div className="warning-box">
                        <div className="warning-scanlines" />
                        <img src={umbrellaLogo} alt="Umbrella" className="warning-umbrella" />
                        <p className="warning-headline" style={{ marginTop: '10px' }}>VISUAL RECORDS ARCHIVE</p>
                        <div className="warning-divider" />
                        <p className="warning-msg" style={{ margin: '20px 0' }}>
                            Decrypting Umbrella Corporation surveillance footage and B.O.W. field encounters.<br />
                            Audio and visual feeds are ready for playback.
                        </p>
                        <button className="warning-btn" onClick={handleStart}>
                            ▶ DECRYPT FOOTAGE
                        </button>
                    </div>
                </div>
            )}

            {/* Header branding */}
            <header className="movies-header">
                <div className="movies-header-left">
                    <img src={umbrellaLogo} alt="Umbrella" className="movies-umbrella-logo" />
                    <img src={residentEvilLogo} alt="Resident Evil" className="movies-resident-logo" />
                </div>

                <div className="movies-header-right">
                    <button onClick={toggleMute} className="audio-btn movies-audio-btn">
                        {audioBlocked ? '🔊 UNMUTE' : muted ? '🔊 UNMUTE' : '🔇 MUTE'}
                    </button>
                    <Link to="/" className="movies-btn-back">
                        ◀ BACK TO SAFEROOM
                    </Link>
                </div>
            </header>

            {/* Carousel Slider */}
            <section className="movies-slider-section">
                <button className="slider-arrow" onClick={prevMovie} aria-label="Previous Movie">◀</button>

                <div className="movies-carousel">
                    {movies.map((movie, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <div
                                key={movie.id}
                                ref={(el) => (movieRefs.current[index] = el)}
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
            <main key={activeIndex} className="movie-details-panel panel-transition">
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
                            <div className="left-section-title">Age Rating</div>
                            <div className="info-row-rating">
                                <div className={`age-badge age-${activeMovie.ageRating}`}>
                                    {activeMovie.ageRating}
                                </div>
                                <div className="age-label">
                                    Official Rating: <strong>{activeMovie.ageRating === '18' ? '18+' : `${activeMovie.ageRating} Years`}</strong>
                                    <br />Recommended for mature audiences.
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="left-section-title">Platform Ratings</div>
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
                            <div className="left-section-title">Where to Watch</div>
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
                        <div className="left-section-title">Film Prologue</div>
                        <div className="prologue-box">
                            {activeMovie.description}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}