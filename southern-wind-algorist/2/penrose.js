function setupPenrose() {
    p_i = 0
    z_level = 0
    hanzi_group = new Group();

    lotus_shape = createGraphics(width, height)
    lotus_shape.setAttributes({
        alpha: true
    });

    sen = createLSysSentence();
    turtleDraw(sen)

    connection_layer = createGraphics(width, height)
}

function createLSysSentence() {
    angle = TWO_PI / 10

    rules = [{
        a: "M",
        b: "OF++PF----NF[-OF----MF]++"
    }, {
        a: "N",
        b: "+OF--PF[---MF--NF]+"
    }, {
        a: "O",
        b: "-MF++NF[+++OF++PF]-"
    }, {
        a: "P",
        b: "--OF++++MF[+PF++++NF]--NF"
    }, {
        a: "F",
        b: ""
    }, ]

    sen = "[N]++[N]++[N]++[N]++[N]"
    nextSen = ""
    paragraph = ""
    for (let j = 0; j < 4; j++) { // iterations
        for (let i = 0; i < sen.length; i++) {
            char = sen.charAt(i)
            found = false
            for (let r = 0; r < rules.length; r++) {
                current_rule = rules[r]
                if (char == current_rule.a) {
                    found = true
                    nextSen += current_rule.b
                    break
                }
            }

            if (!found) {
                nextSen += char
            }


        }
        sen = nextSen
        nextSen = ""
    }
    return sen;
}

function turtleDraw(sen) {
    // start x start y
    lotus_shape.push()
    lotus_shape.translate(width / 2, height / 2)


    for (let i = 0; i < sen.length; i++) {
        char = sen.charAt(i)
        if (char == "F") {
            lotus_shape.stroke(255, 255, 0, 128)
            lotus_shape.strokeWeight(16);
            let margin = 0;
            let len = 50
            lotus_shape.line(0, -margin, 0, -len + margin);
            lotus_shape.translate(0, -len)
        } else if (char == "+") {
            lotus_shape.rotate(angle)
        } else if (char == "-") {
            lotus_shape.rotate(-angle)
        } else if (char == "[") {
            lotus_shape.push()
        } else if (char == "]") {
            lotus_shape.pop()
        }
    }

    lotus_shape.pop()


}

function getNextZi(){
    let zi = littlegirlpei.charAt(littlegirlpei_idx)
    littlegirlpei_idx++
    littlegirlpei_idx%=littlegirlpei.length
    return zi
}

class Rose {
    constructor(x, y, seed) {
        this.seed = seed
        this.x = x
        this.y = y
        this.zi = getNextZi()
    }

    noise() {
        return noise((frameCount + this.seed) / 500);
    }

    draw() {
        push()
        blendMode(EXCLUSION)
        texture(lotus_shape)
        noStroke()
        translate(-width / 2 + this.x, height / 2 - this.y)
        rotateZ(this.noise() * 360)
        plane(width, height)
        pop()
    }

    update() {
        if(noise((frameCount + this.seed) / 100)>0.5 && frameCount%30 == 0){
            this.zi = getNextZi()
        }
        lotus_shape.noStroke(10)
        lotus_shape.fill("yellow")
        lotus_shape.rectMode(CENTER)
        lotus_shape.square(width / 2, height / 2, 70)
        lotus_shape.fill("black")
        lotus_shape.textAlign(CENTER, CENTER)
        lotus_shape.textSize(60)
        lotus_shape.textStyle(BOLD)
        lotus_shape.text(this.zi, width / 2, height / 2 + 3)

    }
}

function drawPenrose() {

    for (let i = 0; i < balls.length; i++) {
        balls[i].rose.update()
        balls[i].rose.draw()
    }
}