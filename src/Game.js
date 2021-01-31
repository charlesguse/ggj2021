import Phaser from "phaser";
import EPT from "./utils";
import { splashRandomX, splashRandomY, randomIntegarInRange } from './game-utils'
import { Button } from "./utils";

let scene = null
const imgRefs = []
let selectedItemIndex = null
let selectedItem = null

export default class Game extends Phaser.Scene {
  constructor() {
    super("Game");
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
    
    // Render all the junk falling onto the screen
    const atlasTextures = this.textures.get("game-items");
    const frames = atlasTextures.getFrameNames();

    for (let i = 0; i < frames.length; i++) {
      const imgRef = this.add.image(
        EPT.world.width / 2,
        EPT.world.height / 2,
        "game-items",
        frames[i]
      );

      imgRefs.push(imgRef)

      this.tweens.add({
        targets: imgRef,
        x: splashRandomX() -25,
        y: splashRandomY() -25,
        duration: 400,
        ease: "Circ.easeOut",
        yoyo: false,
        rotation: randomIntegarInRange(-5, 5),
      });
    }

    selectedItemIndex = randomIntegarInRange(0, imgRefs.length)
    selectedItem = imgRefs[selectedItemIndex].frame.name
    console.log('ITEM TO FIND:', selectedItem)

    imgRefs.map((i) => i.setInteractive())

    this.add.image(
      EPT.world.width - 50,
      EPT.world.height - 50,
      "game-items",
      frames[selectedItemIndex])

    this.input.on("gameobjectdown", this.onObjectClicked);

    this.stateStatus = null;
    this._score = 0;
    this._time = 0;
    this._gamePaused = false;
    this._runOnce = false;

    this.initUI();

    this.currentTimer = this.time.addEvent({
      delay: 1000,
      callback: function () {
        this._time++;
        this.textTime.setText(EPT.text["gameplay-timeleft"] + this._time);
        // if (!this._time) {
        //   this._runOnce = false;
        //   this.stateStatus = "gameover";
        // }
      },
      callbackScope: this,
      loop: true,
    });

    this.cameras.main.fadeIn(250);
    this.stateStatus = "playing";

    scene = this
  }

  onObjectClicked(pointer, gameObject) {
    if (gameObject.frame.name === selectedItem) {
      gameObject.destroy()
      EPT.fadeOutScene('WinScreen', this);
    }

    const ranX = randomIntegarInRange(-50, 50)
    const ranY = randomIntegarInRange(20, 40)
    const ranRot = randomIntegarInRange(-0.25, 0.25)

    scene.tweens.add({
      targets: gameObject,
      x: gameObject.x += ranX,
      y: gameObject.y += ranY,
      duration: 300,
      ease: "Circ.easeOut",
      yoyo: false,
      rotation: ranRot,
    });
  }

  update() {
    switch (this.stateStatus) {
      case "paused": {
        if (!this._runOnce) {
          this.statePaused();
          this._runOnce = true;
        }
        break;
      }
      case "gameover": {
        if (!this._runOnce) {
          this.stateGameover();
          this._runOnce = true;
        }
        break;
      }
      case "playing": {
        this.statePlaying();
      }
      default: {
      }
    }
  }

  managePause() {
    this._gamePaused = !this._gamePaused;
    this.currentTimer.paused = !this.currentTimer.paused;

    const clickSound = this.sound.add('sound-click')
    clickSound.play()

    if (this._gamePaused) {
      EPT.fadeOutIn(function (self) {
        self.stateStatus = "paused";
        self._runOnce = false;
      }, this);
      this.screenPausedBack.x = -this.screenPausedBack.width - 20;
      this.tweens.add({
        targets: this.screenPausedBack,
        x: 100,
        duration: 500,
        delay: 250,
        ease: "Back",
      });
      this.screenPausedContinue.x =
        EPT.world.width + this.screenPausedContinue.width + 20;
      this.tweens.add({
        targets: this.screenPausedContinue,
        x: EPT.world.width - 100,
        duration: 500,
        delay: 250,
        ease: "Back",
      });
    } else {
      EPT.fadeOutIn(function (self) {
        // self.buttonPause.input.enabled = true;
        // self.buttonDummy.input.enabled = true;
        self._stateStatus = "playing";
        self._runOnce = false;
      }, this);
      this.screenPausedBack.x = 100;
      this.tweens.add({
        targets: this.screenPausedBack,
        x: -this.screenPausedBack.width - 20,
        duration: 500,
        ease: "Back",
      });
      this.screenPausedContinue.x = EPT.world.width - 100;
      this.tweens.add({
        targets: this.screenPausedContinue,
        x: EPT.world.width + this.screenPausedContinue.width + 20,
        duration: 500,
        ease: "Back",
      });
    }
  }

  statePlaying() {
    // if (this._time === 0) {
    //   this._runOnce = false;
    //   this.stateStatus = "gameover";
    // }
  }

  statePaused() {
    this.screenPausedGroup.toggleVisible();
  }

  stateGameover() {
    this.currentTimer.paused = !this.currentTimer.paused;
    EPT.Storage.setHighscore("EPT-highscore", this._score);
    EPT.fadeOutIn(function (self) {
      self.screenGameoverGroup.toggleVisible();
      self.screenGameoverScore.setText(
        EPT.text["gameplay-score"] + self._score
      );
      self.gameoverScoreTween();
    }, this);
    this.screenGameoverBack.x = -this.screenGameoverBack.width - 20;
    this.tweens.add({
      targets: this.screenGameoverBack,
      x: 100,
      duration: 500,
      delay: 250,
      ease: "Back",
    });
    this.screenGameoverRestart.x =
      EPT.world.width + this.screenGameoverRestart.width + 20;
    this.tweens.add({
      targets: this.screenGameoverRestart,
      x: EPT.world.width - 100,
      duration: 500,
      delay: 250,
      ease: "Back",
    });
  }

  initUI() {
    this.buttonPause = new Button(
      20,
      20,
      "button-pause",
      this.managePause,
      this
    );
    this.buttonPause.setOrigin(0, 0);

    var fontScore = {
      font: EPT.text["FONT-SIZE"] + " " + EPT.text["FONT"],
      fill: "#ffde00",
      stroke: "#000",
      strokeThickness: 5,
    };
    var fontScoreWhite = {
      font: EPT.text["FONT-SIZE"] + " " + EPT.text["FONT"],
      fill: "#000",
      stroke: "#ffde00",
      strokeThickness: 5,
    };
    this.textScore = this.add.text(
      EPT.world.width - 30,
      45,
      EPT.text["gameplay-score"] + this._score,
      fontScore
    );
    this.textScore.setOrigin(1, 0);

    this.textScore.y = -this.textScore.height - 20;
    this.tweens.add({
      targets: this.textScore,
      y: 45,
      duration: 500,
      delay: 100,
      ease: "Back",
    });

    this.textTime = this.add.text(
      30,
      EPT.world.height - 30,
      EPT.text["gameplay-timeleft"] + this._time,
      fontScore
    );
    this.textTime.setOrigin(0, 1);

    this.textTime.y = EPT.world.height + this.textTime.height + 30;
    this.tweens.add({
      targets: this.textTime,
      y: EPT.world.height - 30,
      duration: 500,
      ease: "Back",
    });

    this.buttonPause.y = -this.buttonPause.height - 20;
    this.tweens.add({
      targets: this.buttonPause,
      y: 20,
      duration: 500,
      ease: "Back",
    });

    var fontTitle = {
      font: "48px " + EPT.text["FONT"],
      fill: "#000",
      stroke: "#ffde00",
      strokeThickness: 10,
    };

    this.screenPausedGroup = this.add.group();
    this.screenPausedBg = this.add.sprite(0, 0, "overlay");
    this.screenPausedBg.setAlpha(0.95);
    this.screenPausedBg.setOrigin(0, 0);
    this.screenPausedText = this.add.text(
      EPT.world.centerX,
      100,
      EPT.text["gameplay-paused"],
      fontTitle
    );
    this.screenPausedText.setOrigin(0.5, 0);
    this.screenPausedBack = new Button(
      100,
      EPT.world.height - 100,
      "button-mainmenu",
      this.stateBack,
      this
    );
    this.screenPausedBack.setOrigin(0, 1);
    this.screenPausedContinue = new Button(
      EPT.world.width - 100,
      EPT.world.height - 100,
      "button-continue",
      this.managePause,
      this
    );
    this.screenPausedContinue.setOrigin(1, 1);
    this.screenPausedGroup.add(this.screenPausedBg);
    this.screenPausedGroup.add(this.screenPausedText);
    this.screenPausedGroup.add(this.screenPausedBack);
    this.screenPausedGroup.add(this.screenPausedContinue);
    this.screenPausedGroup.toggleVisible();

    this.screenGameoverGroup = this.add.group();
    this.screenGameoverBg = this.add.sprite(0, 0, "overlay");
    this.screenGameoverBg.setAlpha(0.95);
    this.screenGameoverBg.setOrigin(0, 0);
    this.screenGameoverText = this.add.text(
      EPT.world.centerX,
      100,
      EPT.text["gameplay-gameover"],
      fontTitle
    );
    this.screenGameoverText.setOrigin(0.5, 0);
    this.screenGameoverBack = new Button(
      100,
      EPT.world.height - 100,
      "button-mainmenu",
      this.stateBack,
      this
    );
    this.screenGameoverBack.setOrigin(0, 1);
    this.screenGameoverRestart = new Button(
      EPT.world.width - 100,
      EPT.world.height - 100,
      "button-restart",
      this.stateRestart,
      this
    );
    this.screenGameoverRestart.setOrigin(1, 1);
    this.screenGameoverScore = this.add.text(
      EPT.world.centerX,
      300,
      EPT.text["gameplay-score"] + this._score,
      fontScoreWhite
    );
    this.screenGameoverScore.setOrigin(0.5, 0.5);
    this.screenGameoverGroup.add(this.screenGameoverBg);
    this.screenGameoverGroup.add(this.screenGameoverText);
    this.screenGameoverGroup.add(this.screenGameoverBack);
    this.screenGameoverGroup.add(this.screenGameoverRestart);
    this.screenGameoverGroup.add(this.screenGameoverScore);
    this.screenGameoverGroup.toggleVisible();
  }

  addPoints() {
    this._score += 10;
    this.textScore.setText(EPT.text["gameplay-score"] + this._score);

    var randX = Phaser.Math.Between(200, EPT.world.width - 200);
    var randY = Phaser.Math.Between(200, EPT.world.height - 200);
    var pointsAdded = this.add.text(randX, randY, "+10", {
      font: "48px " + EPT.text["FONT"],
      fill: "#ffde00",
      stroke: "#000",
      strokeThickness: 10,
    });
    pointsAdded.setOrigin(0.5, 0.5);
    this.tweens.add({
      targets: pointsAdded,
      alpha: 0,
      y: randY - 50,
      duration: 1000,
      ease: "Linear",
    });

    this.cameras.main.shake(100, 0.01, true);
  }

  stateRestart() {
    const clickSound = this.sound.add('sound-click')
    clickSound.play()

    EPT.fadeOutScene("Game", this);
  }

  stateBack() {
    const clickSound = this.sound.add('sound-click')
    clickSound.play()

    EPT.fadeOutScene("MainMenu", this);
  }

  gameoverScoreTween() {
    this.screenGameoverScore.setText(EPT.text["gameplay-score"] + "0");
    if (this._score) {
      this.pointsTween = this.tweens.addCounter({
        from: 0,
        to: this._score,
        duration: 2000,
        delay: 250,
        onUpdateScope: this,
        onCompleteScope: this,

        onUpdate: function () {
          this.screenGameoverScore.setText(
            EPT.text["gameplay-score"] + Math.floor(this.pointsTween.getValue())
          );
        },

        onComplete: function () {
          var emitter = this.add.particles("particle").createEmitter({
            x: this.screenGameoverScore.x + 30,
            y: this.screenGameoverScore.y,
            speed: { min: -600, max: 600 },
            angle: { min: 0, max: 360 },
            scale: { start: 0.5, end: 3 },
            blendMode: "ADD",
            active: true,
            lifespan: 2000,
            gravityY: 1000,
            quantity: 250,
          });
          emitter.explode();
        },
      });
    }
  }
}
