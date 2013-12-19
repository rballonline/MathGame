define([], function () {
	var vm = function () {
		var self = this;

		self.type = ko.observable();

		self.activate = function (type) {
			self.type(type);
			switch (type) {
				case "multiples", "factors":
					break;
				default:
					break;
			}
		};
	};
	return vm;
});