import re2002 from '../assets/images/movies/re_2002.jpg';
import reApocalypse from '../assets/images/movies/re_apocalypse.jpg';
import reExtinction from '../assets/images/movies/re_extinction.jpg';
import reAfterlife from '../assets/images/movies/re_afterlife.jpg';
import reRetribution from '../assets/images/movies/re_retribution.jpg';
import reFinalChapter from '../assets/images/movies/re_final_chapter.jpg';
import reWelcomeRaccoon from '../assets/images/movies/re_welcome_raccoon.jpg';

import reDegeneration from '../assets/images/movies/re_degeneration.jpg';
import reDamnation from '../assets/images/movies/re_damnation.jpg';
import reVendetta from '../assets/images/movies/re_vendetta.png';
import reDeathIsland from '../assets/images/movies/re_death_island.jpg';

export const movies = [
  {
    id: 1,
    fullTitle: "Resident Evil",
    year: "2002",
    image: re2002,
    type: "LIVE ACTION",
    duration: "100 MIN",
    ageRating: "16",
    ratings: {
      imdb: "6.7/10",
      rotten: "36%",
      metacritic: "33/100"
    },
    whereToWatch: ["Netflix", "Prime Video", "Apple TV"],
    description: "A deadly virus is unleashed in a secret genetic engineering laboratory known as 'The Hive', controlled by a supercomputer named the Red Queen. The Umbrella Corporation sends an elite military team to contain the threat, encountering Alice along the way, an amnesiac security operative who joins the group to survive the horde of undead and mutant creatures."
  },
  {
    id: 2,
    fullTitle: "Resident Evil: Apocalypse",
    year: "2004",
    image: reApocalypse,
    type: "LIVE ACTION",
    duration: "94 MIN",
    ageRating: "16",
    ratings: {
      imdb: "6.1/10",
      rotten: "19%",
      metacritic: "35/100"
    },
    whereToWatch: ["Netflix", "Prime Video", "Google Play"],
    description: "The T-virus spreads beyond The Hive and infects the entire city of Raccoon City. The Umbrella Corporation seals the exits to contain the outbreak, isolating the survivors. Alice wakes up in a deserted hospital, now with superhuman abilities after being genetically modified. She joins forces with Jill Valentine and mercenary Carlos Oliveira to rescue a scientist's daughter in exchange for an escape route before the city is destroyed by a nuclear strike. However, they must face the terrifying Nemesis project, a relentless biological weapon created by Umbrella."
  },
  {
    id: 3,
    fullTitle: "Resident Evil: Extinction",
    year: "2007",
    image: reExtinction,
    type: "LIVE ACTION",
    duration: "94 MIN",
    ageRating: "16",
    ratings: {
      imdb: "6.2/10",
      rotten: "25%",
      metacritic: "41/100"
    },
    whereToWatch: ["Prime Video", "Apple TV"],
    description: "Years after the Raccoon City disaster, the T-virus has ravaged the world, turning it into a global wasteland. Alice travels the Nevada desert, joining a convoy of survivors led by Claire Redfield and Carlos Oliveira. As they battle hordes of the undead and mutated crows, Alice discovers her newly developed psychic powers. The group must find a way to reach a supposed safe haven in Alaska, while the Umbrella Corporation's Dr. Isaacs relentlessly hunts Alice to harness her blood for a cure and create super-zombies."
  },
  {
    id: 4,
    fullTitle: "Resident Evil: Afterlife",
    year: "2010",
    image: reAfterlife,
    type: "LIVE ACTION",
    duration: "96 MIN",
    ageRating: "16",
    ratings: {
      imdb: "5.8/10",
      rotten: "21%",
      metacritic: "37/100"
    },
    whereToWatch: ["Netflix", "Prime Video"],
    description: "Alice continues her journey to find survivors and lead them to safety. Her deadly battle with the Umbrella Corporation reaches new heights when she receives unexpected help from an old friend. A new lead that promises a safe haven from the Undead takes them to Los Angeles, but when they arrive the city is overrun by thousands of Undead - and Alice and her comrades are about to step into a deadly trap."
  },
  {
    id: 5,
    fullTitle: "Resident Evil: Retribution",
    year: "2012",
    image: reRetribution,
    type: "LIVE ACTION",
    duration: "95 MIN",
    ageRating: "16",
    ratings: {
      imdb: "5.3/10",
      rotten: "31%",
      metacritic: "39/100"
    },
    whereToWatch: ["Netflix", "Prime Video", "Apple TV"],
    description: "Alice awakens in the Umbrella Corporation's most clandestine testing facility. With no apparent allies, she must navigate detailed simulations of viral outbreaks in Tokyo, New York, Moscow, and suburban America. With the unexpected help of former enemies and new allies, including Ada Wong and Leon S. Kennedy, Alice fights to escape the fortified complex under the control of the hostile Red Queen, while discovering deep secrets about her own past."
  },
  {
    id: 6,
    fullTitle: "Resident Evil: The Final Chapter",
    year: "2016",
    image: reFinalChapter,
    type: "LIVE ACTION",
    duration: "106 MIN",
    ageRating: "16",
    ratings: {
      imdb: "5.5/10",
      rotten: "37%",
      metacritic: "49/100"
    },
    whereToWatch: ["Prime Video", "Apple TV"],
    description: "Picking up immediately after the events in Resident Evil: Retribution, Alice is the only survivor of what was meant to be humanity's final stand against the undead. Now, she must return to where the nightmare began - The Hive in Raccoon City, where the Umbrella Corporation is gathering its forces for a final strike against the only remaining survivors of the apocalypse."
  },
  {
    id: 7,
    fullTitle: "Resident Evil: Welcome to Raccoon City",
    year: "2021",
    image: reWelcomeRaccoon,
    type: "LIVE ACTION",
    duration: "107 MIN",
    ageRating: "16",
    ratings: {
      imdb: "5.2/10",
      rotten: "30%",
      metacritic: "44/100"
    },
    whereToWatch: ["Prime Video", "Apple TV"],
    description: "Once the booming home of pharmaceutical giant Umbrella Corporation, Raccoon City is now a dying Midwestern town. The company's exodus left the city a wasteland... with great evil brewing below the surface. When that evil is unleashed, the townspeople are forever... changed... and a small group of survivors must work together to uncover the truth behind Umbrella and make it through the night."
  },
  {
    id: 8,
    fullTitle: "Resident Evil: Degeneration",
    year: "2008",
    image: reDegeneration,
    type: "CGI ANIMATION",
    duration: "96 MIN",
    ageRating: "16",
    ratings: {
      imdb: "6.4/10",
      rotten: "57%",
      metacritic: "N/A"
    },
    whereToWatch: ["Prime Video", "Apple TV", "Google Play"],
    description: "Seven years after the Raccoon City disaster, a bioterrorist attack using the T-virus occurs at a busy airport in the United States. Activist Claire Redfield, present at the scene, faces the zombie infestation. Federal agent Leon S. Kennedy is sent to lead the government's tactical response team and rescue trapped civilians. As they investigate those responsible for the attack, they uncover a conspiracy involving the clandestine sale of the virus by rival pharmaceutical corporations to the bankrupt Umbrella."
  },
  {
    id: 9,
    fullTitle: "Resident Evil: Damnation",
    year: "2012",
    image: reDamnation,
    type: "CGI ANIMATION",
    duration: "100 MIN",
    ageRating: "16",
    ratings: {
      imdb: "6.4/10",
      rotten: "100%",
      metacritic: "N/A"
    },
    whereToWatch: ["Prime Video", "Apple TV"],
    description: "United States Special Agent Leon S. Kennedy sneaks into a small Eastern European country to verify rumors that Bio Organic Weapons (B.O.W.s) are being used in war. Right after his infiltration, the US government orders him to leave immediately. Determined to uncover the truth, Leon ignores the order and enters the battlefield to end the chain of tragedies caused by the B.O.W.s."
  },
  {
    id: 10,
    fullTitle: "Resident Evil: Vendetta",
    year: "2017",
    image: reVendetta,
    type: "CGI ANIMATION",
    duration: "97 MIN",
    ageRating: "16",
    ratings: {
      imdb: "6.2/10",
      rotten: "43%",
      metacritic: "N/A"
    },
    whereToWatch: ["Prime Video", "Apple TV"],
    description: "BSAA Chris Redfield enlists the help of government agent Leon S. Kennedy and Professor Rebecca Chambers from the Alexander Institute of Biotechnology to stop a death merchant with a vengeance from spreading a deadly virus in New York."
  },
  {
    id: 11,
    fullTitle: "Resident Evil: Death Island",
    year: "2023",
    image: reDeathIsland,
    type: "CGI ANIMATION",
    duration: "91 MIN",
    ageRating: "16",
    ratings: {
      imdb: "5.7/10",
      rotten: "67%",
      metacritic: "50/100"
    },
    whereToWatch: ["Prime Video", "Apple TV", "YouTube"],
    description: "D.S.O. agent Leon S. Kennedy is on a mission to rescue Dr. Antonio Taylor from kidnappers, when a mysterious woman thwarts his pursuit. Meanwhile, B.S.A.A. agent Chris Redfield is investigating a zombie outbreak in San Francisco, where the cause of the infection cannot be identified. The only thing the victims have in common is that they all visited Alcatraz Island recently. Following that clue, Chris and his team head to the island, where a new horror awaits them."
  }
];