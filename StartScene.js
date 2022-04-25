class StartScene extends Phaser.Scene {
	constructor() {
		super({ key: 'StartScene' })
	}

	create() {
		this.add.text( 140, 150, 'Click to start!', {fill: '#000000', fontSize: '20px'})
    this.add.text( 100, 200, 'Use Arrow Keys to Move', {fill: '#000000', fontSize: '20px'})
    this.add.text( 80, 250, 'Dodge the Flying Missiles', {fill: '#000000', fontSize: '20px'})
		this.input.on('pointerdown', () => {
			this.scene.stop('StartScene')
			this.scene.start('GameScene')
		})
	}
}