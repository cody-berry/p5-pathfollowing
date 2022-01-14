// A basic vehicle which is our path follower.


class Vehicle {
    constructor(x, y) {
        // our natural position, velocity, acceleration
        this.pos = new p5.Vector(x, y)
        this.vel = new p5.Vector(2, 0)
        this.acc = new p5.Vector(0, 0)
        // our radius
        this.r = 16
        // our maximum speed and force
        this.maxSpeed = 4
        this.maxForce = 0.1
    }

    // seeks a target
    seek(target) {
        // our desired velocity is a straight line pointing from us to the
        // target at our maximum speed
        let desired = p5.Vector.sub(target, this.pos)
        desired.setMag(this.maxSpeed)
        // steering = desired - vel, Creg Renold's formula
        let steering = p5.Vector.sub(desired, this.vel)
        steering.limit(this.maxForce)
        this.applyForce(steering);
    }

    show() {
        fill(0, 0, 100)
        noStroke()
        // as always, remember that the third argument is the diameter, not
        // the radius!
        // circle(this.pos.x, this.pos.y, this.r*2)

        // make a triangle
        push()
        translate(this.pos.x, this.pos.y)
        rotate(this.vel.heading())
        triangle(-this.r, -this.r/2, -this.r, this.r/2, this.r, 0)
        pop()
    }

    applyForce(f) {
        // F = ma. In this world, m = 1, so a = F.
        this.acc.add(f)
    }

    update() {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        // set our acceleration back to 0
        this.acc = new p5.Vector(0, 0)
    }
}
