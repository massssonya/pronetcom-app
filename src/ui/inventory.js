function renderInventory(items) {
	var inventoryEl = document.querySelector(".inventory");
	if (!inventoryEl) return;

	inventoryEl.innerHTML = "";

	for (var i = 0; i < items.length; i++) {
		var item = items[i];
		var el = document.createElement("div");
		el.className = "inventory-item";

		if (ITEM_TYPES[item]) {
			el.classList.add(ITEM_TYPES[item]);
		} else {
			el.textContent = item;
		}

		inventoryEl.appendChild(el);
	}
}
