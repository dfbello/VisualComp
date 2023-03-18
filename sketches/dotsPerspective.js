const dots = [];
const border = 20;

function setup() {
  createCanvas(700, 500);

  for (let layer = 1; layer <= 3; layer++) {
    for (let i = 0; i < 200; i++) {
      dots.push(new Dot(layer));
    }
  }
}

function draw() {
  background(32);
  for (const dot of dots) {
    dot.draw();
  }
}

class Dot {
  constructor(layer) {
    this.layer = layer;
    this.x = random(-border, width + border);
    this.y = random(-border, height + border);

    this.r = random(255);
    this.g = random(255);
  }

  draw() {
    let deltaX = 0;
    let deltaY = 0;

    if(mouseX != 0 && mouseY != 0){
      deltaX = -this.layer *
        map(mouseX - width / 2, 0, width, 0, 5);
      deltaY = -this.layer *
        map(mouseY - height / 2, 0, height, 0, 5);
    }

    this.x += deltaX;
    this.y += deltaY;

    if (this.x < -border) {
      this.x = width + random(border);
      this.y = random(0, height);
    } else if (this.x > width + border) {
      this.x = 0 - random(border);
      this.y = random(0, height);
    }

    if (this.y < -border) {
      this.y = height + random(border);
      this.x = random(0, width);
    } else if (this.y > height + border) {
      this.y = 0 - random(border);
      this.x = random(0, width);
    }

    fill(this.r, this.g, 0);
    circle(this.x, this.y, 10 / (4 - this.layer));
  }
}