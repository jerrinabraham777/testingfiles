// Star field animation
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

// Set canvas size
function setCanvasSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

setCanvasSize();
window.addEventListener('resize', setCanvasSize);

// Create stars
const stars = [];
for(let i = 0; i < 200; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 3 + 1
    });
}

// Animate stars
function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#ffffff';
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        star.x -= star.speed;
        
        if(star.x < 0) {
            star.x = canvas.width;
            star.y = Math.random() * canvas.height;
        }
    });
    
    requestAnimationFrame(animate);
}

animate();

// Add some retro cursor trail effect
const trail = [];
const maxTrail = 10;

document.addEventListener('mousemove', (e) => {
    trail.push({x: e.clientX, y: e.clientY});
    if(trail.length > maxTrail) trail.shift();
    
    ctx.strokeStyle = '#ff00ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    trail.forEach((point, i) => {
        if(i === 0) {
            ctx.moveTo(point.x, point.y);
        } else {
            ctx.lineTo(point.x, point.y);
        }
    });
    ctx.stroke();
}); 