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

		switch (e.code) {
			case "KeyW":
			case "ArrowUp":
				dy = -1;
				break;
			case "KeyS":
			case "ArrowDown":
				dy = 1;
				break;
			case "KeyA":
			case "ArrowLeft":
				dx = -1;
				break;
			case "KeyD":
			case "ArrowRight":
				dx = 1;
				break;
			case "Space":
				game.field.playerAttack();
				return;
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
