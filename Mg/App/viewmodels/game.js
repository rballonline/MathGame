define(['plugins/http', 'knockout', 'services/engine'], function (http, ko, eng) {
	return {
		timer: ko.observable(),
		gamerows: ko.observableArray([]),
		chooseBox: function (box) {
			alert('box chosen val: ' + box.val + ' row: ' + box.row + ' col: ' + box.col + ' valid? ' + eng.isValid(box.val));
		},
		activate: function (type) {
			var board = eng.startGame(type, 'three');

			for (var i = 0; i < board.length; i++) {
				var boardrow = board[i];
				var box = ko.observableArray([]);
				for (var j = 0; j < boardrow.length; j++) {
					box.push({ row: i, col: j, val: boardrow[j]});
				}
				this.gamerows.push(box);
			}
		},
		canDeactivate: function () {
			//the router's activator calls this function to see if it can leave the screen
			return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
		}
	};
});