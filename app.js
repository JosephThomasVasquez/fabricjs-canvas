// Initialize the Canvas
const initializeCanvas = (id) => {
  const canvas = new fabric.Canvas(id, {
    width: 1200,
    height: 1000,
    backgroundColor: "#ffffff",
  });

  return canvas;
};

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

const canvas = initializeCanvas("canvas");

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

// Mouse Move Event
canvas.on("mouse:move", (e) => {});

// Canvas events MOUSE DOWN
canvas.on("mouse:down", (options) => {
  console.log("options", options);
  console.log(options.e.clientX, options.e.clientY);
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
