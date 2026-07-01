// All Resident Evil games data
// characters field: array of { class: string, ids: string[] }
// covers: array of strings — if more than one, the card alternates every 4s

export const games = [
  // ─────────────────────────────────────────────────────────────────
  // RESIDENT EVIL 0
  // ─────────────────────────────────────────────────────────────────
  {
    id: 're0',
    title: 'RESIDENT EVIL 0',
    subtitle: 'Zero',
    year: '2002',
    platform: ['GameCube', 'Wii', 'PC', 'PS3', 'PS4', 'Xbox One', 'Switch'],
    type: 'MAINLINE',
    covers: ['/images/games/re0.jfif'],
    description: 'A prequel set just before the original game. S.T.A.R.S. Bravo Team medic Rebecca Chambers teams up with escaped convict Billy Coen to survive a horrific viral outbreak aboard the Ecliptic Express and Umbrella\'s Arklay training facility. They uncover the truth behind the Progenitor Virus and the resurrection of James Marcus — the man betrayed by his own creation.',
    characters: [
      { class: 'PROTAGONISTS', ids: ['rebecca_chambers', 'billy_coen'] },
      { class: 'ANTAGONISTS', ids: ['james_marcus'] },
      { class: 'ENEMIES', ids: ['zombie', 'cerberus', 'licker'] },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // RESIDENT EVIL 1 (1996 / REmake 2002)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 're1',
    title: 'RESIDENT EVIL',
    subtitle: 'REmake',
    year: '1996 / 2002',
    platform: ['PS1', 'GameCube', 'PC', 'PS4', 'Xbox One', 'Switch'],
    type: 'MAINLINE',
    covers: ['/images/games/re1_original.jpg', '/images/games/re1.webp'],
    description: 'S.T.A.R.S. Alpha Team takes shelter in an abandoned Spencer Mansion after a mysterious attack, only to discover Umbrella\'s darkest secrets — bioweapons, a rogue AI, and a traitor in their midst. The game that defined survival horror.',
    characters: [
      { class: 'PROTAGONISTS', ids: ['jill_valentine', 'chris_redfield', 'barry_burton', 'rebecca_chambers'] },
      { class: 'SUPPORTING', ids: ['richard_aiken', 'enrico_marini'] },
      { class: 'ANTAGONISTS', ids: ['albert_wesker', 'ozwell_spencer'] },
      { class: 'ENEMIES', ids: ['tyrant_t002', 'zombie', 'cerberus', 'licker'] },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // RESIDENT EVIL 2 (1998 / Remake 2019)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 're2',
    title: 'RESIDENT EVIL 2',
    subtitle: 'Remake',
    year: '1998 / 2019',
    platform: ['PS1', 'N64', 'PC', 'PS4', 'Xbox One', 'Switch'],
    type: 'MAINLINE',
    covers: ['/images/games/re2_original.jpg', '/images/games/re2.jpg'],
    description: 'Raccoon City is overrun. Rookie cop Leon S. Kennedy and Claire Redfield fight to survive while being hunted by the unstoppable Mr. X Tyrant, uncovering Umbrella\'s G-Virus experiments beneath the city.',
    characters: [
      { class: 'PROTAGONISTS', ids: ['leon_kennedy', 'claire_redfield'] },
      { class: 'SUPPORTING', ids: ['ada_wong', 'sherry_birkin', 'hunk', 'marvin_branagh', 'annette_birkin'] },
      { class: 'ANTAGONISTS', ids: ['william_birkin', 'brian_irons'] },
      { class: 'ENEMIES', ids: ['mr_x', 'licker', 'zombie', 'giant_moth'] },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // RESIDENT EVIL 3 (1999 / Remake 2020)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 're3',
    title: 'RESIDENT EVIL 3',
    subtitle: 'Nemesis / Remake',
    year: '1999 / 2020',
    platform: ['PS1', 'PC', 'PS4', 'Xbox One'],
    type: 'MAINLINE',
    covers: ['/images/games/re3_original.jpg', '/images/games/re3.jpg'],
    description: 'Jill Valentine fights to escape Raccoon City while being relentlessly pursued by the Nemesis-T Type — a near-unkillable B.O.W. engineered to eliminate S.T.A.R.S. survivors. Together with UBCS mercenary Carlos Oliveira, she races against a nuclear clock.',
    characters: [
      { class: 'PROTAGONISTS', ids: ['jill_valentine', 'carlos_oliveira'] },
      { class: 'SUPPORTING', ids: ['mikhail_victor'] },
      { class: 'ANTAGONISTS', ids: ['nikolai_zinoviev'] },
      { class: 'ENEMIES', ids: ['nemesis', 'zombie', 'licker', 'grave_digger', 'cerberus'] },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // RESIDENT EVIL CODE: VERONICA X (2000)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'recvx',
    title: 'RESIDENT EVIL',
    subtitle: 'Code: Veronica X',
    year: '2000',
    platform: ['Dreamcast', 'PS2', 'GameCube', 'PS3', 'Xbox 360', 'PC'],
    type: 'MAINLINE',
    covers: ['/images/games/recvx.jpg'],
    description: 'Claire Redfield is captured and sent to Rockfort Island, where an attack releases its bio-weapons. She must face the Ashford twins and a revived Albert Wesker while Chris races to save her in Antarctica.',
    characters: [
      { class: 'PROTAGONISTS', ids: ['claire_redfield', 'chris_redfield'] },
      { class: 'SUPPORTING', ids: ['steve_burnside'] },
      { class: 'ANTAGONISTS', ids: ['albert_wesker', 'alexia_ashford', 'alfred_ashford'] },
      { class: 'ENEMIES', ids: ['zombie', 'tyrant_t002'] },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // RESIDENT EVIL 4 (2005 / Remake 2023)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 're4',
    title: 'RESIDENT EVIL 4',
    subtitle: 'Remake',
    year: '2005 / 2023',
    platform: ['GameCube', 'PS2', 'Wii', 'PC', 'PS4', 'PS5', 'Xbox Series X', 'Switch'],
    type: 'MAINLINE',
    covers: ['/images/games/re4_original.jpg', '/images/games/re4.jpg'],
    description: 'Leon S. Kennedy travels to rural Spain to rescue the President\'s daughter, only to discover a sinister cult controlling villagers through an ancient parasite called Las Plagas. The game that reinvented survival horror.',
    characters: [
      { class: 'PROTAGONISTS', ids: ['leon_kennedy', 'ashley_graham'] },
      { class: 'SUPPORTING', ids: ['ada_wong', 'luis_sera', 'ingrid_hunnigan', 'the_merchant'] },
      { class: 'ANTAGONISTS', ids: ['osmund_saddler', 'jack_krauser', 'ramon_salazar'] },
      { class: 'ENEMIES', ids: ['el_gigante', 'it_verdugo', 'regenerador'] },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // RESIDENT EVIL 5 (2009)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 're5',
    title: 'RESIDENT EVIL 5',
    subtitle: '',
    year: '2009',
    platform: ['PS3', 'Xbox 360', 'PC', 'PS4', 'Xbox One', 'Switch'],
    type: 'MAINLINE',
    covers: ['/images/games/re5.jpg'],
    description: 'BSAA agents Chris Redfield and Sheva Alomar investigate illegal bioweapon trading in Africa, leading to a final reckoning with Albert Wesker and his plan to use the Uroboros virus to force-evolve humanity.',
    characters: [
      { class: 'PROTAGONISTS', ids: ['chris_redfield', 'sheva_alomar'] },
      { class: 'SUPPORTING', ids: ['jill_valentine', 'josh_stone'] },
      { class: 'ANTAGONISTS', ids: ['albert_wesker', 'excella_gionne', 'ozwell_spencer'] },
      { class: 'ENEMIES', ids: ['uroboros', 'zombie', 'licker'] },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // RESIDENT EVIL 6 (2012)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 're6',
    title: 'RESIDENT EVIL 6',
    subtitle: '',
    year: '2012',
    platform: ['PS3', 'Xbox 360', 'PC', 'PS4', 'Xbox One', 'Switch'],
    type: 'MAINLINE',
    covers: ['/images/games/re6.jpg'],
    description: 'A bioterrorist attack using the C-Virus spans three continents. Four interconnected campaigns follow Leon, Chris, Jake Muller and Ada Wong as they converge on a global threat orchestrated by Neo-Umbrella.',
    characters: [
      { class: 'PROTAGONISTS', ids: ['leon_kennedy', 'chris_redfield', 'jake_muller', 'ada_wong', 'sherry_birkin'] },
      { class: 'SUPPORTING', ids: ['helena_harper', 'piers_nivans', 'ingrid_hunnigan'] },
      { class: 'ANTAGONISTS', ids: ['derek_simmons', 'carla_radames'] },
      { class: 'ENEMIES', ids: ['zombie', 'licker'] },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // RESIDENT EVIL 7: BIOHAZARD (2017)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 're7',
    title: 'RESIDENT EVIL 7',
    subtitle: 'Biohazard',
    year: '2017',
    platform: ['PS4', 'Xbox One', 'PC', 'PS5', 'Xbox Series X', 'Switch'],
    type: 'MAINLINE',
    covers: ['/images/games/re7.jpg'],
    description: 'First-person horror. Ethan Winters searches for his missing wife in a derelict Louisiana plantation, becoming the prisoner of the mutated Baker family — driven mad by the E-Series mold bioweapon Eveline.',
    characters: [
      { class: 'PROTAGONISTS', ids: ['ethan_winters'] },
      { class: 'SUPPORTING', ids: ['mia_winters', 'zoe_baker', 'joe_baker', 'chris_redfield'] },
      { class: 'ANTAGONISTS', ids: ['jack_baker', 'marguerite_baker', 'lucas_baker', 'eveline'] },
      { class: 'ENEMIES', ids: ['swamp_man', 'zombie', 'cerberus'] },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // RESIDENT EVIL VILLAGE (2021)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 're8',
    title: 'RESIDENT EVIL',
    subtitle: 'Village',
    year: '2021',
    platform: ['PS4', 'PS5', 'Xbox One', 'Xbox Series X', 'PC', 'Switch'],
    type: 'MAINLINE',
    covers: ['/images/games/re8.jpg'],
    description: 'Ethan Winters must traverse a snow-covered Eastern European village ruled by four lords under Mother Miranda to recover his kidnapped daughter Rose. A story of sacrifice and the Megamycete.',
    characters: [
      { class: 'PROTAGONISTS', ids: ['ethan_winters'] },
      { class: 'SUPPORTING', ids: ['mia_winters', 'rose_winters', 'chris_redfield', 'duke'] },
      { class: 'ANTAGONISTS', ids: ['mother_miranda', 'alcina_dimitrescu', 'karl_heisenberg', 'donna_beneviento', 'salvatore_moreau'] },
      { class: 'ENEMIES', ids: ['lycans', 'zombie'] },
    ],
  },

  // ─────────────────────────────────────────────────────────────────
  // SPIN-OFFS
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'reoutbreak',
    title: 'RESIDENT EVIL',
    subtitle: 'Outbreak',
    year: '2003',
    platform: ['PS2'],
    type: 'SPIN-OFF',
    covers: ['/images/games/reoutbreak.jpg'],
    description: 'The first online RE title. Eight ordinary Raccoon City civilians — each with unique abilities — fight to survive the T-Virus outbreak in scenarios spanning the city\'s bars, hospitals, sewers and university. A pioneering co-op survival experience.',
    characters: [
      { class: 'PROTAGONISTS', ids: ['kevin_ryman', 'mark_wilkins', 'jim_chapman', 'george_hamilton', 'alyssa_ashcroft', 'yoko_suzuki', 'david_king', 'cindy_lennox'] },
      { class: 'ENEMIES', ids: ['zombie', 'licker', 'cerberus', 'giant_moth'] },
    ],
  },
  {
    id: 'reuc',
    title: 'RESIDENT EVIL',
    subtitle: 'The Umbrella Chronicles',
    year: '2007',
    platform: ['Wii', 'PS3'],
    type: 'SPIN-OFF',
    covers: ['/images/games/reuc.jpg'],
    description: 'An on-rails shooter chronicling the fall of Umbrella Corporation through RE0, RE1, RE3 and exclusive Russia scenarios. Fills narrative gaps and shows events from alternate perspectives, concluding with Umbrella\'s total collapse.',
    characters: [
      { class: 'PROTAGONISTS', ids: ['jill_valentine', 'chris_redfield', 'rebecca_chambers', 'carlos_oliveira'] },
      { class: 'ANTAGONISTS', ids: ['albert_wesker', 'james_marcus', 'nikolai_zinoviev'] },
      { class: 'ENEMIES', ids: ['nemesis', 'zombie', 'cerberus', 'licker'] },
    ],
  },
  {
    id: 'rerev',
    title: 'RESIDENT EVIL',
    subtitle: 'Revelations',
    year: '2012',
    platform: ['3DS', 'PC', 'PS3', 'Xbox 360', 'Wii U', 'PS4', 'Xbox One', 'Switch'],
    type: 'SPIN-OFF',
    covers: ['/images/games/rerev.jpg'],
    description: 'Set between RE4 and RE5. Jill Valentine and Parker Luciani investigate an abandoned cruise liner in search of Chris Redfield, discovering a new Ooze bioweapon and the terrorist organization Il Veltro.',
    characters: [
      { class: 'PROTAGONISTS', ids: ['jill_valentine', 'chris_redfield', 'parker_luciani'] },
      { class: 'SUPPORTING', ids: ['jessica_sherawat'] },
      { class: 'ANTAGONISTS', ids: ['albert_wesker'] },
      { class: 'ENEMIES', ids: ['zombie', 'cerberus'] },
    ],
  },
  {
    id: 'rerev2',
    title: 'RESIDENT EVIL',
    subtitle: 'Revelations 2',
    year: '2015',
    platform: ['PC', 'PS3', 'PS4', 'Xbox 360', 'Xbox One', 'Switch', 'PS Vita'],
    type: 'SPIN-OFF',
    covers: ['/images/games/rerev2.jpg'],
    description: 'Claire Redfield and Moira Burton are abducted to a mysterious island where Alex Wesker runs experiments. Barry Burton travels to rescue his daughter, aided by a mysterious girl named Natalia Korda.',
    characters: [
      { class: 'PROTAGONISTS', ids: ['claire_redfield', 'barry_burton'] },
      { class: 'SUPPORTING', ids: ['moira_burton', 'natalia_korda'] },
      { class: 'ANTAGONISTS', ids: ['alex_wesker', 'neil_fisher'] },
      { class: 'ENEMIES', ids: ['zombie'] },
    ],
  },
];
