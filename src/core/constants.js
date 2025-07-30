var TILE_SIZE = 50;

var FIELD_X = 40;
var FIELD_Y = 24;

var ROOM_COUNT_MIN = 5;
var ROOM_COUNT_MAX = 10;
var ROOM_SIZE_MIN = 3;
var ROOM_SIZE_MAX = 8;

var COUNT_SWORD = 2;
var COUNT_HEALTH = 10;
var COUNT_ENEMY = 10;

var DIRECTIONS_FOR_ATTACK = [
	{ dx: 0, dy: -1 }, // вверх
	{ dx: 0, dy: 1 }, // вниз
	{ dx: -1, dy: 0 }, // влево
	{ dx: 1, dy: 0 }, // вправо
	{ dx: -1, dy: -1 }, // влево-вверх (диагональ)
	{ dx: 1, dy: -1 }, // вправо-вверх
	{ dx: -1, dy: 1 }, // влево-вниз
	{ dx: 1, dy: 1 } // вправо-вниз
];
