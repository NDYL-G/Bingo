const allNumbers = Array.from({ length: 90 }, (_, i) => i + 1);
let remainingNumbers = [...allNumbers];
let lastBalls = [];

const board = document.getElementById("bingo-board");
const placeholderMap = new Map();

// 🎯 Create 90 placeholders in a grid
for (let col = 0; col < 9; col++) {
  for (let row = 0; row < 10; row++) {
    const number = col * 10 + row + 1;
    if (number > 90) continue;

    const div = document.createElement("div");
    div.classList.add("placeholder");
    div.textContent = number;
    board.appendChild(div);
    placeholderMap.set(number, div);
  }
}

// 🎯 Button click to draw a ball
document.getElementById("draw-button").addEventListener("click", drawBall);

function drawBall() {
  if (remainingNumbers.length === 0) {
    alert("All balls have been drawn!");
    return;
  }

  const randomIndex = Math.floor(Math.random() * remainingNumbers.length);
  const number = remainingNumbers.splice(randomIndex, 1)[0];

  // Remove throb class from all previous
  document.querySelectorAll('.throb').forEach(el => el.classList.remove('throb'));

  const ball = createBallSVG(number);
  ball.classList.add('throb');

  // Replace placeholder with the animated ball
  const placeholder = placeholderMap.get(number);
  placeholder.replaceWith(ball);
  placeholderMap.set(number, ball); // Optional

  // Clone for last 6 section
  const lastBallClone = ball.cloneNode(true);
  lastBallClone.classList.add('throb');
  updateLastBalls(lastBallClone);
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

  const circle = document.createElementNS(svgNS, "circle");
  circle.setAttribute("cx", "30");
  circle.setAttribute("cy", "30");
  circle.setAttribute("r", "28");
  circle.setAttribute("fill", `url(#${gradientId})`);
  circle.setAttribute("stroke", "#333");
  circle.setAttribute("stroke-width", "2");

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
  svg.classList.add("bingo-ball");
  return svg;
}

function updateLastBalls(ballSVG) {
  lastBalls.unshift(ballSVG);
  if (lastBalls.length > 6) lastBalls.pop();

  const recentContainer = document.getElementById("recent-balls");
  recentContainer.innerHTML = "";

  lastBalls.forEach((ball, index) => {
    ball.classList.remove('throb');
    if (index === 0) ball.classList.add('throb');
    recentContainer.appendChild(ball);
  });
}
