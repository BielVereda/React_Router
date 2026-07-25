import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../styles/Home.css';
import umbrellaLogo from '../assets/images/brand/umbrella-logo.png';
import residentEvilLogo from '../assets/images/brand/resident-evil-logo.png';

import jill from '../assets/images/characters/jill.png';
import leon from '../assets/images/characters/leon.webp';
import claire from '../assets/images/characters/claire.webp';

// Game Context and System
import { useGame } from '../context/GameContext';
import { KNIFE_ITEM } from '../data/gameData';

const CHARACTER_IMAGES = [
    { name: "Jill Valentine", src: jill },
    { name: "Leon S. Kennedy", src: leon },
    { name: "Claire Redfield", src: claire },
];

import sprayImg from '../assets/images/items/first_aid_spray.webp';

const SPRAY_ITEM = {
    id: 'spray',
    type: "action",
    action: "spray",
    label: "F.AID SPRAY",
    icon: sprayImg,
    to: null,
    size: "1x1",
    position: { col: 2, row: 3 },
};

/* herbId -> { partnerId -> resultId } */
const HERB_MIX_TABLE = {
    green_herb:    { red_herb: 'mixed_herb_gr', yellow_herb: 'mixed_herb_yg' },
    red_herb:      { green_herb: 'mixed_herb_gr', yellow_herb: 'mixed_herb_yr' },
    yellow_herb:   { green_herb: 'mixed_herb_yg', red_herb: 'mixed_herb_yr' },
    mixed_herb_gr: { yellow_herb: 'mixed_herb_ygr' },
    mixed_herb_yg: { red_herb: 'mixed_herb_ygr' },
    mixed_herb_yr: { green_herb: 'mixed_herb_ygr' },
};

const BASE_ITEMS = [
    { id: 1, type: "link", label: "CHARACTERS", to: "/characters", size: "2x2", position: { col: 1, row: 1 }, desc: "Complete dossiers on survivors, operatives, and B.O.W. specimens." },
    { id: 2, type: "link", label: "GAMES", to: "/games", size: "1x1", position: { col: 3, row: 1 }, desc: "The complete franchise timeline, game by game, with lore and trivia." },
    { id: 3, type: "link", label: "MOVIES", to: "/movies", size: "1x1", position: { col: 4, row: 1 }, desc: "Live-action and animated productions of the Resident Evil universe." },
    { id: 4, type: "link", label: "DOWNLOADS", to: "/downloads", size: "2x2", position: { col: 5, row: 1 }, desc: "Wallpapers, icons, and files for archive collectors." },
    { id: 5, type: "link", label: "3D MODELS", to: "/models3d", size: "2x1", position: { col: 3, row: 2 }, desc: "Community-made 3D models, ready for inspection." },
    { id: 6, type: "link", label: "ABOUT", to: "/about", size: "1x1", position: { col: 1, row: 3 }, desc: "The origin and mission of this classified archive." },
    { id: 7, type: "link", label: "CONTACT", to: "/contact", size: "2x1", position: { col: 5, row: 3 }, desc: "Send a direct transmission to the archive team." },
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

    /* ── Health / Spray / Inventory from GameContext ────────── */
    const { state, dispatch } = useGame();
    const { health, hasSpray, hp, maxHp } = state;
    const [showSprayPrompt, setShowSprayPrompt] = useState(false);

    /* ── Item detail floating menu (USE / MIX / DISCARD / CLOSE) ──
       Shared by herbs AND weapons — opened by clicking any collectible
       (except the F.AID spray, which keeps its own dedicated modal). ── */
    const [detailItem, setDetailItem] = useState(null);

    /* ── Character panel ────────────────────────────────────── */
    const [currentChar, setCurrentChar] = useState(0);

    /* ── Inventory ──────────────────────────────────────────── */
    const [items, setItems] = useState([]);
    const [dragId, setDragId] = useState(null);
    // The single cell currently under the pointer while dragging. Used
    // instead of recomputing "invalid" for every occupied slot on the
    // board (which made every occupied block — including the knife —
    // flash red the instant ANY drag started).
    const [hoverSlot, setHoverSlot] = useState(null);
    const isDraggingRef = useRef(false);

    /* ── Mobile menu (RE5-style list, no hover, tap to select) ── */
    const navigate = useNavigate();
    const [mobileSelectedId, setMobileSelectedId] = useState(null);

    // Helper to find a free 1x1 position for incoming items
    const findFreeSlot = (currentItems) => {
        for (let row = 1; row <= GRID_ROWS; row++) {
            for (let col = 1; col <= GRID_COLS; col++) {
                const occupied = currentItems.some(item => {
                    const [w, h] = item.size.split("x").map(Number);
                    return col >= item.position.col && col < item.position.col + w &&
                           row >= item.position.row && row < item.position.row + h;
                });
                if (!occupied) {
                    return { col, row };
                }
            }
        }
        return { col: 1, row: 4 }; // fallback
    };

    // Synchronize local items positions with global state (inventory, pages, spray, knife)
    useEffect(() => {
        setItems(prev => {
            const newItemsList = [];

            // 1. Keep/add the BASE_ITEMS (the page links)
            BASE_ITEMS.forEach(base => {
                const existing = prev.find(p => p.id === base.id);
                newItemsList.push(existing ? { ...base, position: existing.position } : base);
            });

            // 2. Combat Knife (fixed slot, starts at 1,4) — pulls its image/
            // description/damage straight from KNIFE_ITEM in gameData
            // (previously hardcoded a '.png' path that didn't exist).
            const knifeItem = {
                id: 'knife',
                type: 'weapon',
                label: KNIFE_ITEM.label,
                icon: KNIFE_ITEM.image,
                description: KNIFE_ITEM.description,
                damage: KNIFE_ITEM.damage,
                fixed: true,
                size: '1x1',
                position: { col: 1, row: 4 }
            };
            const existingKnife = prev.find(p => p.id === 'knife');
            newItemsList.push(existingKnife ? { ...knifeItem, position: existingKnife.position } : knifeItem);

            // 3. F.AID SPRAY
            if (hasSpray) {
                const sprayItem = {
                    id: 'spray',
                    type: 'action',
                    action: 'spray',
                    label: 'F.AID SPRAY',
                    icon: sprayImg,
                    size: '1x1',
                    position: { col: 2, row: 3 }
                };
                const existingSpray = prev.find(p => p.id === 'spray');
                newItemsList.push(existingSpray ? { ...sprayItem, position: existingSpray.position } : sprayItem);
            }

            // 4. Collected Items
            state.inventory.forEach(invItem => {
                const existing = prev.find(p => p.id === invItem.id);
                if (existing) {
                    newItemsList.push({ ...invItem, position: existing.position, size: '1x1', icon: invItem.image });
                } else {
                    const freePos = findFreeSlot(newItemsList);
                    newItemsList.push({ ...invItem, position: freePos, size: '1x1', icon: invItem.image });
                }
            });

            return newItemsList;
        });
    }, [state.inventory, hasSpray]);

    // If the item currently open in the detail popup got consumed/mixed/
    // discarded elsewhere (or no longer exists), close the popup so it
    // doesn't stay open on a stale item.
    useEffect(() => {
        if (!detailItem) return;
        const stillExists = items.some(i => i.id === detailItem.id);
        if (!stillExists) setDetailItem(null);
    }, [items, detailItem]);

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
        if (hp >= maxHp) return; // full health — nothing to heal, don't waste the spray
        dispatch({ type: 'USE_SPRAY' });
        setShowSprayPrompt(false);
        const audio = sprayAudioRef.current;
        if (audio) { audio.currentTime = 0; audio.play(); }
    };

    /* ── Use herb (from the detail popup) ────────────────────── */
    const handleUseHerb = () => {
        if (!detailItem) return;
        if (hp >= maxHp) return; // full health — herbs can't be used
        dispatch({ type: 'USE_HERB', itemId: detailItem.id });
        setDetailItem(null);
        const audio = sprayAudioRef.current;
        if (audio) { audio.currentTime = 0; audio.play(); }
    };

    /* ── Mix herb (from the detail popup) ────────────────────── */
    const handleMixHerb = (partnerId, resultId) => {
        if (!detailItem) return;
        dispatch({
            type: 'MIX_HERBS',
            itemId: detailItem.id,
            partnerId,
            resultId,
        });
        setDetailItem(null);
    };

    /* ── Discard (from the detail popup — the ONLY place discard lives) ── */
    const handleDiscardDetail = () => {
        if (!detailItem || detailItem.id === 'knife') return;
        dispatch({ type: 'DISCARD_ITEM', itemId: detailItem.id });
        setDetailItem(null);
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
        setHoverSlot(null);
    };

    const handleDrop = (e, col, row) => {
        const rawId = e.dataTransfer.getData("dragId");
        setHoverSlot(null);
        if (!rawId) return;
        const draggedItem = items.find(i => String(i.id) === String(rawId));
        if (!draggedItem) return;

        const [w, h] = draggedItem.size.split("x").map(Number);

        // Whatever item currently occupies the target cell(s), if any
        const targetItem = items.find(i => {
            if (String(i.id) === String(rawId)) return false;
            const [iw, ih] = i.size.split("x").map(Number);
            for (let cx = 0; cx < w; cx++)
                for (let cy = 0; cy < h; cy++) {
                    const tc = col + cx, tr = row + cy;
                    if (tc >= i.position.col && tc < i.position.col + iw &&
                        tr >= i.position.row && tr < i.position.row + ih) return true;
                }
            return false;
        });

        // RE-style combine: dropping a herb on top of another herb it can
        // mix with triggers the mix instead of being blocked as a collision.
        if (targetItem && draggedItem.type === 'consumable' && targetItem.type === 'consumable') {
            const resultId = HERB_MIX_TABLE[draggedItem.id]?.[targetItem.id];
            if (resultId) {
                dispatch({
                    type: 'MIX_HERBS',
                    itemId: draggedItem.id,
                    partnerId: targetItem.id,
                    resultId,
                });
                setDragId(null);
                return;
            }
        }

        if (col + w - 1 > GRID_COLS || row + h - 1 > GRID_ROWS || targetItem) return;

        setItems(prev => prev.map(item =>
            String(item.id) === String(rawId) ? { ...item, position: { col, row } } : item
        ));
        setDragId(null);
    };

    const handleDragOver = (e, col, row) => {
        e.preventDefault();
        if (!hoverSlot || hoverSlot.col !== col || hoverSlot.row !== row) {
            setHoverSlot({ col, row });
        }
    };

    const handleDragLeaveSlot = (col, row) => {
        setHoverSlot(prev => (prev && prev.col === col && prev.row === row) ? null : prev);
    };

    /* ── Grid helpers ────────────────────────────────────────── */
    const isSlotOccupied = (col, row) =>
        items.some(item => {
            const [w, h] = item.size.split("x").map(Number);
            return col >= item.position.col && col < item.position.col + w &&
                row >= item.position.row && row < item.position.row + h;
        });

    // Only evaluates the ONE cell currently under the pointer while
    // dragging — not every occupied slot on the board.
    const invalidSlot = (col, row) => {
        if (!dragId || !hoverSlot || hoverSlot.col !== col || hoverSlot.row !== row) return false;
        const dragged = items.find(i => String(i.id) === String(dragId));
        if (!dragged) return false;
        const [w, h] = dragged.size.split("x").map(Number);
        if (col + w - 1 > GRID_COLS || row + h - 1 > GRID_ROWS) return true;

        const target = items.find(i => {
            if (String(i.id) === String(dragged.id)) return false;
            const [iw, ih] = i.size.split("x").map(Number);
            for (let cx = 0; cx < w; cx++)
                for (let cy = 0; cy < h; cy++) {
                    const tc = col + cx, tr = row + cy;
                    if (tc >= i.position.col && tc < i.position.col + iw &&
                        tr >= i.position.row && tr < i.position.row + ih) return true;
                }
            return false;
        });
        if (!target) return false;
        // A mixable herb-on-herb combo counts as a VALID drop, not invalid
        if (dragged.type === 'consumable' && target.type === 'consumable' && HERB_MIX_TABLE[dragged.id]?.[target.id]) {
            return false;
        }
        return true;
    };

    const validSlot = (col, row) =>
        !!dragId && !!hoverSlot && hoverSlot.col === col && hoverSlot.row === row && !invalidSlot(col, row);

    // Highlights the hovered slot green/gold when dropping there would MIX
    // two herbs instead of just moving one.
    const mixTargetSlot = (col, row) => {
        if (!dragId || !hoverSlot || hoverSlot.col !== col || hoverSlot.row !== row) return false;
        const dragged = items.find(i => String(i.id) === String(dragId));
        if (!dragged) return false;
        const target = items.find(i => {
            if (String(i.id) === String(dragged.id)) return false;
            const [iw, ih] = i.size.split("x").map(Number);
            return col >= i.position.col && col < i.position.col + iw &&
                   row >= i.position.row && row < i.position.row + ih;
        });
        if (!target) return false;
        return dragged.type === 'consumable' && target.type === 'consumable' && !!HERB_MIX_TABLE[dragged.id]?.[target.id];
    };

    /* ── Health bar ──────────────────────────────────────────── */
    const filledSegments = health === 'green'
        ? HEALTH_SEGMENTS
        : (health === 'yellow' ? Math.floor(HEALTH_SEGMENTS * 0.5) : Math.floor(HEALTH_SEGMENTS * 0.25));
    const healthColor = health === 'green'
        ? '#00ff44'
        : (health === 'yellow' ? '#ffcc00' : '#cc0000');
    const healthStatus = health === 'green'
        ? 'FINE'
        : (health === 'yellow' ? 'CAUTION' : 'DANGER');

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

    /* Available mix partners for whichever item is open in the detail popup */
    const mixPartners = detailItem
        ? Object.entries(HERB_MIX_TABLE[detailItem.id] || {})
            .filter(([partnerId]) => items.some(i => i.id === partnerId))
            .map(([partnerId, resultId]) => ({
                partnerId,
                resultId,
                partnerItem: items.find(i => i.id === partnerId),
            }))
        : [];

    const isFullHealth = hp >= maxHp;

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
                            {isFullHealth && <><br /><em>Vitals already at maximum condition.</em></>}
                        </p>
                        <div className="spray-modal-actions">
                            <button className="spray-btn-use" onClick={handleUseSpray} disabled={isFullHealth}>USE</button>
                            <button className="spray-btn-cancel" onClick={() => setShowSprayPrompt(false)}>CANCEL</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Item detail floating menu (USE / MIX / CLOSE / DISCARD) ──
                 Shared by herbs AND weapons. Discard button lives ONLY here,
                 always last (rightmost). ── */}
            {detailItem && (
                <div className="spray-overlay" onClick={() => setDetailItem(null)}>
                    <div className="spray-modal herb-modal" onClick={e => e.stopPropagation()}>
                        {detailItem.icon && (
                            <img src={detailItem.icon} alt={detailItem.label} className="spray-modal-img" />
                        )}
                        <p className="spray-modal-title">{detailItem.label?.toUpperCase()}</p>
                        <p className="spray-modal-desc">
                            {detailItem.description}
                            {typeof detailItem.healAmount === 'number' && (
                                <> <br />Restores <strong>{detailItem.healAmount} HP</strong>.</>
                            )}
                            {typeof detailItem.damage === 'number' && (
                                <> <br />Damage: <strong>{detailItem.damage}</strong>.</>
                            )}
                            {detailItem.type === 'consumable' && isFullHealth && (
                                <> <br /><em>Vitals already at maximum condition.</em></>
                            )}
                        </p>

                        {detailItem.type === 'consumable' && mixPartners.length > 0 && (
                            <div className="herb-mix-section">
                                <p className="herb-mix-label">MIX WITH:</p>
                                <div className="herb-mix-list">
                                    {mixPartners.map(({ partnerId, resultId, partnerItem }) => (
                                        <button
                                            key={partnerId}
                                            className="herb-mix-option-btn"
                                            onClick={() => handleMixHerb(partnerId, resultId)}
                                            title={`Mix with ${partnerItem?.label ?? partnerId}`}
                                        >
                                            {partnerItem?.icon && (
                                                <img src={partnerItem.icon} alt={partnerItem.label} />
                                            )}
                                            <span>{partnerItem?.label ?? partnerId}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="spray-modal-actions">
                            {detailItem.type === 'consumable' && (
                                <button
                                    className="spray-btn-use"
                                    onClick={handleUseHerb}
                                    disabled={isFullHealth}
                                    title={isFullHealth ? 'Vitals already at maximum condition.' : undefined}
                                >
                                    USE
                                </button>
                            )}
                            <button className="spray-btn-cancel" onClick={() => setDetailItem(null)}>CLOSE</button>
                            {detailItem.id !== 'knife' && (
                                <button className="spray-btn-discard" onClick={handleDiscardDetail}>DISCARD</button>
                            )}
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
                        {health === 'red' && (
                            <p className="health-note danger-note">⚠ Danger - Critical Condition</p>
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
                                    ${validSlot(col, row) ? 'valid-drop' : ''}
                                    ${mixTargetSlot(col, row) ? 'mix-target' : ''}`}
                                onDrop={(e) => handleDrop(e, col, row)}
                                onDragOver={(e) => handleDragOver(e, col, row)}
                                onDragLeave={() => handleDragLeaveSlot(col, row)}
                            >
                                <span className="slot-x">✕</span>
                            </div>
                        );
                    })}

                    {items.map(item => (
                        <div
                            key={item.id}
                            className={`grid-item size-${item.size} ${item.type === 'action' ? 'item-action' : ''} ${item.id === 'knife' ? 'inventory-knife-slot' : ''}`}
                            style={{
                                gridColumn: `${item.position.col} / span ${parseInt(item.size.split("x")[0])}`,
                                gridRow: `${item.position.row} / span ${parseInt(item.size.split("x")[1])}`,
                            }}
                            draggable
                            onDragStart={(e) => handleDragStart(e, item.id)}
                            onDragEnd={handleDragEnd}
                            title={
                                item.type === 'consumable'
                                    ? `Click to open: ${item.label} (+${item.healAmount ?? 25} HP)`
                                    : item.type === 'action'
                                    ? `Click to use: ${item.label}`
                                    : item.type === 'weapon'
                                    ? `${item.label} — ATK ${item.damage} (used in combat)`
                                    : item.label
                            }
                            onClick={() => {
                                if (isDraggingRef.current) return;
                                // Spray keeps its own dedicated modal
                                if (item.type === 'action' && item.action === 'spray') {
                                    setShowSprayPrompt(true);
                                    return;
                                }
                                // Herbs AND weapons (including the knife) open the shared
                                // detail popup — previously only herbs did (point 5).
                                if (item.type === 'consumable' || item.type === 'weapon') {
                                    setDetailItem(item);
                                }
                            }}
                        >
                            {/* NOTE: the always-visible "✕" discard button was removed
                                from the grid on purpose — discard now lives ONLY inside
                                the detail popup above, as the last (rightmost) button. */}
                            {item.icon && (
                                <img
                                    src={item.icon}
                                    alt={item.label}
                                    className="item-icon"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
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
                <div className="re5-mobile-layout">

                    {/* Left side: The giant orb with presentation text inside */}
                    <div className="re5-giant-orb">
                        <span className="orb-ring" aria-hidden="true" />
                        <span className="orb-moon" aria-hidden="true" />
                        <span className="orb-core" aria-hidden="true" />

                        <div className="re5-orb-text-container">
                            <h2 className="re5-orb-title">B.O.W. ARCHIVE</h2>
                            <p className="re5-orb-presentation">
                                ACCESS GRANTED.<br/>
                                SELECT A CATEGORY FROM THE MAIN DATABASE TO VIEW CLASSIFIED FILES AND EXPERIMENT LOGS.
                            </p>
                            <div className="re5-orb-desc-divider" />
                            <p className="mobile-menu-desc">{mobileActiveItem.desc || "Awaiting input..."}</p>
                        </div>
                    </div>

                    {/* Right side: The options list curving around the orb */}
                    <div className="re5-options-container">
                        <ul className="re5-menu-list">
                            {BASE_ITEMS.map((item, idx) => {
                                const isSelected = mobileSelectedId === item.id;
                                const isDimmed = !!mobileSelectedId && !isSelected;
                                return (
                                    <li
                                        key={item.id}
                                        className={`re5-menu-item 
                                            ${isSelected ? 'is-selected' : ''}
                                            ${isDimmed ? 'is-dimmed' : ''}`}
                                    >
                                        <button
                                            type="button"
                                            className="re5-menu-btn"
                                            onClick={() => handleMobileSelect(item)}
                                            disabled={!!mobileSelectedId}
                                        >
                                            <div className="re5-node-container">
                                                <div className="re5-node"></div>
                                                {isSelected && <div className="re5-flare"></div>}
                                                {isSelected && <div className="re5-streak"></div>}
                                            </div>
                                            <span className="re5-label">{item.label}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                </div>
            </nav>

        </div>
    );
}