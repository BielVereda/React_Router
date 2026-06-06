import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { characters } from "@src/js/charactersData";
import "@styles/Characters.css";

// Assets imports
import umbrellaLogo from "@assets/images/Home/umbrella-logo.png";
import residentEvilLogo from "@assets/images/Home/resident-evil-logo.png";

import jillLocal from "@assets/images/Home/chars/jill.png";
import leonLocal from "@assets/images/Home/chars/leon.webp";
import claireLocal from "@assets/images/Home/chars/claire.webp";

// Mapping of characters that have local assets
const LOCAL_CHAR_IMAGES = {
    jill_valentine: jillLocal,
    leon_kennedy: leonLocal,
    claire_redfield: claireLocal
};

export default function Characters() {
    /* ── Terminal Connect Overlay ───────────────────────────── */
    const [showConnect, setShowConnect] = useState(true);

    /* ── Search & State ─────────────────────────────────────── */
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    
    // Default selected character is Leon
    const defaultChar = characters.find(c => c.id === "leon_kennedy") || characters[0];
    const [selectedCharacter, setSelectedCharacter] = useState(defaultChar);
    const [imgError, setImgError] = useState(false);

    /* ── Audio ──────────────────────────────────────────────── */
    const bgAudioRef = useRef(null);
    const typewriterAudioRef = useRef(null);
    const [muted, setMuted] = useState(false);
    const [audioBlocked, setAudioBlocked] = useState(false);

    // Reset image error state when character changes
    useEffect(() => {
        setImgError(false);
    }, [selectedCharacter]);

    // Handle entering and starting the music
    const handleConnect = () => {
        setShowConnect(false);
        const bgAudio = bgAudioRef.current;
        if (!bgAudio) return;

        bgAudio.volume = 0;
        bgAudio.play()
            .then(() => {
                let vol = 0;
                const fade = setInterval(() => {
                    vol = Math.min(vol + 0.05, 0.7);
                    bgAudio.volume = vol;
                    if (vol >= 0.7) clearInterval(fade);
                }, 100);
            })
            .catch(() => {
                setAudioBlocked(true);
            });
    };

    // Toggle mute/unmute
    const toggleMute = () => {
        const bgAudio = bgAudioRef.current;
        if (!bgAudio) return;

        if (audioBlocked) {
            bgAudio.volume = 0.7;
            bgAudio.play();
            setAudioBlocked(false);
            setMuted(false);
        } else {
            bgAudio.muted = !bgAudio.muted;
            setMuted(bgAudio.muted);
        }
    };

    // Play typewriter save sound
    const playTypewriterSound = () => {
        const twAudio = typewriterAudioRef.current;
        if (twAudio) {
            twAudio.currentTime = 0;
            twAudio.volume = 0.8;
            twAudio.play().catch(e => console.log("Sound play blocked:", e));
        }
    };

    // Execute search action
    const triggerSearch = (term) => {
        playTypewriterSound();
        setSuggestions([]);

        if (!term.trim()) return;

        const cleanTerm = term.trim().toLowerCase();
        
        // Find exact or partial match
        const found = characters.find(c => 
            c.name.toLowerCase().includes(cleanTerm) ||
            c.id.toLowerCase().includes(cleanTerm)
        );

        if (found) {
            setSelectedCharacter(found);
        } else {
            setSelectedCharacter(null);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            triggerSearch(searchTerm);
        }
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setSearchTerm(val);

        if (val.trim().length > 0) {
            const filtered = characters.filter(c => 
                c.name.toLowerCase().includes(val.toLowerCase())
            ).slice(0, 5);
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    // Handle suggestion item click
    const selectSuggestion = (char) => {
        setSearchTerm(char.name);
        setSelectedCharacter(char);
        setSuggestions([]);
        playTypewriterSound();
    };

    // Format game names nicely
    const formatGameName = (game) => {
        return game;
    };

    // Determine character image source
    const getCharImage = (char) => {
        if (!char) return null;
        if (LOCAL_CHAR_IMAGES[char.id]) {
            return LOCAL_CHAR_IMAGES[char.id];
        }
        return char.image;
    };

    return (
        <div className="characters-container">
            {/* Audio players */}
            <audio ref={bgAudioRef} loop preload="auto">
                <source src="/audio/Safe_Room.mp3" type="audio/mpeg" />
            </audio>
            <audio ref={typewriterAudioRef} preload="auto">
                <source src="/audio/typewriter.mp3" type="audio/mpeg" />
            </audio>

            {/* ── Connection warning screen ── */}
            {showConnect && (
                <div className="char-audio-overlay">
                    <div className="char-audio-box">
                        <img src={umbrellaLogo} alt="Umbrella Logo" className="char-audio-umbrella" />
                        <h2 className="char-audio-headline">ACCESSING SYSTEM DOSSIERS</h2>
                        <p className="char-audio-msg">
                            Connecting to Umbrella Corporation Database terminal.<br />
                            A safe audio feedback stream will be initialized.
                        </p>
                        <button className="char-audio-btn" onClick={handleConnect}>
                            ▶ INITIALIZE TRANSMISSION
                        </button>
                    </div>
                </div>
            )}

            {/* ── Header ── */}
            <header className="char-header">
                <div className="char-header-left">
                    <img src={umbrellaLogo} alt="Umbrella logo" className="char-umbrella-logo" />
                    <div className="char-title-container">
                        <img src={residentEvilLogo} alt="Resident Evil Logo" className="char-re-logo" />
                        <span className="char-subtitle-mini">Umbrella Corporation Archives</span>
                    </div>
                </div>
                <h1 className="char-title">Characters</h1>
                <div className="char-header-right">
                    <button className="char-btn-audio" onClick={toggleMute}>
                        {audioBlocked ? "🔊 UNMUTE" : muted ? "🔊 UNMUTE" : "🔇 MUTE"}
                    </button>
                    <Link to="/" className="char-btn-back">
                        ◀ BACK TO SAFEROOM
                    </Link>
                </div>
            </header>

            {/* ── Intro terminal description ── */}
            <div className="char-intro-box">
                <p className="char-intro-text">
                    <strong>SYSTEM WARNING:</strong> Classified Raccoon City and Umbrella bioweapon incidents dossier database. 
                    Search for survivors, S.T.A.R.S. members, Umbrella personnel, or B.O.W. specimens using the search input below.
                </p>
            </div>

            {/* ── Search Input Box ── */}
            <div className="char-search-wrapper">
                <span className="char-search-label">Terminal Query Search</span>
                <div className="char-search-bar">
                    <div className="char-input-container">
                        <input
                            type="text"
                            className="char-search-input"
                            placeholder="Enter agent or specimen name..."
                            value={searchTerm}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        {/* Suggestions Dropdown */}
                        {suggestions.length > 0 && (
                            <ul className="char-suggestions-list">
                                {suggestions.map(char => (
                                    <li 
                                        key={char.id} 
                                        className="char-suggestion-item"
                                        onClick={() => selectSuggestion(char)}
                                    >
                                        <span>{char.name}</span>
                                        <span className="char-sugg-affiliation">{char.affiliation.split("/")[0]}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <button className="char-search-btn" onClick={() => triggerSearch(searchTerm)}>
                        Search
                    </button>
                </div>
            </div>

            {/* ── Main Dossier Card ── */}
            {selectedCharacter ? (
                <div className="char-dossier-card">
                    {/* Left Column: Portrait */}
                    <div className="char-dossier-left">
                        <div className="char-frame-large">
                            <span className="char-frame-corner tl" />
                            <span className="char-frame-corner tr" />
                            <span className="char-frame-corner bl" />
                            <span className="char-frame-corner br" />

                            {!imgError && getCharImage(selectedCharacter) ? (
                                <img
                                    src={getCharImage(selectedCharacter)}
                                    alt={selectedCharacter.name}
                                    className="char-img-large"
                                    onError={() => setImgError(true)}
                                />
                            ) : (
                                <div className="char-classified-placeholder">
                                    <svg className="char-classified-silhouette" viewBox="0 0 24 24">
                                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                    </svg>
                                    <img src={umbrellaLogo} className="char-classified-watermark" alt="umbrella" />
                                    <div className="char-classified-stamp">Restricted</div>
                                    <span className="char-classified-footer">Classified Files</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Dossier details */}
                    <div className="char-dossier-right">
                        <h2 className="char-dossier-name">{selectedCharacter.name}</h2>
                        
                        <div className="char-metadata-grid">
                            <div className="char-meta-item">
                                <span className="char-meta-label">Affiliation</span>
                                <span className="char-meta-value">{selectedCharacter.affiliation}</span>
                            </div>
                            <div className="char-meta-item">
                                <span className="char-meta-label">Status</span>
                                <span className={`char-status-badge ${selectedCharacter.status.toLowerCase()}`}>
                                    {selectedCharacter.status}
                                </span>
                            </div>
                            <div className="char-meta-item">
                                <span className="char-meta-label">First Appearance</span>
                                <span className="char-meta-value">{selectedCharacter.firstAppearance}</span>
                            </div>
                        </div>

                        <div className="char-bio-container">
                            <h3 className="char-bio-title">BIOLOGICAL & HISTORICAL DOSSIER</h3>
                            <p className="char-bio-content">{selectedCharacter.bio}</p>
                        </div>

                        {selectedCharacter.games && selectedCharacter.games.length > 0 && (
                            <div className="char-games-container">
                                <h3 className="char-games-title">Record of Appearances</h3>
                                <div className="char-games-list">
                                    {selectedCharacter.games.map((game, idx) => (
                                        <span key={idx} className="char-game-badge">
                                            {formatGameName(game)}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                /* ── No Results Screen ── */
                <div className="char-no-results">
                    <div className="char-no-results-icon">⚠</div>
                    <p className="char-no-results-text">
                        <strong>QUERY REJECTED:</strong> No matching agent or B.O.W. specimen found for: <br />
                        <span style={{ color: "#ff4444", fontFamily: "Courier New", fontSize: "16px" }}>"{searchTerm}"</span>
                    </p>
                    <button 
                        className="char-clear-btn" 
                        onClick={() => {
                            setSearchTerm("");
                            setSelectedCharacter(defaultChar);
                        }}
                    >
                        Reset Terminal
                    </button>
                </div>
            )}
        </div>
    );
}
