function Enemy(x, y) {
	Character.call(this, x, y);
	this.power = 1;
	this.health = 3;
	this.maxHealth = 3;
	this.direction = Math.random() > 0.5 ? "right" : "left";
}

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.isAdjacentTo = function (player) {
	var dx = Math.abs(this.x - player.x);
	var dy = Math.abs(this.y - player.y);
	return dx <= 1 && dy <= 1 && !(dx === 0 && dy === 0);
};

Enemy.prototype.attackIfAdjacent = function (player) {
	if (this.isAdjacentTo(player)) {
		player.takeDamage(this.power);
	}
};

Enemy.prototype.moveTowardsPlayerOrRandom = function (field, player) {
	var dx = player.x - this.x;
	var dy = player.y - this.y;

	if (dx > 0) this.direction = "right";
	else if (dx < 0) this.direction = "left";

	this.attackIfAdjacent(player);

	var directions = shuffleArray([
		{ dx: sign(dx), dy: 0 },
		{ dx: 0, dy: sign(dy) },
		{ dx: sign(dx), dy: sign(dy) }
	]);

	for (var i = 0; i < directions.length; i++) {
		var dir = directions[i];
		var newX = this.x + dir.dx;
		var newY = this.y + dir.dy;

		if (
			newX >= 0 &&
			newX < field.width &&
			newY >= 0 &&
			newY < field.height &&
			field.tiles[newX][newY].isFloor()
		) {
			var oldTile = field.tiles[this.x][this.y];
			clearEnemy(oldTile);

			this.x = newX;
			this.y = newY;

			var newTile = field.tiles[this.x][this.y];
			renderEnemy(newTile, this);
			break;
		}
	}
};
