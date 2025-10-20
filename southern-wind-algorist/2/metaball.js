function placeTwoBalls() {
    balls = []
    start_pos = [
        [0, 0],
        [500, 200],
        [-500, -200],
        [-500, 200],
        [500, -200]
    ];
    for (let i = 0; i < start_pos.length; i++) {
        b = new Ball(width / 2 + start_pos[i][0], height / 2 + start_pos[i][1])
        balls.push(b)
    }
}


function moveBalls() {
    for (let i = 0; i < balls.length; i++) {
        balls[i].move();
    }
}

class Ball {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.x_speed = random([-0.1, 0.1])
        this.y_speed = random([-0.1, 0.1])
        this.rose = new Rose(x, y, int(random(500)))
    }

    move() {
        this.x += this.x_speed
        this.y += this.y_speed
        if (this.x > width * 1.2) {
            this.x = -width * 0.2
        }
        if (this.x < -width * 0.2) {
            this.x = width * 1.2
        }
        if (this.y > height * 1.2) {
            this.y = -height * 0.2
        }
        if (this.y < -height * 0.2) {
            this.y = height * 1.2
        }
        this.rose.x = this.x
        this.rose.y = this.y
    }
}

function setupBalls() {
    littlegirlpei_idx = 0

    placeTwoBalls()
    ball_plane = createGraphics(width, height, WEBGL)
    ball_plane.setAttributes({
        alpha: true
    });

}

function drawBalls() {
    moveBalls()
    ball_plane.shader(metaballs_shader);
    metaballs_shader.setUniform('balls0', [balls[0].x, balls[0].y]);
    metaballs_shader.setUniform('balls1', [balls[1].x, balls[1].y]);
    metaballs_shader.setUniform('balls2', [balls[2].x, balls[2].y]);
    metaballs_shader.setUniform('balls3', [balls[3].x, balls[3].y]);
    metaballs_shader.setUniform('balls4', [balls[4].x, balls[4].y]);
    metaballs_shader.setUniform('noise0', balls[0].rose.noise());
    metaballs_shader.setUniform('noise1', balls[1].rose.noise());
    metaballs_shader.setUniform('noise2', balls[2].rose.noise());
    metaballs_shader.setUniform('noise3', balls[3].rose.noise());
    metaballs_shader.setUniform('noise4', balls[4].rose.noise());
    ball_plane.rect(0, 0, width, height);
    image(ball_plane, -width / 2, -height / 2);
}