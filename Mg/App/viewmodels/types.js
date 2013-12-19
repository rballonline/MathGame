define(['knockout'], function (ko) {
	var self = this;
	self.typeSelected = ko.observable(false);
	self.type = ko.observable();

	self.activate = function (type) {
		if (type) {
			self.typeSelected(true);
			self.type(type);
		}
	};

	return self;
});