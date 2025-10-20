function generateTexts(line) {
    hidden_texts = []
    for (let i = 0; i < rows; i++) { //y
        hidden_texts.push([])
        for (let j = 0; j < cols; j++) { //x
            hidden_texts[i].push(-1)
        }
    }

    x = 4
    y = 7

    counter = 0
    for (let i = 0; i < line.length; i++) {
        c = line.charAt(i)
        if (c == " ") {
            y += 2
            counter = 0
        } else {
            hidden_texts[y][x + counter] = c
            counter++
        }
    }
}

function nextLine() {
    line_index = 0
    line_color = random(["fuchsia", "lime"])
    generateTexts(lines[line_index])
    setInterval(function () {
        line_index++
        line_index = line_index % lines.length
        generateTexts(lines[line_index])
        line_color = random(["fuchsia", "lime"])
        nextGeneration()
    }, 1000 * 15)
}