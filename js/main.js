const allNumbers = Array.from({ length: 90 }, (_, i) => i + 1);
let remainingNumbers = [...allNumbers];
let lastBalls = [];

document.getElementById("draw-button").addEventListener("click", drawBall);

function drawBall() {
  if (remainingNumbers.length === 0) {
    alert("All balls have been drawn!");
    return;
  }

  const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
  const number = remainingNumbers.splice(randomIndex, 1)[0];

  const ball = createBallSVG(number);

  // Add to correct column
  const columnIndex = Math.floor((number - 1) / 10);
  const column = document.querySelectorAll(".column")[columnIndex];
  column.appendChild(ball);

  // Update last 6 balls
  updateLastBalls(ball.cloneNode(true));
}

function createBallSVG(number) {
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("width", "60");
  svg.setAttribute("height", "60");

  const columnIndex = Math.floor((number - 1) / 10);
  const pastelColors = [
    "#FFB3BA", "#FFDFBA", "#FFFFBA", "#BAFFC9", "#BAE1FF",
    "#D5BAFF", "#FFBAED", "#C2F0FC", "#E0BAFF"
  ];
  const fillColor = pastelColors[columnIndex];

  // Define gradient
  const gradientId = `grad-${number}`;
  const defs = document.createElementNS(svgNS, "defs");
  const radialGradient = document.createElementNS(svgNS, "radialGradient");
  radialGradient.setAttribute("id", gradientId);
  radialGradient.setAttribute("cx", "30%");
  radialGradient.setAttribute("cy", "30%");

  const stop1 = document.createElementNS(svgNS, "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "#ffffff");
  stop1.setAttribute("stop-opacity", "0.6");

  const stop2 = document.createElementNS(svgNS, "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", fillColor);
  stop2.setAttribute("stop-opacity", "1");

  radialGradient.appendChild(stop1);
  radialGradient.appendChild(stop2);
  defs.appendChild(radialGradient);
  svg.appendChild(defs);

  // Ball circle
  const circle = document.createElementNS(svgNS, "circle");
  circle.setAttribute("cx", "30");
  circle.setAttribute("cy", "30");
  circle.setAttribute("r", "28");
  circle.setAttribute("fill", `url(#${gradientId})`);
  circle.setAttribute("stroke", "#333");
  circle.setAttribute("stroke-width", "2");

  // Text
  const text = document.createElementNS(svgNS, "text");
  text.setAttribute("x", "50%");
  text.setAttribute("y", "50%");
  text.setAttribute("dominant-baseline", "middle");
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("font-size", "20");
  text.setAttribute("font-family", "Arial");
  text.setAttribute("fill", "#112656");
  text.textContent = number;

  // Combine and animate
  svg.appendChild(circle);
  svg.appendChild(text);
  svg.classList.add("bingo-ball");

  return svg;
}

function updateLastBalls(ballSVG) {
  lastBalls.unshift(ballSVG);
  if (lastBalls.length > 6) lastBalls.pop();

  const recentContainer = document.getElementById("recent-balls");
  recentContainer.innerHTML = "";
  lastBalls.forEach(ball => recentContainer.appendChild(ball));
}
