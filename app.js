const cursorModeButton = document.querySelector("#mode-select-cursor");
const panModeButton = document.querySelector("#mode-select-pan");
const drawModeButton = document.querySelector("#mode-select-draw");

// Initialize the Canvas
const initializeCanvas = (id) => {
  cursorModeButton.previousElementSibling.classList.add("selected-tool");
  const canvas = new fabric.Canvas(id, {
    width: 1200,
    height: 1000,
    backgroundColor: "#ffffff",
  });

  return canvas;
};

const canvas = initializeCanvas("canvas");

cursorModeButton.addEventListener("click", (e) => {
  console.log("event", e.target.checked);

  const activeTool = e.target.checked;
  const toolIcon = e.target.previousElementSibling;
  if (activeTool) {
    toolIcon.classList.add("selected-tool");
    panModeButton.checked = false;
    panModeButton.previousElementSibling.classList.remove("selected-tool");
    drawModeButton.checked = false;
    drawModeButton.previousElementSibling.classList.remove("selected-tool");
    canvas.isDrawingMode = false;
    canvas.set("selection", true);
  }
});

panModeButton.addEventListener("click", (e) => {
  const activeTool = e.target.checked;
  const toolIcon = e.target.previousElementSibling;

  if (activeTool) {
    toolIcon.classList.add("selected-tool");
    cursorModeButton.checked = false;
    cursorModeButton.previousElementSibling.classList.remove("selected-tool");
    drawModeButton.checked = false;
    drawModeButton.previousElementSibling.classList.remove("selected-tool");
    canvas.set("selection", false);
    canvas.isDrawingMode = false;
  }
});

drawModeButton.addEventListener("click", (e) => {
  console.log("event", e.target.checked);

  const activeTool = e.target.checked;
  const toolIcon = e.target.previousElementSibling;
  if (activeTool) {
    toolIcon.classList.add("selected-tool");
    cursorModeButton.checked = false;
    cursorModeButton.previousElementSibling.classList.remove("selected-tool");
    panModeButton.checked = false;
    panModeButton.previousElementSibling.classList.remove("selected-tool");
    const isDrawing = (canvas.isDrawingMode = true);
    drawingMode(isDrawing);
  }
});

const toolModes = (e) => {};

const setBackgroundImage = (url, canvas) => {
  fabric.Image.fromURL(url, (bgImage) => {
    console.log("background image", bgImage);

    canvas.set("width", bgImage.width);
    canvas.set("height", bgImage.height);

    canvas.backgroundImage = bgImage;

    console.log("canvas", canvas);
    canvas.renderAll();
  });
};

setBackgroundImage(
  "https://aptito.com/wp-content/uploads/2018/06/restaurant-floor-plan.png",
  canvas
);

// canvas.setBackgroundImage("https://source.unsplash.com/random");
const imageElement = document.getElementById("my-image");

fabric.Object.prototype.noScaleCache = false;
/*
	strokeUniform works better without scalingCache
	Objects in group are not scaled directly, so stroke uniform will not have effect.
*/
function toggleUniform() {
  var aObject = canvas.getActiveObject();
  if (aObject.type === "activeSelection") {
    aObject.getObjects().forEach(function (obj) {
      obj.set("strokeUniform", !obj.strokeUniform);
    });
  } else {
    aObject.set("strokeUniform", !aObject.strokeUniform);
  }
  canvas.requestRenderAll();
}

console.log("canvas", canvas);

// MOUSE EVENTS ============================================================================================

let mousePressed = false;

// PAN CANVAS FUNCTION
const panMode = (event) => {
  const mouseEvents = event.e;
  const delta = new fabric.Point(mouseEvents.movementX, mouseEvents.movementY);
  canvas.relativePan(delta);
  canvas.renderAll();
};

const drawingMode = (drawingState) => {
  console.log("isDrawing", canvas.isDrawingMode);
  canvas.isDrawingMode = drawingState;
  canvas.renderAll();
};

// MOUSE MOVE EVENT
canvas.on("mouse:move", (event) => {
  if (panModeButton.checked && mousePressed) {
    canvas.setCursor("grabbing");
    panMode(event);
  }

  if (drawModeButton.checked) {
    canvas.setCursor("crosshair");
  }
});

// MOUSE DOWN EVENT
canvas.on("mouse:down", (e) => {
  mousePressed = true;
  console.log("options", e);
  console.log(e.e.clientX, e.e.clientY);
});

// MOUSE UP EVENT
canvas.on("mouse:up", (e) => {
  mousePressed = false;
});

// MOUSE OVER EVENT
canvas.on("mouse:over", (e) => {
  const colors = [];

  if (e.target) {
    console.log("e.target", e.target);
    colors.push(e.target.fill);
    console.log(colors);
    e.target.set("opacity", 0.7);
  }

  // console.log('event', e);
  canvas.renderAll();
});

// MOUSE OUT EVENT
canvas.on("mouse:out", (e) => {
  if (e.target) {
    e.target.set("opacity", 1);
  }
  canvas.renderAll();
});

// OBJECTS =======================================================================================================

let imageFabric = new fabric.Image(imageElement, {
  left: 100,
  top: 100,
  angle: 30,
  cornerColor: "#4c00ff",
  cornerSize: 8,
  cornerStyle: "circle",
  rx: 2,
  ry: 2,
});

// Set Default Shapes attributes
const shapes = {
  width: 80,
  height: 40,
  fill: "#00a2ff",
  stroke: "#005688",
  strokeWidth: 2,
};

const rect = new fabric.Rect({
  top: 40,
  left: canvas.width / 2 - shapes.width / 2,
  fill: shapes.fill,
  stroke: shapes.stroke,
  strokeWidth: shapes.strokeWidth,
  width: shapes.width,
  height: shapes.height,
  strokeUniform: true,
  cornerColor: "#4c00ff",
  cornerSize: 8,
  cornerStyle: "circle",
  lockScalingX: true,
  lockScalingY: true,
  rx: 2,
  ry: 2,
});

const rect2 = new fabric.Rect({
  top: 40,
  left: canvas.width / 2 + 100,
  fill: "#ff00a2",
  stroke: "#885600",
  strokeWidth: shapes.strokeWidth,
  width: shapes.width,
  height: shapes.height,
  strokeUniform: true,
  cornerColor: "#4c00ff",
  cornerSize: 8,
  cornerStyle: "circle",
  lockScalingX: true,
  lockScalingY: true,
  rx: 2,
  ry: 2,
});

console.log("rect", rect);

canvas.add(rect);
canvas.add(rect2);
canvas.add(imageFabric);

// ========================================================================================================
// CONTROLS ===============================================================================================
// ========================================================================================================

// DELETE OBJECT
const deleteObject = (e, object) => {
  // console.log("Delete Object (key):", e);

  if (object != null || object != undefined) {
    canvas.remove(object);

    console.log("Active Objects:", canvas.getActiveObjects());
  } else if (canvas.getActiveObjects() >= 2) {
    // console.log(object.getObjects().length);
    // console.log(canvas.getActiveGroup());

    canvas.getActiveObjects().forEach((item) => {
      console.log(item);
      canvas.remove(item);
    });
    canvas.deactivateAll();
  }
  canvas.renderAll();
  console.log("No items selected");
};

// GET KEYBOARD EVENTS
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "Delete":
      const activeObject = canvas.getActiveObject();

      if (activeObject) {
        deleteObject(e.key, activeObject);
      }

      break;

    default:
      break;
  }
});
