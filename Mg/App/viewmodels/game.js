define(['plugins/http', 'durandal/app', 'knockout', 'services/engine', 'jquery'], function (http, app, ko, eng, $) {
	var self = this;
	var counter;

	function timer() {
		var count = self.timeLeft() - 1;
		self.timeLeft(count);
		if (count <= 0) {
			clearInterval(counter);
			self.canPlay(false);
			return;
		}
	}

	self.timeLeft = ko.observable(120);
	self.gamerows = ko.observableArray([]);
	self.score = ko.observable(0);
	self.canPlay = ko.observable(true);
	self.chooseBox = function (box) {
		var result = eng.boxChosen({ row: box.row, col: box.col, val: box.val() });
		self.gamerows()[box.row][box.col].val(result.newValue);
		self.score(result.score);
	};
	self.activate = function (type) {
		var board = eng.startGame(type, 'three');

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

		counter = setInterval(timer, 1000);
	};
	self.compositionComplete = function () {
		var boardHeight = $(window).height() - $('#header').height() - $('#footer').height() - $('.navbar-fixed-top').height();
		$('#board').height(boardHeight);
	};
	self.canDeactivate = function () {
		clearInterval(counter);
		if (self.timeLeft() > 0) {
			app.showMessage('Current game in progress, are you sure?', 'End Game', ['Yes', 'No']).then(function (response) {
				if (response === 'Yes') {
					return true;
				}
				else {
					counter = setInterval(timer, 1000);
					return false;
				}
			});
		}
	};
	return self;
});