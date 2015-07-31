# Simpleton

Node.js command line argument parser with command callback support.

Uses [minimist](https://github.com/substack/minimist) to parse command line arguments, see it's documentation for available argument options.

# Usage

Using `simpleton` is as easy as defining command callback methods and command
line argument options.

Example usage from `examples/example.js`:

```javascript
var simpleton = require('simpleton');

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
```

Example output with different arguments:

`> node examples/example.js -h`
```
Command: undefined
Common: { _: [], help: true, h: true }
Args: { _: [], help: false, h: false }
```

`> node examples/example.js list -h -f file.txt`
```
Command: list
Common: { _: [ 'list', '-h', '-f', 'file.txt' ], help: false, h: false }
Args: { _: [], help: false, h: true, f: 'file.txt', file: 'file.txt' }

Running 'list' command with { '0': { _: [], help: false, h: true, f: 'file.txt', file: 'file.txt' }, '1': { '0': 'extra argument' } }
```

`> node examples/example.js help`
```
Command: help
Common: { _: [ 'help' ], help: false, h: false }
Args: { _: [], help: false, h: false }

HELP!
```
