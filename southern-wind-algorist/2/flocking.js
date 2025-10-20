function setupBoids() {
    boids = []
    boid_hanzi_i = 0

    for (let i = 0; i < 108; i++) {
        b = new Boid()
       
        boids.push(b)
    }

    boids_plane = createGraphics(width, height)
    boids_sprite_plane = createGraphics(width,height)
}

function getNextBoidHanzi(){
    let hanzi = drunkfish.charAt(boid_hanzi_i)
    boid_hanzi_i++
    boid_hanzi_i = boid_hanzi_i % drunkfish.length
    return hanzi
}

function drawBoids() {
    boids_plane.clear();
    for (let i = 0; i < boids.length; i++) {
        b = boids[i]
        b.align_cohere_separate(boids)
        b.move()
        b.draw()
    }
    push()
    blendMode(DIFFERENCE)
    image(boids_plane, -width / 2, -height / 2)
    image(boids_sprite_plane, -width/2,-height/2)
    pop()
}