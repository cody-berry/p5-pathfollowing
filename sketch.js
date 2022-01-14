/*
@author Cody
@date 2022-01-14

coding plan
    basic ☒ vehicle class with  show, ☒ applyForce, ☒ update
    ☒☐☐ seek

 */
let font, vehicle, gravity
let target

function preload() {
    font = loadFont('data/meiryo.ttf')
}

function setup() {
    createCanvas(640, 360)
    colorMode(HSB, 360, 100, 100, 100)
    vehicle = new Vehicle(random(width), random(height))
    gravity = new p5.Vector(0, 0.1)
}

function draw() {
    background(234, 34, 24)
    // fill with a green color for our target
    fill(0, 100, 100);
    noStroke()
    target = createVector(mouseX, mouseY)
    circle(target.x, target.y, 32)

    vehicle.show()
    // vehicle.applyForce(gravity)
    vehicle.update()
    vehicle.seek(target)
}