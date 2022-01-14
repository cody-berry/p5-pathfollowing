// A path for our vehicle to follow.



class Path {
    constructor(x1, y1, x2, y2) {
        // What is a path?
        // We're just going to do this for Mini Motorways, but
        this.start = new p5.Vector(x1, y1)
        this.end = new p5.Vector(x2, y2)
        // the radius of the road our "car" is trying to stay on
        this.r = 20
    }

    show() {
        stroke(0, 0, 100)
        strokeWeight(2)
        line(this.start.x, this.start.y, this.end.x, this.end.y)
        stroke(255, 10)
        strokeWeight(this.r * 2)
        line(this.start.x, this.start.y, this.end.x, this.end.y)
    }
}



