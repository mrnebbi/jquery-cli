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
		$(terminal + ' ul').append('<font color = lightblue><li' + status + '><span class="caller">' + arguments.callee.caller.name + '</span></font> ' + string + '</li>');
	};
	$(terminal).scrollTop(900000);
}


var connection = false; // Boolean to tell the system if a server connection has been made
var echosetting = true; //echo nominaly set as true
//create a global variable for the CLI_Menu
var CLI_Menu = {
  	'default': function() {
			//initial menu only has default option on creation
			BasicFunctions.echo('ERROR:Command not recognised');
		}
};

var CMDPROMPT = {
	init:function() {
		// Initialise the command prompt window, and begin listening for key presses.

		// Initialise the CLI with BasicFunctions
		CLI_Menu = BasicFunctions.init_menu();

		//Print Header message on cmd
		logger('Application version: ' + version);

		//on keystroke check for special keys
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
						CMDPROMPT.Cmd.tabcomplete($('.cmd').val());
						break;

				}
		});
	},
	Cmd: {
		input:function(e) {
			/*Checks command inputs are not script
			  and are not blank.
				Then executes action based on input command.
			*/
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
			logger(input);
			//splits string on first "space"
			// i.e. [cmd] [string]
			// converts cmd part to lowercase.
			// string is not converted to lowercase
			var cmd = $('.cmd').val().split(' ')[ 0 ].toLowerCase();
			var stdin = $('.cmd').val().toLowerCase();
			if (stdin != cmd) {
				stdin = input.substr(input.indexOf(" ") + 1);
			} else {
				stdin = "";
			}

			//replaces switch statement to select menu option
			(CLI_Menu[cmd]|| CLI_Menu['default'])(stdin);

			//clear input
			$('.cmd').val('');

		},

		tabcomplete:function(stdin) {
				/*attempts to complete the user input if possible.
					if multiple option exits they are all printed.
				*/

				//this code is a bit messy, but works.
				var tablist = "";
				var tabitem = ""
				var len_stdin = stdin.length;
	      $.each(CLI_Menu, function(key, value) {
						if (key!='default' && key.substr(0,len_stdin) == stdin.toLowerCase()) {
	          	if (tabitem == "") {
								tabitem = key;
								tablist = key;
							}else{
								tablist = tablist +'<br />'+ key;
							}
						}
					});
					if (tabitem !=""){
						//if match was found then
						if (tabitem == tablist) {
							//if there is a unique option, populate user input
							$('.cmd').val(tabitem);
						}else{
							//else list all option to user
							//do not clear input
							logger(tablist);
						}
					}else{
						//if no matches found tell user
						logger('No valid options found.');
					}
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
}
