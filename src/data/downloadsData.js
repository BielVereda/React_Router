// ═══════════════════════════════════════════════════════════════
//  downloadsData.js — Umbrella Secure Archive
//  To add a Google Drive link, replace each PLACEHOLDER_XXXXX
//  string with your actual sharing URL.
// ═══════════════════════════════════════════════════════════════

export const consoleSections = [

    // ─────────────────────────────────────────────────────────────
    //  GAME BOY COLOR
    // ─────────────────────────────────────────────────────────────
    {
        id: 'gbc',
        console: 'GAME BOY COLOR',
        shortName: 'GBC',
        years: '2001',
        hasBios: false,
        biosNote: 'mGBA does not require a BIOS file to run GBC titles.',

        emulators: [
            {
                name: 'mGBA',
                version: '0.10.3',
                description: 'Modern, cycle-accurate Game Boy / GBC / GBA emulator. Lightweight and feature-rich with save states, cheat codes and real-time clock support.',
                os: ['Windows', 'macOS', 'Linux'],
                biosRequired: false,
                links: {
                    Windows: 'https://drive.google.com/file/d/1qvAv94UFugeEAfJzMyi4JgPRlj-SMPgK/view?usp=drive_link',
                    macOS: 'https://drive.google.com/file/d/110NHzwVjPeGkSuYEGm9HJMyrB4HSRMrI/view?usp=drive_link',
                    Linux: 'https://drive.google.com/file/d/1hjnh_b0XuBprOdnU6rfl7bZoO89Mqydm/view?usp=drive_link'
                },
                officialSite: 'https://mgba.io',
            },
            {
                name: 'Super GBC',
                version: 'Latest',
                description: 'A fast and full-featured emulator to run Game Boy and Game Boy Color games on Android devices.',
                os: ['Android'],
                biosRequired: false,
                links: {
                    Android: 'https://drive.google.com/file/d/1YBW83r87SWio98Dp9mYaaR3x9wtjnRF2/view?usp=drive_link'
                },
                officialSite: 'https://play.google.com',
            }
        ],

        bios: null,

        games: [
            {
                id: 'gbc_gaiden',
                title: 'Resident Evil: Gaiden',
                year: '2001',
                region: 'EUR / USA',
                genre: 'Action RPG',
                size: '~1 MB',
                link: 'https://drive.google.com/file/d/1U7WyQWXGGZIUo4C1gjuHsbnngZHQcK6N/view?usp=drive_link',
                description:
                    'Barry Burton boards a luxury ocean liner overrun by Bio-Organic Weapons to rescue Leon S. Kennedy. Features a unique top-down exploration style and a first-person real-time battle system.',
            },
        ],
    },

    // ─────────────────────────────────────────────────────────────
    //  NINTENDO DS
    // ─────────────────────────────────────────────────────────────
    {
        id: 'nds',
        console: 'NINTENDO DS',
        shortName: 'NDS',
        years: '2006',
        hasBios: false,
        biosNote: 'DeSmuME uses a built-in HLE BIOS implementation — no firmware dump required.',

        emulators: [
            {
                name: 'DeSmuME',
                version: '0.9.13',
                description: 'The most widely compatible Nintendo DS emulator. Supports save states, AR cheat codes, microphone input and Wi-Fi emulation for select titles.',
                os: ['Windows', 'macOS', 'Linux'],
                biosRequired: false,
                links: {
                    Windows: 'https://drive.google.com/file/d/1XpNXy-QqKHuEzmY-R18Qhs1QyqwFX9oK/view?usp=drive_link',
                    macOS: 'https://drive.google.com/file/d/1Q1HVuXixUKEtvEV8-woveTsExrFaUsTL/view?usp=drive_link',
                    Linux: 'https://drive.google.com/file/d/1Ak5z91BmJIeHUH8H2AVBkNPxHrDHhubp/view?usp=drive_link'
                },
                officialSite: 'https://desmume.org',
            }
        ],

        bios: null,

        games: [
            {
                id: 'nds_deadly_silence',
                title: 'Resident Evil: Deadly Silence',
                year: '2006',
                region: 'USA / EUR / JPN',
                genre: 'Survival Horror',
                size: '~128 MB',
                link: 'https://drive.google.com/file/d/1bBSC7shETAWBY1L6-UXQX_1wbd6-ShTD/view?usp=drive_link',
                description:
                    'Enhanced remake of the original Resident Evil for the Nintendo DS. Includes both Classic and Rebirth modes, with touch-screen puzzles, cooperative and versus multiplayer via local wireless.',
            },
        ],
    },

    // ─────────────────────────────────────────────────────────────
    //  PLAYSTATION 1
    // ─────────────────────────────────────────────────────────────
    {
        id: 'ps1',
        console: 'PLAYSTATION 1',
        shortName: 'PS1',
        years: '1997 – 2000',
        hasBios: true,
        biosNote: null,

        emulators: [
            {
                name: 'DuckStation',
                version: 'Latest',
                description: 'Highly accurate, cycle-based PS1 emulator. Supports upscaling to 4K, texture filtering, PGXP geometry correction, widescreen patches and RetroAchievements integration.',
                os: ['Windows', 'macOS', 'Linux', 'Android'],
                biosRequired: true,
                links: {
                    Windows: 'PLACEHOLDER_DUCKSTATION_WINDOWS',
                    macOS: 'PLACEHOLDER_DUCKSTATION_MACOS',
                    Linux: 'PLACEHOLDER_DUCKSTATION_LINUX',
                    Android: 'PLACEHOLDER_DUCKSTATION_ANDROID'
                },
                officialSite: 'https://www.duckstation.org',
            }
        ],

        bios: {
            name: 'PS1 BIOS Pack',
            description:
                'Firmware required by DuckStation. Pack includes SCPH-1001 (USA v2.2), SCPH-5501 (USA v3.0) and SCPH-5502 (EUR v3.0). The SCPH-5501 is recommended for best compatibility.',
            warning:
                'PS1 BIOS files are proprietary Sony firmware. You are solely responsible for ensuring that you legally own a PS1 console from which the BIOS was dumped.',
            link: 'https://drive.google.com/file/d/1ZO3baxiNodGLXnUvTBoollO8xeAg4LLu/view?usp=drive_link',
            size: '~2 MB',
        },

        games: [
            {
                id: 'ps1_directors_cut',
                title: "Resident Evil: Director's Cut",
                year: '1997',
                region: 'USA / EUR',
                genre: 'Survival Horror',
                size: '~530 MB',
                link: 'https://drive.google.com/file/d/1zUykuMv4UEVcFJM4KMMB-ukpEi1WfgZ0/view?usp=drive_link',
                description:
                    "Expanded release of the original RE including Original, Arranged and Beginner difficulty modes, plus a preview of Resident Evil 2. The Arranged mode features remixed item and enemy placements.",
            },
            {
                id: 'ps1_re2',
                title: 'Resident Evil 2',
                year: '1998',
                region: 'USA / EUR',
                genre: 'Survival Horror',
                size: '~1.1 GB',
                link: 'https://drive.google.com/file/d/1CiMuWC-Hw3QJ5zyadxmdyncpFconwOEo/view?usp=drive_link',
                description:
                    "Leon S. Kennedy and Claire Redfield's first night in Raccoon City. Features a dual-scenario system across two discs, where each character's actions affect the other's story.",
            },
            {
                id: 'ps1_re3',
                title: 'Resident Evil 3: Nemesis',
                year: '1999',
                region: 'USA / EUR',
                genre: 'Survival Horror',
                size: '~580 MB',
                link: 'https://drive.google.com/file/d/19F3vHtuvyuu3IqF7oaesMrSB7RQ6ztt8/view?usp=drive_link',
                description:
                    'Jill Valentine attempts to escape Raccoon City while hunted by the near-indestructible Bio-Organic Weapon known as Nemesis. Features a dynamic branching decision system.',
            },
            {
                id: 'ps1_survivor',
                title: 'Resident Evil: Survivor',
                year: '2000',
                region: 'USA / EUR',
                genre: 'First-Person Shooter',
                size: '~480 MB',
                link: 'https://drive.google.com/file/d/16ylad03Sp96EzEBZxBhHGjC2EccJt97a/view?usp=drive_link',
                description:
                    'First entry in the Gun Survivor sub-series. Ark Thompson, an amnesiac agent, is stranded in a city overrun by the T-virus and must uncover the truth behind his identity and the outbreak.',
            },
        ],
    },

    // ─────────────────────────────────────────────────────────────
    //  PLAYSTATION 2
    // ─────────────────────────────────────────────────────────────
    {
        id: 'ps2',
        console: 'PLAYSTATION 2',
        shortName: 'PS2',
        years: '2001 – 2005',
        hasBios: true,
        biosNote: null,

        emulators: [
            {
                name: 'PCSX2',
                version: '2.x (Qt)',
                description: 'The definitive PlayStation 2 emulator with near-complete game compatibility. Supports up to 4K internal resolution, widescreen patches, texture replacement and RetroAchievements.',
                os: ['Windows', 'macOS', 'Linux'],
                biosRequired: true,
                links: {
                    Windows: 'PLACEHOLDER_PCSX2_WINDOWS',
                    macOS: 'PLACEHOLDER_PCSX2_MACOS',
                    Linux: 'PLACEHOLDER_PCSX2_LINUX'
                },
                officialSite: 'https://pcsx2.net',
            }
        ],

        bios: {
            name: 'PS2 BIOS Pack',
            description:
                'Firmware required by PCSX2. Pack includes SCPH-70012 (USA v2.20), SCPH-77004 (EUR v2.20) and SCPH-77006 (JPN v2.20). The SCPH-70012 is recommended for USA region games.',
            warning:
                'PS2 BIOS files are proprietary Sony firmware. You are solely responsible for ensuring that you legally own a PS2 console from which the BIOS was dumped.',
            link: 'PLACEHOLDER_PS2_BIOS',
            size: '~32 MB',
        },

        games: [
            {
                id: 'ps2_re4',
                title: 'Resident Evil 4',
                year: '2005',
                region: 'USA / EUR',
                genre: 'Action / Survival Horror',
                size: '~4.3 GB',
                link: 'PLACEHOLDER_RE4_PS2',
                description:
                    "Leon S. Kennedy is dispatched to rural Spain to rescue the U.S. President's kidnapped daughter. A landmark third-person shooter that revolutionized the entire survival horror genre.",
            },
            {
                id: 'ps2_code_veronica',
                title: 'Resident Evil: Code Veronica X',
                year: '2001',
                region: 'USA / EUR',
                genre: 'Survival Horror',
                size: '~2.1 GB',
                link: 'PLACEHOLDER_CODE_VERONICA',
                description:
                    'Claire Redfield is captured by Umbrella and imprisoned on Rockfort Island. She must escape while searching for her brother Chris, facing the cold and calculated Alexia Ashford.',
            },
            {
                id: 'ps2_outbreak',
                title: 'Resident Evil: Outbreak',
                year: '2003',
                region: 'USA / EUR',
                genre: 'Survival Horror',
                size: '~2.0 GB',
                link: 'PLACEHOLDER_OUTBREAK',
                description:
                    'Up to four players control Raccoon City civilians during the initial T-virus outbreak. The first online-capable RE title, now playable through fan-maintained OBSRV servers.',
            },
            {
                id: 'ps2_outbreak2',
                title: 'Resident Evil: Outbreak File #2',
                year: '2004',
                region: 'USA / EUR',
                genre: 'Survival Horror',
                size: '~2.5 GB',
                link: 'PLACEHOLDER_OUTBREAK_2',
                description:
                    'Five new scenarios expand the Outbreak story, exploring locations and events concurrent with Resident Evil 2 and 3. Features an expanded character roster and deeper narrative.',
            },
            {
                id: 'ps2_gun_survivor_2',
                title: 'Gun Survivor 2: Code Veronica',
                year: '2001',
                region: 'EUR / JPN',
                genre: 'First-Person Shooter',
                size: '~1.4 GB',
                link: 'PLACEHOLDER_GUN_SURVIVOR_2',
                description:
                    'Arcade light-gun port set before the events of Code Veronica X. Compatible with the G-Con 45 peripheral or standard controller. Only released outside Japan in Europe.',
            },
            {
                id: 'ps2_dead_aim',
                title: 'Resident Evil: Dead Aim',
                year: '2003',
                region: 'USA / EUR',
                genre: 'First-Person Shooter',
                size: '~1.7 GB',
                link: 'PLACEHOLDER_DEAD_AIM',
                description:
                    'Third-person navigation and first-person aiming hybrid. Agent Bruce McGivern and Chinese spy Fong Ling pursue a rogue Umbrella officer across an ocean liner and a viral research facility.',
            },
        ],
    },
];