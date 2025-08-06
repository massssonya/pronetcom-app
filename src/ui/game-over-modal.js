function showGameOverModal() {
	var modal = document.getElementById("game-over-modal");
	modal.classList.remove("hidden");

	var restartBtn = document.getElementById("restart-button");
	restartBtn.onclick = function () {
		location.reload();
	};
}
