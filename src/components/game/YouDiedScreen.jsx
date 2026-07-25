import { useEffect, useState } from 'react';
import { useGame } from '../../context/GameContext';
import TitleScreen from './TitleScreen';
import '../../styles/GameSystem.css';

export default function YouDiedScreen() {
    const { state, dispatch, hasSave } = useGame();
    const [showTitle, setShowTitle] = useState(false);

    // After 3 seconds auto-show the title screen
    useEffect(() => {
        if (!state.showYouDied) return;
        const t = setTimeout(() => setShowTitle(true), 3000);
        return () => clearTimeout(t);
    }, [state.showYouDied]);

    if (!state.showYouDied) return null;

    if (showTitle) {
        return (
            <>
                <div className="you-died-screen you-died-screen--fading" aria-hidden="true" />
                <TitleScreen hasSave={false} /> {/* After death, no CONTINUE */}
            </>
        );
    }

    return (
        <div className="you-died-screen" role="alert" aria-live="assertive">
            <div className="you-died-inner">
                <p className="you-died-text" aria-label="You Died">YOU DIED</p>
                <p className="you-died-sub">The virus wins.</p>
            </div>
        </div>
    );
}
