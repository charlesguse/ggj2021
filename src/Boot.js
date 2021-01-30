import Phaser from "phaser";
import EPT from "./utils";
import bgImage from "./assets/images/bg_wood.png";

export default class Boot extends Phaser.Scene {
  constructor() {
    super("Boot");
  }
  
  preload() {
    this.load.image("background", bgImage);
    this.load.image("logo-enclave", "img/logo-enclave.png");
    this.load.image("loading-background", "img/loading-background.png");
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
