import './style.css';

/**
 * Reusable SafeRoom Audio Toggle Button
 */
export default function BotaoSaferoom({ muted, onToggleMute, label = 'SAFE ROOM AUDIO' }) {
    return (
        <button
            type="button"
            className={`saferoom-toggle-btn ${muted ? 'is-muted' : 'is-playing'}`}
            onClick={onToggleMute}
            title={muted ? 'Unmute Safe Room theme' : 'Mute Safe Room theme'}
        >
            <span className="saferoom-btn-icon">{muted ? '🔇' : '🔊'}</span>
            <span className="saferoom-btn-label">{muted ? 'MUTED' : 'SAFE ROOM'}</span>
        </button>
    );
}