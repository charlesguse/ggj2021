import Phaser from 'phaser';
import logoImg from './assets/logo.png';

class MyGame extends Phaser.Scene {
  constructor () {
    super()
  }

  preload () {
    this.load.image('logo', logoImg)
  }
    
  create () {
    const logo = this.add.image(400, 150, 'logo')
    
    this.tweens.add({
      targets: logo,
      y: 450,
      duration: 2000,
      ease: "Power2",
      yoyo: true,
      loop: -1
    })
  }
}

const config = {
  type: Phaser.AUTO,
  scale: {
    parent: 'GGJ 2021 - Find Me!',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080
  },
  scene: MyGame
}

const game = new Phaser.Game(config)
