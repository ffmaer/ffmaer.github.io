function drawWon() {
    if (won) {
        push()
        fill("gold")
        noStroke()
        textSize(160)
        translate(width / 2, height / 2 - 140)
        textFont(pacifico)
        text("Liberation!", 0, 0)
        pop()

        drawWonLine(0, 0)
        drawWonLine(width, 0)
        drawWonLine(width / 2, height)

        push()
        stroke("gold")
        noFill()
        strokeWeight(5)
        textSize(48)
        strokeWeight(2)
        text("TO RESTART PRESS R", width / 2, height / 2 + 100)
        pop()
    }
}

function drawWonLine(endX, endY) {
    let t = "LIBERATED"
    for (let i = 0; i < t.length; i++) {
        push()
        fill(sixcolors[i % 6])
        textFont(alfa)
        textSize(noise(i / 10, frameCount / 100) * 64)
        let x = lerp(width / 2, endX, i / t.length)
        let y = lerp(height / 2, endY, i / t.length)
        text(t.charAt(i), x, y)
        pop()
    }
}