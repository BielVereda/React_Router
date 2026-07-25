// ════════════════════════════════════════════════════════════
//  GAME DATA  —  Items, Bosses, Puzzles
// ════════════════════════════════════════════════════════════

// ── Item types ───────────────────────────────────────────────
// consumable → herbs / spray → USE_HERB action, heals HP
// weapon     → found guns, grenades, launchers → used IN COMBAT.
//              The gun itself is the collectible now (not its ammo) —
//              the player finds a weapon and it's consumed after use,
//              same as it always narratively "ran dry".

export const COLLECTIBLE_ITEMS = [
    // ── Consumables (healing) ──────────────────────────────
    {
        id: 'green_herb',
        label: 'Green Herb',
        image: '/images/items/green_herb.png',
        type: 'consumable',
        rarity: 'common',
        effect: 'heal_25',
        healAmount: 25,
        description: 'A medicinal herb. Restores a small amount of health when used.',
    },
    {
        id: 'red_herb',
        label: 'Red Herb',
        image: '/images/items/red_herb.png',
        type: 'consumable',
        rarity: 'uncommon',
        effect: 'heal_40',
        healAmount: 40,
        description: 'A potent herb — enhances healing significantly when used.',
    },
    {
        id: 'yellow_herb',
        label: 'Yellow Herb',
        image: '/images/items/yellow_herb.png',
        type: 'consumable',
        rarity: 'rare', // rarer than red/green now — permanent stat boost justifies it
        effect: 'heal_15',
        healAmount: 15,
        description: 'A rare yellow herb. Permanently increases maximum vitality by 15 HP and restores a small amount of health when used.',
    },
    {
        id: 'mixed_herb_gr',
        label: 'Mixed Herb (G+R)',
        image: '/images/items/mixed_herb_gr.webp',
        type: 'consumable',
        rarity: 'uncommon',
        effect: 'heal_60',
        healAmount: 60,
        description: 'Green + Red combined. Restores a large amount of health.',
    },
    {
        id: 'mixed_herb_yg',
        label: 'Mixed Herb (Y+G)',
        image: '/images/items/mixed_herb_yg.webp',
        type: 'consumable',
        rarity: 'rare',
        effect: 'heal_40',
        healAmount: 40,
        description: 'Yellow + Green combined. Increases max vitality and restores health.',
    },
    {
        id: 'mixed_herb_yr',
        label: 'Mixed Herb (Y+R)',
        image: '/images/items/mixed_herb_yr.webp',
        type: 'consumable',
        rarity: 'rare',
        effect: 'heal_50',
        healAmount: 50,
        description: 'Yellow + Red combined. Greatly boosts stamina and restores a large portion of health.',
    },
    {
        id: 'mixed_herb_ygr',
        label: 'Mixed Herb (Y+G+R)',
        image: '/images/items/mixed_herb_ygr.webp',
        type: 'consumable',
        rarity: 'rare',
        effect: 'heal_100',
        healAmount: 100,
        description: 'Yellow + Green + Red — the ultimate combination. Fully restores health and maximizes vitality.',
    },
    // ── Weapons (found as the gun itself, used in combat) ───
    {
        id: 'handgun',
        label: 'Handgun',
        image: '/images/items/handgun.png',
        type: 'weapon',
        rarity: 'common',
        damage: 20,
        description: 'A standard-issue 9mm sidearm. Reliable, if unremarkable, stopping power.',
    },
    {
        id: 'shotgun',
        label: 'Shotgun',
        image: '/images/items/shotgun.png',
        type: 'weapon',
        rarity: 'uncommon',
        damage: 45,
        description: '12-gauge pump-action. Devastating at close range.',
    },
    {
        id: 'submachine_gun',
        label: 'Submachine Gun',
        image: '/images/items/submachine_gun.png',
        type: 'weapon',
        rarity: 'uncommon',
        damage: 35,
        description: 'Rapid-fire compact weapon. Trades raw power for a storm of bullets.',
    },
    {
        id: 'magnum',
        label: '.44 Magnum',
        image: '/images/items/magnum.png',
        type: 'weapon',
        rarity: 'rare',
        damage: 65,
        description: 'Heavy caliber revolver. Reserved for the most dangerous encounters.',
    },
    {
        id: 'grenade_launcher',
        label: 'Grenade Launcher',
        image: '/images/items/grenade_launcher.png',
        type: 'weapon',
        rarity: 'rare',
        damage: 75,
        description: 'Fires fragmentation rounds. Devastating against B.O.W. targets.',
    },
    {
        id: 'flamethrower',
        label: 'Flamethrower',
        image: '/images/items/flamethrower.png',
        type: 'weapon',
        rarity: 'rare',
        damage: 60,
        description: 'Burns through organic tissue and regeneration alike.',
    },
    {
        id: 'rocket_launcher',
        label: 'Rocket Launcher',
        image: '/images/items/rocket_launcher.png',
        type: 'weapon',
        rarity: 'legendary',
        damage: 999,
        description: 'An anti-tank rocket. Absolute overkill against anything short of a Tyrant — one shot ends the fight, no matter who is on the other end.',
    },
];

// The knife is a fixed permanent slot — not collected, always available
export const KNIFE_ITEM = {
    id: 'knife',
    label: 'Combat Knife',
    image: '/images/items/knife.webp',
    type: 'weapon',
    rarity: 'fixed',
    damage: 10,
    description: 'Standard-issue survival knife. Infinite use, low damage. Better than nothing.',
    fixed: true,    // never consumed
};

// ── Bosses ─────────────────────────────────────────────────
export const BOSSES = [
    {
        id: 'tyrant_t002',
        name: 'TYRANT T-002',
        title: "Umbrella's First Masterpiece",
        image: '/images/characters/tyrant_t002.jfif',
        maxHp: 120,
        damage: 35,
        description: 'A towering humanoid B.O.W. engineered for unstoppable force. Its exposed heart is both its power source and its weakness.',
        winMessage: 'The Tyrant crashes to the ground. Its exposed heart finally still.',
    },
    {
        id: 'william_birkin',
        name: 'G-BIRKIN',
        title: 'The G-Virus Host',
        image: '/images/characters/william_birkin.webp',
        maxHp: 160,
        damage: 40,
        description: "Dr. Birkin injected himself with the G-Virus to survive. What remains is barely human — driven only by the primal need to implant embryos.",
        winMessage: "The creature falls. Somewhere inside, Birkin's obsession finally dies with him.",
    },
    {
        id: 'nemesis',
        name: 'NEMESIS',
        title: 'S.T.A.R.S.',
        image: '/images/characters/nemesis.png',
        maxHp: 200,
        damage: 50,
        description: 'The NE-α parasite grants Nemesis near-perfect intelligence, unprecedented resilience, and one directive: eliminate all S.T.A.R.S. members.',
        winMessage: 'NEMESIS staggers and falls. For the first time, it does not rise again.',
    },
    {
        id: 'albert_wesker',
        name: 'ALBERT WESKER',
        title: 'The Perfect Being',
        image: '/images/characters/albert_wesker.webp',
        maxHp: 180,
        damage: 45,
        description: 'Enhanced by a prototype virus, Wesker possesses superhuman speed and regeneration. He has waited years for this moment.',
        winMessage: 'Wesker falls. The man who sought to become a god lies defeated by mere humans.',
    },
    {
        id: 'mr_x',
        name: 'MR. X — TYRANT T-103',
        title: 'The Pursuer',
        image: '/images/characters/mr_x.png',
        maxHp: 140,
        damage: 38,
        description: 'A mass-produced Tyrant deployed to retrieve the G-Virus sample. He cannot be reasoned with. He cannot be stopped. He never stops moving.',
        winMessage: 'The T-103 crashes through the wall and goes still. Silence returns to the corridor.',
    },
    {
        id: 'cerberus',
        name: 'CERBERUS PACK',
        title: 'The Infected Hounds',
        image: '/images/characters/cerberus.png',
        maxHp: 90,
        damage: 25,
        description: 'Former Dobermans infected with the T-Virus. Fast, relentless, and coordinated. They hunt in packs — put one down and two more close in.',
        winMessage: 'The last Cerberus collapses in the corridor. The virus-choked growling finally silences.',
    },
    {
        id: 'licker',
        name: 'LICKER',
        title: 'Advanced T-Virus Mutation',
        image: '/images/characters/licker.webp',
        maxHp: 100,
        damage: 30,
        description: 'The Licker is what happens when a zombie mutates beyond recognition — skinless, with an exposed brain and a prehensile tongue that can pierce steel.',
        winMessage: 'The Licker falls from the ceiling and does not move again.',
    },
];

// ── Puzzles ─────────────────────────────────────────────────
export const PUZZLES = [
    {
        id: 'access_code',
        title: 'TERMINAL ACCESS CODE',
        description: 'A locked Umbrella terminal blocks your path. A scrawled note reads: "The year Raccoon City was destroyed."',
        type: 'code',
        answer: '1998',
        hint: 'Think about the year of the T-Virus outbreak.',
        reward: 'magnum',
        penaltyDamage: 25,
    },
    {
        id: 'virus_classification',
        title: 'VIRUS CLASSIFICATION',
        description: 'A researcher\'s log asks: "Which virus was used to create the first Tyrant?" Enter the code name.',
        type: 'code',
        answer: 'T-VIRUS',
        hint: 'The simplest of all Umbrella strains. Two words separated by a hyphen.',
        reward: 'handgun',
        penaltyDamage: 15,
    },
    {
        id: 'umbrella_founder',
        title: 'CLASSIFIED PERSONNEL FILE',
        description: 'An Umbrella database asks for the LAST NAME of the researcher who discovered the Progenitor Virus.',
        type: 'code',
        answer: 'MARCUS',
        hint: 'He was one of three co-founders of the Umbrella Corporation.',
        reward: 'shotgun',
        penaltyDamage: 20,
    },
    {
        id: 'stars_leader',
        title: 'STARS BRAVO TEAM FILE',
        description: 'Security clearance required. Enter the LAST NAME of the S.T.A.R.S. Alpha Team Captain.',
        type: 'code',
        answer: 'WESKER',
        hint: 'He later became Umbrella\'s most dangerous asset.',
        reward: 'flamethrower',
        penaltyDamage: 20,
    },
    {
        id: 'raccoon_mayor',
        title: 'RACCOON CITY RECORDS',
        description: 'A political file asks: "Who was the corrupt official that aided Umbrella in suppressing outbreak reports?"',
        type: 'code',
        answer: 'IRONS',
        hint: 'He was Chief of Police and a twisted collector.',
        reward: 'green_herb',
        penaltyDamage: 15,
    },
    {
        id: 'moral_choice',
        title: 'SURVIVOR ENCOUNTER',
        description: 'You find a survivor barricaded in a room. He is bitten and begging for your First Aid Spray. What do you do?',
        type: 'choice',
        options: [
            {
                text: 'Give him the spray and move on',
                effect: 'lose_spray',
                resultText: 'He stabilizes for now. You push forward with fewer resources. A hard but human choice.',
            },
            {
                text: 'Leave — conserve your resources',
                effect: 'gain_ammo',
                resultText: 'Survival instinct wins. You pocket a spare weapon he left behind and keep moving.',
            },
        ],
        penaltyDamage: 0,
    },
    {
        id: 'g_virus_lab',
        title: 'G-VIRUS CONTAINMENT CODE',
        description: 'A Umbrella lab door is sealed. The lock panel reads: "Enter the name of the G-Virus creator."',
        type: 'code',
        answer: 'BIRKIN',
        hint: 'He sacrificed himself to the very virus he created.',
        reward: 'mixed_herb_gr',
        penaltyDamage: 20,
    },
];

// ── Event Roll ───────────────────────────────────────────────
// 0–49 → ITEM (50%), 50–79 → BOSS (30%), 80–99 → PUZZLE (20%)
export function rollEvent() {
    const roll = Math.floor(Math.random() * 100);
    if (roll < 50) return 'ITEM';
    if (roll < 80) return 'BOSS';
    return 'PUZZLE';
}

export function rollItem() {
    // Rocket Launcher — the single rarest drop in the game. Checked first,
    // independently of the weighted pool below, so its odds never shift
    // as more weapons/herbs get added later.
    if (Math.random() < 0.02) {
        return COLLECTIBLE_ITEMS.find(i => i.id === 'rocket_launcher');
    }

    const weighted = [
        ...Array(5).fill('green_herb'),
        ...Array(1).fill('yellow_herb'), // rarer than red_herb now (permanent max-HP boost)
        ...Array(2).fill('red_herb'),
        ...Array(2).fill('mixed_herb_gr'),
        ...Array(1).fill('mixed_herb_yg'),
        ...Array(1).fill('mixed_herb_yr'),
        ...Array(1).fill('mixed_herb_ygr'),
        ...Array(4).fill('handgun'),
        ...Array(3).fill('shotgun'),
        ...Array(2).fill('submachine_gun'),
        ...Array(2).fill('magnum'),
        ...Array(1).fill('grenade_launcher'),
        ...Array(1).fill('flamethrower'),
    ];
    const id = weighted[Math.floor(Math.random() * weighted.length)];
    return COLLECTIBLE_ITEMS.find(i => i.id === id);
}

export function rollPuzzle() {
    return PUZZLES[Math.floor(Math.random() * PUZZLES.length)];
}

/**
 * Picks a random boss the player hasn't defeated yet this session.
 * Returns null if every boss has already fallen — callers must check for
 * that BEFORE calling this (see GameContext's NAVIGATE case), since a
 * defeated boss must never be offered again.
 */
export function rollBoss(usedBossIds = []) {
    const available = BOSSES.filter(b => !usedBossIds.includes(b.id));
    if (available.length === 0) return null;
    return available[Math.floor(Math.random() * available.length)];
}