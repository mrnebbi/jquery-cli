/*
* Game1, by Gavin Barnett
* Used for Testing the idea of a basic Text Adventure Game
*/

var Game1 = {
/*These are the Game CLI function
  Please keep in alphabetical order for my OCD :-D
*/
  game1:function(stdin){
    /*demo comments;
    */

    //required variable
    var stdout = "";
    var function_menu = "";

    //function variables

    //function_menu structure
    function_menu = {
      'default': function(stdin) { //required option
        //default option
        stdout = "ERROR: This is not a valid command. Please see 'Game1 Help'";
      },
      'help': function(stdin) { //required option
        //big help statement
        stdout = '<br />HELP: []<br />' + "<br  />  GAME1 : There is no help for this Game, you're on your own! <br />";
      },
      /* function specific options */
      '': function(stdin) {
        //display general about information
        stdout = "You are playing Game1. Try taking a walk around";
      }
    };

    //Additional 'hidden menu' options
    switch (stdin){
      case 'function_menu': //required option
        //sends internal function_menu out of stdout - used for tabcomplete
        stdout = function_menu;
        return (stdout);
        break;
      case 'helpdir': //required option
        //oneliner help statement
        stdout = "<strong>game1</strong>: Every game starts somewhere. In this particular case, somewhere is right here.";
        return (stdout);
        break;
      default:
        //default is to look up function_menu
        (function_menu[stdin]|| function_menu['default'])(stdin);
        break;
    }

    //normally required echo of stdout
    BasicFunctions.echo(stdout);

    //required return of stdout
    return (stdout);

  },
  init_menu:function(stdin){
    /*Adds the BasicFunctions options to the
      command line menu.
    */

    //required variable
    var stdout = "";
    var function_menu = "";
    stdin = stdin.toLowerCase();
    //function variables

    //function_menu structure
    function_menu = {
      /* function specific options */
      'game1': function(stdin) {
        return Game1.game1(stdin);
      }
    };

    //Additional 'hidden menu' options
    switch (stdin){
      case 'function_menu': //required option
        //sends internal function_menu out of stdout - used for tabcomplete
        stdout = function_menu;
        menubuilder(stdout);
        return (stdout);
        break;
      default:
        //default is to look up function_menu
        (function_menu[stdin]|| function_menu['default'])(stdin);
        break;
    }

    //required return of stdout
    return (stdout);
  }
};
