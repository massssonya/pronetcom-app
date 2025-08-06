function Road(x, y, width, height) {
	Rect.call(this, x, y, width, height);
}

Road.prototype = Object.create(Rect.prototype);
Road.prototype.constructor = Road;
