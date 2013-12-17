define([], function () {
	var self = this;

	self.multiples = {};
	self.multiples.two = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60];
	self.multiples.three = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60];

	self.type = 'multiples';
	self.number = 'two';
	self.board = [];

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function createBoard() {
		var correctAnswers = self[type][number];

		for (var j = 0; j < 4; j++) {
			correctAnswers.sort(function () { return 0.5 - Math.random() }); // randomize array
			var row = correctAnswers.slice(0, 2); // grab first two
			for (var i = 0; i < 4; i++) {
				row.push(getRandomInt(1, 60));
			}
			row.sort(function () { return 0.5 - Math.random() });
			self.board.push(row);
		}
		return self.board;
	}

	self.isValid = function (value) {
		return self[type][number].indexOf(value) !== -1;
	}

	self.startGame = function (type, number) {
		self.type = type;
		self.number = number;
		return createBoard();
	}

	return this;
});