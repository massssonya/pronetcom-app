function Game(container, width, height) {
	this.width = width;
	this.height = height;
	this.field = new Field(container, this.width, this.height);
}

Game.prototype.init = function () {
	this.field.init(this.width, this.height);
};
