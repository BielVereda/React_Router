import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Phaser from 'phaser';
import './style.css';
import umbrellaLogo from '../../assets/images/brand/umbrella-logo.png';
import { BootScene, TitleScene, MainScene, WeskerScene, GameOverScene, VictoryScene } from './PhaserGame';

export default function AliceGame() {
    const [gameStarted, setGameStarted] = useState(false);
    const [showHud, setShowHud] = useState(false);
    const canvasRef = useRef(null);
    const gameRef = useRef(null);
    
    // Estado do HUD
    const [gameStats, setGameStats] = useState({
        health: 100,
        ammo: 30,
        score: 0,
        level: 1
    });

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/games/alice-game.zip';
        link.download = 'Resident_Evil_Alice_Chronicles.zip';
        link.click();
    };

    const startBrowserGame = () => {
        setGameStarted(true);
    };

    useEffect(() => {
        if (gameStarted && canvasRef.current && !gameRef.current) {
            // Configurar e iniciar o jogo Phaser com resolução fixa de 800x600
            const config = {
                type: Phaser.AUTO,
                width: 800,
                height: 600,
                parent: canvasRef.current,
                backgroundColor: '#0a0005',
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: { y: 0 },
                        debug: false
                    }
                },
                scene: [BootScene, TitleScene, MainScene, WeskerScene, GameOverScene, VictoryScene]
            };
            
            gameRef.current = new Phaser.Game(config);
            
            // Configurar comunicação para atualizar HUD
            window.updateGameStats = (stats) => {
                setGameStats(prev => ({ ...prev, ...stats }));
            };

            // Controlar visibilidade do HUD HTML
            window.setGameHudVisible = (visible) => {
                setShowHud(visible);
            };
        }

        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
            window.updateGameStats = null;
            window.setGameHudVisible = null;
            setShowHud(false);
        };
    }, [gameStarted]);

    return (
        <div className="alice-game-page fade-in">
            {/* Background effects */}
            <div className="alice-game-bg" />
            <div className="alice-game-scanlines" />

            {/* Header */}
            <header className="alice-game-header">
                <div className="alice-game-header-left">
                    <img src={umbrellaLogo} alt="Umbrella" className="alice-game-logo" />
                    <div className="alice-game-title-block">
                        <h1 className="alice-game-title">PROJECT: ALICE</h1>
                        <p className="alice-game-subtitle">CLASSIFIED — UMBRELLA TERMINAL</p>
                    </div>
                </div>
                <div className="alice-game-header-right">
                    {gameStarted && (
                        <button 
                            className="alice-game-back-btn" 
                            onClick={() => {
                                setGameStarted(false);
                                setShowHud(false);
                            }}
                            style={{ cursor: 'pointer', background: 'rgba(255, 0, 64, 0.15)' }}
                        >
                            ◀ MENU INICIAL
                        </button>
                    )}
                    <Link to="/" className="alice-game-back-btn">◀ ABORT MISSION</Link>
                </div>
            </header>

            {!gameStarted ? (
                <main className="alice-game-content">
                    {/* Game Info */}
                    <div className="alice-game-info">
                        <div className="alice-game-warning">
                            <span className="warning-icon">⚠</span>
                            <span>CLASSIFIED PROJECT — AUTHORIZED PERSONNEL ONLY</span>
                        </div>

                        <h2 className="alice-game-story-title">RESIDENT EVIL: ALICE CHRONICLES</h2>
                        <p className="alice-game-story">
                            A continuação definitiva da saga de Alice. Após os eventos de The Final Chapter, 
                            Alice descobre que Albert Wesker sobreviveu e está reconstruindo a Umbrella Corporation 
                            com um novo e terrível plano. Com poderes aprimorados e novos aliados, Alice deve 
                            impedir que a humanidade seja novamente ameaçada pelos horrores biológicos.
                        </p>

                        <div className="alice-game-features">
                            <div className="feature-item">
                                <span className="feature-icon">🎮</span>
                                <div className="feature-text">
                                    <h3>Controle a Alice</h3>
                                    <p>Experiência completa com a protagonista icônica</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🦠</span>
                                <div className="feature-text">
                                    <h3>Novos BOWs</h3>
                                    <p>Enfrente monstros nunca antes vistos</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">🏢</span>
                                <div className="feature-text">
                                    <h3>Locais Clássicos</h3>
                                    <p>Retorne a locais icônicos da série</p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <span className="feature-icon">👤</span>
                                <div className="feature-text">
                                    <h3>Volta do Wesker</h3>
                                    <p>O antagonista final retorna mais poderoso</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Play Options */}
                    <div className="alice-game-options">
                        <h2 className="options-title">SELECT DEPLOYMENT METHOD</h2>
                        
                        <div className="options-grid">
                            <div className="option-card">
                                <div className="option-icon">💻</div>
                                <h3 className="option-title">DOWNLOAD VERSION</h3>
                                <p className="option-description">
                                    Download completo para PC. Melhor performance e gráficos.
                                </p>
                                <div className="option-specs">
                                    <span className="spec-item">Windows 10+</span>
                                    <span className="spec-item">8GB RAM</span>
                                    <span className="spec-item">5GB Space</span>
                                </div>
                                <button 
                                    className="option-btn primary"
                                    onClick={handleDownload}
                                >
                                    📥 DOWNLOAD NOW
                                </button>
                            </div>

                            <div className="option-card">
                                <div className="option-icon">🌐</div>
                                <h3 className="option-title">BROWSER VERSION</h3>
                                <p className="option-description">
                                    Jogue diretamente no navegador. Sem download necessário.
                                </p>
                                <div className="option-specs">
                                    <span className="spec-item">Chrome/Firefox</span>
                                    <span className="spec-item">4GB RAM</span>
                                    <span className="spec-item">WebGL Required</span>
                                </div>
                                <button 
                                    className="option-btn secondary"
                                    onClick={startBrowserGame}
                                >
                                    🎮 PLAY IN BROWSER
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            ) : (
                <main className="alice-game-viewport">
                    <div className="game-container">
                        <div 
                            id="phaser-game-container"
                            ref={canvasRef}
                        >
                            {/* HUD HTML sobreposto perfeitamente ao canvas do jogo */}
                            {showHud && (
                                <div className="game-hud">
                                    <div className="hud-item">
                                        <span className="hud-label">SAÚDE:</span>
                                        <span className="hud-value">{gameStats.health}%</span>
                                    </div>
                                    <div className="hud-item">
                                        <span className="hud-label">MUNIÇÃO:</span>
                                        <span className="hud-value">{gameStats.ammo}</span>
                                    </div>
                                    <div className="hud-item">
                                        <span className="hud-label">PONTUAÇÃO:</span>
                                        <span className="hud-value">{gameStats.score}</span>
                                    </div>
                                    <div className="hud-item">
                                        <span className="hud-label">NÍVEL:</span>
                                        <span className="hud-value">{gameStats.level}</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            )}

            {/* Footer */}
            <footer className="alice-game-footer">
                <p>© 2024 UMBRELLA CORPORATION — CLASSIFIED PROJECT</p>
                <p className="footer-warning">UNAUTHORIZED ACCESS WILL BE PROSECUTED</p>
            </footer>
        </div>
    );
}