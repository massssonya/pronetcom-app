function Tile(x, y, baseType, itemType, characterType) {
	this.x = x;
	this.y = y;
	this.baseType = baseType || "wall";
	this.itemType = itemType || null;
	this.characterType = characterType || null;

	this.el = document.createElement("div");
	// this.el.dataset.x = x;
	// this.el.dataset.y = y;
	this.render();
}

Tile.prototype.setBaseType = function (type) {
	this.baseType = type;
	this.render();
};

Tile.prototype.setItem = function (type) {
	this.itemType = type;
	this.render();
};

Tile.prototype.setCharacter = function (type) {
	this.characterType = type;
	this.render();
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

Tile.prototype.render = function (container) {
	renderTile(this, container);
};
