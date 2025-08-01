function renderField(tiles, container) {
	container.innerHTML = "";
	for (let x = 0; x < tiles.length; x++) {
		for (let y = 0; y < tiles[x].length; y++) {
			renderTile(tiles[x][y], container);
		}
	}
}
