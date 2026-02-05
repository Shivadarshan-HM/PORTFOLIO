const header = document.querySelector(".header-premium");

window.addEventListener("scroll", () => {
  if(window.scrollY > 50){
    header.classList.add("shrink");
  }else{
    header.classList.remove("shrink");
  }
});
/* ================= PARTICLE BACKGROUND ================= */

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

let w, h;
let particles = [];

function resize(){
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}

window.addEventListener("resize", resize);
resize();

/* Particle Class */

class Particle{
  constructor(){
    this.x = Math.random() * w;
    this.y = Math.random() * h;

    this.radius = Math.random() * 2 + 1;

    this.speedX = (Math.random() - 0.5) * 0.6;
    this.speedY = (Math.random() - 0.5) * 0.6;

    this.opacity = Math.random() * 0.5 + 0.3;
  }

  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);

    ctx.fillStyle = `rgba(0,212,255,${this.opacity})`;
    ctx.fill();
  }

  update(){
    this.x += this.speedX;
    this.y += this.speedY;

    if(this.x < 0 || this.x > w) this.speedX *= -1;
    if(this.y < 0 || this.y > h) this.speedY *= -1;

    this.draw();
  }
}

/* Create Particles */

function init(){
  particles = [];
  const count = Math.floor((w*h)/15000);

  for(let i=0;i<count;i++){
    particles.push(new Particle());
  }
}

init();

/* Animate */

function animate(){
  ctx.clearRect(0,0,w,h);

  particles.forEach(p => p.update());

  requestAnimationFrame(animate);
}

animate();
/* ================= ACTIVE NAV HIGHLIGHT ================= */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".neo-link");

window.addEventListener("scroll", () => {

  let current = "";

  sections.forEach(section => {

    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;

    if(pageYOffset >= sectionTop &&
       pageYOffset < sectionTop + sectionHeight){

      current = section.getAttribute("id");
    }

  });

  navLinks.forEach(link => {

    link.classList.remove("active");

    if(link.getAttribute("href") === "#" + current){
      link.classList.add("active");
    }

  });

});
