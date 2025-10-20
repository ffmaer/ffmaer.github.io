function preload() {
    reaction_shader = loadShader('../shared/shader.vert', 'reaction.frag');
    source_font = loadFont("../shared/TraditionalChineseHK/SourceHanSansHC-Bold.otf");

    dub_list = ["devoting-pan-wenzi/frying-radishes.m4a",
        "devoting-pan-wenzi/husband-and-wife-advise-and-encourage-each-other.m4a",
        "devoting-pan-wenzi/people-with-destiny-will-meet-even-if-they-are-thousands-of-miles-apart.m4a",
        "devoting-huang-jiulang/a-sense-of-loss.m4a",
        "devoting-huang-jiulang/my-reluctance-to-be-close-to-you.m4a",
        "devoting-huang-jiulang/who-am-i-xiao.m4a",
        "devoting-zhao-wangsun/beating-around-the-bush.m4a",
        "devoting-zhao-wangsun/broke-a-hole-in-the-paper-window.m4a",
        "devoting-zhao-wangsun/zhao-wangsun.m4a"
    ]
    preloadSoundHoles()
}

function setup() {
    if (connected()) {
        cnv = new Canvas(1800, 1200, WEBGL);
    } else {
        cnv = new Canvas(1920, 1200, WEBGL);
    }
    
    screen_id = 1
    setupCam()
    setupReaction()
    setupStrange()
    setupFountain()
    setupSoundHoles("lime", "magenta")
    nextScene("2")
}

function draw() {
    background("black");
    drawReaction()
    drawCam(jiulang)
    drawStrange()
    drawFountain()
    drawSoundHoles()

    // p5.play
    fountain_graph.clear()
    sound_hole_layer.clear()
    allSprites.draw()
}