"use strict";

var util = require('util');
var minimist = require('minimist');

/**
 * Parse arguments and return command object
 * @param  {array} 	argv Command line arguments
 * @param  {object} opts Argument parsing options and commands
 * @return {object}      Command object
 */
module.exports = function(argv, opts) {
	if (!argv) argv = process.argv.slice(2);

	opts = opts || {};
	opts.commands = opts.commands || {};
	opts.stopEarly = true;

	var global_args = minimist(argv, opts);
	var command = global_args._[0];

	var options = opts.commands[command] || {};
	var callback = options.callback || options.cb;
	if (opts.inheritCommon) {
		options = util._extend(opts, options);
	}

	var args = minimist(global_args._.slice(1), options);

	function execCommand() {
		if (typeof callback === 'function') {
			return callback.apply(null, [args].concat(arguments));
		}
		return false;
	};

	return {
		name: command,
		common: global_args,
		args: args,
		exec: execCommand,
	};
};
