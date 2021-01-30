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

    this.waitingForSettings = false;

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

    this.buttonSettings = new Button(
      20,
      20,
      "button-settings",
      this.clickSettings,
      this
    );
    this.buttonSettings.setOrigin(0, 0);

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

    this.buttonSettings.y = -this.buttonSettings.height - 20;
    this.tweens.add({
      targets: this.buttonSettings,
      y: 20,
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

    if (!this.bgFilesLoaded) {
      this.time.addEvent(
        {
          delay: 500,
          callback: function () {
            this.startPreloadInTheBackground();
          },
          callbackScope: this,
        },
        this
      );
    }
  }

  clickSettings() {
    if (this.bgFilesLoaded) {
      EPT.Sfx.play("click");
      if (this.loadImage) {
        this.loadImage.destroy();
      }
      EPT.fadeOutScene("Settings", this);
    } else {
      var animationFrames = this.anims.generateFrameNumbers("loader");
      animationFrames.pop();
      this.waitingForSettings = true;
      this.buttonSettings.setAlpha(0.1);
      var loadAnimation = this.anims.create({
        key: "loading",
        frames: animationFrames,
        frameRate: 12,
        repeat: -1,
      });
      this.loadImage = this.add
        .sprite(30, 30, "loader")
        .setOrigin(0, 0)
        .setScale(1.25);
      this.loadImage.play("loading");
    }
  }

  clickStart() {
    if (this.bgFilesLoaded) {
      EPT.Sfx.play("click");
      if (this.loadImage) {
        this.loadImage.destroy();
      }
      EPT.fadeOutScene("Story", this);
    } else {
      var animationFrames = this.anims.generateFrameNumbers("loader");
      animationFrames.pop();
      this.waitingForStart = true;
      this.buttonStart.setAlpha(0.1);
      var loadAnimation = this.anims.create({
        key: "loading",
        frames: animationFrames,
        frameRate: 12,
        repeat: -1,
      });
      this.loadImage = this.add
        .sprite(EPT.world.width - 85, EPT.world.height - 85, "loader")
        .setOrigin(1, 1)
        .setScale(1.25);
      this.loadImage.play("loading");
    }
  }

  startPreloadInTheBackground() {
    console.log("[EPT] Starting background loading...");
    this.load.once("filecomplete", this.addFiles, this);
    console.log('bg loading 1')
    this.load.start();
    console.log('bg loading 2')
  }
  
  addFiles() {
    var resources = {
      image: [
        ["overlay", require("./assets/images/overlay.png")],
        ["particle", require("./assets/images/particle.png")],
      ],
      spritesheet: [
        [
          "button-continue",
          require("./assets/images/button-continue.png"),
          { frameWidth: 180, frameHeight: 180 },
        ],
        [
          "button-mainmenu",
          require("./assets/images/button-mainmenu.png"),
          { frameWidth: 180, frameHeight: 180 },
        ],
        [
          "button-restart",
          require("./assets/images/button-tryagain.png"),
          { frameWidth: 180, frameHeight: 180 },
        ],
        [
          "button-pause",
          require("./assets/images/button-pause.png"),
          { frameWidth: 80, frameHeight: 80 },
        ],
        [
          "button-sound-on",
          require("./assets/images/button-sound-on.png"),
          { frameWidth: 80, frameHeight: 80 },
        ],
        [
          "button-sound-off",
          require("./assets/images/button-sound-off.png"),
          { frameWidth: 80, frameHeight: 80 },
        ],
        [
          "button-music-on",
          require("./assets/images/button-music-on.png"),
          { frameWidth: 80, frameHeight: 80 },
        ],
        [
          "button-music-off",
          require("./assets/images/button-music-off.png"),
          { frameWidth: 80, frameHeight: 80 },
        ],
        [
          "button-back",
          require("./assets/images/button-back.png"),
          { frameWidth: 70, frameHeight: 70 },
        ],
      ],
      audio: [
        [
          "sound-click",
          [
            "sfx/audio-button.m4a",
            "sfx/audio-button.mp3",
            "sfx/audio-button.ogg",
          ],
        ],
        [
          "music-theme",
          [
            "sfx/music-bitsnbites-liver.m4a",
            "sfx/music-bitsnbites-liver.mp3",
            "sfx/music-bitsnbites-liver.ogg",
          ],
        ],
      ],
    };
    for (var method in resources) {
      resources[method].forEach(function (args) {
        var loader = this.load[method];
        loader && loader.apply(this.load, args);
      }, this);
    }
    this.load.on(
      "complete",
      function () {
        console.log("[EPT] All files loaded in the background.");
        this.bgFilesLoaded = true;
        EPT.Sfx.manage("music", "init", this);
        EPT.Sfx.manage("sound", "init", this);
        if (this.waitingForSettings) {
          this.clickSettings();
        }
        if (this.waitingForStart) {
          this.clickStart();
        }
      },
      this
    );
  }
}
