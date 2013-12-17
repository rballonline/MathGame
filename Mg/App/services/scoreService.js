define(['plugins/http'], function (http) {
	return {
		getHiScores: function () {
			return { scores: [{ name: 'Will', score: 10 },
				{ name: 'Jill', score: 10 },
				{ name: 'Pill', score: 10}]
			}
		}
	};
});