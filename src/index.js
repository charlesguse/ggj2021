import Phaser from 'phaser';
import { gameCharacters } from './gameBoardCharacters'

class MyGame extends Phaser.Scene {
  constructor () {
    super()
  }
    
  create () {
    const characterRefs = []

    for (let i = 0; i < 1000; i++) {
      const character = gameCharacters(this)
      character.setInteractive()
      characterRefs.push(character)
    }

    console.log(characterRefs)

    this.input.on('gameobjectdown', this.onObjectClicked)
  }

  onObjectClicked(pointer, gameObject) {
    gameObject.x += 10
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
