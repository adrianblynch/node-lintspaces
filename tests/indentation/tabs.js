var
	merge = require('merge'),
	Messages = require('./../../lib/constants/messages'),
	Validator = require('./../../lib/Validator'),
	validator,
	report,
	expected,
	file
;

exports.tests = {
	'should report errors when tabs and spaces are mixed': function(test) {
		file = __dirname + '/fixures/mixed.js';
		validator = new Validator({indentation: 'tabs'});
		validator.validate(file);
		report = validator.getInvalidFiles();
		expected = {};
		expected[file] = {
			'5': [merge({}, Messages.INDENTATION_TABS, {line: 5})],
			'6': [merge({}, Messages.INDENTATION_TABS, {line: 6})],
		};

		test.deepEqual(report, expected);
		test.done();
	},

	'should have no reports when file is valid': function(test) {
		file = __dirname + '/fixures/tabs-valid.js';
		validator = new Validator({indentation: 'tabs'});
		validator.validate(file);
		report = validator.getInvalidFiles();

		test.deepEqual({}, report);
		test.done();
	}
};
