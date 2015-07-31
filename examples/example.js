"use strict";

var simpleton = require('../index.js');

var options = {
	// options used to parse arguments before command
	alias: {
		help: 'h'
	},
	boolean: [ 'help' ],
	// command callbacks and argument options
	commands: {
		list: {
			alias: {
				file: 'f'
			},
			default: {
				file: 'test-file.txt'
			},
			cb: function(args) {
				console.log("Running 'list' command with", arguments);
			}
		},
		help: {
			callback: function(args) {
				console.log('HELP!');
			}
		}
	},
	inheritCommon: true, // if true, extend command options with common options
};

var command = simpleton(process.argv.slice(2), options);

// example command object content
/*
{
	name: 'list',
	common: { ... }, // arguments parsed before command
	args: { ... }, // arguments parsed after command
	exec: [Function], // method to execute commands callback method
}
*/

console.log('Command:', command.name);
console.log('Common:', command.common);
console.log('Args:', command.args);
console.log();
command.exec('extra argument');
