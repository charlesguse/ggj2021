import Phaser from "phaser";
import EPT from "./utils";
import { Button } from "./utils";

export default class Settings extends Phaser.Scene {
  constructor() {
    super("Settings");
  }
  create() {
    // Display background
    const bg = this.add.tileSprite(
      0,
      0,
      window.innerWidth * 2,
      window.innerHeight * 2,
      "background"
    );
    bg.setOrigin(0, 0);

    this.screenName = "settings";

    this.buttonBack = new Button(20, 20, "button-back", this.clickBack, this);
    this.buttonBack.setOrigin(0, 0);
    this.buttonBack.y = -this.buttonBack.height - 20;
    this.tweens.add({
      targets: this.buttonBack,
      y: 20,
      duration: 500,
      ease: "Back",
    });

    const fontTitle = {
      font: "46px " + EPT.text["FONT"],
      fill: "#ffde00",
      stroke: "#000",
      strokeThickness: 7,
      align: "center",
    };

    const fontSubtitle = {
      font: "38px " + EPT.text["FONT"],
      fill: "#ffde00",
      stroke: "#000",
      strokeThickness: 5,
      align: "center",
    };

    const titleSettings = this.add.text(
      EPT.world.centerX,
      60,
      EPT.text["settings"],
      fontTitle
    );
    titleSettings.setOrigin(0.5, 0.5);

    const offsetLeft = 130;

    this.buttonSound = new Button(
      offsetLeft + 40,
      250,
      "button-sound-on",
      this.clickSound,
      this
    );
    this.buttonSound.setOrigin(0.5, 0.5);
    this.textSound = this.add.text(
      offsetLeft + 30 + this.buttonSound.width,
      250,
      EPT.text["sound-on"],
      fontSubtitle
    );
    this.textSound.setOrigin(0, 0.5);
    this.buttonMusic = new Button(
      offsetLeft + 40,
      375,
      "button-music-on",
      this.clickMusic,
      this
    );
    this.buttonMusic.setOrigin(0.5, 0.5);
    this.textMusic = this.add.text(
      offsetLeft + 30 + this.buttonMusic.width,
      375,
      EPT.text["music-on"],
      fontSubtitle
    );
    this.textMusic.setOrigin(0, 0.5);

    EPT.Sfx.update("sound", this.buttonSound, this.textSound);
    EPT.Sfx.update("music", this.buttonMusic, this.textMusic);

    this.buttonSound.setScale(0.5);
    this.tweens.add({
      targets: this.buttonSound,
      scaleX: 1,
      scaleY: 1,
      duration: 500,
      delay: 0,
      ease: "Cubic.easeOut",
    });
    this.textSound.setScale(0.5);
    this.tweens.add({
      targets: this.textSound,
      scaleX: 1,
      scaleY: 1,
      duration: 500,
      delay: 0,
      ease: "Cubic.easeOut",
    });
    this.buttonMusic.setScale(0.5);
    this.tweens.add({
      targets: this.buttonMusic,
      scaleX: 1,
      scaleY: 1,
      duration: 500,
      delay: 250,
      ease: "Cubic.easeOut",
    });
    this.textMusic.setScale(0.5);
    this.tweens.add({
      targets: this.textMusic,
      scaleX: 1,
      scaleY: 1,
      duration: 500,
      delay: 250,
      ease: "Cubic.easeOut",
    });

    this.cameras.main.fadeIn(250);
  }

  clickSound() {
    EPT.Sfx.play("click");
    EPT.Sfx.manage("sound", "switch", this, this.buttonSound, this.textSound);
  }

  clickMusic() {
    EPT.Sfx.play("click");
    EPT.Sfx.manage("music", "switch", this, this.buttonMusic, this.textMusic);
  }

  clickBack() {
    EPT.Sfx.play("click");
    EPT.fadeOutScene("MainMenu", this);
  }
}
