// EventGateway.jsx

import { useGame } from '../../context/GameContext';
import ItemFoundEvent from './ItemFoundEvent';
import BossEncounterEvent from './BossEncounterEvent';
import PuzzleEvent from './PuzzleEvent';

/**
 * Top-level event gateway: renders whichever event overlay is currently active.
 * Only shown on desktop (controlled via CSS media query on .event-overlay).
 */
export default function EventGateway() {
    const { state } = useGame();
    const event = state.currentEvent;

    if (!event) return null;

    if (event.type === 'ITEM') return <ItemFoundEvent />;
    if (event.type === 'BOSS') return <BossEncounterEvent />;
    if (event.type === 'PUZZLE') return <PuzzleEvent />;

    return null;
}
