import Phaser from 'phaser';
import Boot from './Boot'
import Preloader from './Preloader'
import MainMenu from './MainMenu'
import Story from './Story'
import Game from './Game'

var enablePWA = false;
if(enablePWA) {
	// SERVICE WORKER
	if('serviceWorker' in navigator) {
		navigator.serviceWorker.register('./js/sw.js');
	};
	// NOTIFICATIONS TEMPLATE
	Notification.requestPermission().then(function(result) {
		if(result === 'granted') {
			exampleNotification();
		}
	});
	function exampleNotification() {
		var notifTitle = 'GGJ 2021 Find Me!';
		var notifBody = 'Created by the Enclave Games team.';
		var notifImg = 'img/icons/icon-512.png';
		var options = {
			body: notifBody,
			icon: notifImg
		}
		var notif = new Notification(notifTitle, options);
		setTimeout(exampleNotification, 30000);
	}
}

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

// Usage tracking
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'UA-30485283-26');