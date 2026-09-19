import Phaser from 'phaser';

// Resident Evil: Alice Chronicles - Phaser 3 Engine
// Controle de Alice com WASD e disparo exclusivo com a tecla ESPAÇO

// ─── BootScene ────────────────────────────────────────────────────────────────
class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene');
    }

    create() {
        this.createAliceTexture();
        this.createZombieTexture();
        this.createHunterTexture();
        this.createWeskerTexture();
        this.createBulletTexture();
        this.createEnemyBulletTexture();
        this.createPowerUpTextures();

        this.scene.start('TitleScene');
    }

    createAliceTexture() {
        if (this.textures.exists('alice')) return;
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        
        // Sombra
        g.fillStyle(0x000000, 0.4);
        g.fillCircle(18, 24, 11);

        // Corpo tático cinza
        g.fillStyle(0x444444, 1);
        g.fillCircle(18, 18, 12);
        g.fillStyle(0x222222, 1);
        g.fillRect(12, 13, 12, 10);

        // Cabeça
        g.fillStyle(0xffd8b0, 1);
        g.fillCircle(18, 18, 7);

        // Cabelo loiro de Alice
        g.fillStyle(0xe6c280, 1);
        g.fillCircle(16, 18, 8);

        // Arma apontada para a DIREITA (0 radianos)
        g.fillStyle(0x111111, 1);
        g.fillRect(22, 16, 14, 4);
        g.fillStyle(0x666666, 1);
        g.fillRect(22, 17, 6, 2);

        g.generateTexture('alice', 38, 38);
        g.destroy();
    }

    createZombieTexture() {
        if (this.textures.exists('zombie')) return;
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x4a6332, 1);
        g.fillCircle(16, 16, 13);
        g.fillStyle(0x384c25, 1);
        g.fillCircle(16, 16, 8);
        g.fillStyle(0xff0000, 1);
        g.fillCircle(20, 13, 2.5);
        g.fillCircle(20, 19, 2.5);
        g.fillStyle(0x8b0000, 0.8);
        g.fillRect(8, 14, 6, 5);

        g.generateTexture('zombie', 32, 32);
        g.destroy();
    }

    createHunterTexture() {
        if (this.textures.exists('hunter')) return;
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x1b3810, 1);
        g.fillCircle(16, 16, 14);
        g.fillStyle(0x0f2409, 1);
        g.fillTriangle(28, 16, 14, 8, 14, 24);
        g.fillStyle(0xcccccc, 1);
        g.fillTriangle(26, 6, 31, 3, 24, 10);
        g.fillTriangle(26, 26, 31, 29, 24, 22);

        g.generateTexture('hunter', 34, 34);
        g.destroy();
    }

    createWeskerTexture() {
        if (this.textures.exists('wesker')) return;
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0x151515, 1);
        g.fillCircle(20, 20, 15);
        g.fillStyle(0x000000, 1);
        g.fillRect(10, 14, 20, 12);
        g.fillStyle(0xffdbac, 1);
        g.fillCircle(20, 20, 8);
        g.fillStyle(0xd4af37, 1);
        g.fillCircle(18, 20, 8);
        g.fillStyle(0x050505, 1);
        g.fillRect(20, 18, 6, 4);
        g.lineStyle(2, 0xff0000, 0.6);
        g.strokeCircle(20, 20, 19);

        g.generateTexture('wesker', 40, 40);
        g.destroy();
    }

    createBulletTexture() {
        if (this.textures.exists('bullet')) return;
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xffea00, 1);
        g.fillCircle(4, 4, 3.5);
        g.fillStyle(0xffffff, 1);
        g.fillCircle(3.5, 3.5, 1.5);
        g.generateTexture('bullet', 8, 8);
        g.destroy();
    }

    createEnemyBulletTexture() {
        if (this.textures.exists('enemyBullet')) return;
        const g = this.make.graphics({ x: 0, y: 0, add: false });
        g.fillStyle(0xff1100, 1);
        g.fillCircle(5, 5, 4.5);
        g.fillStyle(0xff8888, 1);
        g.fillCircle(5, 5, 2);
        g.generateTexture('enemyBullet', 10, 10);
        g.destroy();
    }

    createPowerUpTextures() {
        if (!this.textures.exists('health')) {
            const hg = this.make.graphics({ x: 0, y: 0, add: false });
            hg.fillStyle(0x00cc44, 0.9);
            hg.fillRoundedRect(2, 2, 28, 28, 6);
            hg.lineStyle(2, 0xffffff, 1);
            hg.strokeRoundedRect(2, 2, 28, 28, 6);
            hg.fillStyle(0xffffff, 1);
            hg.fillRect(13, 7, 6, 18);
            hg.fillRect(7, 13, 18, 6);
            hg.generateTexture('health', 32, 32);
            hg.destroy();
        }

        if (!this.textures.exists('ammo')) {
            const ag = this.make.graphics({ x: 0, y: 0, add: false });
            ag.fillStyle(0xd4af37, 0.95);
            ag.fillRoundedRect(2, 4, 28, 24, 4);
            ag.lineStyle(2, 0x553300, 1);
            ag.strokeRoundedRect(2, 4, 28, 24, 4);
            ag.fillStyle(0x222222, 1);
            ag.fillRect(6, 12, 20, 6);
            ag.fillStyle(0xffffff, 1);
            ag.fillRect(8, 13, 4, 4);
            ag.fillRect(14, 13, 4, 4);
            ag.fillRect(20, 13, 4, 4);
            ag.generateTexture('ammo', 32, 32);
            ag.destroy();
        }
    }
}

// ─── TitleScene ───────────────────────────────────────────────────────────────
class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene');
    }

    create() {
        // Garantir que o HUD HTML esteja oculto na tela de início
        if (window.setGameHudVisible) {
            window.setGameHudVisible(false);
        }

        this.add.rectangle(400, 300, 800, 600, 0x100005);

        // Grade de fundo
        const g = this.add.graphics();
        g.lineStyle(1, 0x400015, 0.35);
        for (let x = 0; x <= 800; x += 40) {
            g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 600); g.strokePath();
        }
        for (let y = 0; y <= 600; y += 40) {
            g.beginPath(); g.moveTo(0, y); g.lineTo(800, y); g.strokePath();
        }

        // Títulos mais compactos e bem posicionados
        this.add.text(400, 80, 'RESIDENT EVIL', {
            fontSize: '36px',
            color: '#ff0033',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 5
        }).setOrigin(0.5);

        this.add.text(400, 122, 'ALICE CHRONICLES', {
            fontSize: '22px',
            color: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        this.drawUmbrellaLogo(400, 220);

        // Quadro de controles centralizado
        const controlsBox = this.add.graphics();
        controlsBox.fillStyle(0x20000a, 0.9);
        controlsBox.lineStyle(1.5, 0xff0044, 0.8);
        controlsBox.fillRoundedRect(140, 335, 520, 64, 8);
        controlsBox.strokeRoundedRect(140, 335, 520, 64, 8);

        this.add.text(400, 350, 'CONTROLES DE COMBATE', {
            fontSize: '11px',
            color: '#ff4466',
            fontStyle: 'bold',
            letterSpacing: 2
        }).setOrigin(0.5);

        this.add.text(400, 375, 'WASD ou SETAS = Mover Alice   |   ESPAÇO = Atirar', {
            fontSize: '15px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        // Prompt de início
        const startPrompt = this.add.text(400, 450, 'Pressione ESPAÇO para Jogar', {
            fontSize: '22px',
            color: '#00ff66',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        this.tweens.add({
            targets: startPrompt,
            alpha: 0.25,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        // Início direto do jogo
        const launchGame = () => {
            this.scene.start('MainScene');
        };

        this.input.keyboard.once('keydown-SPACE', launchGame);
        this.input.keyboard.once('keydown-ENTER', launchGame);
        this.input.once('pointerdown', launchGame);
    }

    drawUmbrellaLogo(x, y) {
        const g = this.add.graphics();
        g.lineStyle(3, 0xff0033, 1);
        g.beginPath();
        g.arc(x, y - 25, 45, Math.PI, 0, false);
        g.strokePath();

        for (let i = -35; i <= 35; i += 18) {
            g.lineStyle(2, 0xff0033, 0.9);
            g.beginPath();
            g.moveTo(x + i, y - 25);
            g.lineTo(x + i * 0.35, y + 20);
            g.strokePath();
        }

        g.lineStyle(4, 0x880022, 1);
        g.beginPath();
        g.moveTo(x, y + 20);
        g.lineTo(x, y + 55);
        g.strokePath();

        g.lineStyle(3, 0xff0033, 1);
        g.strokeCircle(x, y + 65, 10);
        g.fillStyle(0xff0033, 1);
        g.lineStyle(0);
        g.beginPath();
        g.arc(x, y + 65, 6, Math.PI, 0, false);
        g.fillPath();
    }
}

// ─── MainScene ────────────────────────────────────────────────────────────────
class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    create() {
        if (window.setGameHudVisible) {
            window.setGameHudVisible(true);
        }

        const WORLD_W = 1600;
        const WORLD_H = 1200;
        const WALL_INSET = 65;

        this.physics.world.setBounds(WALL_INSET, WALL_INSET, WORLD_W - WALL_INSET * 2, WORLD_H - WALL_INSET * 2);
        this.cameras.main.setBounds(0, 0, WORLD_W, WORLD_H);
        this.cameras.main.setBackgroundColor('#141416');

        this.createLabBackground(WORLD_W, WORLD_H);

        // Paredes físicas estáticas impenetráveis nos 4 lados
        this.walls = this.physics.add.staticGroup();
        this.walls.add(this.add.rectangle(WORLD_W / 2, 30, WORLD_W, 60, 0x000000, 0));
        this.walls.add(this.add.rectangle(WORLD_W / 2, WORLD_H - 30, WORLD_W, 60, 0x000000, 0));
        this.walls.add(this.add.rectangle(30, WORLD_H / 2, 60, WORLD_H, 0x000000, 0));
        this.walls.add(this.add.rectangle(WORLD_W - 30, WORLD_H / 2, 60, WORLD_H, 0x000000, 0));

        // Jogador — Alice
        this.player = this.physics.add.sprite(WORLD_W / 2, WORLD_H / 2, 'alice');
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(10);

        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);

        // Variáveis
        this.playerHealth = 100;
        this.playerAmmo = 30;
        this.score = 0;
        this.level = 1;
        this.isDead = false;
        this.facingAngle = 0;
        this.lastShotTime = 0;
        this.lastDamageTime = 0;
        this.levelTransitioning = false;

        // Grupos
        this.bullets = this.physics.add.group();
        this.enemies = this.physics.add.group();
        this.powerUps = this.physics.add.group();

        this.spawnEnemies(6);
        this.spawnPowerUps(WORLD_W, WORLD_H);

        // Controles
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            w: Phaser.Input.Keyboard.KeyCodes.W,
            a: Phaser.Input.Keyboard.KeyCodes.A,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            d: Phaser.Input.Keyboard.KeyCodes.D
        });
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Colisões com inimigos, tiros e com as paredes
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.enemies, this.walls);
        this.physics.add.collider(this.bullets, this.walls, (b) => b.destroy());

        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitEnemy, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.playerHitEnemy, null, this);
        this.physics.add.overlap(this.player, this.powerUps, this.collectPowerUp, null, this);

        this.showMissionBanner('MISSÃO 01: ELIMINE OS INFECTADOS NO LABORATÓRIO\n[ ESPAÇO: Atirar | WASD: Mover ]');
        this.syncHud();
    }

    showMissionBanner(text) {
        const banner = this.add.text(400, 70, text, {
            fontSize: '16px',
            color: '#00ffcc',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3,
            align: 'center'
        }).setScrollFactor(0).setDepth(300).setOrigin(0.5);

        this.tweens.add({
            targets: banner,
            alpha: 0,
            duration: 1500,
            delay: 3500,
            onComplete: () => banner.destroy()
        });
    }

    createLabBackground(W, H) {
        const g = this.add.graphics();
        // Piso
        g.fillStyle(0x181a20, 1);
        g.fillRect(0, 0, W, H);

        // Grade de piso metálico
        g.lineStyle(1, 0x262a36, 0.7);
        for (let x = 60; x <= W - 60; x += 64) {
            g.beginPath(); g.moveTo(x, 60); g.lineTo(x, H - 60); g.strokePath();
        }
        for (let y = 60; y <= H - 60; y += 64) {
            g.beginPath(); g.moveTo(60, y); g.lineTo(W - 60, y); g.strokePath();
        }

        // Paredes externas sólidas (60px de espessura)
        g.fillStyle(0x0a0b0e, 1);
        g.fillRect(0, 0, W, 60);
        g.fillRect(0, H - 60, W, 60);
        g.fillRect(0, 0, 60, H);
        g.fillRect(W - 60, 0, 60, H);

        // Borda de contenção em laser vermelho
        g.lineStyle(4, 0xff0044, 0.95);
        g.strokeRect(60, 60, W - 120, H - 120);

        // Sinalizadores de perigo nos cantos
        g.fillStyle(0xff0033, 1);
        g.fillCircle(60, 60, 6);
        g.fillCircle(W - 60, 60, 6);
        g.fillCircle(60, H - 60, 6);
        g.fillCircle(W - 60, H - 60, 6);

        // Tubulações internas
        g.lineStyle(6, 0x2d3a22, 0.7);
        for (let y = 220; y < H - 160; y += 280) {
            g.beginPath(); g.moveTo(60, y); g.lineTo(W - 60, y); g.strokePath();
        }
    }

    spawnEnemies(count) {
        for (let i = 0; i < count; i++) {
            let x, y, attempts = 0;
            do {
                x = Phaser.Math.Between(120, 1480);
                y = Phaser.Math.Between(120, 1080);
                attempts++;
            } while (
                Phaser.Math.Distance.Between(x, y, this.player.x, this.player.y) < 220 &&
                attempts < 25
            );

            const isHunter = this.level >= 2 && Phaser.Math.Between(0, 2) === 1;
            const texture = isHunter ? 'hunter' : 'zombie';
            const hp = isHunter ? 50 : 30;
            const spd = isHunter ? 65 : 40;

            const enemy = this.enemies.create(x, y, texture);
            enemy.setData('health', hp);
            enemy.setData('speed', spd);
            enemy.setCollideWorldBounds(true);
            enemy.setDepth(5);
        }
    }

    spawnPowerUps(W, H) {
        const hp = this.powerUps.create(Phaser.Math.Between(150, W - 150), Phaser.Math.Between(150, H - 150), 'health');
        hp.setData('type', 'health');

        const ammo = this.powerUps.create(Phaser.Math.Between(150, W - 150), Phaser.Math.Between(150, H - 150), 'ammo');
        ammo.setData('type', 'ammo');
    }

    syncHud() {
        if (window.updateGameStats) {
            window.updateGameStats({
                health: Math.max(0, this.playerHealth),
                ammo: this.playerAmmo,
                score: this.score,
                level: this.level
            });
        }
    }

    update() {
        if (this.isDead) return;

        const speed = 160;
        let vx = 0, vy = 0;

        if (this.cursors.left.isDown  || this.wasd.a.isDown) vx = -speed;
        if (this.cursors.right.isDown || this.wasd.d.isDown) vx =  speed;
        if (this.cursors.up.isDown    || this.wasd.w.isDown) vy = -speed;
        if (this.cursors.down.isDown  || this.wasd.s.isDown) vy =  speed;

        if (vx !== 0 || vy !== 0) {
            this.facingAngle = Math.atan2(vy, vx);
            this.player.setRotation(this.facingAngle);
        }

        if (vx !== 0 && vy !== 0) {
            vx *= 0.707;
            vy *= 0.707;
        }
        this.player.setVelocity(vx, vy);

        // Trava matemática de segurança: impede fisicamente Alice de atravessar as paredes (60px)
        const boundMinX = 80;
        const boundMaxX = 1600 - 80;
        const boundMinY = 80;
        const boundMaxY = 1200 - 80;

        if (this.player.x < boundMinX) { this.player.x = boundMinX; this.player.setVelocityX(0); }
        if (this.player.x > boundMaxX) { this.player.x = boundMaxX; this.player.setVelocityX(0); }
        if (this.player.y < boundMinY) { this.player.y = boundMinY; this.player.setVelocityY(0); }
        if (this.player.y > boundMaxY) { this.player.y = boundMaxY; this.player.setVelocityY(0); }

        // TIRO COM ESPAÇO
        if (this.spaceKey.isDown) {
            if (this.time.now - this.lastShotTime > 220) {
                this.shoot();
            }
        }

        this.enemies.getChildren().forEach(enemy => {
            if (!enemy.active) return;
            const angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y);
            const spd = enemy.getData('speed') || 40;
            enemy.setVelocity(Math.cos(angle) * spd, Math.sin(angle) * spd);
            enemy.setRotation(angle);
        });

        this.bullets.getChildren().forEach(bullet => {
            if (!bullet.active) return;
            if (bullet.x < 0 || bullet.x > 1600 || bullet.y < 0 || bullet.y > 1200) {
                bullet.destroy();
            }
        });

        if (this.enemies.countActive() === 0 && !this.levelTransitioning) {
            this.levelTransitioning = true;
            this.time.delayedCall(600, () => {
                this.levelTransitioning = false;
                this.nextLevel();
            });
        }
    }

    shoot() {
        if (this.playerAmmo <= 0 || this.isDead) return;
        this.lastShotTime = this.time.now;
        this.playerAmmo--;

        const bullet = this.bullets.create(this.player.x, this.player.y, 'bullet');
        bullet.setVelocity(Math.cos(this.facingAngle) * 700, Math.sin(this.facingAngle) * 700);
        bullet.setDepth(8);

        this.cameras.main.flash(35, 70, 70, 70);
        this.syncHud();
    }

    bulletHitEnemy(bullet, enemy) {
        if (!bullet.active || !enemy.active) return;
        bullet.destroy();

        const hp = enemy.getData('health') - 10;
        enemy.setData('health', hp);
        enemy.setTint(0xff0033);
        this.time.delayedCall(70, () => { if (enemy.active) enemy.clearTint(); });

        if (hp <= 0) {
            this.createBloodParticles(enemy.x, enemy.y);
            enemy.destroy();
            this.score += 100;
            this.syncHud();
        }
    }

    playerHitEnemy(player, enemy) {
        if (!enemy.active || this.isDead) return;
        if (this.time.now - this.lastDamageTime < 750) return;
        this.lastDamageTime = this.time.now;

        this.playerHealth -= 14;
        this.cameras.main.flash(100, 200, 0, 0);
        this.syncHud();

        const angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, player.x, player.y);
        player.setVelocity(Math.cos(angle) * 260, Math.sin(angle) * 260);

        if (this.playerHealth <= 0) {
            this.isDead = true;
            this.time.delayedCall(400, () => this.scene.start('GameOverScene'));
        }
    }

    collectPowerUp(player, powerUp) {
        if (!powerUp.active) return;
        const type = powerUp.getData('type');
        if (type === 'health') {
            this.playerHealth = Math.min(100, this.playerHealth + 30);
        } else if (type === 'ammo') {
            this.playerAmmo += 15;
        }
        powerUp.destroy();
        this.syncHud();
    }

    createBloodParticles(x, y) {
        const emitter = this.add.particles(x, y, 'zombie', {
            speed: { min: 40, max: 130 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.35, end: 0 },
            lifespan: 350,
            tint: 0x990000,
            quantity: 8,
            emitting: false
        });
        emitter.explode(8);
        this.time.delayedCall(500, () => { if (emitter) emitter.destroy(); });
    }

    nextLevel() {
        this.level++;
        this.syncHud();

        if (this.level >= 3) {
            const alertText = this.add.text(400, 300, '⚠ ALERTA DE INTRUSÃO MÁXIMA ⚠\nALBERT WESKER DETECTADO NO SETOR FINAL!', {
                fontSize: '24px',
                color: '#ff0033',
                fontStyle: 'bold',
                stroke: '#000000',
                strokeThickness: 4,
                align: 'center'
            }).setScrollFactor(0).setDepth(400).setOrigin(0.5);

            this.cameras.main.flash(500, 255, 0, 0);

            this.time.delayedCall(2200, () => {
                alertText.destroy();
                this.scene.start('WeskerScene');
            });
        } else {
            this.showMissionBanner(`NÍVEL ${this.level} — HUNTERS DETECTADOS NO SETOR!`);
            this.spawnEnemies(8);
            this.spawnPowerUps(1600, 1200);
        }
    }
}

// ─── WeskerScene ──────────────────────────────────────────────────────────────
class WeskerScene extends Phaser.Scene {
    constructor() {
        super('WeskerScene');
    }

    create() {
        if (window.setGameHudVisible) {
            window.setGameHudVisible(true);
        }

        this.physics.world.setBounds(0, 0, 800, 600);
        this.cameras.main.setBounds(0, 0, 800, 600);

        this.add.rectangle(400, 300, 800, 600, 0x180005);
        const g = this.add.graphics();
        g.lineStyle(1, 0x550015, 0.45);
        for (let x = 0; x <= 800; x += 50) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, 600); g.strokePath(); }
        for (let y = 0; y <= 600; y += 50) { g.beginPath(); g.moveTo(0, y); g.lineTo(800, y); g.strokePath(); }

        this.player = this.physics.add.sprite(160, 300, 'alice');
        this.player.setCollideWorldBounds(true);
        this.player.setDepth(10);
        this.playerHealth = 100;
        this.isDead = false;
        this.facingAngle = 0;
        this.lastShotTime = 0;
        this.lastDamageTime = 0;

        this.wesker = this.physics.add.sprite(640, 300, 'wesker');
        this.wesker.setCollideWorldBounds(true);
        this.wesker.setDepth(10);
        this.wesker.setData('health', 200);
        this.wesker.setData('maxHealth', 200);
        this.wesker.setData('phase', 1);

        this.playerBullets = this.physics.add.group();
        this.weskerBullets = this.physics.add.group();

        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            w: Phaser.Input.Keyboard.KeyCodes.W,
            a: Phaser.Input.Keyboard.KeyCodes.A,
            s: Phaser.Input.Keyboard.KeyCodes.S,
            d: Phaser.Input.Keyboard.KeyCodes.D
        });
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.weskerBarBg = this.add.graphics().setDepth(200);
        this.weskerBarFill = this.add.graphics().setDepth(201);
        this.weskerLabel = this.add.text(400, 16, 'ALBERT WESKER — VIRUS RESURRECTION', {
            fontSize: '14px',
            color: '#ff2222',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 3
        }).setDepth(202).setOrigin(0.5);

        this.updateWeskerBar();

        this.physics.add.overlap(this.playerBullets, this.wesker, this.bulletHitWesker, null, this);
        this.physics.add.overlap(this.weskerBullets, this.player, this.weskerBulletHitPlayer, null, this);
        this.physics.add.overlap(this.player, this.wesker, this.playerHitWesker, null, this);

        this.weskerAttackTimer = this.time.addEvent({
            delay: 1700,
            callback: this.weskerAttack,
            callbackScope: this,
            loop: true
        });

        const tip = this.add.text(400, 575, '[ WASD: Desviar   |   ESPAÇO: Atirar em Wesker ]', {
            fontSize: '13px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setDepth(202).setOrigin(0.5);

        this.tweens.add({
            targets: tip,
            alpha: 0.3,
            duration: 800,
            yoyo: true,
            repeat: -1
        });
    }

    updateWeskerBar() {
        const wHp = this.wesker.getData('health') || 0;
        const wMax = this.wesker.getData('maxHealth') || 200;
        const pct = Math.max(0, wHp) / wMax;

        this.weskerBarBg.clear();
        this.weskerBarBg.fillStyle(0x220008, 0.85);
        this.weskerBarBg.fillRect(260, 32, 280, 14);
        this.weskerBarBg.lineStyle(1.5, 0xff0044, 0.9);
        this.weskerBarBg.strokeRect(260, 32, 280, 14);

        this.weskerBarFill.clear();
        this.weskerBarFill.fillStyle(0xff0033, 1);
        this.weskerBarFill.fillRect(260, 32, Math.floor(280 * pct), 14);
    }

    update() {
        if (this.isDead) return;

        const speed = 165;
        let vx = 0, vy = 0;

        if (this.cursors.left.isDown  || this.wasd.a.isDown) vx = -speed;
        if (this.cursors.right.isDown || this.wasd.d.isDown) vx =  speed;
        if (this.cursors.up.isDown    || this.wasd.w.isDown) vy = -speed;
        if (this.cursors.down.isDown  || this.wasd.s.isDown) vy =  speed;

        if (vx !== 0 || vy !== 0) {
            this.facingAngle = Math.atan2(vy, vx);
            this.player.setRotation(this.facingAngle);
        } else if (this.wesker.active) {
            this.facingAngle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.wesker.x, this.wesker.y);
            this.player.setRotation(this.facingAngle);
        }

        if (vx !== 0 && vy !== 0) { vx *= 0.707; vy *= 0.707; }
        this.player.setVelocity(vx, vy);

        // Trava matemática para a arena do Wesker
        const wMinX = 50;
        const wMaxX = 750;
        const wMinY = 55;
        const wMaxY = 545;

        if (this.player.x < wMinX) { this.player.x = wMinX; this.player.setVelocityX(0); }
        if (this.player.x > wMaxX) { this.player.x = wMaxX; this.player.setVelocityX(0); }
        if (this.player.y < wMinY) { this.player.y = wMinY; this.player.setVelocityY(0); }
        if (this.player.y > wMaxY) { this.player.y = wMaxY; this.player.setVelocityY(0); }

        if (this.spaceKey.isDown) {
            if (this.time.now - this.lastShotTime > 220) {
                this.shoot();
            }
        }

        if (this.wesker.active) {
            const angle = Phaser.Math.Angle.Between(this.wesker.x, this.wesker.y, this.player.x, this.player.y);
            const phase = this.wesker.getData('phase') || 1;
            const wSpeed = phase === 1 ? 95 : 140;
            this.wesker.setVelocity(Math.cos(angle) * wSpeed, Math.sin(angle) * wSpeed);
            this.wesker.setRotation(angle);
        }

        [this.playerBullets, this.weskerBullets].forEach(group => {
            group.getChildren().forEach(b => {
                if (!b.active) return;
                if (b.x < 0 || b.x > 800 || b.y < 0 || b.y > 600) b.destroy();
            });
        });
    }

    shoot() {
        if (this.isDead) return;
        this.lastShotTime = this.time.now;

        const bullet = this.playerBullets.create(this.player.x, this.player.y, 'bullet');
        bullet.setVelocity(Math.cos(this.facingAngle) * 750, Math.sin(this.facingAngle) * 750);
        bullet.setDepth(8);

        this.cameras.main.flash(25, 60, 60, 60);
    }

    bulletHitWesker(bullet, wesker) {
        if (!bullet.active || !wesker.active) return;
        bullet.destroy();

        const hp = wesker.getData('health') - 6;
        wesker.setData('health', hp);
        wesker.setTint(0xff0044);
        this.time.delayedCall(70, () => { if (wesker.active) wesker.clearTint(); });

        this.updateWeskerBar();

        if (hp <= 0) {
            const phase = wesker.getData('phase');
            if (phase === 1) {
                wesker.setData('health', 150);
                wesker.setData('maxHealth', 150);
                wesker.setData('phase', 2);
                wesker.setScale(1.35);
                wesker.setTint(0xff2200);

                this.cameras.main.flash(400, 255, 30, 0);
                this.weskerLabel.setText('ALBERT WESKER — FASE FINAL: SOBRECARGA T-VIRUS');
                this.weskerAttackTimer.delay = 950;
                this.updateWeskerBar();

                this.time.delayedCall(1500, () => { if (wesker.active) wesker.clearTint(); });
            } else {
                this.weskerAttackTimer.remove();
                wesker.setActive(false).setVisible(false);
                this.scene.start('VictoryScene');
            }
        }
    }

    playerHitWesker(player, wesker) {
        if (!wesker.active || this.isDead) return;
        if (this.time.now - this.lastDamageTime < 800) return;
        this.lastDamageTime = this.time.now;

        this.playerHealth -= 16;
        this.cameras.main.flash(90, 255, 0, 0);

        if (window.updateGameStats) {
            window.updateGameStats({ health: Math.max(0, this.playerHealth) });
        }

        const angle = Phaser.Math.Angle.Between(wesker.x, wesker.y, player.x, player.y);
        player.setVelocity(Math.cos(angle) * 320, Math.sin(angle) * 320);

        if (this.playerHealth <= 0) {
            this.isDead = true;
            this.weskerAttackTimer.remove();
            this.time.delayedCall(400, () => this.scene.start('GameOverScene'));
        }
    }

    weskerBulletHitPlayer(player, bullet) {
        if (!bullet.active || this.isDead) return;
        bullet.destroy();

        this.playerHealth -= 10;
        this.cameras.main.flash(80, 255, 0, 0);

        if (window.updateGameStats) {
            window.updateGameStats({ health: Math.max(0, this.playerHealth) });
        }

        if (this.playerHealth <= 0) {
            this.isDead = true;
            this.weskerAttackTimer.remove();
            this.time.delayedCall(400, () => this.scene.start('GameOverScene'));
        }
    }

    weskerAttack() {
        if (!this.wesker.active || this.isDead) return;

        const angle = Phaser.Math.Angle.Between(this.wesker.x, this.wesker.y, this.player.x, this.player.y);
        const phase = this.wesker.getData('phase') || 1;

        if (phase === 1) {
            const b = this.weskerBullets.create(this.wesker.x, this.wesker.y, 'enemyBullet');
            b.setVelocity(Math.cos(angle) * 400, Math.sin(angle) * 400);
            b.setDepth(7);
        } else {
            [-0.25, 0, 0.25].forEach(spread => {
                const b = this.weskerBullets.create(this.wesker.x, this.wesker.y, 'enemyBullet');
                b.setVelocity(Math.cos(angle + spread) * 450, Math.sin(angle + spread) * 450);
                b.setDepth(7);
            });
        }
    }
}

// ─── GameOverScene ────────────────────────────────────────────────────────────
class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        if (window.setGameHudVisible) {
            window.setGameHudVisible(false);
        }

        this.add.rectangle(400, 300, 800, 600, 0x000000);

        this.add.text(400, 200, 'VOCÊ MORREU', {
            fontSize: '54px',
            color: '#ff0000',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.add.text(400, 285, 'A Umbrella Corporation prevaleceu...', {
            fontSize: '22px',
            color: '#cc3333',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        const restartPrompt = this.add.text(400, 390, 'Pressione ESPAÇO para Tentar Novamente', {
            fontSize: '20px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.tweens.add({
            targets: restartPrompt,
            alpha: 0.25,
            duration: 500,
            yoyo: true,
            repeat: -1
        });

        const retry = () => this.scene.start('MainScene');
        this.input.keyboard.once('keydown-SPACE', retry);
        this.input.keyboard.once('keydown-ENTER', retry);
        this.input.once('pointerdown', retry);
    }
}

// ─── VictoryScene ─────────────────────────────────────────────────────────────
class VictoryScene extends Phaser.Scene {
    constructor() {
        super('VictoryScene');
    }

    create() {
        if (window.setGameHudVisible) {
            window.setGameHudVisible(false);
        }

        this.add.rectangle(400, 300, 800, 600, 0x000a02);

        this.add.text(400, 160, 'VITÓRIA!', {
            fontSize: '56px',
            color: '#00ff66',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5);

        this.add.text(400, 240, 'Albert Wesker foi Derrotado!', {
            fontSize: '26px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        }).setOrigin(0.5);

        this.add.text(400, 290, 'Alice garantiu a sobrevivência da humanidade contra a Umbrella.', {
            fontSize: '18px',
            color: '#aaccbb',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.createFireworks();

        const menuPrompt = this.add.text(400, 460, 'Pressione ESPAÇO para Voltar ao Menu', {
            fontSize: '19px',
            color: '#00ff88',
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);

        this.tweens.add({
            targets: menuPrompt,
            alpha: 0.3,
            duration: 600,
            yoyo: true,
            repeat: -1
        });

        const goTitle = () => this.scene.start('TitleScene');
        this.input.keyboard.once('keydown-SPACE', goTitle);
        this.input.keyboard.once('keydown-ENTER', goTitle);
        this.input.once('pointerdown', goTitle);
    }

    createFireworks() {
        const colors = [0x00ff88, 0xff0055, 0xffea00, 0x00d4ff];
        const spots = [[150, 180], [350, 130], [620, 160], [700, 240], [250, 220]];

        spots.forEach((pos, i) => {
            this.time.delayedCall(i * 350, () => {
                const color = colors[i % colors.length];
                const key = `fw_burst_${i}_${color}`;
                if (!this.textures.exists(key)) {
                    const g = this.make.graphics({ x: 0, y: 0, add: false });
                    g.fillStyle(color, 1);
                    g.fillCircle(4, 4, 4);
                    g.generateTexture(key, 8, 8);
                    g.destroy();
                }

                const emitter = this.add.particles(pos[0], pos[1], key, {
                    speed: { min: 60, max: 220 },
                    angle: { min: 0, max: 360 },
                    scale: { start: 1, end: 0 },
                    lifespan: 800,
                    quantity: 22,
                    emitting: false
                });
                emitter.explode(22);
                this.time.delayedCall(1000, () => { if (emitter) emitter.destroy(); });
            });
        });
    }
}

// Exportar cenas únicas
export { BootScene, TitleScene, MainScene, WeskerScene, GameOverScene, VictoryScene };