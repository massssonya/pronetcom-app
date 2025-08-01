function Tile(x, y, baseType = "wall", itemType = null, characterType = null) {
	this.x = x;
	this.y = y;

	this.baseType = baseType; // floor, wall
	this.itemType = itemType; // sword, health
	this.characterType = characterType; // player, enemy

	this.el = document.createElement("div");
	this.setBaseType(baseType);

	this.el.style.left = `${x * TILE_SIZE}px`;
	this.el.style.top = `${y * TILE_SIZE}px`;
	this.el.dataset.x = x.toString();
	this.el.dataset.y = y.toString();
}

Tile.prototype.setBaseType = function (type) {
	this.baseType = type;
	updateRendering(this.el, type, this.itemType, this.characterType);
};

Tile.prototype.setItem = function (type) {
	this.itemType = type;
	updateRendering(this.el, this.baseType, type, this.characterType);
};

Tile.prototype.setCharacter = function (type) {
	this.characterType = type;
	updateRendering(this.el, this.baseType, this.itemType, type);
};

Tile.prototype.isWall = function () {
	return this.baseType === "wall";
};

Tile.prototype.isFloor = function () {
	return this.baseType === "floor";
};

Tile.prototype.isPlayer = function () {
	return this.characterType === "player";
};

Tile.prototype.isEnemy = function () {
	return this.characterType === "enemy";
};

Tile.prototype.isSword = function () {
	return this.itemType === "sword";
};

Tile.prototype.isHealth = function () {
	return this.itemType === "health";
};

Tile.prototype.getElement = function () {
	return this.el;
};

Tile.prototype.setHealthBar = function (health, maxHealth) {
	renderHealthBar(this.el, health, maxHealth);
};
