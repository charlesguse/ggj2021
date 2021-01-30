import Phaser from 'phaser';

import { randomX, randomY } from './utils'

export default class MyGame extends Phaser.Scene {
  constructor() {
    super()
  }

  preload() {
    const images = require('./assets/images/genericItems_spritesheet_colored.png')
    const atlas = require('./assets/images/genericItems_spritesheet_colored.xml')
    this.load.atlasXML('items', images, atlas)
  }

  create() {
    const atlasTextures = this.textures.get('items')
    const frames = atlasTextures.getFrameNames()

    for (var i = 0; i < frames.length; i++) {
      const imgRef = this.add.image(randomX(), randomY(), 'items', frames[i])
      imgRef.setInteractive()
    }

    this.input.on('gameobjectdown', this.onObjectClicked)
  }

  onObjectClicked(pointer, gameObject) {
    gameObject.angle += 15
  }
}
// const config = {
//   type: Phaser.AUTO,
//   scale: {
//     parent: 'ggj2021-app',
//     mode: Phaser.Scale.FIT,
//     width: window.innerWidth,
//     height: window.innerHeight
//   },
//   backgroundColor: Phaser.Display.Color.RGBStringToColor('rgb(0,0,0)'),
//   scene: MyGame
// }

// const game = new Phaser.Game(config)
