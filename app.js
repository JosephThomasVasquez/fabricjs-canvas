const canvas = new fabric.Canvas("canvas");

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
  cornerColor: "#232323",
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
});

console.log("rect", rect);

canvas.add(rect);
canvas.add(rect2);
