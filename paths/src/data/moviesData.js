import re2002 from '../assets/images/movies/re_2002.png';
import reApocalypse from '../assets/images/movies/re_apocalypse.png';
import reDegeneration from '../assets/images/movies/re_degeneration.png';
import reRetribution from '../assets/images/movies/re_retribution.png';
import reDeathIsland from '../assets/images/movies/re_death_island.png';

export const movies = [
  {
    id: 1,
    title: "RESIDENT EVIL",
    subtitle: "GENESIS",
    fullTitle: "Resident Evil: O Hóspede Maldito",
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
    description: "Um vírus mortal é liberado em um laboratório secreto de engenharia genética conhecido como 'A Colmeia', controlado por um supercomputador chamado Rainha Vermelha. A Umbrella Corporation envia uma equipe militar de elite para conter a ameaça, encontrando no caminho Alice, uma agente de segurança desmemoriada que se junta ao grupo para sobreviver à horda de mortos-vivos e criaturas mutantes."
  },
  {
    id: 2,
    title: "RESIDENT EVIL @",
    subtitle: "APOCALYPSE",
    fullTitle: "Resident Evil: Apocalipse",
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
    description: "O T-vírus se espalha para além da Colmeia e infecta toda a cidade de Raccoon City. A Umbrella Corporation sela as saídas para conter o surto, isolando os sobreviventes. Alice acorda em um hospital deserto, agora com habilidades sobre-humanas após ser modificada geneticamente. Ela une forças com Jill Valentine e o mercenário Carlos Oliveira para resgatar a filha de um cientista em troca de uma rota de fuga antes que a cidade seja destruída por um ataque nuclear. No entanto, eles devem enfrentar o terrível projeto Nemesis, uma arma biológica implacável criada pela Umbrella."
  },
  {
    id: 3,
    title: "RESIDENT EVIL",
    subtitle: "DEGENERATION",
    fullTitle: "Resident Evil: Degeneração",
    year: "2008",
    image: reDegeneration,
    type: "CGI ANIMATION",
    duration: "96 MIN",
    ageRating: "14",
    ratings: {
      imdb: "6.4/10",
      rotten: "57%",
      metacritic: "N/A"
    },
    whereToWatch: ["Prime Video", "Apple TV", "Google Play"],
    description: "Sete anos após o desastre de Raccoon City, um ataque bioterrorista com o T-vírus ocorre em um movimentado aeroporto nos Estados Unidos. A ativista Claire Redfield, presente no local, se depara com a infestação de zumbis. O agente federal Leon S. Kennedy é enviado para liderar a equipe de resposta tática do governo e resgatar os civis encurralados. À medida que investigam os responsáveis pelo ataque, eles descobrem uma conspiração envolvendo a venda clandestina do vírus por corporações farmacêuticas rivais da falida Umbrella."
  },
  {
    id: 4,
    title: "RESIDENT EVIL",
    subtitle: "RETRIBUTION",
    fullTitle: "Resident Evil: Retribuição",
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
    description: "Alice acorda dentro da maior e mais secreta instalação de testes da Umbrella Corporation. Sem aliados aparentes, ela precisa navegar por simulações detalhadas de surtos virais em Tóquio, Nova York, Moscou e subúrbios americanos. Com a ajuda inesperada de antigos inimigos e novos aliados, incluindo Ada Wong e Leon S. Kennedy, Alice luta para escapar do complexo fortificado sob o controle da hostil Rainha Vermelha, enquanto descobre segredos profundos sobre seu próprio passado."
  },
  {
    id: 5,
    title: "RESIDENT EVIL",
    subtitle: "DEATH ISLAND",
    fullTitle: "Resident Evil: Ilha da Morte",
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
    description: "O agente federal Leon S. Kennedy está em uma missão para resgatar o sequestrado Dr. Antonio Taylor, enquanto o agente da BSAA Chris Redfield investiga um surto de zumbis em São Francisco. Suas pistas convergem para a ilha de Alcatraz, onde um novo vilão planeja desencadear uma infecção em massa usando drones de transmissão viral. Pela primeira vez na franquia, os lendários protagonists Leon, Chris, Jill Valentine, Claire Redfield e Rebecca Chambers unem forças na lendária prisão para impedir a aniquilação global."
  }
];
