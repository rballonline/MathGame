define(['plugins/http', 'durandal/app', 'knockout', 'services/engine', 'jquery'], function (http, app, ko, eng, $) {
	var vm = function () {
		var self = this;
		var counterInterval,
			startGameInterval,
			startGameCount = 4,
			gameType,
			gameNumber;

		function timer() {
			var count = self.timeLeft() - 1;
			self.timeLeft(count);
			if (count <= 0) {
				clearInterval(counterInterval);
				self.canPlay(false);
				app.showMessage('Play Again?', 'Time is up!', ['Yes', 'No']).then(function (response) {
					if (response === 'Yes') {
						self.startGame();
					}
					else {
						window.location = '#/';
					}
				});
			}
		}

		function startGameTimer() {
			startGameCount--;
			switch (startGameCount) {
				case 3:
					self.status('Get ready');
					break;
				case 2:
					self.status('Get set');
					break;
				case 1:
					self.status('GO!');
					break;
				case 0:
					self.status('');
					startNewGame();
					clearInterval(startGameInterval);
					break;
			}
		}

		self.status = ko.observable();
		self.streak = ko.observable();
		self.timeLeft = ko.observable(45);
		self.gamerows = ko.observableArray([]);
		self.score = ko.observable(0);
		self.canPlay = ko.observable(true);
		self.chooseBox = function (box) {
			var result = eng.boxChosen({ row: box.row, col: box.col, val: box.val() });
			$('#r' + box.row + 'c' + box.col).css({ "background-color": (result.isValid ? "green" : "#F23423"), 'background-image': 'linear-gradient(to bottom, #FFFFFF, ' + (result.isValid ? "green" : "#F23423") + ')' }).fadeOut('slow', function () {
				for (var i = 0; i < result.newRow.length; i++) {
					self.gamerows()[box.row][i].val(result.newRow[i]);
				}
				$(this).css({ "background-color": "#F5F5F5", 'background-image': 'linear-gradient(to bottom, #FFFFFF, #E6E6E6)' }).fadeIn();
			});

			self.streak(result.streak);
			var scoreDelta = result.score - self.score();
			var timeIteration = 500 / scoreDelta;

			var scoreInterval = setInterval(function () {
				if (scoreDelta > 0) {
					$('#score').css({ 'font-size': '2.2em', 'color': 'green' });
					self.score(self.score() + 1);
					scoreDelta--;
				}
				else {
					$('#score').css({ 'font-size': '2.2em', 'color': '#F23423' });
					self.score(self.score() - 1);
					scoreDelta++;
				}
				if (scoreDelta == 0) {
					clearInterval(scoreInterval);
				}
				$('#score').animate({ 'font-size': '1em', 'color': '#000000' }, 50);
			}, 50);
		};

		function startNewGame() {
			var board = eng.startGame(gameType, gameNumber);

			self.gamerows([]);
			for (var i = 0; i < board.length; i++) {
				var boardrow = board[i];
				var box = [];
				for (var j = 0; j < boardrow.length; j++) {
					box.push({ row: i, col: j, val: ko.observable(boardrow[j]) });
				}
				self.gamerows.push(box);
			}

			self.canPlay(true);
			self.timeLeft(45);

			counterInterval = setInterval(timer, 1000);
		}

		self.startGame = function () {
			startGameCount = 4;
			startGameInterval = setInterval(startGameTimer, 1000);
		};

		self.activate = function (type, number) {
			gameType = type;
			gameNumber = number;
			self.startGame();
		};
		self.compositionComplete = function () {
			var boardHeight = $(window).height() - $('#header').height() - $('#footer').height() - $('.navbar-fixed-top').height();
			$('#board').height(boardHeight);
		};
		self.canDeactivate = function () {
			clearInterval(counterInterval);
			/*if (self.timeLeft() > 0) {
			app.showMessage('Current game in progress, are you sure?', 'End Game', ['Yes', 'No']).then(function (response) {
			if (response === 'Yes') {
			return true;
			}
			else {
			counterInterval = setInterval(timer, 1000);
			return false;
			}
			});
			}*/
			//self.deactivate();
			return true;
		};
	};
	return vm;
});