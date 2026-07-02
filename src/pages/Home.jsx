import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Home.css';
import umbrellaLogo from '../assets/images/brand/umbrella-logo.png';
import residentEvilLogo from '../assets/images/brand/resident-evil-logo.png';

import jill from '../assets/images/characters/jill.png';
import leon from '../assets/images/characters/leon.webp';
import claire from '../assets/images/characters/claire.webp';

const CHARACTER_IMAGES = [
    { name: "Jill Valentine", src: jill },
    { name: "Leon S. Kennedy", src: leon },
    { name: "Claire Redfield", src: claire },
];

import sprayImg from '../assets/images/items/first_aid_spray.webp';

const SPRAY_ITEM = {
    id: 8,
    type: "action",
    action: "spray",
    label: "F.AID SPRAY",
    icon: sprayImg,
    to: null,
    size: "1x1",
    position: { col: 5, row: 2 },
};

/* `desc` is only used by the mobile menu — it plays the same role as the
   "Resume the game from the beginning of the Stage you left off in." caption
   under the CONTINUE entry in the reference menu: a one-line blurb for
   whichever entry currently holds the highlight bar. */
const BASE_ITEMS = [
    { id: 1, type: "link", label: "CHARACTERS", to: "/characters", size: "1x1", position: { col: 1, row: 1 }, desc: "Dossiês completos de sobreviventes, operativos e espécimes B.O.W." },
    { id: 2, type: "link", label: "GAMES", to: "/games", size: "2x1", position: { col: 2, row: 1 }, desc: "Toda a linha do tempo da franquia, jogo a jogo, com lore e curiosidades." },
    { id: 3, type: "link", label: "MOVIES", to: "/movies", size: "1x1", position: { col: 1, row: 2 }, desc: "Produções live-action e animadas do universo Resident Evil." },
    { id: 4, type: "link", label: "DOWNLOADS", to: "/downloads", size: "2x2", position: { col: 3, row: 2 }, desc: "Wallpapers, ícones e arquivos para colecionadores do arquivo." },
    { id: 5, type: "link", label: "3D MODELS", to: "/models3d", size: "1x1", position: { col: 5, row: 1 }, desc: "Modelos 3D feitos pela comunidade, prontos para inspecionar." },
    { id: 6, type: "link", label: "ABOUT", to: "/about", size: "1x1", position: { col: 6, row: 1 }, desc: "A origem e a missão deste arquivo classificado." },
    { id: 7, type: "link", label: "CONTACT", to: "/contact", size: "1x1", position: { col: 6, row: 2 }, desc: "Envie uma transmissão direta para a equipe do arquivo." },
];

const GRID_COLS = 6;
const GRID_ROWS = 4;
const HEALTH_SEGMENTS = 12;
const MOBILE_SELECT_DELAY = 650; // ms — must match the CSS animation duration

export default function Home() {

    /* ── Warning screen ─────────────────────────────────────── */
    const [showWarning, setShowWarning] = useState(true);

    /* ── Audio ──────────────────────────────────────────────── */
    const bgAudioRef = useRef(null);
    const sprayAudioRef = useRef(null);
    const [muted, setMuted] = useState(false);
    const [audioBlocked, setAudioBlocked] = useState(false);

    /* ── Health / Spray ─────────────────────────────────────── */
    const [health, setHealth] = useState('yellow');
    const [hasSpray, setHasSpray] = useState(true);
    const [showSprayPrompt, setShowSprayPrompt] = useState(false);
    const [sprayUsed, setSprayUsed] = useState(false);

    /* ── Character panel ────────────────────────────────────── */
    const [currentChar, setCurrentChar] = useState(0);

    /* ── Inventory ──────────────────────────────────────────── */
    const [items, setItems] = useState([...BASE_ITEMS, SPRAY_ITEM]);
    const [dragId, setDragId] = useState(null);
    const isDraggingRef = useRef(false);

    /* ── Mobile menu (RE5-style list, no hover, tap to select) ── */
    const navigate = useNavigate();
    const [mobileSelectedId, setMobileSelectedId] = useState(null);

    /* Sync spray item with hasSpray state */
    useEffect(() => {
        setItems(prev => {
            const without = prev.filter(i => i.id !== SPRAY_ITEM.id);
            return hasSpray ? [...without, SPRAY_ITEM] : without;
        });
    }, [hasSpray]);

    /* ── Enter after warning ─────────────────────────────────── */
    const handleEnter = () => {
        setShowWarning(false);
        const audio = bgAudioRef.current;
        if (!audio) return;
        audio.volume = 0;
        audio.play()
            .then(() => {
                let vol = 0;
                const fade = setInterval(() => {
                    vol = Math.min(vol + 0.04, 0.7);
                    audio.volume = vol;
                    if (vol >= 0.7) clearInterval(fade);
                }, 100);
            })
            .catch(() => setAudioBlocked(true));
    };

    /* ── Audio toggle ────────────────────────────────────────── */
    const toggleMute = () => {
        const audio = bgAudioRef.current;
        if (!audio) return;
        if (audioBlocked) {
            audio.volume = 0.7;
            audio.play();
            setAudioBlocked(false);
            setMuted(false);
        } else {
            audio.muted = !audio.muted;
            setMuted(audio.muted);
        }
    };

    /* ── Use spray ───────────────────────────────────────────── */
    const handleUseSpray = () => {
        setHealth('green');
        setHasSpray(false);
        setShowSprayPrompt(false);
        setSprayUsed(true);
        const audio = sprayAudioRef.current;
        if (audio) { audio.currentTime = 0; audio.play(); }
    };

    /* ── Character cycling ───────────────────────────────────── */
    const total = Math.max(CHARACTER_IMAGES.length, 1);
    const prevChar = () => setCurrentChar(c => (c - 1 + total) % total);
    const nextChar = () => setCurrentChar(c => (c + 1) % total);

    /* ── Drag & Drop ─────────────────────────────────────────── */
    const handleDragStart = (e, id) => {
        isDraggingRef.current = true;
        e.dataTransfer.setData("dragId", String(id));
        setDragId(id);
    };

    const handleDragEnd = () => {
        setTimeout(() => { isDraggingRef.current = false; }, 50);
        setDragId(null);
    };

    const handleDrop = (e, col, row) => {
        const rawId = e.dataTransfer.getData("dragId");
        if (!rawId) return;
        const numId = parseInt(rawId);
        const draggedItem = items.find(i => i.id === numId);
        if (!draggedItem) return;

        const [w, h] = draggedItem.size.split("x").map(Number);
        const collision = items.some(i => {
            if (i.id === numId) return false;
            const [iw, ih] = i.size.split("x").map(Number);
            for (let cx = 0; cx < w; cx++)
                for (let cy = 0; cy < h; cy++) {
                    const tc = col + cx, tr = row + cy;
                    if (tc >= i.position.col && tc < i.position.col + iw &&
                        tr >= i.position.row && tr < i.position.row + ih) return true;
                }
            return false;
        });

        if (col + w - 1 > GRID_COLS || row + h - 1 > GRID_ROWS || collision) return;

        setItems(prev => prev.map(item =>
            item.id === numId ? { ...item, position: { col, row } } : item
        ));
        setDragId(null);
    };

    const handleDragOver = (e) => e.preventDefault();

    /* ── Grid helpers ────────────────────────────────────────── */
    const isSlotOccupied = (col, row) =>
        items.some(item => {
            const [w, h] = item.size.split("x").map(Number);
            return col >= item.position.col && col < item.position.col + w &&
                row >= item.position.row && row < item.position.row + h;
        });

    const invalidSlot = (col, row) => {
        if (!dragId) return false;
        const dragged = items.find(i => i.id === dragId);
        if (!dragged) return false;
        const [w, h] = dragged.size.split("x").map(Number);
        if (col + w - 1 > GRID_COLS || row + h - 1 > GRID_ROWS) return true;
        return items.some(i => {
            if (i.id === dragged.id) return false;
            const [iw, ih] = i.size.split("x").map(Number);
            for (let cx = 0; cx < w; cx++)
                for (let cy = 0; cy < h; cy++) {
                    const tc = col + cx, tr = row + cy;
                    if (tc >= i.position.col && tc < i.position.col + iw &&
                        tr >= i.position.row && tr < i.position.row + ih) return true;
                }
            return false;
        });
    };

    const validSlot = (col, row) => !!dragId && !invalidSlot(col, row);

    /* ── Health bar ──────────────────────────────────────────── */
    const filledSegments = health === 'green' ? HEALTH_SEGMENTS : Math.floor(HEALTH_SEGMENTS * 0.45);
    const healthColor = health === 'green' ? '#00ff44' : '#ffcc00';
    const healthStatus = health === 'green' ? 'FINE' : 'CAUTION';

    /* ── Mobile menu select ──────────────────────────────────── */
    const handleMobileSelect = (item) => {
        if (mobileSelectedId || !item.to) return;
        setMobileSelectedId(item.id);
        setTimeout(() => {
            navigate(item.to);
        }, MOBILE_SELECT_DELAY);
    };

    /* Whichever entry currently owns the highlight bar — the tapped one while
       the select animation plays, otherwise the default (first) entry. */
    const mobileActiveItem =
        BASE_ITEMS.find(i => i.id === mobileSelectedId) || BASE_ITEMS[0];

    /* ── Render ──────────────────────────────────────────────── */
    return (
        <div className="home-container">

            {/* Atmospheric blood drips */}
            <div className="blood-drips" aria-hidden="true">
                <span /><span /><span /><span /><span /><span />
            </div>

            {/* ── Warning overlay ── */}
            {showWarning && (
                <div className="warning-overlay">
                    <div className="warning-box">
                        <div className="warning-scanlines" />
                        <img src={umbrellaLogo} alt="Umbrella" className="warning-umbrella" />
                        <p className="warning-corp-name">UMBRELLA CORPORATION</p>
                        <div className="warning-divider" />
                        <span className="warning-headphones-icon">🎧</span>
                        <p className="warning-headline">AUDIO ADVISORY</p>
                        <p className="warning-msg">
                            For the best experience, use <strong>headphones</strong><br />
                            or a surround sound system.
                        </p>
                        <p className="warning-sub">
                            This archive contains atmospheric audio, mature themes,<br />
                            and classified Umbrella Corporation content.
                        </p>
                        <button className="warning-btn" onClick={handleEnter}>
                            ▶&nbsp;&nbsp;ENTER THE ARCHIVE
                        </button>
                    </div>
                </div>
            )}

            {/* Audio */}
            <audio ref={bgAudioRef} loop preload="auto">
                <source src="/audio/Safe_Room.mp3" type="audio/mpeg" />
            </audio>
            <audio ref={sprayAudioRef} preload="auto">
                <source src="/audio/spray.mp3" type="audio/mpeg" />
                <source src="/audio/Healing_Sound.mp3" type="audio/mpeg" />
            </audio>

            {/* ── Spray modal ── */}
            {showSprayPrompt && (
                <div className="spray-overlay" onClick={() => setShowSprayPrompt(false)}>
                    <div className="spray-modal" onClick={e => e.stopPropagation()}>
                        {SPRAY_ITEM.icon && (
                            <img src={SPRAY_ITEM.icon} alt="First Aid Spray" className="spray-modal-img" />
                        )}
                        <p className="spray-modal-title">FIRST AID SPRAY</p>
                        <p className="spray-modal-desc">
                            Chemical compound that restores health to optimal condition.<br />
                            Single use only.
                        </p>
                        <div className="spray-modal-actions">
                            <button className="spray-btn-use" onClick={handleUseSpray}>USE</button>
                            <button className="spray-btn-cancel" onClick={() => setShowSprayPrompt(false)}>CANCEL</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Header: logos side by side ── */}
            <header className="site-header">
                <div className="logo-row">
                    <img src={umbrellaLogo} alt="Umbrella Corporation" className="umbrella-logo" />
                    <img src={residentEvilLogo} alt="Resident Evil" className="resident-logo" />
                </div>
            </header>

            {/* ── Intro text ── */}
            <section className="intro-section">
                <p className="intro-tagline">Classified Archive — Raccoon City Files</p>
                <p className="intro-body">
                    Your definitive source for the <span className="hl">Resident Evil</span> universe.
                    Explore <span className="hl">Characters</span> — full dossiers on survivors, operatives, and B.O.W. specimens.
                    Revisit every entry in the <span className="hl">Games</span> series with lore breakdowns and timelines.
                    Dive into the <span className="hl">Movies</span> — live-action and animated productions.
                    Grab wallpapers and assets in <span className="hl">Downloads</span>.
                    Inspect fan-made <span className="hl">3D Models</span> from across the globe.
                    Or reach the <span className="hl">Contact</span> terminal to send a transmission.
                </p>
            </section>

            {/* ── Game area (desktop / large tablet) ── */}
            <div className="game-area">

                {/* ── Character panel ── */}
                <aside className="character-panel">

                    <div className="char-frame">
                        <span className="cf-corner tl" />
                        <span className="cf-corner tr" />
                        <span className="cf-corner bl" />
                        <span className="cf-corner br" />

                        {CHARACTER_IMAGES.length > 0 ? (
                            <img
                                src={CHARACTER_IMAGES[currentChar].src}
                                alt={CHARACTER_IMAGES[currentChar].name}
                                className="char-img"
                            />
                        ) : (
                            <div className="char-placeholder">
                                <span className="char-placeholder-icon">?</span>
                                <p>UNKNOWN AGENT</p>
                            </div>
                        )}

                        {CHARACTER_IMAGES.length > 1 && (
                            <div className="char-nav">
                                <button className="char-arrow" onClick={prevChar} aria-label="Previous">◀</button>
                                <button className="char-arrow" onClick={nextChar} aria-label="Next">▶</button>
                            </div>
                        )}

                        {CHARACTER_IMAGES.length > 0 && (
                            <div className="char-name-tag">
                                {CHARACTER_IMAGES[currentChar].name}
                            </div>
                        )}
                    </div>

                    {/* Health panel */}
                    <div className="health-panel">
                        <div className="health-header">
                            <span className="health-label">STATUS</span>
                            <span className={`health-status-text status-${health}`}>
                                {healthStatus}
                            </span>
                        </div>
                        <div className="health-bar-track">
                            {Array.from({ length: HEALTH_SEGMENTS }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`health-seg ${i < filledSegments ? 'filled' : ''}`}
                                    style={i < filledSegments ? {
                                        background: healthColor,
                                        boxShadow: `0 0 5px ${healthColor}99`,
                                    } : {}}
                                />
                            ))}
                        </div>
                        {health === 'yellow' && (
                            <p className="health-note caution-note">⚠ Use Aid Spray</p>
                        )}
                        {health === 'green' && (
                            <p className="health-note fine-note">✓ Vitals nominal</p>
                        )}
                    </div>
                </aside>

                {/* ── Inventory grid ── */}
                <main className="inventory-grid">
                    {Array.from({ length: GRID_COLS * GRID_ROWS }).map((_, i) => {
                        const col = (i % GRID_COLS) + 1;
                        const row = Math.floor(i / GRID_COLS) + 1;
                        const occupied = isSlotOccupied(col, row);
                        return (
                            <div
                                key={`slot-${i}`}
                                style={{ gridColumn: col, gridRow: row }}
                                className={`grid-slot
                                    ${occupied ? 'slot-occupied' : ''}
                                    ${invalidSlot(col, row) ? 'invalid-drop' : ''}
                                    ${validSlot(col, row) ? 'valid-drop' : ''}`}
                                onDrop={(e) => handleDrop(e, col, row)}
                                onDragOver={handleDragOver}
                            >
                                <span className="slot-x">✕</span>
                            </div>
                        );
                    })}

                    {items.map(item => (
                        <div
                            key={item.id}
                            className={`grid-item size-${item.size} ${item.type === 'action' ? 'item-action' : ''}`}
                            style={{
                                gridColumn: `${item.position.col} / span ${parseInt(item.size.split("x")[0])}`,
                                gridRow: `${item.position.row} / span ${parseInt(item.size.split("x")[1])}`,
                            }}
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.id)}
                            onDragEnd={handleDragEnd}
                            onClick={() => {
                                if (isDraggingRef.current) return;
                                if (item.type === 'action' && item.action === 'spray') {
                                    setShowSprayPrompt(true);
                                }
                            }}
                        >
                            {item.type === 'action' && item.icon && (
                                <img src={item.icon} alt={item.label} className="item-icon" />
                            )}
                            {item.type === 'link' ? (
                                <Link
                                    to={item.to}
                                    draggable={false}
                                    onClick={e => { if (isDraggingRef.current) e.preventDefault(); }}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span className="item-label">{item.label}</span>
                            )}
                        </div>
                    ))}
                </main>

            </div>

            {/* ── Mobile menu (tablet / phone) — RE5 title-screen style ── */}
            <nav className="mobile-menu" aria-label="Main menu">
                <div className="mobile-menu-wrap">

                    {/* rocky, breathing orb — the menu list is stacked dead
                        center on top of it, exactly like CONTINUE / CHAPTER
                        SELECT / ... in the reference menu */}
                    <div className="mobile-menu-orb">
                        <span className="orb-ring" aria-hidden="true" />
                        <span className="orb-moon" aria-hidden="true" />
                        <span className="orb-core" aria-hidden="true" />

                        <ul className="mobile-menu-list">
                            {BASE_ITEMS.map((item, idx) => {
                                const isSelected = mobileSelectedId === item.id;
                                const isDimmed = !!mobileSelectedId && !isSelected;
                                const isDefault = idx === 0 && !mobileSelectedId;
                                return (
                                    <li
                                        key={item.id}
                                        className={`mobile-menu-row
                                            ${isSelected ? 'is-selected' : ''}
                                            ${isDimmed ? 'is-dimmed' : ''}
                                            ${isDefault ? 'is-default' : ''}`}
                                    >
                                        <button
                                            type="button"
                                            className="mobile-menu-btn"
                                            onClick={() => handleMobileSelect(item)}
                                            disabled={!!mobileSelectedId}
                                        >
                                            <span className="mobile-menu-label">{item.label}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* caption for whichever entry is currently highlighted —
                        mirrors "Resume the game from the beginning of the
                        Stage you left off in." under CONTINUE */}
                    <p className="mobile-menu-desc">{mobileActiveItem.desc}</p>

                    <p className="mobile-menu-hint">Toque para selecionar</p>

                </div>
            </nav>

        </div>
    );
}