import Phaser from "phaser";
import EPT from "./utils";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("Preloader");
  }
  preload() {
    // Images atlas for game
    const images = require("./assets/images/genericItems_spritesheet_colored.png");
    const atlas = require("./assets/images/genericItems_spritesheet_colored.xml");
    this.load.atlasXML("game-items", images, atlas);

    var logoEnclave = this.add.sprite(
      EPT.world.centerX,
      EPT.world.centerY - 100,
      "logo-enclave"
    );
    logoEnclave.setOrigin(0.5, 0.5);
    var loadingBg = this.add.sprite(
      EPT.world.centerX,
      EPT.world.centerY + 100,
      "loading-background"
    );
    loadingBg.setOrigin(0.5, 0.5);

    var progress = this.add.graphics();
    this.load.on("progress", function (value) {
      progress.clear();
      progress.fillStyle(0xffde00, 1);
      progress.fillRect(
        loadingBg.x - loadingBg.width * 0.5 + 20,
        loadingBg.y - loadingBg.height * 0.5 + 10,
        540 * value,
        25
      );
    });

    var resources = {
      spritesheet: [
        [
          "button-start",
          require("./assets/images/button-start.png"),
          { frameWidth: 180, frameHeight: 180 },
        ],
        [
          "button-settings",
          require("./assets/images/button-settings.png"),
          { frameWidth: 80, frameHeight: 80 },
        ],
        ["loader", require("./assets/images/loader.png"), { frameWidth: 45, frameHeight: 45 }],
      ],
    };
    for (var method in resources) {
      resources[method].forEach(function (args) {
        var loader = this.load[method];
        loader && loader.apply(this.load, args);
      }, this);
    }
  }
  create() {
    EPT.fadeOutScene("MainMenu", this);
  }
}
