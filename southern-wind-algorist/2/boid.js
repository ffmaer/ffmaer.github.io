// 驿寄梅花，鱼传尺素

class Boid {

    max_force = 1;
    min_speed = 1;

    constructor() {

        // position
        // velocity
        // acceleration

        this.p_pos = createVector(0, 0)
        this.velocity = p5.Vector.random2D();
        this.acceleration = p5.Vector.random2D();
        this.direction = createVector(0, 0)
        this.hanzi = getNextBoidHanzi()
        // this.en = toEn(this.hanzi)
        this.color = color(random(["white", "yellow"]))
        this.seed = int(random(10000))
        this.scale = random(0.5, 1)
        this.species = random([1, 2, 3])
        this.sprite = new Sprite()
        // this.sprite.diameter = 50
        // this.sprite.collider = 'none'
        this.sprite.x = random(-width, width * 2)
        this.sprite.y = random(-height, height * 2)
        this.sprite.draw = function () {
            boids_sprite_plane.stroke("red")
            boids_sprite_plane.strokeWeight(5)
            boids_sprite_plane.noFill()
            boids_sprite_plane.circle(this.x, this.y, this.diameter)
        }
        this.sprite.visible = false
        this.head = this.fish_head
        this.body_front = this.fish_body
        this.body_back = this.fish_body
        this.tail = this.fish_tail
    }

    wriggle() {
        this.velocity.add(p5.Vector.fromAngle(radians(this.direction.heading() + noise(frameCount / 1000) * 10)))
    }

    updateHanzi(){
        this.hanzi = getNextBoidHanzi()
        // this.en = toEn(this.hanzi)
    }

    move() {
        this.edges()
        this.p_pos = createVector(this.sprite.x, this.sprite.y);
        this.velocity.add(this.acceleration)
        this.velocity.setMag(this.min_speed)
        this.sprite.x += this.velocity.x
        this.sprite.y += this.velocity.y
        this.direction = p5.Vector.sub(createVector(this.sprite.x, this.sprite.y), this.p_pos)
        // this.sprite.x = this.sprite.x
        // this.sprite.y = this.sprite.y
    }

    // https://www.red3d.com/cwr/boids/
    // Separation: steer to avoid crowding local flockmates alignment diagram	
    // Alignment: steer towards the average heading of local flockmates cohesion diagram	
    // Cohesion: steer to move toward the average position of local flockmates

    align_cohere_separate(boids) {
        let perceptionRadius = 100;
        let average_speed = createVector()
        let average_pos = createVector()
        let count = 0
        let average_speed_steer_force = createVector()
        let average_pos_steer_force = createVector()
        let separate_steer_force = createVector()
        for (let boid of boids) {
            let d = dist(this.sprite.x, this.sprite.y, boid.sprite.x, boid.sprite.y)
            if (boid != this && d < perceptionRadius) {
                average_speed.add(boid.velocity)
                average_pos.add(createVector(boid.sprite.x, boid.sprite.y))
                separate_steer_force.add(p5.Vector.sub(createVector(this.sprite.x, this.sprite.y), createVector(boid.sprite.x, boid.sprite.y)).mult(1 / d))
                count++
            }

        }
        if (count > 0) {
            average_speed = average_speed.div(count)
            average_speed_steer_force = average_speed.sub(this.velocity)
            average_speed_steer_force.limit(this.max_force);

            average_pos = average_pos.div(count)
            average_pos_steer_force = average_pos.sub(createVector(this.sprite.x, this.sprite.y))
            average_pos_steer_force.limit(this.max_force);

            separate_steer_force.limit(this.max_force);
        }
        this.acceleration.set(0, 0);
        this.acceleration.add(average_speed_steer_force)
        this.acceleration.add(average_pos_steer_force)
        this.acceleration.add(separate_steer_force)
    }

    edges() {
        let touched = false
        if (this.sprite.x > width * 2) {
            this.sprite.x = -width
            touched = true
        }
        if (this.sprite.x < -width) {
            this.sprite.x = width * 2
            touched = true
        }
        if (this.sprite.y > height * 2) {
            this.sprite.y = -height
            touched = true
        }
        if (this.sprite.y < -height) {
            this.sprite.y = height * 2
            touched = true
        }
        if(touched){
            this.updateHanzi()
        }
    }

    draw() {

        boids_plane.push()
        boids_plane.noStroke()
        boids_plane.translate(this.sprite.x, this.sprite.y)
        boids_plane.scale(this.scale)
        boids_plane.angleMode(DEGREES)
        boids_plane.rotate(this.direction.heading() + 90)
        boids_plane.textAlign(CENTER, CENTER)
        boids_plane.textFont(source_font)
        boids_plane.textSize(40)
        boids_plane.push()
        boids_plane.rotate(90)
        let my_noise = noise((frameCount + this.seed) / 100)
		let c = lerpColor(this.color, color(255), my_noise)
        boids_plane.blendMode(ADD)
        boids_plane.fill(c);
        boids_plane.text(`${this.head}${this.body_front}${this.hanzi}${this.body_back}${this.tail}`, 0, -6) //${this.en}

        boids_plane.pop()
        boids_plane.pop()
    }
    get fish_head() {
        return random(["<*",">*", ">°", "<°"])
    }
    get fish_tail() {
        return random(["><", "彡", "<"])
    }
    get fish_body() {
        return random([")", "+"]).repeat(int(random(3, 5)))
    }
}