import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { consoleSections } from '../data/downloadsData'
import '../styles/Downloads.css'
import umbrellaLogo from '../assets/images/brand/umbrella-logo.png'
import reLogo from '../assets/images/brand/resident-evil-logo.png'

export default function Downloads() {
    const [activeConsole, setActiveConsole] = useState('gbc')
    const [entered, setEntered] = useState(false)
    const [muted, setMuted] = useState(false)
    const [audioBlocked, setAudioBlocked] = useState(false)

    const bgAudioRef = useRef(null)

    const activeSection = consoleSections.find(s => s.id === activeConsole)

    /* ── Background audio ───────────────────────────────────── */
    useEffect(() => {
        const audio = bgAudioRef.current
        if (!audio) return
        audio.muted = true
        audio.play()
            .then(() => { setTimeout(() => { audio.muted = false }, 500) })
            .catch(() => setAudioBlocked(true))
    }, [])

    const toggleMute = () => {
        const audio = bgAudioRef.current
        if (!audio) return
        if (audioBlocked) {
            audio.muted = false
            audio.play()
            setAudioBlocked(false)
            setMuted(false)
        } else {
            audio.muted = !audio.muted
            setMuted(audio.muted)
        }
    }

    /* ── Download handler ───────────────────────────────────── */
    const handleDownload = (link) => {
        if (!link || link.startsWith('PLACEHOLDER')) return
        window.open(link, '_blank', 'noopener,noreferrer')
    }

    const isPlaceholder = (link) => !link || link.startsWith('PLACEHOLDER')

    /* ── Entry overlay ──────────────────────────────────────── */
    if (!entered) {
        return (
            <div className="warning-overlay dl-entry-overlay">
                <div className="warning-box">
                    <div className="warning-scanlines" />
                    <img src={umbrellaLogo} alt="Umbrella" className="warning-umbrella" />
                    <p className="warning-corp-name">UMBRELLA CORPORATION</p>
                    <div className="warning-divider" />
                    <h2 className="warning-headline">SECURE ARCHIVE</h2>
                    <p className="warning-msg">
                        You are accessing the <strong>Biohazard Countermeasure Service</strong><br />
                        classified file repository.<br /><br />
                        Game archives, emulation software and firmware<br />
                        are stored within this unit.
                    </p>
                    <p className="warning-sub">
                        BIOS files are proprietary firmware. Ensure legal ownership<br />
                        of the original hardware before downloading.
                    </p>
                    <button className="warning-btn" onClick={() => setEntered(true)}>
                        ACCESS ARCHIVE
                    </button>
                </div>
            </div>
        )
    }

    /* ── Main page ──────────────────────────────────────────── */
    return (
        <div className="dl-page">

            <audio ref={bgAudioRef} loop preload="auto">
                <source src="/audio/Safe_Room.mp3" type="audio/mpeg" />
            </audio>

            <div className="dl-scanlines" />

            {/* ── Header ──────────────────────────────────────────── */}
            <header className="dl-header">
                <div className="dl-header-left">
                    <img src={umbrellaLogo} alt="Umbrella" className="dl-umbrella-logo" />
                    <img src={reLogo} alt="Resident Evil" className="dl-re-logo" />
                    <div className="dl-title-block">
                        <h1 className="dl-title">SECURE ARCHIVE</h1>
                        <p className="dl-subtitle">
                            BIOTERRORISM COUNTERMEASURE SERVICE — FILE REPOSITORY
                        </p>
                    </div>
                </div>

                <div className="dl-header-right">
                    <button className="dl-btn-sm" onClick={toggleMute}>
                        {audioBlocked || muted ? '[ UNMUTE ]' : '[ MUTE ]'}
                    </button>
                    <Link to="/" className="dl-btn-sm">[ SAFEROOM ]</Link>
                </div>
            </header>

            {/* ── Terminal intro ───────────────────────────────────── */}
            <div className="dl-intro">
                <p className="dl-intro-line">
                    <span className="dl-prompt">&gt;_</span>{' '}
                    ACCESS LEVEL: <strong>ALPHA</strong> — CONNECTION ESTABLISHED
                </p>
                <p className="dl-intro-line">
                    <span className="dl-prompt">&gt;_</span>{' '}
                    Select a target platform to display available game archives, emulation software and firmware.
                </p>
                <p className="dl-intro-line">
                    <span className="dl-prompt">&gt;_</span>{' '}
                    All files archived in original format. <strong>No modifications applied.</strong>
                </p>
            </div>

            {/* ── Console Tabs ────────────────────────────────────── */}
            <nav className="dl-tabs">
                {consoleSections.map(section => (
                    <button
                        key={section.id}
                        className={`dl-tab ${activeConsole === section.id ? 'active' : ''}`}
                        onClick={() => setActiveConsole(section.id)}
                    >
                        <span className="dl-tab-short">{section.shortName}</span>
                        <span className="dl-tab-full">{section.console}</span>
                    </button>
                ))}
            </nav>

            {/* ── Active Section ───────────────────────────────────── */}
            {activeSection && (
                <div className="dl-section">

                    {/* Console banner */}
                    <div className="dl-console-banner">
                        <div>
                            <p className="dl-console-name">{activeSection.console}</p>
                            <p className="dl-console-years">ARCHIVE PERIOD: {activeSection.years}</p>
                        </div>
                        {activeSection.hasBios && (
                            <div className="dl-bios-req-badge">
                                <span>⚠</span> BIOS REQUIRED
                            </div>
                        )}
                    </div>

                    {/* ── GAME FILES ──────────────────────────────────── */}
                    <div className="dl-subsection">
                        <div className="dl-subsection-hd">
                            <span className="dl-subsection-label">GAME FILES</span>
                            <span className="dl-subsection-count">
                                {activeSection.games.length} UNIT{activeSection.games.length !== 1 ? 'S' : ''} STORED
                            </span>
                        </div>

                        <div className="dl-grid">
                            {activeSection.games.map(game => (
                                <div key={game.id} className="dl-card game-card">

                                    <div className="dl-card-top">
                                        <div className="dl-badges">
                                            <span className="dl-badge badge-game">GAME</span>
                                            <span className="dl-badge badge-console">{activeSection.shortName}</span>
                                            <span className="dl-badge badge-region">{game.region}</span>
                                        </div>
                                        <span className="dl-card-year">{game.year}</span>
                                    </div>

                                    <h3 className="dl-card-title">{game.title}</h3>
                                    <p className="dl-card-genre">// {game.genre}</p>
                                    <p className="dl-card-desc">{game.description}</p>

                                    <div className="dl-card-foot">
                                        <span className="dl-card-meta">{game.size}</span>
                                        <button
                                            className={`dl-dl-btn${isPlaceholder(game.link) ? ' btn-placeholder' : ''}`}
                                            onClick={() => handleDownload(game.link)}
                                            title={isPlaceholder(game.link) ? 'Link not yet configured' : `Download ${game.title}`}
                                        >
                                            {isPlaceholder(game.link) ? '⌛ PENDING' : '↓ DOWNLOAD'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── EMULATOR ────────────────────────────────────── */}
                    <div className="dl-subsection">
                        <div className="dl-subsection-hd">
                            <span className="dl-subsection-label">EMULATION SOFTWARE</span>
                        </div>

                        <div className="dl-card emu-card">
                            <div className="dl-card-top">
                                <div className="dl-badges">
                                    <span className="dl-badge badge-emu">EMULATOR</span>
                                    {activeSection.emulator.os.map(os => (
                                        <span key={os} className="dl-badge badge-os">{os}</span>
                                    ))}
                                </div>
                                <span className="dl-card-year">v{activeSection.emulator.version}</span>
                            </div>

                            <h3 className="dl-card-title">{activeSection.emulator.name}</h3>
                            <p className="dl-card-desc">{activeSection.emulator.description}</p>

                            {activeSection.biosNote && (
                                <div className="dl-info-note">
                                    <span>ℹ</span>
                                    <p>{activeSection.biosNote}</p>
                                </div>
                            )}

                            <div className="dl-card-foot">
                                <span className="dl-card-meta">
                                    Official:{' '}
                                    <a
                                        href={activeSection.emulator.officialSite}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="dl-ext-link"
                                    >
                                        {activeSection.emulator.officialSite}
                                    </a>
                                </span>
                                <button
                                    className={`dl-dl-btn${isPlaceholder(activeSection.emulator.link) ? ' btn-placeholder' : ''}`}
                                    onClick={() => handleDownload(activeSection.emulator.link)}
                                    title={isPlaceholder(activeSection.emulator.link) ? 'Link not yet configured' : `Download ${activeSection.emulator.name}`}
                                >
                                    {isPlaceholder(activeSection.emulator.link) ? '⌛ PENDING' : '↓ DOWNLOAD'}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── BIOS ────────────────────────────────────────── */}
                    {activeSection.hasBios && activeSection.bios && (
                        <div className="dl-subsection">
                            <div className="dl-subsection-hd">
                                <span className="dl-subsection-label">FIRMWARE / BIOS</span>
                                <span className="dl-restricted">⚠ RESTRICTED ACCESS</span>
                            </div>

                            <div className="dl-card bios-card">
                                <div className="dl-card-top">
                                    <div className="dl-badges">
                                        <span className="dl-badge badge-bios">BIOS</span>
                                    </div>
                                    <span className="dl-card-year">{activeSection.bios.size}</span>
                                </div>

                                <h3 className="dl-card-title">{activeSection.bios.name}</h3>
                                <p className="dl-card-desc">{activeSection.bios.description}</p>

                                <div className="dl-warning-block">
                                    <span className="dl-warning-icon">⚠</span>
                                    <p className="dl-warning-text">{activeSection.bios.warning}</p>
                                </div>

                                <div className="dl-card-foot">
                                    <span className="dl-card-meta">{activeSection.bios.size}</span>
                                    <button
                                        className={`dl-dl-btn bios-dl-btn${isPlaceholder(activeSection.bios.link) ? ' btn-placeholder' : ''}`}
                                        onClick={() => handleDownload(activeSection.bios.link)}
                                        title={isPlaceholder(activeSection.bios.link) ? 'Link not yet configured' : `Download ${activeSection.bios.name}`}
                                    >
                                        {isPlaceholder(activeSection.bios.link) ? '⌛ PENDING' : '↓ DOWNLOAD'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            )}

            {/* ── Footer ──────────────────────────────────────────── */}
            <footer className="dl-footer">
                <span className="dl-footer-dot">●</span>
                All game files are the intellectual property of their respective rights holders.
                This archive exists solely for preservation purposes.
            </footer>
        </div>
    )
}