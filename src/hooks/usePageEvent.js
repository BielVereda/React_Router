import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useGame } from '../context/GameContext';

/**
 * Fires a game event every time the user navigates to a new page.
 * Desktop only (> 820px). Never fires on home ("/").
 * Dispatches NAVIGATE which rolls the event in the reducer.
 */
export function usePageEvent() {
    const { state, dispatch } = useGame();
    const location = useLocation();
    // Track the last path so rapid same-route re-renders don't double-fire
    const lastPath = useRef(null);

    useEffect(() => {
        const path = location.pathname;

        // Desktop only
        if (window.innerWidth <= 820) return;

        // Never fire on home
        if (path === '/') return;

        // Game must be started
        if (!state.isGameStarted) return;

        // Don't fire if an event is already open
        if (state.currentEvent) return;

        // Only fire when the path actually changes
        if (lastPath.current === path) return;

        lastPath.current = path;
        dispatch({ type: 'NAVIGATE', page: path });

    // Re-run whenever path changes OR game starts (so navigating to /characters
    // before starting the game, then starting, correctly fires the event)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, state.isGameStarted, state.currentEvent]);
}
