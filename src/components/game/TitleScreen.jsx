import { useGame } from '../../context/GameContext';
import '../../styles/GameSystem.css';

export default function TitleScreen({ hasSave }) {
    const { dispatch } = useGame();

    return (
        <div className="title-screen" role="dialog" aria-modal="true" aria-label="Game Start Screen">
            <div className="title-screen-inner">

                {/* Umbrella watermark */}
                <div className="title-umbrella-bg" aria-hidden="true">
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="2"/>
                        <path d="M50 50 L50 2" stroke="currentColor" strokeWidth="3"/>
                        <path d="M50 50 L93.3 77" stroke="currentColor" strokeWidth="3"/>
                        <path d="M50 50 L6.7 77" stroke="currentColor" strokeWidth="3"/>
                        <path d="M50 25 A25 25 0 0 1 75 50 L50 50 Z" fill="currentColor"/>
                        <path d="M50 25 A25 25 0 0 0 25 50 L50 50 Z" fill="currentColor"/>
                        <path d="M50 50 A25 25 0 0 0 75 75 L75 50 Z" fill="currentColor" opacity="0.5"/>
                    </svg>
                </div>

                <div className="title-screen-content">
                    <div className="title-screen-header">
                        <p className="title-screen-label">B.O.W. ARCHIVE — CLASSIFIED DATABASE</p>
                        <h1 className="title-screen-title">SURVIVAL<br/>PROTOCOL</h1>
                        <p className="title-screen-subtitle">
                            Every page you visit triggers a random encounter.<br/>
                            Collect items. Fight bosses. Survive.
                        </p>
                    </div>

                    <div className="title-screen-rules">
                        <div className="title-rule">
                            <span className="title-rule-icon">⚔</span>
                            <span>Navigate pages to find items, encounter bosses, or face puzzles</span>
                        </div>
                        <div className="title-rule">
                            <span className="title-rule-icon">🎒</span>
                            <span>Inventory holds up to 8 items — discard wisely</span>
                        </div>
                        <div className="title-rule">
                            <span className="title-rule-icon">❤</span>
                            <span>Each boss hit reduces your health — reach zero and it's over</span>
                        </div>
                        <div className="title-rule">
                            <span className="title-rule-icon">🔪</span>
                            <span>Your Combat Knife is always available — other weapons must be found</span>
                        </div>
                    </div>

                    <div className="title-screen-actions">
                        <button
                            id="btn-new-game"
                            className="title-btn title-btn--new"
                            onClick={() => dispatch({ type: 'NEW_GAME' })}
                        >
                            <span className="title-btn-label">NEW GAME</span>
                            <span className="title-btn-sub">Start from the beginning</span>
                        </button>

                        <button
                            id="btn-continue"
                            className="title-btn title-btn--continue"
                            onClick={() => dispatch({ type: 'CONTINUE' })}
                            disabled={!hasSave}
                            title={hasSave ? 'Resume your previous run' : 'No save data found'}
                        >
                            <span className="title-btn-label">CONTINUE</span>
                            <span className="title-btn-sub">
                                {hasSave ? 'Resume previous run' : 'No save data'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
