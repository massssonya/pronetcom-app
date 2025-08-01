function Field(container, width, height) {
	this.container = container;
	this.width = width;
	this.height = height;
	this.tiles = [];
	this.rooms = [];
	this.roads = [];

	this.player = null;
	this.enemies = [];

	this.camera = new Camera(1024, 640, TILE_SIZE);
	this.camera.attach(this.container, this.width, this.height);
}

Field.prototype.init = function () {
	this.generateTiles();
	this.generateRoads();
	this.generateRooms();
	this.spawn("health", (tile) => tile.isFloor(), COUNT_HEALTH);
	this.spawn(
		"sword",
		(tile) => tile.isFloor() && !tile.isHealth(),
		COUNT_SWORD
	);
	this.spawn("player", (tile) => tile.isFloor() && !tile.isEnemy(), 1);
	this.spawn(
		"enemy",
		(tile) => tile.isFloor() && !tile.isPlayer(),
		COUNT_ENEMY
	);
	this.startEnemyLoop();
};

Field.prototype.generateTiles = function () {
	this.tiles = [];

	for (let x = 0; x < this.width; x++) {
		var col = [];
		for (let y = 0; y < this.height; y++) {
			var tile = new Tile(x, y, "wall");
			col.push(tile);
		}
		this.tiles.push(col);
	}
	renderField(this.tiles, this.container);
};

Field.prototype.generateRooms = function () {
	this.rooms = [];
	var roomCount = randomInt(ROOM_COUNT_MIN, ROOM_COUNT_MAX);

	for (var i = 0; i < roomCount; i++) {
		var w = randomInt(ROOM_SIZE_MIN, ROOM_SIZE_MAX);
		var h = randomInt(ROOM_SIZE_MIN, ROOM_SIZE_MAX);
		var x = randomInt(0, this.width - w);
		var y = randomInt(0, this.height - h);

		var newRoom = new Room(x, y, w, h);

		var adjacentToRoad = isRoomAdjacentToRoad(newRoom, this.tiles);

		if (adjacentToRoad) {
			this.rooms.push(newRoom);

			for (var tx = x; tx < x + w; tx++) {
				for (var ty = y; ty < y + h; ty++) {
					this.tiles[tx][ty].setBaseType("floor");
				}
			}
		}
	}
};

Field.prototype.generateRoads = function () {
	var tiles = this.tiles;
	var width = this.width;
	var height = this.height;
	var roads = this.roads;

	var horizontalCount = randomInt(3, 5);
	for (var i = 0; i < horizontalCount; i++) {
		var y = randomInt(0, height - 1);
		generateRoad(tiles, 0, y, width, "horizontal", roads);
	}

	var verticalCount = randomInt(3, 5);
	for (var j = 0; j < verticalCount; j++) {
		var x = randomInt(0, width - 1);
		generateRoad(tiles, x, 0, height, "vertical", roads);
	}
};

Field.prototype.spawn = function (type, conditionFn, count) {
	var availableTiles = [];

	for (var x = 0; x < this.width; x++) {
		for (var y = 0; y < this.height; y++) {
			var tile = this.tiles[x][y];
			if (conditionFn(tile)) {
				availableTiles.push(tile);
			}
		}
	}

	shuffleArray(availableTiles);

	for (var i = 0; i < count && i < availableTiles.length; i++) {
		availableTiles[i].setItem(type);
	}

	if (type === "player") {
		this.player = new Player(availableTiles[0].x, availableTiles[0].y, {
			onDeath: this.stopEnemyLoop.bind(this)
		});

		const tile = availableTiles[0];
		tile.setItem(null);
		tile.setCharacter("player");
		renderPlayer(tile, this.player);

		this.camera.follow(this.player);
		this.camera.update();
	}

	if (type === "enemy") {
		for (var i = 0; i < count; i++) {
			const tile = availableTiles[i];
			tile.setItem(null);
			tile.setCharacter("enemy");
			const enemy = new Enemy(tile.x, tile.y);
			this.enemies.push(enemy);
			renderEnemy(tile, enemy);
		}
	}
};

Field.prototype.movePlayer = function (dx, dy) {
	var newX = this.player.x + dx;
	var newY = this.player.y + dy;

	if (newX < 0 || newX >= this.width || newY < 0 || newY >= this.height) return;

	var targetTile = this.tiles[newX][newY];

	if (!targetTile.isFloor() && !targetTile.isHealth() && !targetTile.isSword())
		return;
	if (targetTile.isEnemy()) return;

	if (targetTile.isHealth()) {
		this.player.setHealth(1);
		targetTile.setItem(null);
	}

	if (targetTile.isSword()) {
		this.player.setPower(1);
		this.player.addToInventory("sword");
		targetTile.setItem(null);
	}

	var oldTile = this.tiles[this.player.x][this.player.y];
	clearPlayer(oldTile);

	this.player.move(dx, dy);

	var newTile = this.tiles[this.player.x][this.player.y];
	renderPlayer(newTile, this.player);

	this.camera.update();
};

Field.prototype.playerAttack = function () {
	var x = this.player.x;
	var y = this.player.y;

	for (var i = 0; i < DIRECTIONS_FOR_ATTACK.length; i++) {
		var nx = x + DIRECTIONS_FOR_ATTACK[i].dx;
		var ny = y + DIRECTIONS_FOR_ATTACK[i].dy;

		if (nx < 0 || ny < 0 || nx >= this.width || ny >= this.height) continue;

		var tile = this.tiles[nx][ny];

		if (tile.isEnemy()) {
			var enemy = this.enemies.find(function (e) {
				return e.x === nx && e.y === ny;
			});

			enemy.setHealth(-this.player.power);

			renderEnemy(tile, enemy);

			if (enemy.health <= 0) {
				this.enemies.splice(this.enemies.indexOf(enemy), 1);
				if (this.enemies.length === 0) {
					this.stopEnemyLoop();
				}
				clearEnemy(tile);
			}
		}
	}
};

Field.prototype.startEnemyLoop = function () {
	this.enemyLoop = setInterval(() => {
		this.updateEnemies();
	}, 500);
};

Field.prototype.stopEnemyLoop = function () {
	if (this.enemyLoop) {
		clearInterval(this.enemyLoop);
		this.enemyLoop = null;
	}
};

Field.prototype.updateEnemies = function () {
	for (let enemy of this.enemies) {
		enemy.patrol(this, this.player);
	}
};

function generateRoad(tiles, startX, startY, length, direction, roads) {
	var width = direction === "horizontal" ? length : 1;
	var height = direction === "vertical" ? length : 1;

	var road = new Road(startX, startY, width, height);
	roads.push(road);

	for (var dx = 0; dx < width; dx++) {
		for (var dy = 0; dy < height; dy++) {
			var x = startX + dx;
			var y = startY + dy;
			if (tiles[x] && tiles[x][y]) {
				tiles[x][y].setBaseType("floor");
			}
		}
	}
}

function isRectAdjacentToOtherRects(rect, otherRects) {
	for (var i = 0; i < otherRects.length; i++) {
		var other = otherRects[i];

		var x1 = other.x - 1;
		var y1 = other.y - 1;
		var x2 = other.x + other.width;
		var y2 = other.y + other.height;

		if (
			rect.x + rect.width >= x1 &&
			rect.x <= x2 &&
			rect.y + rect.height >= y1 &&
			rect.y <= y2
		) {
			return true;
		}
	}
	return false;
}

function isRoomAdjacentToRoad(room, tiles) {
	for (var x = room.x - 1; x <= room.x + room.width; x++) {
		for (var y = room.y - 1; y <= room.y + room.height; y++) {
			if (x < 0 || y < 0 || x >= tiles.length || y >= tiles[0].length) continue;

			if (tiles[x][y].isFloor()) {
				return true;
			}
		}
	}
	return false;
}
