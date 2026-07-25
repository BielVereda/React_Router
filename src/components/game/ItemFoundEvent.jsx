import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { COLLECTIBLE_ITEMS } from '../../data/gameData';
import '../../styles/GameSystem.css';

export default function ItemFoundEvent() {
    const { state, dispatch } = useGame();
    const item = state.currentEvent?.data;
    const [showDiscard, setShowDiscard] = useState(false);
    const [discardTarget, setDiscardTarget] = useState(null);

    if (!item) return null;

    const inventoryFull = state.inventory.length >= 8;

    const handleTake = () => {
        if (inventoryFull) {
            setShowDiscard(true);
        } else {
            dispatch({ type: 'PICK_ITEM', item });
        }
    };

    const handleDiscard = (itemId) => {
        dispatch({ type: 'DISCARD_ITEM', itemId });
        dispatch({ type: 'PICK_ITEM', item });
    };

    const rarityClass = {
        common: 'rarity-common',
        uncommon: 'rarity-uncommon',
        rare: 'rarity-rare',
        fixed: 'rarity-fixed',
    }[item.rarity] || 'rarity-common';

    // Glow color is now driven by item CATEGORY, not rarity:
    // green = healing, red = weapons, yellow/pulsing = grenades.
    const isGrenade = item.id === 'grenade_launcher' || item.label?.toLowerCase().includes('grenade');
    const categoryGlowClass = item.type === 'consumable'
        ? 'glow-heal'
        : isGrenade
            ? 'glow-grenade'
            : item.type === 'weapon'
                ? 'glow-weapon'
                : '';

    // Discard selection screen
    if (showDiscard) {
        return (
            <div className="event-overlay">
                <div className="event-card event-card--discard">
                    <div className="event-header">
                        <span className="event-caution-icon">⚠</span>
                        <h2>INVENTORY FULL</h2>
                        <p>Select an item to discard to make room.</p>
                    </div>

                    <ul className="discard-list">
                        {state.inventory.map(inv => (
                            <li key={inv.id} className="discard-item">
                                <img
                                    src={inv.image}
                                    alt={inv.label}
                                    className="discard-item-img"
                                    onError={(e) => { e.target.style.display = 'none'; }}
                                />
                                <div className="discard-item-info">
                                    <span className="discard-item-name">{inv.label}</span>
                                    <span className="discard-item-desc">{inv.description}</span>
                                </div>
                                <button
                                    className="discard-item-btn"
                                    onClick={() => handleDiscard(inv.id)}
                                >
                                    DISCARD
                                </button>
                            </li>
                        ))}
                    </ul>

                    <button
                        className="event-btn event-btn--leave"
                        onClick={() => dispatch({ type: 'CLOSE_EVENT' })}
                    >
                        LEAVE IT BEHIND
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="event-overlay">
            <div className="event-card event-card--item">
                <div className="event-header">
                    <span className="event-caution-icon">★</span>
                    <h2>ITEM ACQUIRED</h2>
                </div>

                <div className={`event-item-display ${rarityClass} ${categoryGlowClass}`}>
                    <div className="event-item-glow" />
                    <img
                        src={item.image}
                        alt={item.label}
                        className="event-item-img"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                    <div className="event-item-rarity-badge">{item.rarity?.toUpperCase()}</div>
                </div>

                <div className="event-item-info">
                    <h3 className="event-item-name">{item.label}</h3>
                    <p className="event-item-desc">{item.description}</p>
                    {item.damage && (
                        <p className="event-item-stat">
                            <span>ATK</span> {item.damage}
                        </p>
                    )}
                    {typeof item.healAmount === 'number' && (
                        <p className="event-item-stat">
                            <span>HEAL</span> +{item.healAmount} HP
                        </p>
                    )}
                </div>

                <div className="event-actions">
                    <button
                        id="btn-take-item"
                        className="event-btn event-btn--take"
                        onClick={handleTake}
                    >
                        TAKE IT
                    </button>
                    <button
                        id="btn-leave-item"
                        className="event-btn event-btn--leave"
                        onClick={() => dispatch({ type: 'CLOSE_EVENT' })}
                    >
                        LEAVE IT
                    </button>
                </div>

                <p className="event-inventory-count">
                    Inventory: {state.inventory.length} / 8
                </p>
            </div>
        </div>
    );
}