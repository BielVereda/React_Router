// BossEncounterEvent.jsx

import { useGame } from '../../context/GameContext';
import { COLLECTIBLE_ITEMS, KNIFE_ITEM } from '../../data/gameData';
import '../../styles/GameSystem.css';

export default function BossEncounterEvent() {
    const { state, dispatch } = useGame();
    const boss = state.currentEvent?.data;

    if (!boss) return null;

    const bossHpPct = Math.max(0, (state.bossHp / state.bossMaxHp) * 100);

    // Knife is always available; ammo items are consumed on use
    const weapons = [
        KNIFE_ITEM,
        ...state.inventory.filter(i => i.type === 'ammo'),
    ];

    // Herbs and consumables available for healing during battle
    const herbs = state.inventory.filter(i => i.type === 'consumable');

    const handleAttack = (weapon) => {
        // Pass weaponId so reducer removes it atomically (knife.fixed = true → not removed)
        dispatch({ type: 'ATTACK_BOSS', damage: weapon.damage, weaponId: weapon.id });
    };

    const handleFlee = () => {
        dispatch({ type: 'TRY_FLEE' });
    };

    const handleUseHerb = (itemId) => {
        dispatch({ type: 'USE_HERB', itemId });
    };

    // ── Warning phase ──────────────────────────────────────
    if (state.bossPhase === 'warning') {
        return (
            <div className="event-overlay event-overlay--boss">
                <div className="event-card event-card--boss-warning">
                    <div className="boss-warning-header">
                        <span className="boss-caution-blink">⚠ CAUTION ⚠</span>
                        <p className="boss-warning-sub">DANGER APPROACHING</p>
                    </div>

                    <div className="boss-warning-img-wrap">
                        <img
                            src={boss.image}
                            alt={boss.name}
                            className="boss-warning-img"
                            onError={(e) => { e.target.style.opacity = '0.3'; }}
                        />
                        <div className="boss-warning-vignette" />
                    </div>

                    <div className="boss-warning-info">
                        <h2 className="boss-name">{boss.name}</h2>
                        <p className="boss-title">{boss.title}</p>
                        <p className="boss-desc">{boss.description}</p>
                    </div>

                    <div className="event-actions">
                        <button
                            id="btn-engage-boss"
                            className="event-btn event-btn--engage"
                            onClick={() => dispatch({ type: 'START_BOSS_BATTLE' })}
                        >
                            ENGAGE
                        </button>
                        <button
                            id="btn-flee-boss-warning"
                            className="event-btn event-btn--leave"
                            onClick={handleFlee}
                        >
                            RUN AWAY
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── Battle phase ───────────────────────────────────────
    if (state.bossPhase === 'battle') {
        return (
            <div className="event-overlay event-overlay--boss">
                <div className="event-card event-card--boss-battle">

                    <div className="boss-battle-header">
                        <h2 className="boss-name">{boss.name}</h2>
                        <div className="boss-hp-bar-wrap">
                            <div className="boss-hp-label">HP</div>
                            <div className="boss-hp-track">
                                <div
                                    className="boss-hp-fill"
                                    style={{ width: `${bossHpPct}%` }}
                                />
                            </div>
                            <span className="boss-hp-num">{state.bossHp}/{state.bossMaxHp}</span>
                        </div>
                    </div>

                    <div className="boss-battle-img-wrap">
                        <img
                            src={boss.image}
                            alt={boss.name}
                            className="boss-battle-img"
                            onError={(e) => { e.target.style.opacity = '0.2'; }}
                        />
                        <div className="boss-battle-vignette" />
                    </div>

                    <div className="boss-player-hp-wrap">
                        <span className="boss-player-hp-label">YOUR HP</span>
                        <div className="boss-player-hp-track">
                            <div
                                className={`boss-player-hp-fill health-${state.health}`}
                                style={{ width: `${state.hp}%` }}
                            />
                        </div>
                        <span className="boss-player-hp-num">{state.hp}/100</span>
                    </div>

                    <div className="boss-weapon-grid">
                        <p className="boss-weapon-label">SELECT WEAPON</p>
                        {weapons.map(w => (
                            <button
                                key={w.id}
                                id={`btn-attack-${w.id}`}
                                className="boss-weapon-btn"
                                onClick={() => handleAttack(w)}
                                title={`${w.label} — ATK ${w.damage}`}
                            >
                                <img
                                    src={w.image}
                                    alt={w.label}
                                    className="boss-weapon-img"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                                <span className="boss-weapon-name">{w.label}</span>
                                <span className="boss-weapon-dmg">ATK {w.damage}</span>
                            </button>
                        ))}
                    </div>

                    {herbs.length > 0 && (
                        <div className="boss-herb-strip">
                            <span className="boss-herb-label">USE HERB:</span>
                            {herbs.map(h => (
                                <button
                                    key={h.id}
                                    className="boss-herb-btn"
                                    onClick={() => handleUseHerb(h.id)}
                                    title={`${h.label} — ${h.description}`}
                                >
                                    <img src={h.image} alt={h.label} onError={(e) => { e.target.style.display='none'; }} />
                                </button>
                            ))}
                        </div>
                    )}

                    <button
                        id="btn-flee-battle"
                        className="event-btn event-btn--flee"
                        onClick={handleFlee}
                    >
                        RUN! (50% chance)
                    </button>
                </div>
            </div>
        );
    }

    // ── Won phase ──────────────────────────────────────────
    if (state.bossPhase === 'won') {
        return (
            <div className="event-overlay event-overlay--boss">
                <div className="event-card event-card--boss-won">
                    <div className="boss-won-header">
                        <span className="boss-won-icon">✦</span>
                        <h2>ENEMY ELIMINATED</h2>
                    </div>
                    <p className="boss-won-msg">{boss.winMessage}</p>
                    <button
                        id="btn-close-boss-won"
                        className="event-btn event-btn--take"
                        onClick={() => dispatch({ type: 'BOSS_WON_CLOSED' })}
                    >
                        CONTINUE
                    </button>
                </div>
            </div>
        );
    }

    // ── Fled phase ─────────────────────────────────────────
    if (state.bossPhase === 'fled') {
        return null; // Event already closed in reducer
    }

    return null;
}
