const canvas = new fabric.Canvas("canvas");

console.log("canvas", canvas);

// Set Default Shapes attributes
const shapes = { width: 40, height: 40, fill: "#00a2ff", stroke: "#005688" };

const rect = new fabric.Rect({
  top: 40,
  left: (canvas.width / 2 - shapes.width / 2),
  fill: shapes.fill,
  stroke: shapes.stroke,
  width: shapes.width,
  height: shapes.height,
});

console.log("rect", rect);

canvas.add(rect);
