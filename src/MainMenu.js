import Phaser from "phaser";
import { Button } from "./utils";
import EPT from "./utils";

export default class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
    this.bgFilesLoaded = false;
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

    EPT.Storage.initUnset("EPT-highscore", 0);
    var highscore = EPT.Storage.get("EPT-highscore");

    /**
     * Story Text
     */
    const titleFont = { font: '64px '+EPT.text['FONT'], fill: '#ffde00', stroke: '#000', strokeThickness: 7, align: 'center' };
		const title = this.add.text(EPT.world.centerX, 200, 'GGJ 2021 Find Me!', titleFont);
    title.setOrigin(0.5, -2);

    this.tweens.add({
      targets: title,
      angle: title.angle - 2,
      duration: 1000,
      ease: "Sine.easeInOut",
    });
    this.tweens.add({
      targets: title,
      angle: title.angle + 4,
      duration: 2000,
      ease: "Sine.easeInOut",
      yoyo: 1,
      loop: -1,
      delay: 1000,
    });

    this.buttonStart = new Button(
      EPT.world.width - 20,
      EPT.world.height - 20,
      "button-start",
      this.clickStart,
      this
    );
    this.buttonStart.setOrigin(1, 1);

    var fontHighscore = {
      font: "38px " + EPT.text["FONT"],
      fill: "#ffde00",
      stroke: "#000",
      strokeThickness: 5,
    };
    var textHighscore = this.add.text(
      EPT.world.width - 30,
      60,
      EPT.text["menu-highscore"] + highscore,
      fontHighscore
    );
    textHighscore.setOrigin(1, 0);

    this.buttonStart.x = EPT.world.width + this.buttonStart.width + 20;
    this.tweens.add({
      targets: this.buttonStart,
      x: EPT.world.width - 20,
      duration: 500,
      ease: "Back",
    });

    textHighscore.y = -textHighscore.height - 30;
    this.tweens.add({
      targets: textHighscore,
      y: 40,
      duration: 500,
      delay: 100,
      ease: "Back",
    });

    this.cameras.main.fadeIn(250);
  }

  clickStart() {
    const clickSound = this.sound.add('sound-click')
    clickSound.play()

    if (this.loadImage) this.loadImage.destroy();

    EPT.fadeOutScene("Story", this);
  }
}
