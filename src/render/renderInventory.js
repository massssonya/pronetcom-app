function renderInventory(items) {
	var inventoryEl = document.querySelector(".inventory");
	if (!inventoryEl) return;

	inventoryEl.innerHTML = "";

	for (var i = 0; i < items.length; i++) {
		var el = document.createElement("div");
		el.className = "inventory-item";

		switch (items[i]) {
			case "sword":
				el.classList.add("tileSW");
				break;
			default:
				el.textContent = items[i];
				break;
		}

		inventoryEl.appendChild(el);
	}
}
