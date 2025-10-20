function drawTears() {

    if (tears_y > h) {
        resetTears()

    }
    tears_x += random(-5, 5)
    tears_y += random(4, 8)

    fall.circle(tears_x, tears_y, 20);

    push()
    blendMode(DIFFERENCE);
    image(fall, 0, 0, w, h);
    pop()

}

function resetTears() {

    fall.background("black")
    fall.fill(random(["fuchsia","lime"]))
    fall.noStroke();
    tears_x = random(w)
    tears_y = 0

}