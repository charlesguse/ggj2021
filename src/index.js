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
    parent: 'ggj2021-app',
    mode: Phaser.Scale.FIT,
    width: window.innerWidth,
    height: window.innerHeight
  },
  backgroundColor: Phaser.Display.Color.RGBStringToColor('rgb(0,0,0)'),
  scene: MyGame
}

const game = new Phaser.Game(config)
