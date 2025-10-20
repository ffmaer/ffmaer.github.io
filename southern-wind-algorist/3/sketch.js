function preload() {
    voronoi_shader = loadShader('../shared/shader.vert', 'voronoi.frag');
    source_font = loadFont("../shared/TraditionalChineseHK/SourceHanSansHC-Bold.otf");

    dub_list = ["suffering-xu-jifang/himself-was-too-handsome.m4a",
                "suffering-xu-jifang/slippery-moss-covered-paths.m4a",
                "suffering-xu-jifang/southern-wind-tree.m4a", // ogg
                "suffering-niu-jun/corpse.m4a",
                "suffering-niu-jun/kill-the-grand-tutor.m4a",
                "suffering-niu-jun/the-queen-says-that-she-is-two-years-older.m4a",
                "suffering-li-zhaifan/sell-himself.m4a",
                "suffering-li-zhaifan/brutal-treatment.m4a",
                "suffering-li-zhaifan/why-are-you-so-afraid-of-him.m4a"]
    preloadSoundHoles()

}

function setup() {
    cnv = new Canvas(1920, 1200, WEBGL);
    screen_id = 3
    // setupSwipe()
    setupGameOfLife()
    setupVoronoi()
    setup10Print()
    setupCam()
    setupSoundHoles("red","#c38aff")
    nextScene("1")

}

function draw() {
    background("#630000")
    drawVoronoi()
    drawCam(qingqiji)
    draw10Print()
    drawGameOfLife()
    // drawSwipe()
    drawSoundHoles()

    // p5.play
    gol_plane.clear()
    sound_hole_layer.clear()
    // swipe_layer.clear()
    drawSprites()
}