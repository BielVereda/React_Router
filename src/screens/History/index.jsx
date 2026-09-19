import { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import umbrellaLogo from '../../assets/images/brand/umbrella-logo.png';

export default function History() {
    const [activeTab, setActiveTab] = useState('games'); // 'games' or 'movies'

    const timelineEvents = [
        {
            year: '1960',
            title: 'Fundação da Umbrella Corporation',
            description: 'A Umbrella Corporation é fundada por Oswell E. Spencer, Edward Ashford e James Marcus como uma empresa farmacêutica aparentemente legítima.',
            type: 'founding'
        },
        {
            year: '1968',
            title: 'Morte de Edward Ashford',
            description: 'Edward Ashford morre, deixando Spencer e Marcus como os principais líderes da Umbrella.',
            type: 'death'
        },
        {
            year: '1978',
            title: 'Descoberta do Vírus Progenitor',
            description: 'James Marcus descobre o Vírus Progenitor na África e começa as pesquisas que levariam ao T-Virus.',
            type: 'discovery'
        },
        {
            year: '1988',
            title: 'Assassinato de Marcus',
            description: 'Spencer ordena o assassinato de Marcus, assumindo controle total sobre os projetos de BOWs.',
            type: 'death'
        },
        {
            year: '1996',
            title: 'Incidente no Laboratório Arklay',
            description: 'Albert Wesker e William Birkin assumem o laboratório após a morte de Marcus e continuam as pesquisas.',
            type: 'event'
        },
        {
            year: '1998',
            title: 'Incidente em Raccoon City',
            description: 'O T-Virus vaza em Raccoon City, causando o catastrófico incidente que destrói a cidade e dá início à saga.',
            type: 'major'
        },
        {
            year: '1998',
            title: 'Resident Evil 1',
            description: 'Equipe S.T.A.R.S. Bravo investiga o Laboratório Arklay. Chris Redfield, Jill Valentine e outros sobreviventes enfrentam os horrores da Mansão Spencer.',
            type: 'game'
        },
        {
            year: '1998',
            title: 'Resident Evil 2',
            description: 'Leon S. Kennedy e Claire Redfield tentam escapar de Raccoon City infestada por zumbis.',
            type: 'game'
        },
        {
            year: '1998',
            title: 'Resident Evil 3',
            description: 'Jill Valentine tenta escapar de Raccoon City antes da destruição nuclear, perseguida pelo Nemesis.',
            type: 'game'
        },
        {
            year: '2002',
            title: 'Resident Evil 4',
            description: 'Leon S. Kennedy investiga o sequestro da filha do presidente em uma remota região europeia, enfrentando o culto Los Illuminados.',
            type: 'game'
        },
        {
            year: '2005',
            title: 'Resident Evil 5',
            description: 'Chris Redfield e Sheva Alomar investigam o bioterrorismo na África, enfrentando Albert Wesker.',
            type: 'game'
        },
        {
            year: '2013',
            title: 'Resident Evil 6',
            description: 'Um ataque bioterrorista global envolve múltiplos personagens em uma crise mundial.',
            type: 'game'
        },
        {
            year: '2017',
            title: 'Resident Evil 7',
            description: 'Ethan Winters busca sua esposa em uma Louisiana rural, enfrentando a família Baker.',
            type: 'game'
        },
        {
            year: '2021',
            title: 'Resident Evil Village',
            description: 'Ethan Winters enfrenta novos horrores em uma misteriosa vila europeia.',
            type: 'game'
        }
    ];

    const aliceMovies = [
        {
            year: '2002',
            title: 'Resident Evil (2002)',
            description: 'Alice acorda sem memória no Laboratório Colmeia e enfrenta o T-Virus pela primeira vez.',
            canon: false,
            mainCharacters: ['Alice', 'Matt Addison', 'Rain Ocampo']
        },
        {
            year: '2004',
            title: 'Resident Evil: Apocalypse (2004)',
            description: 'Alice retorna a Raccoon City para ajudar sobreviventes a escapar da destruição da cidade.',
            canon: false,
            mainCharacters: ['Alice', 'Jill Valentine', 'Carlos Oliveira']
        },
        {
            year: '2007',
            title: 'Resident Evil: Extinction (2007)',
            description: 'Alice em um mundo pós-apocalíptico onde o T-Virus já destruiu a civilização.',
            canon: false,
            mainCharacters: ['Alice', 'Claire Redfield', 'Albert Wesker']
        },
        {
            year: '2010',
            title: 'Resident Evil: Afterlife (2010)',
            description: 'Alice continua sua batalha contra a Umbrella em Los Angeles.',
            canon: false,
            mainCharacters: ['Alice', 'Claire Redfield', 'Chris Redfield']
        },
        {
            year: '2012',
            title: 'Resident Evil: Retribution (2012)',
            description: 'Alice está presa em uma instalação subterrânea da Umbrella.',
            canon: false,
            mainCharacters: ['Alice', 'Ada Wong', 'Albert Wesker']
        },
        {
            year: '2016',
            title: 'Resident Evil: The Final Chapter (2016)',
            description: 'Alice retorna à origem em Raccoon City para o confronto final com a Umbrella.',
            canon: false,
            mainCharacters: ['Alice', 'Albert Wesker', 'Dr. Alexander Isaacs']
        }
    ];

    return (
        <div className="history-page fade-in">
            {/* Header */}
            <header className="history-header">
                <div className="history-header-left">
                    <img src={umbrellaLogo} alt="Umbrella" className="history-umbrella-logo" />
                    <div className="history-title-block">
                        <h1 className="history-title">RESIDENT EVIL ARCHIVE</h1>
                        <p className="history-subtitle">COMPLETE TIMELINE & LORE DATABASE</p>
                    </div>
                </div>
                <div className="history-header-right">
                    <Link to="/" className="history-back-btn">◀ RETURN TO TERMINAL</Link>
                </div>
            </header>

            {/* Tab Navigation */}
            <div className="history-tabs">
                <button
                    className={`history-tab ${activeTab === 'games' ? 'active' : ''}`}
                    onClick={() => setActiveTab('games')}
                >
                    MAIN TIMELINE
                </button>
                <button
                    className={`history-tab ${activeTab === 'movies' ? 'active' : ''}`}
                    onClick={() => setActiveTab('movies')}
                >
                    ALICE MOVIES (NON-CANON)
                </button>
            </div>

            {/* Content */}
            <main className="history-content">
                {activeTab === 'games' ? (
                    <div className="timeline-section">
                        <div className="timeline-header">
                            <h2>OFFICIAL TIMELINE</h2>
                            <p>Chronological events from the main Resident Evil series</p>
                        </div>
                        <div className="timeline-container">
                            {timelineEvents.map((event, index) => (
                                <div key={index} className={`timeline-item ${event.type}`}>
                                    <div className="timeline-year">{event.year}</div>
                                    <div className="timeline-content">
                                        <h3 className="timeline-title">{event.title}</h3>
                                        <p className="timeline-description">{event.description}</p>
                                        <span className={`timeline-badge ${event.type}`}>
                                            {event.type.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="movies-section">
                        <div className="movies-header">
                            <h2>ALICE MOVIE TIMELINE</h2>
                            <p className="movies-warning">
                                ⚠️ NON-CANON: These events are not part of the official Resident Evil storyline
                            </p>
                        </div>
                        <div className="movies-container">
                            {aliceMovies.map((movie, index) => (
                                <div key={index} className="movie-card">
                                    <div className="movie-year">{movie.year}</div>
                                    <div className="movie-content">
                                        <h3 className="movie-title">{movie.title}</h3>
                                        <p className="movie-description">{movie.description}</p>
                                        <div className="movie-characters">
                                            <span className="movie-characters-label">Main Characters:</span>
                                            {movie.mainCharacters.map((char, charIndex) => (
                                                <span key={charIndex} className="movie-character-tag">
                                                    {char}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="movie-canon-badge">NON-CANON</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}