const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size (simulate standard mobile screen or scale appropriately)
canvas.width = 400;
canvas.height = 600;

// Game Variables
let score = 0;
let gameOver = false;
let gameSpeed = 3;

// Plane Object
const plane = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 120,
    width: 80,
    height: 70,
    image: new Image()
};
plane.image.src = 'plane.png'; // Replace with your custom plane image

// Obstacles Array and Cloud Images
const obstacles = [];
const obstacleImages = ['obstacle1.png', 'obstacle2.png']; // Replace with your obstacle images
const clouds = [];
obstacles.style.border = "10px solid blue";
obstacles.style.borderRadius = "20px";
// Load Cloud Image
const cloudImage = new Image();
cloudImage.src = 'cloud.png'; // Replace with your cloud image

// Touch Controls
let isDragging = false;

function handleStart(e) {
    isDragging = true;
    updatePlanePosition(e);
}

function handleMove(e) {
    if (isDragging) {
        updatePlanePosition(e);
    }
}

function handleEnd() {
    isDragging = false;
}

function updatePlanePosition(e) {
    // Get correct clientX whether it's a mouse or touch event
    const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    
    // Calculate relative X position
    const touchX = (clientX - rect.left) * scaleX;
    plane.x = touchX - (plane.width / 2);
    
    // Keep plane inside canvas bounds
    if (plane.x < 0) plane.x = 0;
    if (plane.x > canvas.width - plane.width) plane.x = canvas.width - plane.width;
}

// Event Listeners for Touch and Mouse
canvas.addEventListener('touchstart', handleStart, { passive: false });
canvas.addEventListener('touchmove', handleMove, { passive: false });
canvas.addEventListener('touchend', handleEnd, { passive: false });
canvas.addEventListener('mousedown', handleStart);
canvas.addEventListener('mousemove', handleMove);
window.addEventListener('mouseup', handleEnd);

// Obstacle Factory
function spawnObstacle() {
    const size = 40;
    const x = Math.random() * (canvas.width - size);
    const y = -size;
    const imgIndex = Math.floor(Math.random() * obstacleImages.length);
    const img = new Image();
    img.src = obstacleImages[imgIndex];
    
    obstacles.push({ x, y, width: size, height: size, image: img });
}

// Cloud Factory
function spawnCloud() {
    const size = Math.random() * 80 + 40;
    const x = Math.random() * (canvas.width - size);
    const y = -size;
    clouds.push({ x, y, size });
}

// Collision Detection
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width - 10 &&
           rect1.x + rect1.width > rect2.x + 10 &&
           rect1.y < rect2.y + rect2.height - 10 &&
           rect1.y + rect1.height > rect2.y + 10;
}

// Game Loop
function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.fillText(`Score: ${score}`, canvas.width / 2 - 50, canvas.height / 2 + 40);
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Spawn and Draw Clouds
    if (Math.random() < 0.02) spawnCloud();
    for (let i = 0; i < clouds.length; i++) {
        const cloud = clouds[i];
        cloud.y += gameSpeed * 0.5;
        ctx.drawImage(cloudImage, cloud.x, cloud.y, cloud.size, cloud.size);
        
        if (cloud.y > canvas.height) {
            clouds.splice(i, 1);
            i--;
        }
    }

    // Spawn and Draw Obstacles
    if (Math.random() < 0.01) spawnObstacle();
    for (let i = 0; i < obstacles.length; i++) {
        const obs = obstacles[i];
        obs.y += gameSpeed;
        ctx.drawImage(obs.image, obs.x, obs.y, obs.width, obs.height);

        // Check Collision
        if (checkCollision(plane, obs)) {
            gameOver = true;
        }

        // Remove off-screen obstacles and update score
        if (obs.y > canvas.height) {
            obstacles.splice(i, 1);
            i--;
            score += 10;
        }
    }

    // Draw Plane
    ctx.drawImage(plane.image, plane.x, plane.y, plane.width, plane.height);

    // Draw Score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);

    requestAnimationFrame(gameLoop);
}

// Initialize Loop
gameLoop();
