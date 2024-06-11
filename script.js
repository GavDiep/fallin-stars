// Falling Stars Game

// Canvas Settings
let cnv = document.getElementById("myCanvas");
let ctx = cnv.getContext("2d");
cnv.width = 400;
cnv.height = 400;

// Control Variables
aPressed = false;
dPressed = false;
wPressed = false;

// Game variables
let stars = [];
for (let i = 0; i < 10; i++) {
  stars.push(createStar());
}

let score = 0;

let colors = ["black", "blue", "green", "orange", "red", "yellow"];

// Player object
let player = {
  x: cnv.width / 2 - 15, // start @ middle of width
  y: cnv.height - 30, // start @ bottom canvas
  xSpeed: 5,
  ySpeed: 0,
  w: 30,
  h: 30,
  onGround: true,
  gravity: 20,
};

// Event Handlers
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function keydownHandler(event) {
  if (event.code == "KeyA") {
    aPressed = true;
  }

  if (event.code == "KeyD") {
    dPressed = true;
  }

  if (event.code == "KeyW") {
    wPressed = true;
  }
}

function keyupHandler(event) {
  if (event.code == "KeyA") {
    aPressed = false;
  }

  if (event.code == "KeyD") {
    dPressed = false;
  }
}

// Animate
requestAnimationFrame(draw);
function draw() {
  // draw background
  ctx.fillStyle = "lightgray";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  // draw the score
  ctx.fillStyle = "black";
  ctx.font = "24px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);

  // player script
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // Draw all stars
  for (let i = 0; i < 10; i++) {
    ctx.drawImage(
      document.getElementById(stars[i].color),
      stars[i].x,
      stars[i].y,
      stars[i].w,
      stars[i].h
    );

    stars[i].y = stars[i].y + stars[i].ySpeed;

    // Check if star reaches bottom then move to top
    if (stars[i].y >= 400) {
      stars[i].y = -40; // above canvas
      stars[i].x = randomInt(0, 360); // new x posi
      stars[i].color = colors[randomInt(0, 6)]; // colors
      stars[i].ySpeed = Math.floor(Math.random() * 4 + 1); // yspeed i think idk
    }

    // Check for collision
    if (rectCollide(player, stars[i])) {
      if ((stars[i].color = 0)) {
        score--;
      } else if ((stars[i].color = 5)) {
        score += 5;
      } else {
        score++;
      }

      stars[i].y = -40; // above canvas
      stars[i].x = randomInt(0, 360); // new x posi
      stars[i].color = colors[randomInt(0, 6)]; // colors
      stars[i].ySpeed = Math.floor(Math.random() * 6 + 1); // yspeed i think idk
    }
  }

  // player control
  if (aPressed) {
    player.x = player.x - player.xSpeed;
  }

  if (dPressed) {
    player.x = player.x + player.xSpeed;
  }

  // player blocked at edges
  if (player.x <= 0) {
    player.x = 0;
  }

  if (player.x + player.w >= cnv.width) {
    player.x = cnv.width - player.w;
  }

  // player jump
  if (wPressed) {
    jump();
  }

  // stars script

  requestAnimationFrame(draw);
}
