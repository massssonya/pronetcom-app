function renderEnemy(tile, enemy) {
	tile.setCharacter("enemy");
	tile.setHealthBar(enemy.health, enemy.maxHealth);

	tile.el.classList.remove("face-left", "face-right");

	if (enemy.direction === "left") {
		tile.el.classList.add("face-left");
	} else if (enemy.direction === "right") {
		tile.el.classList.add("face-right");
	}
}

function clearEnemy(tile) {
	tile.setBaseType("floor");
	tile.setCharacter(null);
	tile.setHealthBar(0, 1);
}
