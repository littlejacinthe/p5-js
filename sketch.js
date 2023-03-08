let curveCount = 25;
let curvePoints = [];
let windSpeed = 0.01;
let xMargin = 50;

function setup() {
  createCanvas(800, 400);
  colorMode(HSB);
  strokeWeight(2);

  for (let i = 0; i < curveCount; i++) {
    let x1 = random(xMargin); // starting x for left set
    let y1 = 0; // starting y
    let x2 = random(xMargin, width/2); // ending x for left set
    let y2 = height; // ending y
    let cx1 = x1 + random(-20, 20); // control point 1 x
    let cy1 = random(height/3); // control point 1 y
    let cx2 = x2 + random(-20, 20); // control point 2 x
    let cy2 = random(height/3, height/2); // control point 2 y

    curvePoints.push({
      x1,
      y1,
      x2,
      y2,
      cx1,
      cy1,
      cx2,
      cy2,
      hue: random(80, 280),
      saturation: random(60, 80),
      brightness: random(80, 100)
    });

    // Duplicate the curve for the right set
    let x1r = width - x1 - xMargin; // starting x for right set
    let x2r = width - x2 - xMargin; // ending x for right set
    let cx1r = x1r + random(-20, 20); // control point 1 x for right set
    let cx2r = x2r + random(-20, 20); // control point 2 x for right set

    curvePoints.push({
      x1: x1r,
      y1,
      x2: x2r,
      y2,
      cx1: cx1r,
      cy1,
      cx2: cx2r,
      cy2,
      hue: random(80, 280),
      saturation: random(60, 80),
      brightness: random(80, 100)
    });
  }
}

function draw() {
  background(0);

  for (let i = 0; i < curveCount * 2; i++) { // Loop through both sets of curves
    let curve = curvePoints[i];

    // Update the position of the control points based on a sine wave
    curve.cx1 += sin(frameCount * windSpeed) * 2;
    curve.cy1 += sin(frameCount * windSpeed * 1.5) * 2;
    curve.cx2 += sin(frameCount * windSpeed * 2) * 2;
    curve.cy2 += sin(frameCount * windSpeed * 1.2) * 2;

    stroke(curve.hue, curve.saturation, curve.brightness);
    noFill();
    bezier(curve.x1, curve.y1, curve.cx1, curve.cy1, curve.cx2, curve.cy2, curve.x2, curve.y2);
  }
}
