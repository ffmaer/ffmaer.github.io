function preload() {
    metaballs_shader = loadShader('../shared/shader.vert', 'metaballs.frag');
    source_font = loadFont("../shared/TraditionalChineseHK/SourceHanSansHC-Bold.otf")

    dub_list = ["wandering-mei-ziyu/jade-seller.m4a",
                "wandering-mei-ziyu/literary-knowledge-was-lacking.m4a",
                "wandering-mei-ziyu/preface-to-the-flower-appraisal.m4a",
                "wandering-qiu-munan/qiu-munan-was-nearly-thirty.m4a",
                "wandering-qiu-munan/yuqing-jokingly-asked.m4a",
                "wandering-qiu-munan/yuqings-eyebrows-furrowed.m4a",
                "wandering-han-tao/haste-makes-waste.m4a",
                "wandering-han-tao/interested-in-yang-ruozhi.m4a",
                "wandering-han-tao/special-pill.m4a"]
    preloadSoundHoles()
}

function setup() {
    cnv = new Canvas(1920, 1200, WEBGL);
    screen_id = 2
    setupCam()
    setupBalls()
    setupPenrose()
    setupBoids()
    setupSoundHoles("blue","Lavender")
    nextScene("3")
}

function draw() {
    background("white")
    drawBalls()
    drawPenrose()
    drawCam(meiziyu)
    drawBoids()
    drawSoundHoles()

    // p5.play
    boids_sprite_plane.clear()
    sound_hole_layer.clear()
    connection_layer.clear()

    allSprites.draw()
}