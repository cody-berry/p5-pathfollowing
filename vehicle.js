// A basic vehicle which is our path follower.

// Just to note, we'll be using vector projection, so we'll implement it here.
// This was mainly what we were building for vectorProjection().

function findProjection(pos, a, b) {
    strokeWeight(3)
    stroke(0, 0, 100)
    let v1 = p5.Vector.sub(a, pos)
    let v2 = p5.Vector.sub(b, pos)
    v2.normalize()
    let sp = v1.dot(v2)
    v2.mult(sp)
    v2.add(pos)
    return v2
}

class Vehicle {
    constructor(x, y) {
        // our natural position, velocity, acceleration
        this.pos = new p5.Vector(x, y)
        this.vel = new p5.Vector(-2, 0)
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

    // Path following algorithm here!!
    follow(path) {
        // Step 1
        // Calculate the future position.
        let future = this.vel.copy()
        future.mult(50)
        future.add(this.pos)
        fill(0, 100, 100)
        circle(future.x, future.y, 16)
        drawingContext.setLineDash([5])
        stroke(0, 0, 100)
        strokeWeight(3)
        line(this.pos.x, this.pos.y, future.x, future.y)

        // Step 2
        // Is future "on" our path?
        let target = findProjection(path.start, future, path.end)
        // Step 3
        // Find projection point
        fill(120, 100, 100)
        noStroke()
        circle(target.x, target.y, 16)
        stroke(0, 0, 100)
        line(future.x, future.y, target.x, target.y)

        let d = p5.Vector.dist(future, target)
        // Amendment: Seek a point a bit ahead of the target but
        // still on our path.
        // wait, but it's always going opposite of the start of the path!
        // let's make it so that that doesn't happen.
        let target_amendment
        if (this.vel.x >= 0) {
            target_amendment = p5.Vector.sub(target, path.start)
            target_amendment.setMag(20)
        } else {
            target_amendment = p5.Vector.sub(target, path.end)
            target_amendment.setMag(20)
        }
        stroke(0, 0, 100)
        strokeWeight(5)
        // our amendment target
        let newTarget = p5.Vector.add(target, target_amendment)
        stroke(0, 0, 100)
        line(target.x, target.y, newTarget.x, newTarget.y)
        fill(200, 100, 100)
        noStroke()
        circle(newTarget.x, newTarget.y, 16)
        if (d > path.r) {
            // Step 4
            // If our distance condition is true, seek our target.
            this.seek(newTarget)
        }
        drawingContext.setLineDash([])
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

    // checks the edges
    edges() {
        // left
        if (this.pos.x - this.r < 0) {
            this.pos.x = width - this.r
        }
        // right
        if (this.pos.x + this.r > width) {
            this.pos.x = this.r
        }

        // bottom
        if (this.pos.y + this.r > height) {
            this.pos.y = this.r
        }
        // top
        if (this.pos.y - this.r < 0) {
            this.pos.y = height - this.r
        }
    }
}
