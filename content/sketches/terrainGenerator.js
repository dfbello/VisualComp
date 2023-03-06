let cols, rows;
let h = 2000;
let w = 1700;
let flying = 0;
let maxSlider;
let flyingSlider;
let sclSlider;
let strokeCheckbox;

function setup() {
    maxSlider = createSlider(50, 250, 150);
    maxSlider.position(10, 10);
    maxSlider.style("width", "80px");
    flyingSlider = createSlider(0, 0.5, 0.1, 0.05);
    flyingSlider.position(10, 30);
    flyingSlider.style("width", "80px");
    sclSlider = createSlider(20, 50, 20);
    sclSlider.position(120, 10);
    sclSlider.style("width", "80px");
    strokeCheckbox = createCheckbox("Stroke", false);
    strokeCheckbox.position(120, 30);
    strokeCheckbox.changed(getStroke);
    createCanvas(600, 600, WEBGL);
    noStroke();
    cols = w / sclSlider.value();
    rows = h / sclSlider.value();
    terrain = new Array(cols).fill(0).map(() => new Array(rows).fill(0));
}

function draw() {
    flying -= flyingSlider.value();
    let yoff = flying;
    for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
            terrain[x][y] = map(noise(xoff, yoff), 0, 1, -maxSlider.value(), maxSlider.value());
            xoff += 0.1;
        }
        yoff += 0.1;
    }

    background(56,124,149);
    rotateX(PI / 3);
    translate(-w / 2, -h / 2);
    for (let y = 0; y < rows - 1; y++) {
        beginShape(TRIANGLE_STRIP);
        for (let x = 0; x < cols; x++) {
            fill(map(terrain[x][y], -maxSlider.value(), maxSlider.value(), 20, 55), map(terrain[x][y], -maxSlider.value(), maxSlider.value(), 65, 190), map(terrain[x][y], -maxSlider.value(), maxSlider.value(), 20, 60));
            vertex(x * sclSlider.value(), y * sclSlider.value(), terrain[x][y]);
            vertex(x * sclSlider.value(), (y + 1) * sclSlider.value(), terrain[x][y + 1]);
        }
        endShape();
    }
}

function getStroke() {
    if (strokeCheckbox.checked()){
        stroke(0);
    }
    else {
        noStroke();
    }
}