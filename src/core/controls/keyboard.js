function setupKeyboardControls(game) {
	document.addEventListener("keydown", function (e) {
		e.preventDefault();

		if (e.code === "Escape") {
			if (game.isPaused) {
				game.resume();
				hidePauseModal();
			} else {
				game.pause();
				showPauseModal();
			}
			return;
		}

		if (game.isPaused || !game.field.player) return;

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
}

window.setupKeyboardControls = setupKeyboardControls;
