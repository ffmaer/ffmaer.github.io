function createDots() {
    dot_count = 10 // needs to be a even number
    dots = []
    for (let i = 0; i < dot_count / 2; i++) {
        d = new Dot(random(width), random(height), [1, 0, 1])
        dots.push(d)
    }
    for (let i = 0; i < dot_count / 2; i++) {
        d = new Dot(random(width), random(height), [1, 0, 0])
        dots.push(d)
    }
}

function getDotsXYs() {
    output = []
    for (let i = 0; i < dot_count; i++) {
        d = dots[i]
        output.push(d.x, d.y)
    }
    return output
}

function getDotsColors() {
    output = []
    for (let i = 0; i < dot_count; i++) {
        d = dots[i]
        output.push(...d.color.flat())
    }
    return output
}

function drawDots() {
    for (let i = 0; i < dots.length; i++) {
        d = dots[i]
        dots_trajectory.push()
        dots_trajectory.strokeWeight(10)
        dots_trajectory.stroke("white")
        dots_trajectory.point(d.x, d.y)
        dots_trajectory.pop()
    }
    push()
    texture(dots_trajectory)
    noStroke()
    // rotateX(50)
    plane(width, height)
    pop()
}


function moveDots() {
    for (let i = 0; i < dots.length; i++) {
        dots[i].move();
    }
}


class Dot {
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
        this.x_direction = random(-5, 5)
        this.y_direction = random(-5, 5)
    }

    move() {
        this.x += this.x_direction
        this.y += this.y_direction
        if (this.x > width || this.x < 0) {
            this.x_direction *= -1
        }
        if (this.y > height || this.y < 0) {
            this.y_direction *= -1
        }
    }
}

function setupVoronoi() {
    createDots()
    shaderTexture = createGraphics(width, height, WEBGL);
    shaderTexture.setAttributes({
        alpha: true
    });
    // dots_trajectory = createGraphics(width, height);

}

function drawVoronoi() {
    moveDots()
    shaderTexture.shader(voronoi_shader);
    voronoi_shader.setUniform('dots', getDotsXYs());
    voronoi_shader.setUniform('colors', getDotsColors());
    voronoi_shader.setUniform('hasLove', hasLove());
    // texture(shaderTexture);
    shaderTexture.rect(0, 0, width, height);
    image(shaderTexture, -width/2, -height/2);
    // drawDots()
}