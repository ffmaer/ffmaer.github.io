function alternate_embrace_color() {
    embrace_colors = [1, -1, -1, 1]

    if (typeof embrace_color_index == "undefined") {
        embrace_color_index = -1
    }
    embrace_color_index++
    embrace_color_index %= embrace_colors.length
    if (embrace_colors[embrace_color_index] == 1) {
        return "fuchsia"
    } else {
        return "lime"
    }
}

function drawLSys(x, y) {
    angle = PI / 8
    len = 100

    if (current_rule != null) {
        sen = "◕"
        nextSen = ""
        paragraph = ""
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < sen.length; i++) {
                char = sen.charAt(i)
                found = false
                if (char == current_rule.a) {
                    found = true
                    nextSen += current_rule.b
                }

                if (!found) {
                    nextSen += char
                }


            }
            sen = nextSen
            nextSen = ""
            paragraph = paragraph + "|" + sen
        }

        // console.log(paragraph)
        genotype = "||||" + sen
        // console.log(genotype)
        // genotype = paragraph
        // console.log(genotype)
        turtle(genotype, x, y)
    }

}

// p1 = [-len * 0.5, -len] //anchor
// p2 = [len * 0.25, -len]
// p3 = [len * 0.5, -len * 0.25]
// p4 = [0, 0] //anchor
// p1 = [+len * 0.5, -len] //anchor
// p2 = [-len * 0.25, -len]
// p3 = [-len * 0.5, -len * 0.25]
// p4 = [0, 0] //anchor

function turtle(paragraph, x, y) {
    // start x start y
    turtle_tree.stroke("lime")
    turtle_tree.noFill()

    p_i = 0
    drawTreeInterval = setInterval(function () {
        // console.log("stroke hearbeat")
        counter = 0
        turtle_tree.strokeWeight(2)
        curve_size = random(6, 8)
        while (p_i < paragraph.length && counter < 20) {
            if (p_i % 400 == 0) {
                randomOdeNote()
            }
            char = paragraph.charAt(p_i)
            if (char == "◕") {
                turtle_tree.stroke("fuchsia")
                p1 = [0, -len] //anchor
                p2 = [-curve_size, -len * 0.75]
                p3 = [-curve_size, -len * 0.25]
                p4 = [0, 0] //anchor
                turtle_tree.bezier(...p1, ...p2, ...p3, ...p4)
                turtle_tree.stroke("lime")
                p1 = [0, -len] //anchor
                p2 = [curve_size, -len * 0.75]
                p3 = [curve_size, -len * 0.25]
                p4 = [0, 0] //anchor

                turtle_tree.bezier(...p1, ...p2, ...p3, ...p4)
                turtle_tree.translate(0, -len)
            } else if (char == "W") {
                turtle_tree.rotate(angle)
            } else if (char == "Z") {
                turtle_tree.rotate(-angle)
            } else if (char == "[") {
                turtle_tree.push()
            } else if (char == "]") {
                releaseSeeds(CanvasXY.x, CanvasXY.y)
                turtle_tree.pop()
            } else if (char == "|") {
                len *= 0.6
                turtle_tree.resetMatrix()
                turtle_tree.translate(x, y)
            }
            p_i++
            counter++
        }
        if (p_i >= paragraph.length) {
            clearInterval(drawTreeInterval)
        }


    }, 1)

}

class Seed {
    constructor(x, y, letter) {
        this.x = x
        this.y = y
        this.letter = letter
        this.color = randomFill()
    }
}

function releaseSeeds(x, y) {
    c = random(["W", "Z", "[", "]", "◕"])
    let seed = new Seed(x, y, c)
    seeds.push(seed)
    if(seeds.length>1024){
        seeds.shift()
    }
}

function drawSeeds() {
    amplitude = 10
    at_least_one = false
    for (let i = 0; i < seeds.length; i++) {
        if (seeds[i].y > 0) {
            at_least_one = true
        }
        seed = seeds[i]
        seed.x += random(+amplitude)
        seed.y += random(-amplitude)
        push()
        textStyle(BOLD)
        textSize(random(10, 14));
        fill(seed.color)
        text(seed.letter, seed.x, seed.y)
        pop()
    }
    if (!at_least_one) {
        seeds = []
    }

}