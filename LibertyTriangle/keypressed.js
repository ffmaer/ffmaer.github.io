function keyPressed() {
    let charcircle_d = 20
    let liberty = "gayisgoodloveislovelovewins"
    if (key == " ") {
        let x = agency.position.x
        let y = agency.position.y
        let charcircle = createSprite(x, y, charcircle_d, charcircle_d)
        clicksnd.play()
        // char.debug = true
        charcircle.setCollider("circle", 0, 0, charcircle_d / 4 * 3)
        switch (charindex) {
            case 2:
                gaysnd.play()
                break
            case 4:
                issnd.play()
                break
            case 8:
                goodsnd.play()
                break
            case 12:
                lovesnd.play()
                break
            case 14:
                issnd.play()
                break
            case 18:
                lovesnd.play()
                break
            case 22:
                lovesnd.play()
                break
            case 26:
                winssnd.play()
                break
        }
        charcircle.char = liberty.charAt(charindex)
        charindex += 1
        charindex = charindex % liberty.length
        charcircle.bgc = random(sixcolors)
        charcircle.draw = function () {
            fill(this.bgc)
            noStroke()
            circle(0, 0, charcircle_d)
            fill("black")
            textSize(charcircle_d - 5)
            translate(0, -5)
            text(this.char, 0, 0)
        }
        charcircles.add(charcircle)
        if (charcircles.size() > liberty.length) {
            charcircles.get(0).remove()
        }
    } else if (key == "r" || key == "R") {
        currentlvl = 1
        life = 100
        startShield()
        agency.position.x = 20
        agency.position.y = 20
        won = false
        mimicing = false
        e = w = p = false
        setPillars()
        resetCharCircles()
        loop()
    }
}

function resetCharCircles() {
    charindex = 0
    while (charcircles.size() > 0) {
        charcircles.get(0).remove()
    }
}

function resetMimics(){
    while (mimics.size() > 0) {
        mimics.get(0).remove()
    }
}