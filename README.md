# jQuery CLI / MUD

This is a command line or MUD interface originally built for a game being developed by @billythekid
and I.

This code was sitting somewhat dormant in a project folder, so if you'd like to make use of it feel free to.

I’ve stripped out any game specific things, but I have left in placeholder functions for connecting to a server; this can be used to extend commands, and provide tamper proof online functionality.

## Screenshots

The interface
<img src="https://raw.githubusercontent.com/ianisted/jquery-cli/master/cli.jpg" width="400" />

The easter egg
<img src="https://raw.githubusercontent.com/ianisted/jquery-cli/master/1337.jpg" width="400" />


## Available commands

- time (displays the current time as a unix timestamp)
- print (will print the text that follows on screen)
- about (displays information about this project)
- about-license (displays the MIT license for this project)
- clear (clears the screen)
- history (displays command history. Can be navigated through with up and down arrows)
- h4x0r/1337 (this easter egg command, makees the terminal area look "hackery"... HACK THE PLANET)


## Future

The javascript code is currently very dependant on the HTML.
At some point, I'll make this behave more like a plugin, allowing it to be dropped into an existing interface with greater ease.

## Quirks

As I said this code was thrown together to get us off the ground with a game project.
There are a few quirks and sloppy bits of coding.

E.g. `$(terminal).scrollTop(900000);` yes I know I'll fix this later ;)

Feel free to use this in your project, but please follow the license.

## License

The MIT License (MIT)

Copyright (c) 2016 Ian Isted

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
