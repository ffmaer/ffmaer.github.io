function rndColor() {
    return random(["fuchsia", "lime"])
}

function strip(story) {
    return story.replace(/[■　、。，：《》；◕“”？?「」\[\]（） ‘’]/g, '');
}

function clearGL() {
    glContext = cnv.GL;
    glContext.clear(glContext.DEPTH_BUFFER_BIT);
}

class CanvasXY {
    static xy() {
        let point = {
            x: 0,
            y: 0
        };
        let matrix = lotus_shape.canvas.getContext('2d').getTransform()
        let transformedPoint = {
            x: matrix.a * point.x + matrix.c * point.y + matrix.e,
            y: matrix.b * point.x + matrix.d * point.y + matrix.f,
        }
        return transformedPoint
    }
    static get x() {

        return this.xy().x
    }

    static get y() {
        return this.xy().y
    }
};

function nextScene(num) {
    if (window.location.search == "?jump") {
        setTimeout(function () {
            window.location.replace("../" + num + "/?jump");
        }, 1000 * 1 * 60)
    }
}

function drawInstallationGrid() {
    push()
    strokeWeight(10)
    stroke("white")
    line(0, -height / 2, 0, height / 2)
    pop()
}