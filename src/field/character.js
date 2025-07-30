function Character(x, y) {
	this.x = x;
	this.y = y;
	this.direction = "right";

	this.power = 1;
	this.health = 1;
	this.maxHealth = 1;
}

Character.prototype.move = function (dx, dy) {
	this.x += dx;
	this.y += dy;

	if (dx > 0) this.direction = "right";
	else if (dx < 0) this.direction = "left";
};

Character.prototype.getPower = function () {
	return this.power;
};

Character.prototype.takeDamage = function (amount) {
	this.health -= amount;
	if (this.health <= 0) {
		this.health = 0;
		this.died();
	}
};

Character.prototype.setHealth = function (amount) {
	if (this.health + amount > this.maxHealth) {
		amount = this.maxHealth - this.health;
	}
	this.health += amount;
};

Character.prototype.setPower = function (amount) {
	this.power += amount;
};

Character.prototype.died = function () {};
