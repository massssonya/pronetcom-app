function Player(x, y) {
	Character.call(this, x, y);
	this.power = 1;
	this.health = 10;
	this.maxHealth = 10;
	this.inventory = [];
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.addToInventory = function (item) {
	this.inventory.push(item);
	renderInventory(this.inventory);
};

Player.prototype.died = function () {
	showGameOverModal();
};
