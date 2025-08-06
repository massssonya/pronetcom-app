function Game(container, width, height) {
	this.width = width;
	this.height = height;
	this.field = new Field(container, this.width, this.height);
	this.isPaused = false;
}

Game.prototype.init = function () {
	this.field.init(this.width, this.height);
};

Game.prototype.pause = function () {
	this.isPaused = true;
	this.field.stopEnemyLoop();
};

Game.prototype.resume = function () {
	this.isPaused = false;
	this.field.startEnemyLoop();
};
