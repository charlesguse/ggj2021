import Phaser from "phaser";
import EPT from "./utils";

export default class Boot extends Phaser.Scene {
  constructor() {
    super("Boot");
  }
  
  preload() {
    this.load.image("background", require("./assets/images/bg_wood.png"));
    this.load.image("loading-background", require("./assets/images/loading-background.png"));
    this.load.image("selection-frame", require("./assets/images/yellow_button06.png"));
    // -----
    this.load.image("overlay", require("./assets/images/overlay.png"));
    this.load.image("particle", require("./assets/images/particle.png"));
    // -----
    this.load.spritesheet("button-continue", require("./assets/images/button-continue.png"), { frameWidth: 180, frameHeight: 180 });
    this.load.spritesheet("button-mainmenu", require("./assets/images/button-mainmenu.png"), { frameWidth: 180, frameHeight: 180 });
    this.load.spritesheet("button-restart", require("./assets/images/button-tryagain.png"), { frameWidth: 180, frameHeight: 180 });
    this.load.spritesheet("button-pause", require("./assets/images/button-pause.png"), { frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet("button-sound-on", require("./assets/images/button-sound-on.png"), { frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet("button-sound-off", require("./assets/images/button-sound-off.png"), { frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet("button-music-on", require("./assets/images/button-music-on.png"), { frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet("button-music-off", require("./assets/images/button-music-off.png"), { frameWidth: 80, frameHeight: 80 });
    this.load.spritesheet("button-back", require("./assets/images/button-back.png"), { frameWidth: 70, frameHeight: 70 });
    // -----
    this.load.audio("sound-click", [
      require("./assets/sounds/audio-button.m4a"),
      require("./assets/sounds/audio-button.mp3"),
      require("./assets/sounds/audio-button.ogg"),
    ])
    this.load.audio("music-theme", [
      require("./assets/sounds/music-bitsnbites-liver.m4a"),
      require("./assets/sounds/music-bitsnbites-liver.mp3"),
      require("./assets/sounds/music-bitsnbites-liver.ogg"),
    ])
  }

  create() {
    EPT.world = {
      width: this.cameras.main.width,
      height: this.cameras.main.height,
      centerX: this.cameras.main.centerX,
      centerY: this.cameras.main.centerY,
    };
    EPT.Lang.updateLanguage("en");
    EPT.text = EPT.Lang.text[EPT.Lang.current];
    this.scene.start("Preloader");
  }
}
