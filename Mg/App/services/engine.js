define([], function () {
	var self = this;
	var type = 'multiples';
	var number = 'two';
	var score = 0;
	var streak = 0;
	var NUMBER_MAX = 60;
	var board = [];

	var gameTypes = {
		multiples: {
			two: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42, 44, 46, 48, 50, 52, 54, 56, 58, 60],
			three: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60]
		},
		factors: {
		}
	};

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function createBoard() {
		var correctAnswers = gameTypes[type][number];

		for (var j = 0; j < 4; j++) {
			correctAnswers.sort(function () { return 0.5 - Math.random() }); // randomize array
			var row = correctAnswers.slice(0, 2); // grab first two
			for (var i = 0; i < 4; i++) {
				row.push(getRandomInt(1, NUMBER_MAX));
			}
			row.sort(function () { return 0.5 - Math.random() });
			board.push(row);
		}
		return board;
	}

	function isValid(value) {
		return gameTypes[type][number].indexOf(value) !== -1;
	}

	self.boxChosen = function (box) {
		var row = board[box.row];
		var numberOfCorrectAnswers = 0;
		var valid = false;

		for (var i = 0; i < row.length; i++) {
			if (isValid(row[i])) {
				numberOfCorrectAnswers++;
			}
		}

		var newAnswer = getRandomInt(1, NUMBER_MAX);
		if (numberOfCorrectAnswers < 2) {
			newAnswer = gameTypes[type][number][getRandomInt(0, gameTypes[type][number].length - 1)];
		}

		if (isValid(box.val)) {
			valid = true;
			score += 10;
			streak++;

			if (streak > 3) {
				score += 5;
			}

			if (streak > 5) {
				score += 2;
			}

			if (streak > 10) {
				score += 5;
			}
		}
		else {
			valid = false;
			streak = 0;
			score -= 5;
		}

		return { newValue: newAnswer, isValid: valid, streak: streak, score: score };
	};

	self.startGame = function (gameType, gameNumber) {
		type = gameType;
		number = gameNumber;
		streak = 0;
		score = 0;
		time = 120;
		board = [];
		return createBoard();
	};

	return this;
});