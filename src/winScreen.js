import Phaser from 'phaser';
import EPT from './utils'
import { Button } from './utils';

export default class Story extends Phaser.Scene {
    constructor() {
        super('WinScreen');
    }
    
    create() {
    // Display background
    const bg = this.add.tileSprite(
      0,
      0,
      EPT.world.width,
      EPT.world.height,
      "background"
    );
    bg.setOrigin(0, 0);

    const fontStory = { font: '48px '+EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 7, align: 'center' };
    
    const winText = 'Good Job!'
		const textStory = this.add.text(EPT.world.centerX, 200, winText, fontStory);
    textStory.setOrigin(0.5,0);

		const buttonContinue = new Button(EPT.world.width-20, EPT.world.height-20, 'button-continue', this.clickContinue, this);
		buttonContinue.setOrigin(1,1);

		buttonContinue.x = EPT.world.width+buttonContinue.width+20;
		this.tweens.add({targets: buttonContinue, x: EPT.world.width-20, duration: 500, ease: 'Back'});

		this.keyEnter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
		this.keyEnter.on('down', (key, event) => this.clickContinue(), this);

		this.cameras.main.fadeIn(250, 0, 0, 0);
  }
  
	clickContinue() {
    const clickSound = this.sound.add('sound-click')
    clickSound.play()
    
		EPT.fadeOutScene('MainMenu', this);
	}
};