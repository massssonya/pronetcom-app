function Room(x, y, width, height) {
	Rect.call(this, x, y, width, height);
}

Room.prototype = Object.create(Rect.prototype);
Room.prototype.constructor = Room;

Room.prototype.getCenter = function () {
	return {
		x: getCenter(this.x, this.width),
		y: getCenter(this.y, this.height)
	};
};

Room.prototype.intersectsOtherRoom = function (otherRoom) {
	return !(
		isIntersecting(this.x, this.width, otherRoom.x, otherRoom.width) ||
		isIntersecting(this.y, this.height, otherRoom.y, otherRoom.height)
	);
};

Room.prototype.isAdjacentToRoad = function (roads) {
	for (var i = 0; i < roads.length; i++) {
		var road = roads[i];

		var x1 = road.x - 1;
		var y1 = road.y - 1;
		var x2 = road.x + road.width;
		var y2 = road.y + road.height;

		if (
			this.x + this.width >= x1 &&
			this.x <= x2 &&
			this.y + this.height >= y1 &&
			this.y <= y2
		) {
			return true;
		}
	}
	return false;
};
