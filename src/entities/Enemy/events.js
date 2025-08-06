var EnemyEvents = {
	created: function (enemy) {
		Emitter.emit("enemy:created", {
			x: enemy.x,
			y: enemy.y,
			health: enemy.health,
			maxHealth: enemy.maxHealth,
			power: enemy.power
		});
	},

	healthChanged: function (enemy) {
		Emitter.emit("enemy:healthChanged", {
			x: enemy.x,
			y: enemy.y,
			health: enemy.health,
			maxHealth: enemy.maxHealth
		});
	},

	moved: function (enemy, fromX, fromY, toX, toY) {
		Emitter.emit("enemy:moved", {
			from: { x: fromX, y: fromY },
			to: { x: toX, y: toY }
		});
	},

	attacked: function (enemy, success) {
		Emitter.emit("enemy:attacked", {
			x: enemy.x,
			y: enemy.y,
			success: success
		});
	},

	died: function (enemy) {
		Emitter.emit("enemy:died", {
			x: enemy.x,
			y: enemy.y
		});
	}
};
