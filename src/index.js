function resizeCanvas(canvas) {
  const pixelRatio = window.devicePixelRatio;
  canvas.width = pixelRatio * window.innerWidth;
  canvas.height = pixelRatio * window.innerHeight;
  canvas.style.width = window.width;
  canvas.style.height = window.height;
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
}

function createGame(app, options) {
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
        app.onResize(canvas, gl);
      }
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
      const x = event.clientX;
      const y = event.clientY;
      if (app.onClick) {
        app.onClick(canvas, gl, x, y);
      }
    });

    document.onmousemove = (event) => {
      if (app.onMouseMove) {
        app.onMouseMove(event.clientX, event.clientY);
      }
    };

    if (app.create) {
      app.create(canvas, gl);
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
        app.render(canvas, gl);
        renderAcc -= renderFreq;
      }
    }

    requestAnimationFrame((timestamp) => {
      if(app.render) {
        app.render(canvas, gl);
      }

      lastFrameTime = timestamp;
      requestAnimationFrame(runGameLoop);
    });

    return false;
  } else {
    return 'Browser does not support WebGL.';
  }
}

export { createGame };
