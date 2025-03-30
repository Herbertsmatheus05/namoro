// fireworks.js
alert("Feliz mêsversário de namoro!!! 🎉💖");

const canvas = document.getElementById('fireworks');
canvas.style.position = "fixed";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

function drawFirework(x, y, color) {
  for (let i = 0; i < 100; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.random() * 80;
    const dx = Math.cos(angle) * radius;
    const dy = Math.sin(angle) * radius;

    ctx.beginPath();
    ctx.arc(x + dx, y + dy, 2, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }
}

setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFirework(Math.random() * canvas.width, Math.random() * canvas.height, 'rgb(255,100,200)');
}, 500);
