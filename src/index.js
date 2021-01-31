import Phaser from 'phaser';
import Boot from './Boot'
import Preloader from './Preloader'
import MainMenu from './MainMenu'
import Story from './Story'
import Game from './Game'

var gameConfig = {
	scale: {
		parent: 'ggj2021-app',
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 640,
		height: 960
	},
	scene: [Boot, Preloader, MainMenu, Story, Game]
}
const game = new Phaser.Game(gameConfig);
window.focus();
