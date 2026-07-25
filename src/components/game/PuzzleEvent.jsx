import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { COLLECTIBLE_ITEMS } from '../../data/gameData';
import '../../styles/GameSystem.css';

export default function PuzzleEvent() {
    const { state, dispatch } = useGame();
    const puzzle = state.currentEvent?.data;
    const [input, setInput] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | 'failed'
    const [choiceMade, setChoiceMade] = useState(false);

    if (!puzzle) return null;

    const MAX_ATTEMPTS = 3;

    const handleCodeSubmit = () => {
        const normalized = input.trim().toUpperCase();
        const answer = puzzle.answer?.toUpperCase();

        if (normalized === answer) {
            setFeedback('correct');
        } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            if (newAttempts >= MAX_ATTEMPTS) {
                setFeedback('failed');
                dispatch({ type: 'TAKE_DAMAGE', amount: puzzle.penaltyDamage });
            } else {
                setFeedback('wrong');
            }
        }
    };

    const handleCloseSuccess = () => {
        const rewardItem = COLLECTIBLE_ITEMS.find(i => i.id === puzzle.reward);
        dispatch({ type: 'PUZZLE_REWARD', item: rewardItem || null });
    };

    const handleCloseFail = () => {
        dispatch({ type: 'CLOSE_EVENT' });
    };

    const handleChoice = (option) => {
        setChoiceMade(true);
        setFeedback({ effect: option.effect, text: option.resultText });
        if (option.effect === 'lose_spray') {
            dispatch({ type: 'USE_SPRAY' });
        }
        // 'gain_ammo' — would pick up ammo, handled via close
    };

    // ── Code puzzle ────────────────────────────────────────
    if (puzzle.type === 'code') {
        return (
            <div className="event-overlay">
                <div className="event-card event-card--puzzle">
                    <div className="event-header">
                        <span className="event-caution-icon">?</span>
                        <h2 className="puzzle-title">{puzzle.title}</h2>
                    </div>

                    <p className="puzzle-desc">{puzzle.description}</p>

                    {feedback === 'correct' ? (
                        <div className="puzzle-result puzzle-result--success">
                            <span className="puzzle-result-icon">✓</span>
                            <p>ACCESS GRANTED</p>
                            {puzzle.reward && (
                                <p className="puzzle-reward-text">
                                    You found: <strong>
                                        {COLLECTIBLE_ITEMS.find(i => i.id === puzzle.reward)?.label}
                                    </strong>
                                </p>
                            )}
                            <button className="event-btn event-btn--take" onClick={handleCloseSuccess}>
                                COLLECT REWARD
                            </button>
                        </div>
                    ) : feedback === 'failed' ? (
                        <div className="puzzle-result puzzle-result--fail">
                            <span className="puzzle-result-icon">✗</span>
                            <p>ACCESS DENIED — Security lockout triggered</p>
                            <p className="puzzle-penalty-text">You took {puzzle.penaltyDamage} damage.</p>
                            <button className="event-btn event-btn--leave" onClick={handleCloseFail}>
                                RETREAT
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="puzzle-input-wrap">
                                <input
                                    id="puzzle-code-input"
                                    type="text"
                                    className={`puzzle-input ${feedback === 'wrong' ? 'puzzle-input--wrong' : ''}`}
                                    value={input}
                                    onChange={e => setInput(e.target.value)}
                                    onKeyDown={e => e.key === 'Enter' && handleCodeSubmit()}
                                    placeholder="Enter code..."
                                    maxLength={20}
                                    autoFocus
                                />
                                {feedback === 'wrong' && (
                                    <p className="puzzle-wrong-text">
                                        Incorrect — {MAX_ATTEMPTS - attempts} attempt{MAX_ATTEMPTS - attempts !== 1 ? 's' : ''} remaining
                                    </p>
                                )}
                            </div>

                            <div className="puzzle-hint-strip">
                                <span className="puzzle-hint-label">HINT:</span>
                                <span className="puzzle-hint-text">{puzzle.hint}</span>
                            </div>

                            <div className="event-actions">
                                <button
                                    id="btn-puzzle-submit"
                                    className="event-btn event-btn--take"
                                    onClick={handleCodeSubmit}
                                >
                                    CONFIRM
                                </button>
                                <button
                                    className="event-btn event-btn--leave"
                                    onClick={handleCloseFail}
                                >
                                    ABANDON
                                </button>
                            </div>

                            <p className="puzzle-attempts-text">
                                Attempts: {attempts}/{MAX_ATTEMPTS}
                            </p>
                        </>
                    )}
                </div>
            </div>
        );
    }

    // ── Choice puzzle ──────────────────────────────────────
    if (puzzle.type === 'choice') {
        return (
            <div className="event-overlay">
                <div className="event-card event-card--puzzle">
                    <div className="event-header">
                        <span className="event-caution-icon">!</span>
                        <h2 className="puzzle-title">{puzzle.title}</h2>
                    </div>

                    <p className="puzzle-desc">{puzzle.description}</p>

                    {choiceMade && feedback ? (
                        <div className="puzzle-result puzzle-result--choice">
                            <p className="puzzle-choice-result">{feedback.text}</p>
                            <button
                                className="event-btn event-btn--take"
                                onClick={handleCloseFail}
                            >
                                CONTINUE
                            </button>
                        </div>
                    ) : (
                        <div className="puzzle-choices">
                            {puzzle.options.map((opt, i) => (
                                <button
                                    key={i}
                                    id={`btn-choice-${i}`}
                                    className="puzzle-choice-btn"
                                    onClick={() => handleChoice(opt)}
                                >
                                    {opt.text}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return null;
}
