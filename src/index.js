import Phaser from 'phaser';
import bgImage from './assets/images/bg_wood.png'
import { randomX, randomY, randomIntegarInRange } from './utils'

let cursors = null
let mainItem = null

class MyGame extends Phaser.Scene {
  constructor () {
    super()
  }

  /**
   * Prepare images prior to using them
   */
  preload() {
    this.load.image('background', bgImage)

    const images = require('./assets/images/genericItems_spritesheet_colored.png')
    const atlas = require('./assets/images/genericItems_spritesheet_colored.xml')

    this.load.atlasXML('items', images, atlas)
  }
    
  /**
   * Create game objects on the screen
   */
  create () {
    // Display background
    this.add.tileSprite(0, 0, window.innerWidth * 2, window.innerHeight * 2, 'background')

    const atlasTextures = this.textures.get('items')
    const frames = atlasTextures.getFrameNames()
    const controlItem = randomIntegarInRange(0, frames.length - 1)

    // Render all the junk falling onto the screen
    for (let i = 0; i < frames.length; i++) {
      if (i === controlItem) {
        mainItem = this.physics.add.image(randomX(), randomY(), 'items', frames[i])
      } else {
        const imgRef = this.add.image(window.innerWidth / 2, window.innerHeight / 2, 'items', frames[i])

        this.tweens.add({
          targets: imgRef,
          x: randomX(),
          y: randomY(),
          duration: 400,
          ease: 'Circ.easeOut',
          yoyo: false,
          rotation: randomIntegarInRange(-5, 5),
        })
        
        imgRef.setInteractive()
      }
    }

    // INPUTS
    this.input.on('gameobjectdown', this.onObjectClicked)

    cursors = this.input.keyboard.createCursorKeys();
  }

  /**
   * Called every frame
   */
  update() {
    mainItem.setVelocity(0)

    if (cursors.left.isDown) {
      mainItem.setVelocityX(-300)
    } else if (cursors.right.isDown) {
      mainItem.setVelocityX(300)
    }
    
    if (cursors.up.isDown) {
      mainItem.setVelocityY(-300)
    } else if ((cursors.down.isDown)) {
      mainItem.setVelocityY(300)
    }
  }

  // EVENTS

  onObjectClicked(pointer, gameObject) {
    gameObject.angle += 15
  }
}

/**
 * Config for the GAME SCENE
 */
const config = {
  type: Phaser.AUTO,
  scale: {
    parent: 'ggj2021-app',
    mode: Phaser.Scale.FIT,
    width: window.innerWidth,
    height: window.innerHeight
  },
  physics: {
    default: 'arcade',
    arcade: { debug: false },
  },
  backgroundColor: Phaser.Display.Color.RGBStringToColor('rgb(0,0,0)'),
  scene: MyGame
}

const game = new Phaser.Game(config)
