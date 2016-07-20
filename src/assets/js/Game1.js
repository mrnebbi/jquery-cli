/*
* Game1, by Gavin Barnett
* Used for Testing the idea of a basic Text Adventure Game
*/
var current_location = {"x":0, "y":0};
//x: west (-), east (+)
//y: south(-), north (+)

var Game1 = {
/*These are the Game CLI function
  Please keep in alphabetical order for my OCD :-D
*/
  go_direction:function(stdin){
    /*go is used to move around the world;
    */

    //required variable
    var stdout = "";
    var function_menu = "";

    //function variables

    //function_menu structure
    function_menu = {
      'default': function(stdin) { //required option
        //default option
        stdout = "ERROR: This is not a valid command. Please see 'Go Help'";
      },
      'help': function(stdin) { //required option
        //big help statement
        stdout = '<br />HELP: GO []<br />' + "<br  />  GO [North/South/East/West]: Go is used to move around the game world. <br />";
      },
      /* function specific options */
      'north': function(stdin) {
        //travel north
        if (stdin != "function_menu"){
          current_location.y += 1;
          stdout = "You travel North. Current Location: " + current_location["x"] + ", " + current_location["y"];
        }
      },
      'south': function(stdin) {
        //travel south
        if (stdin != "function_menu"){
          current_location.y -= 1;
          stdout = "You travel South. Current Location: " + current_location["x"] + ", " + current_location["y"];
        }
      },
      'east': function(stdin) {
        //travel east
        if (stdin != "function_menu"){
          current_location.x += 1;
          stdout = "You travel East. Current Location: " + current_location["x"] + ", " + current_location["y"];
        }
      },
      'west': function(stdin) {
        //travel west
        if (stdin != "function_menu"){
          current_location.x -= 1;
          stdout = "You travel West. Current Location: " + current_location["x"] + ", " + current_location["y"];
        }
      },
      '': function(stdin) {
        //display general about information
        stdout = "Go where?";
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
        stdout = "<strong>go</strong>: use go comand to travel around the world.";
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

  look:function(stdin){
    /*look is used to examine the area or objects
    */

    //required variable
    var stdout = "";
    var function_menu = "";

    //function variables

    //function_menu structure
    function_menu = {
      'default': function(stdin) { //required option
        //default option
        stdout = "ERROR: This is not a valid command. Please see 'Go Help'";
      },
      'help': function(stdin) { //required option
        //big help statement
        stdout = '<br />HELP: LOOK []<br />' + "<br  />  LOOK: Look around local area. <br /> LOOK [OBJECT]: Look at or examine an object. <br /> LOOK [DIRECTION]: Look in a general direction. <br />";
      },
      /* function specific options */
      'north': function(stdin) {
        //look  north
        if (stdin != "function_menu"){
          stdout = "Looking North you see ...";
        }
      },
      'south': function(stdin) {
        //look south
        if (stdin != "function_menu"){
          stdout = "Looking South you see ...";
        }
      },
      'east': function(stdin) {
        //look east
        if (stdin != "function_menu"){
          stdout = "Looking East you see ...";
        }
      },
      'west': function(stdin) {
        //look west
        if (stdin != "function_menu"){
          stdout = "Looking West you see ...";
        }
      },
      '': function(stdin) {
        //display general about information
        stdout = "You are in a [Blank]. You see some [blank]";
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
        stdout = "<strong>look</strong>: look and examine the world around you.";
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
      'go': function(stdin) {
        return Game1.go_direction(stdin);
      },
      'look': function(stdin) {
        return Game1.look(stdin);
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
