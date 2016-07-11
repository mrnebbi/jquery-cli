/**
 * Logger function, by Ian Isted
 * @string The string you'd like to output to the log
 * @logID A unique id to be given to your ouput. This allows you to extend the specific output later
 * @status Adds a class name to your output, allowing you style based on status types, etc.
 */

function logger(string,logID,status) {
	var terminal = '#terminal'; // ID of your output container. e.g. #terminal

	if ( typeof status !=='undefined') {
		status = ' class="' + status + '"';
	} else {
		status = '';
	}
	if ( typeof logID !=='undefined' && logID !== false) {
		//logID = ' id="' + logID + '"'
		if ($(terminal + ' ul li#logger-id-' + logID).length !== 0) {
			$(terminal + ' ul li#logger-id-' + logID).append(string);
		} else {
			$(terminal + ' ul').append('<li id="logger-id-' + logID + '"'  + status + '><span class="caller">' + arguments.callee.caller.name + '</span>' + string + '</li>');
		}

	} else {
		$(terminal + ' ul').append('<li' + status + '><span class="caller">' + arguments.callee.caller.name + '</span>' + string + '</li>');
	};
	$(terminal).scrollTop(900000);
}


var connection = false; // Boolean to tell the system if a server connection has been made
var echosetting = true; //echo nominaly set as true


var CMDPROMPT = {
	init:function() {
		// Initialise the command prompt window, and begin listening for key presses.

		logger('Application version: ' + version);

		$('.cmd').keydown(function(event) {
				switch(event.which) {
					case 13: //Enter Key
						if ($('.cmd').val() == "") {
							return false;
						}
						CMDPROMPT.Cmd.input($('.cmd').val());
						break;
					case 27: //Escape Key
					//Clears current line
						$('.cmd').val('');
						break;
					case 38: //Up Arrow
					//Rotates through Command History
						CMDPROMPT.Cmd.History.previous();
						event.preventDefault();
						break;
					case 40: //Down Arrow
					//Rotates through Command History
						CMDPROMPT.Cmd.History.next();
						event.preventDefault();
						break;
					case 9: //Tab
					//Reserved for Tab-complete
						event.preventDefault();
						break;

				}
		});
	},
	Cmd: {
		input:function(e) {

			var input = e;

			//Naughty script catcher
			// looks for "<", and prevents bad guys!
			if (input.toLowerCase().indexOf("<") >= 0) {
				logger("Not cool dude");
				$('.cmd').val('');
				return false;
			}

			//Adds input to Command History
			CMDPROMPT.Cmd.History.list.push(input);

			//splits string on first "space"
			// i.e. [cmd] [string]
			// converts cmd part to lowercase.
			// string is not converted to lowercase
			var cmd = $('.cmd').val().split(' ')[ 0 ].toLowerCase();
			var string = $('.cmd').val().toLowerCase();
			if (string != cmd) {
				string = input.substr(input.indexOf(" ") + 1);
			} else {
				string = "";
			}

			//Look up [cmd] and take action
			switch(cmd) {
				case "connect":
				//Attempts to connect to server
				// not implemented
					if (string == "true") {
						CMDPROMPT.connect(true);
					} else {
						CMDPROMPT.connect();
					}
					break;
				case "h4x0r": case "hacktheplanet": case "hacker": case "l33t": case "1337":
				//Secret Hacker colours enabled!
					BasicFunctions.hacker(string);
					break;
				case "time": case "clock": case "date":
				//Displays unix timecode
					BasicFunctions.echo(BasicFunctions.timestamp(string));
					break;
				case "print": case "echo":
				//Echos [string]
					//logger('<strong class="muted">' + string + '</strong>');
					BasicFunctions.echo(string);
					break;
				case "about": case "info":
				//Prints about info
					BasicFunctions.echo(BasicFunctions.about(string));
					break;
				case "clear": case "cls":
				//Clears terminal
					BasicFunctions.cls(string);
					break;
				case "history":
				//Prints history of commands
					historylog = "";
					$.each(CMDPROMPT.Cmd.History.list, function(i,val) {
						historylog = historylog + i + ': ' + val + "<br />";
					});
					logger(historylog);
					break;
				case "help": case "/?": case "?":
				//Basic help function
					BasicFunctions.echo(BasicFunctions.help(string));
					break;
				default:
				//If command not recognized by CLI then send on.
					CMDPROMPT.Cmd.send(e);
					break;
			}

			$('.cmd').val('');

		},
		send:function(e) {
			//Sends command to server to be processed
			// not implemented yet
			// all commands that arrive simply return "not valid command"
			logger('<strong>' + e + '</strong> is not a valid command.');
		},
		History: {
			//Creates and manages the Command History
			list: [],
			list_position:0,
			previous:function() {
				var list = CMDPROMPT.Cmd.History.list;
				var pos = CMDPROMPT.Cmd.History.list_position;

					if (pos == 0) {
						pos = list.length - 1;
						CMDPROMPT.Cmd.History.list_position = pos;
						$('.cmd').val(CMDPROMPT.Cmd.History.list[pos]);
					} else {
						pos = pos - 1;
						CMDPROMPT.Cmd.History.list_position = pos;
						$('.cmd').val(CMDPROMPT.Cmd.History.list[pos]);
					}

			},
			next:function() {
				var list = CMDPROMPT.Cmd.History.list;
				var pos = CMDPROMPT.Cmd.History.list_position;

					if (pos == 0) {
						//CMDPROMPT.Cmd.History.list_position = list.length - 1;
						//pos = CMDPROMPT.Cmd.History.list_position;
						$('.cmd').val(CMDPROMPT.Cmd.History.list[pos]);
						pos = pos + 1;
						CMDPROMPT.Cmd.History.list_position = pos;
					} else if (pos < list.length) {
						$('.cmd').val(CMDPROMPT.Cmd.History.list[pos]);
						if (pos != list.length - 1) {
							pos = pos + 1;
							CMDPROMPT.Cmd.History.list_position = pos;
						} else {
							pos = 0;
							CMDPROMPT.Cmd.History.list_position = pos;
						}
					}

			}
		}


	},
	connect:function(params) {
		//Connect to server
		// not implemented, hence fails
		logger('Could not connect. Application has not been setup to connect to a server.');
	}
}
