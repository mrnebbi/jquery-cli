/*
* Game1, by Gavin Barnett
* Used for Testing the idea of a basic Text Adventure Game
*/
var current_location = {"x":0, "y":0};
var seed = 0;
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
    if (seed == 0){
      stdout = Game1.init_world();
    }
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
          stdout = "You travel North. Altitude: " + Altitude(current_location.x,current_location.y);
        }
      },
      'south': function(stdin) {
        //travel south
        if (stdin != "function_menu"){
          current_location.y -= 1;
          stdout = "You travel South. Altitude: " + Altitude(current_location.x,current_location.y);
        }
      },
      'east': function(stdin) {
        //travel east
        if (stdin != "function_menu"){
          current_location.x += 1;
          stdout = "You travel East. Altitude: " + Altitude(current_location.x,current_location.y);
        }
      },
      'west': function(stdin) {
        //travel west
        if (stdin != "function_menu"){
          current_location.x -= 1;
          stdout = "You travel West. Altitude: " + Altitude(current_location.x,current_location.y);
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
  Altitude:function(x,y){
    //procedural mapgen
    /*
    This code uses multiple (currently 10) 
    sine waves for x and the same for y
    to generate a procedural altitude map.
    This is not limited to integers.
    */
    var X = 0, Y = 0, P = Math.PI;
    var f = 0, A = 0, O =0, Amax = 0;
    var j = 0;
    for (i = 0; i < 10; i++) {
        j = i+1;
        f = Math.abs((1/(5000))*(Math.pow(3,i))*Math.sin(seed*(j)));
        A = Math.abs(Math.sin(seed*(3*j))/Math.pow(f,0.8));
        O = 2*P*Math.sin(seed*12.4);
        X += A*Math.sin(2*P*f*x+O);
        Amax += A;
    }
    for (i = 0; i < 10; i++) {
        j = i+1;
        f = Math.abs((1/(5000))*(Math.pow(3,i))*Math.sin(seed*7*j));
        A = Math.abs(Math.sin(seed*(2.5*j))/Math.pow(f,0.8));
        O = 2*P*Math.sin(seed*12.4);
        Y += A*Math.sin(2*P*f*y+O);
        Amax += A;
    }
    return (1000*((X+Y)/Amax));
  },
  init_world:function(stdin){
    /*generates the initial game world seed*/
    var stdout = "";
    var trial = 0;
    var minalt = 10;
    var maxalt = 100;
    var foundpos = false;
    do{
      seed = Math.random()*10;
      trial = 0;
      do {
        current_location = {x:Math.random()*10000,y:Math.random()*10000};
        trial += 1;
        alt = Game1.Altitude(current_location.x,current_location.y);
        foundpos = ((minalt<alt && alt<maxalt) || trial>50);
      } while (foundpos==false);
      //if not found in trial period then change seed and re-try
  } while (trial>50);
    return stdout;
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
      },
      'start':function(stdin){
        return Game1.init_world(stdin);
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
