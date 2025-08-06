function showPauseModal() {
	var modal = document.getElementById("pause-modal");
	modal.classList.remove("hidden");

	var resumeBtn = document.getElementById("resume-button");
	resumeBtn.onclick = function () {
		window.game?.resume();
		hidePauseModal();
	};
}

function hidePauseModal() {
	var modal = document.getElementById("pause-modal");
	modal.classList.add("hidden");
}
