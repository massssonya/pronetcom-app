function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCenter(coordinate, size) {
	return Math.floor(coordinate + size / 2);
}

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

function sign(n) {
	if (n > 0) return 1;
	if (n < 0) return -1;
	return 0;
}
