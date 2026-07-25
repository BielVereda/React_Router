import { createContext, useContext, useReducer, useEffect } from 'react';
import { KNIFE_ITEM, rollEvent, rollItem, rollPuzzle, rollBoss, COLLECTIBLE_ITEMS, BOSSES } from '../data/gameData';

// ── Max inventory slots (excluding fixed knife slot) ─────────
const MAX_COLLECTIBLE_SLOTS = 8;

// ── Health levels ──────────────────────────────────────────
// green=75–100%, yellow=25–74%, red=1–24%, dead=0
function calcHealthLevel(hp) {
    if (hp <= 0) return 'dead';
    if (hp <= 24) return 'red';
    if (hp <= 74) return 'yellow';
    return 'green';
}

// ── Initial State ───────────────────────────────────────────
const INITIAL_STATE = {
    isGameStarted: false,
    hp: 75,
    maxHp: 100,
    health: 'yellow',
    hasSpray: true,
    sprayUsed: false,
    inventory: [],
    usedBossIds: [],
    currentEvent: null,
    bossHp: 0,
    bossMaxHp: 0,
    bossPhase: 'warning',
    showYouDied: false,
    pendingNavPath: null,
};

// ── Reducer ─────────────────────────────────────────────────
function gameReducer(state, action) {
    switch (action.type) {

        case 'NEW_GAME': {
            return {
                ...INITIAL_STATE,
                isGameStarted: true,
            };
        }

        case 'CONTINUE': {
            return { ...state, isGameStarted: true };
        }

        case 'NAVIGATE': {
            const { page } = action;

            // Home page never gets events
            if (page === '/') return { ...state, pendingNavPath: page };

            // Don't fire if we already have an active event
            if (state.currentEvent) return { ...state, pendingNavPath: page };

            // Roll event
            let eventType = rollEvent();

            // A boss that has already been defeated this session can NEVER
            // reappear. If every boss has already fallen, this navigation
            // simply can't roll a BOSS event — fall back to ITEM or PUZZLE.
            if (eventType === 'BOSS') {
                const bossesRemaining = BOSSES.some(b => !state.usedBossIds.includes(b.id));
                if (!bossesRemaining) {
                    eventType = Math.random() < 0.5 ? 'ITEM' : 'PUZZLE';
                }
            }

            let eventData = null;

            if (eventType === 'ITEM') {
                eventData = rollItem();
            } else if (eventType === 'BOSS') {
                // Pass all used boss IDs so we don't repeat bosses
                eventData = rollBoss(state.usedBossIds);
            } else {
                eventData = rollPuzzle();
            }

            return {
                ...state,
                pendingNavPath: page,
                currentEvent: { type: eventType, data: eventData },
                // Boss setup
                ...(eventType === 'BOSS' && {
                    bossHp: eventData.maxHp,
                    bossMaxHp: eventData.maxHp,
                    bossPhase: 'warning',
                }),
            };
        }

        case 'CLOSE_EVENT': {
            return { ...state, currentEvent: null };
        }

        case 'PICK_ITEM': {
            const { item } = action;
            if (state.inventory.length >= MAX_COLLECTIBLE_SLOTS) return state;
            return {
                ...state,
                inventory: [...state.inventory, item],
                currentEvent: null,
            };
        }

        case 'DISCARD_ITEM': {
            const { itemId } = action;
            if (itemId === 'spray' || itemId === 'first_aid_spray') {
                return { ...state, hasSpray: false };
            }
            return {
                ...state,
                inventory: state.inventory.filter(i => i.id !== itemId),
            };
        }

        case 'START_BOSS_BATTLE': {
            return { ...state, bossPhase: 'battle' };
        }

        case 'ATTACK_BOSS': {
            const { damage, weaponId } = action;
            const newBossHp = Math.max(0, state.bossHp - damage);

            // Remove weapon from inventory if not the knife (knife is fixed)
            let newInventory = state.inventory;
            if (weaponId && weaponId !== 'knife') {
                newInventory = state.inventory.filter(i => i.id !== weaponId);
            }

            if (newBossHp === 0) {
                // Boss defeated
                const bossId = state.currentEvent?.data?.id;
                const newUsedBossIds = bossId
                    ? [...new Set([...state.usedBossIds, bossId])]
                    : state.usedBossIds;
                return {
                    ...state,
                    bossHp: 0,
                    bossPhase: 'won',
                    inventory: newInventory,
                    usedBossIds: newUsedBossIds,
                };
            }

            // Boss counter-attacks
            const bossDmg = state.currentEvent?.data?.damage ?? 30;
            const newHp = Math.max(0, state.hp - bossDmg);
            const newHealth = calcHealthLevel(newHp);

            if (newHealth === 'dead') {
                return {
                    ...state,
                    bossHp: newBossHp,
                    hp: 0,
                    health: 'dead',
                    showYouDied: true,
                    inventory: newInventory,
                    currentEvent: null,   // close the boss overlay so it doesn't sit on top of YouDiedScreen
                    bossPhase: 'warning', // reset for the next encounter
                };
            }
            return {
                ...state,
                bossHp: newBossHp,
                hp: newHp,
                health: newHealth,
                inventory: newInventory,
            };
        }

        case 'USE_SPRAY': {
            // Spray always heals to full (100) — it restores health to FINE condition
            if (!state.hasSpray) return state;
            return {
                ...state,
                hp: 100,
                health: 'green',
                hasSpray: false,
                sprayUsed: true,
            };
        }

        case 'USE_HERB': {
            const { itemId } = action;
            const item = state.inventory.find(i => i.id === itemId);
            if (!item || item.type !== 'consumable') return state;

            // Use healAmount from item definition; fallback to 25
            const healAmount = item.healAmount ?? 25;
            const newHp = Math.min(100, state.hp + healAmount);
            const newHealth = calcHealthLevel(newHp);

            return {
                ...state,
                hp: newHp,
                health: newHealth,
                inventory: state.inventory.filter(i => i.id !== itemId),
            };
        }

        case 'MIX_HERBS': {
            const { itemId, partnerId, resultId } = action;

            // Both ingredients must exist in the inventory and be different items
            if (!itemId || !partnerId || itemId === partnerId) return state;
            const hasItem = state.inventory.some(i => i.id === itemId);
            const hasPartner = state.inventory.some(i => i.id === partnerId);
            if (!hasItem || !hasPartner) return state;

            const resultDef = COLLECTIBLE_ITEMS.find(i => i.id === resultId);
            if (!resultDef) return state;

            // Remove exactly ONE instance of each ingredient (not every item
            // sharing that id — matters if the player is carrying duplicates).
            let removedItem = false;
            let removedPartner = false;
            const newInventory = state.inventory.filter(i => {
                if (!removedItem && i.id === itemId) { removedItem = true; return false; }
                if (!removedPartner && i.id === partnerId) { removedPartner = true; return false; }
                return true;
            });

            // Net effect is -1 slot (2 consumed, 1 produced), so no
            // MAX_COLLECTIBLE_SLOTS check is needed here.
            return {
                ...state,
                inventory: [...newInventory, resultDef],
            };
        }

        case 'TRY_FLEE': {
            // 50% success
            const success = Math.random() < 0.5;
            if (success) {
                return { ...state, bossPhase: 'fled', currentEvent: null };
            }
            // Failed flee: take partial damage
            const bossDmg = Math.floor((state.currentEvent?.data?.damage ?? 30) * 0.5);
            const newHp = Math.max(0, state.hp - bossDmg);
            const newHealth = calcHealthLevel(newHp);
            if (newHealth === 'dead') {
                return {
                    ...state,
                    hp: 0,
                    health: 'dead',
                    showYouDied: true,
                    bossPhase: 'warning', // reset for the next encounter
                    currentEvent: null,   // close the boss overlay so it doesn't sit on top of YouDiedScreen
                };
            }
            return { ...state, hp: newHp, health: newHealth, bossPhase: 'battle' };
        }

        case 'BOSS_WON_CLOSED': {
            return { ...state, currentEvent: null, bossPhase: 'warning' };
        }

        case 'TAKE_DAMAGE': {
            const { amount } = action;
            const newHp = Math.max(0, state.hp - amount);
            const newHealth = calcHealthLevel(newHp);
            if (newHealth === 'dead') {
                return { ...state, hp: 0, health: 'dead', showYouDied: true, currentEvent: null };
            }
            return { ...state, hp: newHp, health: newHealth };
        }

        case 'PUZZLE_REWARD': {
            const { item } = action;
            if (!item) return { ...state, currentEvent: null };
            if (state.inventory.length >= MAX_COLLECTIBLE_SLOTS) {
                return { ...state, currentEvent: null };
            }
            return { ...state, inventory: [...state.inventory, item], currentEvent: null };
        }

        case 'DISMISS_YOU_DIED': {
            return { ...state, showYouDied: false };
        }

        default:
            return state;
    }
}

// ── Local Storage helpers ────────────────────────────────────
const LS_KEY = 're_archive_game_state';

function loadState() {
    try {
        const raw = localStorage.getItem(LS_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

function saveState(state) {
    try {
        const toSave = {
            ...state,
            currentEvent: null,
            showYouDied: false,
            pendingNavPath: null,
        };
        localStorage.setItem(LS_KEY, JSON.stringify(toSave));
    } catch { /* ignore */ }
}

// ── Context ─────────────────────────────────────────────────
const GameContext = createContext(null);

export function GameProvider({ children }) {
    const saved = loadState();
    const initialState = saved
        ? { ...INITIAL_STATE, ...saved, isGameStarted: false, currentEvent: null, showYouDied: false }
        : INITIAL_STATE;

    const [state, dispatch] = useReducer(gameReducer, initialState);

    // Persist relevant state on every change
    useEffect(() => {
        if (state.isGameStarted) {
            saveState(state);
        }
    }, [state]);

    const hasSave = !!loadState()?.isGameStarted || (saved && saved.hp !== undefined);

    return (
        <GameContext.Provider value={{ state, dispatch, hasSave }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const ctx = useContext(GameContext);
    if (!ctx) throw new Error('useGame must be used inside GameProvider');
    return ctx;
}