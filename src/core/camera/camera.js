function Camera(viewportWidth, viewportHeight, tileSize) {
	this.viewportWidth = viewportWidth;
	this.viewportHeight = viewportHeight;
	this.tileSize = tileSize;
	this.target = null;
	this.fieldEl = null;
	this.mapWidth = 0;
	this.mapHeight = 0;
}

Camera.prototype.attach = function (fieldEl, mapWidth, mapHeight) {
	this.fieldEl = fieldEl;
	this.mapWidth = mapWidth;
	this.mapHeight = mapHeight;
};

Camera.prototype.follow = function (target) {
	this.target = target;
	this.update();
};

Camera.prototype.update = function () {
	if (!this.target || !this.fieldEl) return;

	var TILE_SIZE = this.tileSize;
	var fieldWidthPx = this.mapWidth * TILE_SIZE;
	var fieldHeightPx = this.mapHeight * TILE_SIZE;

	var playerCenterX = this.target.x * TILE_SIZE + TILE_SIZE / 2;
	var playerCenterY = this.target.y * TILE_SIZE + TILE_SIZE / 2;

	var offsetX = this.viewportWidth / 2 - playerCenterX;
	var offsetY = this.viewportHeight / 2 - playerCenterY;

	var minOffsetX = Math.min(0, this.viewportWidth - fieldWidthPx);
	var maxOffsetX = 0;

	var minOffsetY = Math.min(0, this.viewportHeight - fieldHeightPx);
	var maxOffsetY = 0;

	offsetX = Math.min(Math.max(offsetX, minOffsetX), maxOffsetX);
	offsetY = Math.min(Math.max(offsetY, minOffsetY), maxOffsetY);

	renderCameraTransform(this.fieldEl, offsetX, offsetY);
};
