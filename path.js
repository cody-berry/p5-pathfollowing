// A path for our vehicle to follow.



class Path {
    constructor(x1, y1, x2, y2) {
        // What is a path?
        // We're just going to do this for Mini Motorways, but
        this.start = new p5.Vector(x1, y1)
        this.end = new p5.Vector(x2, y2)
    }

    show() {
        stroke(0, 0, 100)
        strokeWeight(2)
        line(this.start.x, this.start.y, this.end.x, this.end.y)
    }
}



