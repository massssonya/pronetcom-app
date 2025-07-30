window.onload = function () {
	var container = document.querySelector(".field");
	if (!container) throw new Error("Container .field not found");

	var game = new Game(container, FIELD_X, FIELD_Y);
	game.init();

	document.addEventListener("keydown", function (e) {
		e.preventDefault();
		if (game.field.player === null) return;
		var dx = 0,
			dy = 0;

		switch (e.key.toLowerCase()) {
			case "w":
				dy = -1;
				break;
			case "s":
				dy = 1;
				break;
			case "a":
				dx = -1;
				break;
			case "d":
				dx = 1;
				break;
			case " ":
				game.field.playerAttack();
				break;
			default:
				return;
		}

		game.field.movePlayer(dx, dy);
	});
};

function showGameOverModal() {
	var modal = document.getElementById("game-over-modal");
	modal.classList.remove("hidden");

	var restartBtn = document.getElementById("restart-button");
	restartBtn.onclick = function () {
		location.reload();
	};
}
