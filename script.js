const { anime } = window;
const canvas = document.getElementById("constellation");
const context = canvas.getContext("2d");
const shapes = [];
const shapeCount = 130;
const palette = ["#8052ff", "#ffb829", "#15846e", "#ffffff"];

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = width * ratio;
  canvas.height = height * ratio;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function makeShapes() {
  shapes.length = 0;
  for (let index = 0; index < shapeCount; index += 1) {
    shapes.push({
      x: Math.random() * canvas.clientWidth,
      y: Math.random() * canvas.clientHeight,
      radius: 1 + Math.random() * 2.2,
      speedX: -0.25 + Math.random() * 0.5,
      speedY: -0.2 + Math.random() * 0.4,
      color: palette[index % palette.length],
      form: index % 4
    });
  }
}

function drawShape(shape) {
  context.fillStyle = shape.color;
  context.beginPath();
  if (shape.form === 0) {
    context.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
  } else if (shape.form === 1) {
    context.moveTo(shape.x, shape.y - shape.radius * 2);
    context.lineTo(shape.x + shape.radius * 2, shape.y + shape.radius * 2);
    context.lineTo(shape.x - shape.radius * 2, shape.y + shape.radius * 2);
  } else if (shape.form === 2) {
    context.rect(shape.x - shape.radius, shape.y - shape.radius, shape.radius * 2, shape.radius * 2);
  } else {
    context.moveTo(shape.x, shape.y - shape.radius * 2);
    context.lineTo(shape.x + shape.radius * 1.8, shape.y);
    context.lineTo(shape.x, shape.y + shape.radius * 2);
    context.lineTo(shape.x - shape.radius * 1.8, shape.y);
  }
  context.fill();
}

function connectShapes() {
  for (let first = 0; first < shapes.length; first += 1) {
    for (let second = first + 1; second < shapes.length; second += 1) {
      const a = shapes[first];
      const b = shapes[second];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (distance < 90) {
        context.strokeStyle = `rgba(255,255,255,${(1 - distance / 90) * 0.08})`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }
    }
  }
}

function render() {
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  shapes.forEach((shape) => {
    shape.x += shape.speedX;
    shape.y += shape.speedY;
    if (shape.x < -10) shape.x = canvas.clientWidth + 10;
    if (shape.x > canvas.clientWidth + 10) shape.x = -10;
    if (shape.y < -10) shape.y = canvas.clientHeight + 10;
    if (shape.y > canvas.clientHeight + 10) shape.y = -10;
    drawShape(shape);
  });
  connectShapes();
  requestAnimationFrame(render);
}

resizeCanvas();
makeShapes();
render();
window.addEventListener("resize", () => {
  resizeCanvas();
  makeShapes();
});

anime({
  targets: ".question-card",
  translateY: [24, 0],
  opacity: [0, 1],
  delay: anime.stagger(70),
  duration: 800,
  easing: "easeOutQuad"
});

anime({
  targets: ".signal-row, .proof-frame, .faq-list details",
  opacity: [0, 1],
  translateY: [18, 0],
  delay: anime.stagger(90),
  duration: 900,
  easing: "easeOutQuad"
});
