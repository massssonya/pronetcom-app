function setupGameEvents() {
	Emitter.on("player:died", function () {
		console.log("Игрок погиб! Останавливаем игру.");
		showGameOverModal();
	});

	Emitter.on("player:heal", function (player) {
		console.log("Игрок восстановил здоровье:", player.health);
	});

	Emitter.on("player:pickup:sword", function () {
		console.log("Игрок подобрал меч!");
	});

	Emitter.on("enemy:healthChanged", function (data) {
		console.log("❤️ Здоровье врага изменилось:", data);
	});
}

window.setupGameEvents = setupGameEvents;
