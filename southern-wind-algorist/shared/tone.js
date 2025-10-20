let socket;
let playback_rate = 1
let sound_hole_margin_x = 150
let sound_hole_margin_x_green = 300
let sound_hole_margin_top = 200
let sound_hole_margin_btm = 500
let sound_hole_circle_size = 200
let sound_hole_diameter = 50
if (connected()) {
    socket = io();
    socket.on('is playing?',()=>{
        socket.emit('is playing? response',sfPlayer.state == "started")
    })
}

function setupSwipe() {
    swipe_layer = createGraphics(width, height)
    swipe = new Sprite()
    swipe.collider = "k"
    swipe.x = 0
    swipe.y = height / 2
    swipe.h = height
    swipe.w = 5
    swipe.draw = function () {
        swipe_layer.rectMode(CENTER)
        swipe_layer.fill("red")
        swipe_layer.noStroke()
        swipe_layer.rect(this.x, this.y, this.w, this.h)
    }
    // swipe.visible = false
    swipe.move = function () {
        this.x += 1
        if (this.x > width) {
            this.x = 0
        }
    }
}

function drawSwipe() {
    swipe.move()
    image(swipe_layer, -width / 2, -height / 2)
}

function preloadSoundHoles() {
    dubs_dict = {}
    for (let i = 0; i < dub_list.length; i++) {
        dubs_dict[dub_list[i]] = "../overdub/" + dub_list[i] 
    }
    sfPlayer = new Tone.Players(dubs_dict).toDestination();
}

function connected() {
    return window.location.search == "?connect"
}

function setupSoundHoles(idle_color, active_color) {
    if(screen_id == 1){
        sound_hole_margin_x = sound_hole_margin_x_green
    }
    sound_hole_active_color = active_color
    sound_hole_layer = createGraphics(width, height)

    sh_group = new Group()
    recent_sound_hole = ""
    if (connected()) {
        socket.on('play status', function (res) {
            if (res.play_status != "started" && res.screen_id == screen_id && recent_sound_hole != "") {
                Tone.loaded().then(() => {
                    sfPlayer.player(recent_sound_hole.dub).start();
                    socket.emit('start playing');
                    sfPlayer.player(recent_sound_hole.dub).onstop = function () {
                        socket.emit('play ended');
                    }
                    sfPlayer.player(recent_sound_hole.dub).playbackRate = playback_rate
                });
            }
        });
    }

    nose_sprite.collides(sh_group, function (nose, sound_hole) {
        if (connected()) {
            socket.emit('want to play', screen_id);
            recent_sound_hole = sound_hole
        } else {
            if (sfPlayer.state != "started") {
                Tone.loaded().then(() => {
                    sfPlayer.player(sound_hole.dub).start();
                    sfPlayer.player(sound_hole.dub).playbackRate = playback_rate
                });
            }
        }

    })
    sh_group.color = "black"
    for (let j = 0; j < 3; j++) { // x
        for (let i = 0; i < 3; i++) { // y
            let sh_x = (width - sound_hole_margin_x * 2) / 2 * j + sound_hole_margin_x
            // if(j == 1 && ( screen_id == 2 || screen_id == 3 )) sh_x -= sound_hole_circle_size
            let sh_y = (height - sound_hole_margin_top - sound_hole_margin_btm) / 2 * i + sound_hole_margin_top
            soundHole(sh_x, sh_y)
            mask_layer.circle(width-sh_x, sh_y, sound_hole_circle_size)

        }
    }

    for (let i = 0; i < sh_group.length; i++) {
        sh_group[i].color = idle_color
    }


    for (let i = 0; i < dub_list.length; i++) {
        sh_group[i].dub = dub_list[i]
    }


}

function drawSoundHoles() {
    image(sound_hole_layer, -width / 2, -height / 2)
}

function soundHole(x, y) {
    let sh = new sh_group.Sprite()
    sh.collider = "k"
    sh.x = x
    sh.y = y
    sh.moveTo(createVector(x, y));
    sh.seed = random(1000)
    sh.diameter = sound_hole_diameter
    sh.draw = function () {
        sound_hole_layer.blendMode(ADD)
        if (sfPlayer.player(this.dub).state == "started") {
            sound_hole_layer.stroke(sound_hole_active_color);
            basic_len = this.diameter
            noise_len = this.diameter
        } else {
            sound_hole_layer.stroke(this.color);
            basic_len = this.diameter / 2
            noise_len = this.diameter / 2
        }
        sound_hole_layer.beginShape();
        steps = 36
        sound_hole_layer.strokeWeight(2);
        sound_hole_layer.noFill();
        sound_hole_layer.angleMode(DEGREES)
        for (let j = 0; j < 5; j++) {
            noise_xy_amp = this.diameter
            position_noise_x = (-0.5 + noise(this.seed + j * 10 + frameCount / 20)) * noise_xy_amp
            position_noise_y = (-0.5 + noise(this.seed + (j + 10) * 10 + frameCount / 20)) * noise_xy_amp

            for (let i = 0; i < steps; i++) {
                len = basic_len + (-0.5 + noise(this.seed + j * 10 + frameCount + i * 2)) * noise_len
                deg = 360 / steps * i
                cv_x = cos(deg) * len
                cv_y = sin(deg) * len

                sound_hole_layer.curveVertex(cv_x + this.x + position_noise_x, cv_y + this.y + position_noise_y);
            }
        }
        sound_hole_layer.endShape(CLOSE);
    }
}