window.onload = function () {
	var container = document.querySelector(".field");
	if (!container) throw new Error("Container .field not found");

	var game = new Game(container, FIELD_X, FIELD_Y);
	game.init();

	window.game = game;

	setupKeyboardControls(game);
	setupGameEvents();
};
