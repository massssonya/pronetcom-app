function renderTile(tile, container) {
	const element = tile.getElement();
	container.appendChild(element);
}

function updateRendering(tileEl, baseType, itemType, characterType) {
	tileEl.innerHTML = ""; // очистить содержимое перед перерисовкой
	tileEl.className = "tile";

	// base layer
	const baseEl = document.createElement("div");
	baseEl.className = "tile-base";
	switch (baseType) {
		case "wall":
			baseEl.classList.add("tileW");
			break;
		default:
			baseEl.classList.add("tileF");
	}
	tileEl.appendChild(baseEl);

	// item layer
	if (itemType === "sword" || itemType === "health") {
		const itemEl = document.createElement("div");
		itemEl.className = "tile-item";
		if (itemType === "sword") itemEl.classList.add("tileSW");
		if (itemType === "health") itemEl.classList.add("tileHP");
		tileEl.appendChild(itemEl);
	}

	// character layer
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
	// Найти элемент персонажа
	var characterEl = tileEl.querySelector(".tile-character");
	if (!characterEl) return;

	// Удалить старый индикатор здоровья, если есть
	var oldHealth = characterEl.querySelector(".health");
	if (oldHealth) {
		oldHealth.remove();
	}

	// Создать новый индикатор
	var healthEl = document.createElement("div");
	healthEl.className = "health";

	healthEl.style.width = (health / maxHealth) * 100 + "%";


	characterEl.appendChild(healthEl);

	// var oldHealth = tileEl.querySelector(".health");
	// if (oldHealth) {
	// 	tileEl.removeChild(oldHealth);
	// }

	// var healthEl = document.createElement("div");
	// healthEl.className = "health";

	// healthEl.style.width = (health / maxHealth) * 100 + "%";

	// tileEl.appendChild(healthEl);
}
