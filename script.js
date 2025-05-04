   // Animações GSAP
   gsap.utils.toArray("section").forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 100,
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 40%",
        toggleActions: "play none none reverse"
      }
    });
  });

  const spaceship = document.getElementById('spaceship');
const gokugin = document.getElementById('gokugin');

let posX = window.innerWidth / 2;
let posY = window.innerHeight - 150;

document.addEventListener('keydown', (e) => {
const step = 15;
let moved = false;

if (e.key === "ArrowLeft") { posX -= step; moved = true; }
if (e.key === "ArrowRight") { posX += step; moved = true; }
if (e.key === "ArrowUp") { posY -= step; moved = true; }
if (e.key === "ArrowDown") { posY += step; moved = true; }

const spaceshipWidth = spaceship.offsetWidth;
const spaceshipHeight = spaceship.offsetHeight;
const padding = 20;

posX = Math.max(padding, Math.min(window.innerWidth - spaceshipWidth - padding, posX));
posY = Math.max(padding, Math.min(window.innerHeight - spaceshipHeight - padding, posY));

spaceship.style.left = `${posX}px`;
spaceship.style.top = `${posY}px`;
gokugin.style.left = `${posX}px`;
gokugin.style.top = `${posY}px`;

if (moved) {
  spaceship.src = './imagem/gokugin.png';
  clearTimeout(window.gokuginTimeout);
  window.gokuginTimeout = setTimeout(() => {
    spaceship.src = './imagem/nave.png'; 
  }, 300);
}
});
window.addEventListener('load', () => {
    Swal.fire({
      title: 'Explore o Currículo!',
      html: `
        <h3>Use as setas do teclado para mover a nave:</h3>
        <div style="font-size: 2rem; margin-top: 10px;">
          ⬆️<br>
          ⬅️ ➡️<br>
          ⬇️
        </div>
      `,
      icon: 'info',
      timer: 4000,
      showConfirmButton: false,
      backdrop: `rgba(0,0,0,0.8)`,
      didOpen: () => {
        // 🔥 Só adiciona o eventListener depois do Swal abrir
        document.addEventListener('keydown', fecharSwalComTecla);
      },
      willClose: () => {
        // 🔥 Remove o eventListener ao fechar para não ficar sujando o document
        document.removeEventListener('keydown', fecharSwalComTecla);
      }
    });
  
    function fecharSwalComTecla(e) {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        Swal.close();
      }
    }
  });
  
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  
  // Redimensionamento
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Mouse
  const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
  window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  });
  
  // Partícula
  class Particle {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.speed = Math.random() * 0.5 + 0.5;
      this.velocityX = 0;
      this.velocityY = 0;
    }
  
    draw() {
      ctx.save();
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  
    update() {
      // Segue o mouse se não tiver velocidade ativa
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let angle = Math.atan2(dy, dx);
  
      // movimento suave
      if (this.velocityX === 0 && this.velocityY === 0) {
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;
      } else {
        // movimento de explosão
        this.x += this.velocityX;
        this.y += this.velocityY;
  
        // desaceleração com atrito
        this.velocityX *= 0.95;
        this.velocityY *= 0.95;
  
        if (Math.abs(this.velocityX) < 0.05) this.velocityX = 0;
        if (Math.abs(this.velocityY) < 0.05) this.velocityY = 0;
      }
  
      this.draw();
    }
  
    explodeFrom(x, y) {
      const angle = Math.atan2(this.y - y, this.x - x);
      const power = Math.random() * 6 + 4;
      this.velocityX = Math.cos(angle) * power;
      this.velocityY = Math.sin(angle) * power;
    }
  }
  
  // Inicialização
  let particlesArray = [];
  const numberOfParticles = 100;
  
  function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 2 + 1;
      particlesArray.push(new Particle(x, y, size, 'white'));
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach(p => p.update());
    requestAnimationFrame(animate);
  }
  
  // 💥 Explosão ao clicar
  canvas.addEventListener('click', (e) => {
    console.log('Clique detectado em:', e.clientX, e.clientY); 
    const clickX = e.clientX;
    const clickY = e.clientY;
    particlesArray.forEach(p => p.explodeFrom(clickX, clickY));
  });
  
  init();
  animate();
  