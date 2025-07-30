function Tile(x, y, type = "wall") {
	this.x = x;
	this.y = y;
	this.type = type;

	this.el = document.createElement("div");
	this.setType(type);

	this.el.style.left = `${x * TILE_SIZE}px`;
	this.el.style.top = `${y * TILE_SIZE}px`;
	this.el.dataset.x = x.toString();
	this.el.dataset.y = y.toString();
}

Tile.prototype.setType = function (type) {
	this.type = type;
	renderTileType(this.el, type);
};

Tile.prototype.isWall = function () {
	return this.type === "wall";
};

Tile.prototype.isFloor = function () {
	return this.type === "floor";
};

Tile.prototype.isPlayer = function () {
	return this.type === "player";
};

Tile.prototype.isEnemy = function () {
	return this.type === "enemy";
};

Tile.prototype.isSword = function () {
	return this.type === "sword";
};

Tile.prototype.isHealth = function () {
	return this.type === "health";
};

Tile.prototype.getElement = function () {
	return this.el;
};

Tile.prototype.setHealthBar = function (health, maxHealth) {
	renderHealthBar(this.el, health, maxHealth);
};
