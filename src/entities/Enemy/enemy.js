function Enemy(
	x,
	y,
	options = {
		missAttackChance: 0
	}
) {
	Character.call(this, x, y);

	this.power = 1;
	this.health = 3;
	this.maxHealth = 3;
	this.direction = Math.random() > 0.5 ? "right" : "left";

	this.missAttackChance = options.missAttackChance;

	EnemyEvents.created(this);
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.isAdjacentTo = function (player) {
	var dx = Math.abs(this.x - player.x);
	var dy = Math.abs(this.y - player.y);
	return dx <= 1 && dy <= 1 && !(dx === 0 && dy === 0);
};

Enemy.prototype.attackIfAdjacent = function (player, field) {
	if (this.isAdjacentTo(player)) {
		var random = Math.random();
		var missed = random < this.missAttackChance;

		EnemyEvents.attacked(this, !missed);

		if (!missed) {
			player.takeDamage(this.power, field);
		}
	}
};

Enemy.prototype.patrol = function (field, player) {
	this.attackIfAdjacent(player, field);

	if (this.isAdjacentTo(player)) return;

	const directions = shuffleArray([
		{ dx: 1, dy: 0 },
		{ dx: -1, dy: 0 },
		{ dx: 0, dy: 1 },
		{ dx: 0, dy: -1 }
	]);

	for (let dir of directions) {
		const newX = this.x + dir.dx;
		const newY = this.y + dir.dy;

		if (dir.dx > 0) this.direction = "right";
		else if (dir.dx < 0) this.direction = "left";

		if (newX >= 0 && newX < field.width && newY >= 0 && newY < field.height) {
			const tile = field.tiles[newX][newY];
			if (tile.isFloor() && !tile.isEnemy() && !tile.isPlayer()) {
				clearEnemy(field.tiles[this.x][this.y]);
				var oldX = this.x;
				var oldY = this.y;
				this.x = newX;
				this.y = newY;
				EnemyEvents.moved(this, oldX, oldY, newX, newY);
				renderEnemy(tile, this);
				break;
			}
		}
	}
};

Enemy.prototype.died = function () {
	EnemyEvents.died(this);
}
