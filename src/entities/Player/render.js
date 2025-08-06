function renderPlayer(tile, player) {
	tile.setCharacter("player");
	tile.setHealthBar(player.health, player.maxHealth);
	tile.el.classList.remove("face-left", "face-right");

	if (player.direction === "left") {
		tile.el.classList.add("face-left");
	} else if (player.direction === "right") {
		tile.el.classList.add("face-right");
	}
}

function clearPlayer(tile) {
	tile.setBaseType("floor");
	tile.setCharacter(null);
	tile.setHealthBar(0, 1);
	tile.el.classList.remove("face-left", "face-right");
}
