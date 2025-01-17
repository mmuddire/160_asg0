// DrawRectangle.js
function main() {
// Retrieve <canvas> element                                  <- (1)
  canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return false;
  }

// Get the rendering context for 2DCG                          <- (2)
ctx = canvas.getContext('2d');

// Draw a black canvas rectangle                                       <- (3)
clearCanvas();

const v1 = new Vector3([2.25, 2.25, 0]);
//drawVector(v1, "red");

}

function clearCanvas(){
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; 
  ctx.fillRect(0, 0, canvas.width,canvas.height); 
}

function drawVector(v, color){
  let cx = canvas.width/2;
  let cy = canvas.height/2;
  const scale = 20;
  const x = v.elements[0] * scale;
  const y = v.elements[1] * scale;

  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + x, cy - y);
  ctx.stroke();
}

function handleDrawEvent(){
  clearCanvas();
  let x = parseFloat(document.getElementById('x-coord').value);
  let y = parseFloat(document.getElementById('y-coord').value);

  // validate input
  if (isNaN(x) || isNaN(y)) {
    console.log('Invalid input. Please enter valid numbers for x and y.');
    return;
  }

  // draw vector
  const v1 = new Vector3([x, y, 0]);
  drawVector(v1, "red");

  // second vector
  let x2 = parseFloat(document.getElementById('x2-coord').value);
  let y2 = parseFloat(document.getElementById('y2-coord').value);

  // validate input
  if (isNaN(x2) || isNaN(y2)) {
    console.log('Invalid input. Please enter valid numbers for x and y.');
    return;
  }

  // draw vector
  const v2 = new Vector3([x2, y2, 0]);
  drawVector(v2, "blue");
  
}

function handleDrawOperationEvent() {
  clearCanvas();

  // read vector inputs
  let x1 = parseFloat(document.getElementById('x-coord').value);
  let y1 = parseFloat(document.getElementById('y-coord').value);
  let x2 = parseFloat(document.getElementById('x2-coord').value);
  let y2 = parseFloat(document.getElementById('y2-coord').value);

  // validate inputs
  if (isNaN(x1) || isNaN(y1) || isNaN(x2) || isNaN(y2)) {
      console.log("Invalid input. Please enter valid numbers for vectors.");
      return;
  }

  // create vectors
  let v1 = new Vector3([x1, y1, 0]);
  let v2 = new Vector3([x2, y2, 0]);

  // draw input vectors
  drawVector(v1, "red");
  drawVector(v2, "blue");

  // read selected operation
  const operation = document.getElementById("operations-select").value;

  if (operation === "add") {
      const v3 = new Vector3(v1.elements).add(v2);
      drawVector(v3, "green");
  } else if (operation === "sub") {
      const v3 = new Vector3(v1.elements).sub(v2);
      drawVector(v3, "green");
  } else if (operation === "mul") {
      let scalar = parseFloat(document.getElementById("scalar").value);
      if (!isNaN(scalar)) {
          const v3 = new Vector3(v1.elements).mul(scalar);
          const v4 = new Vector3(v2.elements).mul(scalar);
          drawVector(v3, "green");
          drawVector(v4, "green");
      } else {
          console.log("Invalid scalar value.");
      }
  } else if (operation === "div") {
      const scalar = parseFloat(document.getElementById("scalar").value);
      if (!isNaN(scalar)) {
          const v3 = new Vector3(v1.elements).div(scalar);
          const v4 = new Vector3(v2.elements).div(scalar);
          drawVector(v3, "green");
          drawVector(v4, "green");
      } else {
          console.log("Invalid scalar value.");
      }
  } else if (operation === "mag") {
      const magV1 = v1.magnitude();
      const magV2 = v2.magnitude();
      console.log(`Magnitude of V1: ${magV1}`);
      console.log(`Magnitude of V2: ${magV2}`);
  } else if (operation === "norm") {
      const normV1 = new Vector3(v1.elements).normalize();
      const normV2 = new Vector3(v2.elements).normalize();
      drawVector(normV1, "green");
      drawVector(normV2, "green");
  } else if (operation === "angle"){
      let angle = angleBetween(v1, v2);
      if (angle !== null){
        console.log("Angle: " + angle);
      }
  } else if (operation === "area"){
    const area = areaTriangle(v1, v2);
    console.log("Area of the triangle: " + area);
  } else {
      console.log("Please select a valid operation.");
  }
}

function angleBetween(v1, v2) {
  const dotProduct = Vector3.dot(v1, v2);
  const magnitudeV1 = v1.magnitude();
  const magnitudeV2 = v2.magnitude();

  if (magnitudeV1 === 0 || magnitudeV2 === 0) {
      console.log("Cannot calculate angle with a zero-length vector.");
      return null;
  }

  const cosAlpha = dotProduct / (magnitudeV1 * magnitudeV2);

  // Clamp cosAlpha to the range [-1, 1] to avoid precision errors
  const clampedCosAlpha = Math.min(1, Math.max(-1, cosAlpha));

  // Calculate the angle in radians and convert to degrees
  const angleInRadians = Math.acos(clampedCosAlpha);
  const angleInDegrees = angleInRadians * (180 / Math.PI);

  return angleInDegrees;
}

function areaTriangle(v1, v2) {
  const crossVector = Vector3.cross(v1, v2);
  const magnitude = crossVector.magnitude();
  const area = 0.5 * magnitude;
  return area;
}

