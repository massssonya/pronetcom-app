function Player(x, y, options) {
	Character.call(this, x, y);

	this.power = 1;
	this.health = 10;
	this.maxHealth = 10;
	this.inventory = [];

	this.onDeath = options.onDeath || null;

	PlayerEvents.created(this);
}

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;

Player.prototype.addToInventory = function (item) {
	this.inventory.push(item);
	renderInventory(this.inventory);
	PlayerEvents.inventoryChanged(this.inventory);
};

Player.prototype.died = function () {
	PlayerEvents.died(this);
	showGameOverModal();
	if (typeof this.onDeath === "function") {
		this.onDeath();
	}
};
