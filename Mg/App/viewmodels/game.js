define(['plugins/http', 'durandal/app', 'knockout', 'services/engine', 'jquery'], function (http, app, ko, eng, $) {
	var vm = function () {
		var self = this;
		var counterInterval, scoreInterval, startGameInterval, scoreDelta = 0;

		function timer() {
			var count = self.timeLeft() - 1;
			self.timeLeft(count);
			if (count <= 0) {
				clearInterval(counterInterval);
				self.canPlay(false);
				return;
			}
		}

		function scoreEffect() {
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
				self.canPlay(true);
			}
			$('#score').animate({ 'font-size': '1em', 'color': '#000000' }, 50);
		}

		self.timeLeft = ko.observable(120);
		self.gamerows = ko.observableArray([]);
		self.score = ko.observable(0);
		self.canPlay = ko.observable(true);
		self.chooseBox = function (box) {
			var result = eng.boxChosen({ row: box.row, col: box.col, val: box.val() });
			$('#r' + box.row + 'c' + box.col).css({ "background-color": (result.isValid ? "green" : "#F23423"), 'background-image': 'linear-gradient(to bottom, #FFFFFF, ' + (result.isValid ? "green" : "#F23423") + ')' }).fadeOut('slow', function () {
				self.gamerows()[box.row][box.col].val(result.newValue);
				$(this).css({ "background-color": "#F5F5F5", 'background-image': 'linear-gradient(to bottom, #FFFFFF, #E6E6E6)' }).fadeIn();
			});

			self.canPlay(false);
			scoreDelta = result.score - self.score();
			timeIteration = 500 / scoreDelta;
			scoreInterval = setInterval(scoreEffect, 50);
		};

		self.activate = function (type, number) {
			var board = eng.startGame(type, number);

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