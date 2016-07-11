/*
* Basic Functions, by Gavin Barnett
* This file was initially taken from AberQuest project of Ian Isted.
* And then modified a bitty.
*/
var helpDirectory = {};
  helpDirectory['about'] = "<strong>about</strong>: Display information about this program.";
  helpDirectory['connect'] = "<strong>connect</strong>: Attempt to connect to the Aberquest server.";
  helpDirectory['clear'] = "<strong>clear</strong>: Clears the current log view.";
  helpDirectory['connect'] = "<strong>connect</strong>: Attempt to connect to the Aberquest server.";
  helpDirectory['history'] = "<strong>history</strong>: Display recent command history,  Use !number to run from history. Use up and down arrows to scroll through.";
  helpDirectory['print'] = "<strong>print</strong>: Print a string to the log.";
  helpDirectory['time'] = "<strong>time</strong>: Display the browsers current unix timestamp.";

var BasicFunctions = {
/*These are the built-in CLI function
  Please keep in alphabetical order for my OCD :-D
*/
  about:function(stdin){
    /*Send about information to stdout
    */
    var stdout = '';
    switch(stdin.toLowerCase()) {
      case "licence":
      //show licence agreement
        stdout = '<em>The MIT License (MIT)<br /><br />Copyright (c) 2016 Ian Isted<br />Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.</em>';
        break;
      case "":
        stdout = '<em>CLI version 1.0.<br />Built by <a href="http://twitter.com/ianisted" target="_blank">@ianisted</a>.<br />Released under <a href="https://github.com/ianisted/jquery-cli/blob/master/LICENSE" target="_blank">MIT license</a>. Type <strong>about license</strong> to see the license.</strong></em>';
        break;
      default:
        stdout = "ERROR: This is not a valid command. Please see 'About Help'"
        break;
    }
    return stdout;
  },
  cls:function(stdin){
    /*Clears terminal window
    to be expanded with stdin dictating what to clear
    */
    //clears terminal
    var stdout = "";
    $('#terminal ul').html('');
    stdout = "clear done";
    return stdout;
  },
  echo:function(stdin){
    /*Echo's stdin to stdout
    Echo can be turned ON/OFF with Echo On & Echo Off
    If Echo is On then will also Echo Command to Terminal.
    */
    var stdout = "";
    switch(stdin.toLowerCase()) {
      case "help":
        stdout = '<br />HELP: ECHO []<br />' + '<br  />  ECHO [stdin] : Echo stdin to stdout and prints to terminal<br />  ECHO [ON/OFF] : Allows echo to print to terminal. std still goes to stdout<br />  ECHO : Displays current Echo state (ECHO ON/OFF)<br /> ';
        break;
      case "off":
      //Turn Echo Off
        stdout = "ECHO OFF";
        echosetting = false;
        break;
      case "on":
      //Turn Echo On
        stdout = "ECHO ON";
        echosetting = true;
        break;
      case "":
      //Show Echo Setting
        if (echosetting == false) {
          stdout = "ECHO OFF";
        }else {
          stdout = "ECHO ON";
        }
        break;
      default:
      //Otherwise Echo reponse if Echo is On.
        stdout = stdin;
        break;
    }
    if (echosetting == true) {
      logger(stdout);
    }
    return stdout;
  },
  hacker:function(stdin){
    /*Easter Egg
    Enables/Disabled Hackermode
    Hacker mode changes colour scheme
    */
    var stdout = "";
    $('html').toggleClass('hacker');
    stdout = "hackermode toggled";
    return stdout;
  },
  help:function(stdin){
    /*help lists all avaliable commands
    help [command] gives specifics about a command
    */
    var stdout = "";
    //special "help help" case;
    if (stdin.length > 0) {
      //give specific help on [stdin]
      stdout = helpDirectory[stdin];
    } else {
      //list all help
      var helplist = "";
      $.each(helpDirectory, function(key, value) {
        helplist = helplist + value + '<br />';
      });
      stdout = '<br />Available commands:<br />' + helplist + '<br />';
    }
    return(stdout);
  },
  timestamp:function(stdin){
    /*gives the current unix timecode
      could be expanded later to include [timestamp date|time|month...]
    */
    //BROKEN FUNCTION
    var stdout = "";
    var d = new Date();
    switch(stdin.toLowerCase()) {
      case "help":
        stdout = '<br />HELP: TIME []<br />' + '<br  />  TIME : Displays current time in UK format<br />  TIME [STAMP] : Displays current unix time<br />  TIME [DATE] : Displays current date in UK format<br />  TIME [FULL] : Displays current time & date in UK format';
        break;
      case "stamp":
      //returns unix time (milliseconds since midnight on 1st Jan 1970)
        stdout = "" + d.getTime();
        break;
      case "date":
      //returns uk date 23/07/2015
        stdout = "" + d.toLocaleDateString("en-GB");
        break;
      case "":
      //returns uk time 20:01:53
        stdout = "" + d.toLocaleTimeString("en-GB");
        break;
      case "full":
      //returns uk date & time 23/07/2016, 20:04:08
        stdout = "" + d.toLocaleString("en-GB");
        break;
      default:
        stdout = "ERROR: This is not a valid command. Please see 'Time Help'"
        break;
    }
    return stdout;
  }
};
