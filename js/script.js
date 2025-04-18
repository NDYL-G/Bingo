const allNumbers = Array.from({ length: 90 }, (_, i) => i + 1);
let remainingNumbers = [...allNumbers];
let lastBalls = [];

document.getElementById("draw-button").addEventListener("click", drawBall);

function drawBall() {
  if (remainingNumbers.length === 0) return alert("All balls drawn!");

  const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
  const number = remainingNumbers.splice(randomIndex, 1)[0];

  const ball = createBallSVG(number);

  // Find which column this number belongs in
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

  const circle = document.createElementNS(svgNS, "circle");
  circle.setAttribute("cx", "30");
  circle.setAttribute("cy", "30");
  circle.setAttribute("r", "28");
  circle.setAttribute("fill", "white");
  circle.setAttribute("stroke", "#333");
  circle.setAttribute("stroke-width", "4");

  const text = document.createElementNS(svgNS, "text");
  text.setAttribute("x", "50%");
  text.setAttribute("y", "50%");
  text.setAttribute("dominant-baseline", "middle");
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("font-size", "20");
  text.setAttribute("font-family", "Arial");
  text.setAttribute("fill", "#112656");
  text.textContent = number;

  svg.appendChild(circle);
  svg.appendChild(text);
  return svg;
}

function updateLastBalls(ballSVG) {
  lastBalls.unshift(ballSVG);
  if (lastBalls.length > 6) lastBalls.pop();

  const recentContainer = document.getElementById("recent-balls");
  recentContainer.innerHTML = "";
  lastBalls.forEach(ball => recentContainer.appendChild(ball));
}
