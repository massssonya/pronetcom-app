function renderField(tiles, container) {
	container.innerHTML = "";
	for (let x = 0; x < tiles.length; x++) {
		for (let y = 0; y < tiles[x].length; y++) {
			renderTile(tiles[x][y], container);
		}
	}
}

function renderTile(tile, container) {
	const tileEl = tile.el;
	tileEl.innerHTML = "";
	tileEl.className = "tile";

	tileEl.style.left = tile.x * TILE_SIZE + "px";
	tileEl.style.top = tile.y * TILE_SIZE + "px";

	renderBase(tileEl, tile.baseType);
	renderItem(tileEl, tile.itemType);
	renderCharacter(tileEl, tile.characterType);

	if (container) container.appendChild(tileEl);
}

function renderBase(tileEl, baseType) {
	const baseEl = document.createElement("div");
	baseEl.className = "tile-base";
	baseEl.classList.add(baseType === "wall" ? "tileW" : "tileF");
	tileEl.appendChild(baseEl);
}

function renderItem(tileEl, itemType) {
	if (ITEM_TYPES[itemType]) {
		const itemEl = document.createElement("div");
		itemEl.className = "tile-item";
		itemEl.classList.add(ITEM_TYPES[itemType]);
		tileEl.appendChild(itemEl);
	}
}

function renderCharacter(tileEl, characterType) {
	if (characterType === "player" || characterType === "enemy") {
		const charEl = document.createElement("div");
		charEl.className = "tile-character";

		if (characterType === "player") {
			charEl.classList.add("tileP", "face-right");
		} else {
			charEl.classList.add("tileE");
		}

		tileEl.appendChild(charEl);
	}
}


function renderHealthBar(tileEl, health, maxHealth) {
	var characterEl = tileEl.querySelector(".tile-character");
	if (!characterEl) return;

	var oldHealth = characterEl.querySelector(".health");
	if (oldHealth) {
		oldHealth.remove();
	}

	var healthEl = document.createElement("div");
	healthEl.className = "health";

	healthEl.style.width = (health / maxHealth) * 100 + "%";


	characterEl.appendChild(healthEl);
}
