let video;
let poseNet;
let poses = [];
let trajectory = [];
let love_trail = [];
let love_noise_seed = 99;
let NOSE_SCORE_THRESHOLD = 0.8;

function setupCam() {
    capture = createCapture(VIDEO)
    capture_w = 480 // OMEN laptop camera
    capture_h = 360 // OMEN laptop camera
    zoomed_cam_w = width
    zoomed_cam_h = capture_h*(width/capture_w)
    capture.size(capture_w, capture_h)
    capture.hide()
    large_capture = createImage(zoomed_cam_w, zoomed_cam_h)
    cam_graph = createGraphics(width, height)

    cam_graph.setAttributes({
        alpha: true
    });
    zoomed_cam_hanzi_index = 0
    repeat_count = 0

    mask_layer = createGraphics(zoomed_cam_w, zoomed_cam_h)

    //ml5
    poseNet = ml5.poseNet(capture, function () {
        console.log('Model Loaded');
    });
    poseNet.on('pose', function (results) {
        poses = []
        for (let i = 0; i < results.length; i++) {
            let result = results[i];
            let nose = result.pose.keypoints[0]; //Nose
            if (nose.score > NOSE_SCORE_THRESHOLD) {
                poses.push(result)
            }
        }
    });

    setupNoseSprite()
}

function drawCam(story) {
    // updateMask()
    large_capture.copy(capture, 0, 0, capture_w,capture_h, 0,0, zoomed_cam_w, zoomed_cam_h)
    large_capture.mask(mask_layer)

    cam_graph.clear()
    cam_graph.push()
    cam_graph.translate(zoomed_cam_w, 0);
    cam_graph.scale(-1, 1);
    // cam_graph.background(0)
    cam_graph.image(large_capture, 0, 0, zoomed_cam_w, zoomed_cam_h);
    // cam_graph.filter(GRAY )
    cam_graph.pop()
    createTrail(story);
    // drawPose() // full body pose, for testing
    drawNose()
    storeLove()
    drawLoveTrail()
    image(cam_graph, -width / 2, -height / 2)
    // drawInstallationGrid()
}

// function updateMask(){
//     mask_layer.clear()
//     mask_layer.circle(width-nose_sprite.x,nose_sprite.y, 300)
// }

function convertKeypointX(x) {
    return zoomed_cam_w - x / capture.width * zoomed_cam_w
}

function convertKeypointY(y) {
    return y / capture.height * zoomed_cam_h
}

function drawNose() {
    for (let i = 0; i < trajectory.length; i++) {
        let x = trajectory[i][0]
        let y = trajectory[i][1]
        let hanzi = trajectory[i][2]
        cam_graph.noStroke();
        cam_graph.fill(255, 0, 255, 4)
        cam_graph.ellipse(x, y, lerp(20, 100, i / trajectory.length));
        cam_graph.fill(255)
        // cam_graph.ellipse(x, y + 5, 30);
        cam_graph.textAlign(CENTER, CENTER)
        cam_graph.fill(255, lerp(0, 255, i / trajectory.length))
        cam_graph.textFont(source_font)
        cam_graph.textSize(lerp(6, 24, i / trajectory.length))
        cam_graph.push()
        // cam_graph.blendMode(DIFFERENCE )
        cam_graph.text(hanzi, x, y)
        cam_graph.pop()

        // nose sprite
        if (nose_sprite.visible) {
            cam_graph.fill("blue")
            cam_graph.stroke("blue")
            cam_graph.circle(nose_sprite.x, nose_sprite.y, nose_sprite.radius * 2)
        }
    }
}

function storeLove() {
    let RATIO_THRESHOLD = 0.8;
    for (let i = 0; i < poses.length; i++) {
        let pose = poses[i].pose;
        let nose = pose.keypoints[0]
        let left_eye = pose.keypoints[1]
        pose.nose_eye_dist = dist(nose.position.x, nose.position.y, left_eye.position.x, left_eye.position.y)
    }
    poses.sort(function (a, b) {
        if (a.nose_eye_dist > b.nose_eye_dist) {
            return 1
        } else if (a.nose_eye_dist < b.nose_eye_dist) {
            return -1
        }
        return 0
    })

    if (poses.length >= 2) {

        let pose1 = poses[0].pose; // the largest two faces
        let pose2 = poses[1].pose;
        let nose1 = pose1.keypoints[0]
        let nose2 = pose2.keypoints[0]
        let ratio = pose1.nose_eye_dist / pose2.nose_eye_dist

        if (ratio > 1) {
            ratio = 1 / ratio
        }
        let has_similar_face_size = ratio > RATIO_THRESHOLD
        if (has_similar_face_size) {
            let min_d = min(pose1.nose_eye_dist, pose2.nose_eye_dist)
            love_trail = []
            let not_too_far = abs(nose1.position.x - nose2.position.x) < min_d * 10
            let not_too_close = abs(nose1.position.x - nose2.position.x) > min_d
            if (not_too_far && not_too_close) {
                let mid_x = (nose1.position.x + nose2.position.x) / 2
                let mid_y = (nose1.position.y + nose2.position.y) / 2
                x = convertKeypointX(mid_x)
                y = convertKeypointY(mid_y)
                text_size = min_d * 10
                love_trail.push([x, y, text_size])
            }
        }
    } else if (poses.length < 2) {
        love_trail = []
    }

}

function drawLoveTrail() {
    if (love_trail.length > 0) {
        for (let i = 0; i < love_trail.length; i++) {
            let x = love_trail[i][0]
            let y = love_trail[i][1]
            let text_size = love_trail[i][2]
            cam_graph.push()
            // cam_graph.blendMode(EXCLUSION)
            cam_graph.textAlign(CENTER, CENTER)
            cam_graph.noStroke()
            cam_graph.fill(255, 0, 255, 128)
            let my_noise = noise((love_noise_seed + frameCount) / 100)
            if (my_noise > 0.5) {
                cam_graph.textSize(text_size)
                cam_graph.text("愛", x + text_size / 3, y)
                cam_graph.text("愛", x - text_size / 3, y)
            } else {
                cam_graph.textSize(text_size / 1.5)
                cam_graph.text("LOVE", x + text_size / 12, y)
                cam_graph.text("LOVE", x - text_size / 12, y)

            }
            cam_graph.pop()
        }
    }
}

function hasLove() {
    return (love_trail.length > 0)
}

function drawPose() {
    for (let i = 0; i < poses.length; i++) {
        let pose = poses[i].pose;
        for (let i = 0; i < pose.keypoints.length; i++) {
            let pt = pose.keypoints[i]
            x = convertKeypointX(pt.position.x)
            y = convertKeypointY(pt.position.y)
            cam_graph.push()
            cam_graph.strokeWeight(30)
            cam_graph.stroke("white")
            cam_graph.point(x, y)
            cam_graph.textAlign(CENTER, CENTER)
            cam_graph.fill("black")
            cam_graph.noStroke()
            cam_graph.text(i, x, y)
            cam_graph.pop()
        }
    }

}

function createTrail(story) {
    for (let i = 0; i < poses.length; i++) {
        let pose = poses[i].pose;
        let nose = pose.keypoints[0]; //Nose
        let left = pose.keypoints[3]; // face left
        let dx = left.position.x - nose.position.x
        let dy = left.position.y - nose.position.y
        let horizontal_degree = atan(dy / dx)
        let vertical_degree = horizontal_degree + 90
        let distance = dist(left.position.x, left.position.y, nose.position.x, nose.position.y) / 4 * 3
        let mouth_x = distance * cos(vertical_degree)
        let mouth_y = distance * sin(vertical_degree)
        if (nose.score > NOSE_SCORE_THRESHOLD) {
            let x1 = convertKeypointX(nose.position.x + mouth_x)
            let y1 = convertKeypointY(nose.position.y + mouth_y)
            new_trajactory(x1, y1, story)
            nose_sprite.x = x1
            nose_sprite.y = y1
            if (trajectory.length > 99) {
                trajectory.shift()
            }
        }
    }
}

function new_trajactory(x1, y1, story) {
    trajectory.push([x1, y1, story.charAt(zoomed_cam_hanzi_index)]);
    repeat_count++
    if (repeat_count == 40) {
        zoomed_cam_hanzi_index++
        repeat_count = 0;
    }

    zoomed_cam_hanzi_index = zoomed_cam_hanzi_index % story.length
}

function setupNoseSprite() {
    nose_sprite = createSprite(-width, -height)
    nose_sprite.radius = 100;
    nose_sprite.collider = 'd'
    nose_sprite.visible = false;
}