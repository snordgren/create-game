import { resizeCanvasToDisplaySize, createTexture } from 'twgl.js';
import { createSpriteBatch } from 'spritebatch';

import createGame from '../dist/index.js';

const canvas = document.getElementById('canvas');
let batch;
let jake;
createGame({
  create: (gl) => {
    batch = createSpriteBatch(gl, gl.drawingBufferWidth, gl.drawingBufferHeight);
    jake = createTexture(gl, {
      src: 'jake.png'
    });
  },

  render: (gl) => {
    batch.resize(gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clearColor(1, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    batch.begin();
    batch.draw(jake, 0, 0, 128, 128);
    batch.end();
  }
}, {
  canvas: canvas
});
