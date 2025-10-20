function nextNameColor() {
    name_colors = ["magenta", "cyan", "yellow"]
    name_color_index++
    name_color_index = name_color_index % name_colors.length
    return name_colors[name_color_index]

}

function check(letter, word) {
    if (letters_seq.length >= word.length * 2) {
        letters_seq.shift()
    }
    letters_seq.push(letter)
    for (let i = 0; i < word.length; i++) {
        char = word.charAt(i)
        if (!letters_seq.includes(char)) {
            return false
        }
    }
    return true
}

function pour(row, col, word, id) {
    l = word.length
    for (let i = 0; i < l; i++) {
        grid[row][col - (l - 1) + i] = word.charAt(i) + id
    }
    letters_seq = []
}



function drawTexts() {
    search: for (let i = 0; i < rows; i++) {
        letters_seq = []
        for (let j = 0; j < cols; j++) {

            x = j * grid_size + grid_size / 2
            y = i * grid_size + grid_size / 2

            if (grid[i][j] != 0) { // names
                push()
                textStyle(BOLD)
                textSize(random(20, 22));

                letter = grid[i][j].charAt(0).toUpperCase()
                id = grid[i][j].charAt(1)
                if (id == "1") {
                    fill("fuchsia")
                } else {
                    fill("lime")
                }

                text(letter, x, y)
                pop()
            } else if ("abcdefghijklmnopqrstuvwxyz-,.'".toUpperCase().includes(hidden_texts[i][j])) { // story
                push()
                fill("black")
                rect(x,y,grid_size,grid_size)
                textStyle(BOLD)
                textSize(random(18, 20));
                fill(line_color)
                letter = hidden_texts[i][j]
                text(letter, x, y)
                pop()
            } else { // random characters
                fill(randomFill())
                textSize(random(14, 16));
                letter = random("abcdefghijklmnopqrstuvwxyz◕".split(""))
                if (found1 && found2) {
                    if (letter == hidden_texts[i][j]) {
                        hidden_texts[i][j] = hidden_texts[i][j].toUpperCase()
                    }
                }
                if (frameCount % 100 > 50) {
                    if (letter == "◕") {
                        text(letter, x, y)
                    }
                } else {
                    text(letter, x, y)

                }


                if (!found1) {
                    word = "wenzi"
                    if (check(letter, word)) {
                        // console.log("found1")
                        pour(i, j, word, 1)
                        found1 = true
                        p1_x = i
                        p1_y = j
                    }

                }
                if (found1 && !found2) {
                    word = "zhongxian"
                    if (check(letter, word)) {
                        // console.log("found2")
                        pour(i, j, word, 2)
                        found2 = true
                        p2_x = i
                        p2_y = j
                        drawTree = true
                        meet()


                    }

                }

            }

        }
    }
}

function draw() {
    background("black")

    if (drawTree) {
        push()
        blendMode(DIFFERENCE);
        image(turtle_tree, 0, 0)
        drawSeeds()
        pop()

    }

    drawTexts()

    drawTomb()
    drawDusts()
    drawTears()

}

function randomFill() {
    return random(["fuchsia", "lime"])
}

function drawDusts() {
    for (let i = 0; i < 1000; i++) {
        x = random(w)
        y = random(h)
        push()
        stroke(random(["fuchsia", "lime"]))
        point(x, y)
        pop()

    }
}