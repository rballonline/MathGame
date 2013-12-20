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
			three: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60],
			four: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60],
			five: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
			six: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60],
			seven: [7, 14, 21, 28, 35, 42, 49, 56],
			eight: [8, 16, 24, 32, 40, 48, 56],
			nine: [9, 18, 27, 36, 45, 54],
			eleven: [11, 22, 33, 44, 55],
			twelve: [12, 24, 36, 48, 60]
		},
		factors: {
		}
	};

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function randomizedSort() { return 0.5 - Math.random() }

	function createBoard() {
		if (!type || !number) {
			return [];
		}
		var correctAnswers = gameTypes[type][number];

		for (var j = 0; j < 4; j++) {
			correctAnswers.sort(randomizedSort);
			var row = correctAnswers.slice(0, 2); // grab first two
			for (var i = 0; i < 4; i++) {
				row.push(getRandomInt(1, NUMBER_MAX));
			}
			row.sort(randomizedSort);
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

		row[box.col] = getRandomInt(1, NUMBER_MAX);

		if (numberOfCorrectAnswers < 3) {
			row[box.col] = gameTypes[type][number][getRandomInt(0, gameTypes[type][number].length - 1)];
			row.sort(randomizedSort);
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

		return { newRow: row, isValid: valid, streak: streak, score: score };
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