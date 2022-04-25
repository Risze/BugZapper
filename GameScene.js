class GameScene extends Phaser.Scene {
  constructor() {
    super ({ key: 'GameScene' });
  }

preload() {
  this.load.image('bug1', 'Missile.png')
  this.load.image('platform', 'Platform-sky.png')
  this.load.image('platform2', 'Platform-sky.png')
  this.load.image('codey', 'Paratrooper.png')
  this.load.image('background', 'Background-sky.png')
}

create() {
  let bg = this.add.image(195, 250, 'background').setScale(7);

  gameState.player = this.physics.add.sprite(225, 100, 'codey').setScale(1);
  
  const safePlatforms = this.physics.add.staticGroup();

  safePlatforms.create(0, 80, 'platform2').setScale(.2).refreshBody();

  const platforms = this.physics.add.staticGroup();

  platforms.create(225, -40, 'platform');

  gameState.scoreText = this.add.text(140, 20, 'Missiles Dodged: 0', { fontSize: '15px', fill: '#000000' })

  gameState.player.setCollideWorldBounds(true);

  this.physics.add.collider(gameState.player, platforms);
  
	gameState.cursors = this.input.keyboard.createCursorKeys();

  const bugs = this.physics.add.group();

  function bugGen () {
    const xCoord = Math.random() * 450;
    bugs.create(xCoord, 750, 'bug1');
  }

  const bugGenLoop = this.time.addEvent({
    delay: 250,
    callback: bugGen,
    callbackScope: this,
    loop: true,
  });

  this.physics.add.collider(bugs, platforms, function (bug) {
    bug.destroy();
    gameState.score += 1;
    gameState.scoreText.setText(`Missiles Dodged: ${gameState.score}`)
  });

  this.physics.add.collider(bugs, safePlatforms, function (bug) {
    bug.destroy();
    gameState.score -= 1;
    gameState.scoreText.setText(`Missiles Dodged: ${gameState.score}`)
  })

  this.physics.add.collider(gameState.player, bugs, () => {
    bugGenLoop.destroy();
    this.physics.pause();
    this.add.text(150, 270, 'Click to Finish Game', { fontSize: '15px', fill: '#000000' });
    gameState.score = 0;
		this.input.on('pointerdown', () => {
      this.scene.stop('GameScene');
      this.scene.start('EndScene');
    });
  });
}

update() {
  if (gameState.cursors.left.isDown) {
  	gameState.player.setVelocityX(-160);
	} else if (gameState.cursors.right.isDown) {
 		gameState.player.setVelocityX(160);
	} else if (gameState.cursors.down.isDown) {
    gameState.player.setVelocityY(160);
    gameState.player.setVelocityX(0);
  } else if (gameState.cursors.up.isDown) {
    gameState.player.setVelocityY(-160);
    gameState.player.setVelocityX(0);
  } else {
    gameState.player.setVelocityX(0);
  }
}
}