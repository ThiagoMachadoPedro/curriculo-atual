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
  


  // Seleciona o canvas e configura o contexto
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

// Ajusta o tamanho do canvas para preencher a tela
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Mouse
const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2
};

window.addEventListener('mousemove', function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

// Classe Partícula
class Particle {
  constructor(x, y, size, color, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.speed = speed;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let angle = Math.atan2(dy, dx);

    this.x += Math.cos(angle) * this.speed;
    this.y += Math.sin(angle) * this.speed;

    this.draw();
  }
}

// Variáveis
let particlesArray = [];
const numberOfParticles = 100;

// Inicializar partículas
function init() {
  particlesArray = [];
  for (let i = 0; i < numberOfParticles; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let size = Math.random() * 2 + 1;
    let speed = Math.random() * 0.5 + 0.5; // velocidade suave
    particlesArray.push(new Particle(x, y, size, 'white', speed));
  }
}

// Loop de animação
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(particle => particle.update());
  requestAnimationFrame(animate);
}

// Iniciar
init();
animate();
