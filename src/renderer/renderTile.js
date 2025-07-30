function renderTile(tile, container) {
	const element = tile.getElement();
	container.appendChild(element);
}

function renderTileType(tileEl, type) {
	tileEl.className = "tile";

	switch (type) {
		case "wall":
			tileEl.classList.add("tileW");
			break;
		case "floor":
			break;
		case "player":
			tileEl.classList.add("tileP", "face-right");
			break;
		case "enemy":
			tileEl.classList.add("tileE");
			break;
		case "sword":
			tileEl.classList.add("tileSW");
			break;
		case "health":
			tileEl.classList.add("tileHP");
			break;
		default:
			tileEl.classList.add("tileW");
			break;
	}
}

function renderHealthBar(tileEl, health, maxHealth) {
	var oldHealth = tileEl.querySelector(".health");
	if (oldHealth) {
		tileEl.removeChild(oldHealth);
	}

	var healthEl = document.createElement("div");
	healthEl.className = "health";

	healthEl.style.width = (health / maxHealth) * 100 + "%";

	tileEl.appendChild(healthEl);
}
