function resizeCanvas(canvas, gl) {
  const pixelRatio = window.devicePixelRatio;
  canvas.width = pixelRatio * window.innerWidth;
  canvas.height = pixelRatio * window.innerHeight;
  canvas.style.width = window.width;
  canvas.style.height = window.height;
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
}

export default function createGame(app, options) {
  window.scrollTo(0, 1);
  const { canvas } = options;
  if (canvas.getContext) {
    const gl = canvas.getContext('webgl');
    if (!gl) {
      return 'No WebGL.';
    }
    resizeCanvas(canvas, gl);

    window.onresize = () => {
      resizeCanvas(canvas, gl);
      if (app.onResize) {
        app.onResize(gl);
      }
      app.render(gl);
    };

    document.addEventListener('keydown', (event) => {
      if (app.onKeyDown) {
        app.onKeyDown(event.key, event.keyCode);
      }
    }, false);

    document.addEventListener('keyup', (event) => {
      if (app.onKeyUp) {
        app.onKeyUp(event.key, event.keyCode);
      }
    }, false);

    canvas.addEventListener('click', (event) => {
      if (app.onClick) {
        app.onClick(event.clientX, event.clientY);
      }
    });

    canvas.addEventListener('mouseup', (event) => {
      if (app.onMouseUp) {
        app.onMouseUp(event.clientX, event.clientY);
      }
    });

    canvas.addEventListener('mousedown', (event) => {
      if (app.onMouseDown) {
        app.onMouseDown(event.clientX, event.clientY);
      }
    });

    document.addEventListener('mousemove', () => {
      if (app.onMouseMove) {
        app.onMouseMove(event.clientX, event.clientY);
      }
    });

    if (app.create) {
      app.create(gl);
    }

    const renderFreq = (options.renderInterval) ? options.renderInterval : (1000 / 60);
    const updateFreq = (options.updateInterval) ? options.updateInterval : (1000 / 60);
    let lastFrameTime = 0;
    let renderAcc = 0;
    let updateAcc = 0;
    function runGameLoop(timestamp) {
      requestAnimationFrame(runGameLoop);
      const timeDiff = timestamp - lastFrameTime;
      renderAcc += timeDiff;
      updateAcc += timeDiff;
      lastFrameTime = timestamp;

      while(updateAcc > updateFreq) {
        if(app.update) {
          app.update();
        }
        updateAcc -= updateFreq;
      }

      if(renderAcc >= renderFreq && app.render) {
        app.render(gl);
        renderAcc -= renderFreq;
      }
    }

    requestAnimationFrame((timestamp) => {
      if(app.render) {
        app.render(gl);
      }

      lastFrameTime = timestamp;
      requestAnimationFrame(runGameLoop);
    });

    return false;
  } else {
    return 'Browser does not support WebGL.';
  }
}
