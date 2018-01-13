# create-game

*The fastest way to get started writing WebGL games.*

This is a small library that makes getting started with a new WebGL game quick
and easy. It has one function, `createGame`, which takes two objects as its parameters, 
your callbacks and your configuration options. 

All callbacks are optional, missing callbacks are simply ignored.

Most configuration options are optional, save for `canvas` which is necessary
for create-game to know where it should acquire its WebGL context. For the other
options, sensible defaults are used.

Rendering, state management, physics, networking, and any other functionality you might 
want are out of the scope of this library. You are free to use whichever other libraries 
you see fit for those purposes.

## Install

    npm install create-game --save

## Usage

    import createGame from 'create-game';

    createGame({
      create: () => {
        // your asset loading and initialization code here
      },
      render: (canvas, gl) => {
        // your rendering code here
      },
      update: () => {
        // your update code here
      }
    }, {
      canvas: document.getElementById('my-canvas') // use your canvas here
    });

### Options
The following options are available: 

    * `canvas` takes a `canvas` DOM element, which is used for rendering.
    * `renderInterval` takes a `number` that determines how many milliseconds should go
    between two invocations of the `render` callback. The default value is 60 frames
    per second.
    * `updateInterval` takes a `number` that determines how many milliseconds should go
    between two invocations of the `update` callback. The default value is 60 updates
    per second.

### Callbacks
The following callbacks are available:

    * `create(gl)` is called once before the loop starts. Initialize your state and load your assets here.
    * `render(gl)` is called every `renderInterval` milliseconds, and is the place to do your rendering. 
    * `update()` is called every `updateInterval` milliseconds, and is the place to do your state updates.
    * `onClick(x, y)` is called when the mouse is clicked.
    * `onKeyDown()` is called when a key is pressed.
    * `onKeyUp()` is called when a key is released.
    * `onMouseDown(x, y)` is called when the mouse is pressed.
    * `onMouseMove(x, y)` is called when the mouse is moved.
    * `onMouseUp(x, y)` is called when the mouse is released.
    * `onResize(gl)` is called when the window is resized.
    