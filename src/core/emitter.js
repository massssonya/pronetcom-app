var Emitter = (function () {
	var events = {};

	return {
		on: function (eventName, listener) {
			if (!events[eventName]) {
				events[eventName] = [];
			}
			events[eventName].push(listener);
		},

		off: function (eventName, listener) {
			if (!events[eventName]) return;
			events[eventName] = events[eventName].filter(function (fn) {
				return fn !== listener;
			});
		},

		emit: function (eventName, data) {
			if (!events[eventName]) return;
			events[eventName].forEach(function (listener) {
				listener(data);
			});
		}
	};
})();
