var PlayerEvents = {
	created: function (player) {
		Emitter.emit("player:created", {
			x: player.x,
			y: player.y,
			health: player.health,
			maxHealth: player.maxHealth,
			power: player.power
		});
	},

	healthChanged: function (player) {
		Emitter.emit("player:healthChanged", {
			current: player.health,
			max: player.maxHealth
		});
	},

	inventoryChanged: function (inventory) {
		Emitter.emit("player:inventoryChanged", inventory);
	},

	died: function (player) {
		Emitter.emit("player:died", {
			x: player.x,
			y: player.y
		});
	}
};
