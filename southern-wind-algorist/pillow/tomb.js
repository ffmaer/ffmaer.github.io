function drawTomb() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            x = j * grid_size + grid_size / 2
            y = i * grid_size + grid_size / 2

            if (tomb_grid[i][j] != 0) {
                push()
                textStyle(BOLD)
                textSize(random(20, 22));

                letter =tomb_grid[i][j]

                fill(line_color)


                text(letter, x, y)
                pop()
            }
        }
    }
}

function initTomb() {
    for (let i = 0; i < 9; i++) {
        tomb_grid[34][13 + i] = "∎"
    }
    for (let i = 0; i < 6; i++) {
        tomb_grid[33-i][14] = "∎"
    }
        for (let i = 0; i < 6; i++) {
        tomb_grid[33-i][20] = "∎"
    }
    for (let i = 0; i < 5; i++) {
        tomb_grid[27][15 + i] = "∎"
    }
    tomb_grid[28][15] = "T"
    tomb_grid[28][16] = "O"
    tomb_grid[28][17] = "M"
    tomb_grid[28][18] = "B"

    tomb_grid[29][16] = "O"
    tomb_grid[29][17] = "F"

    tomb_grid[31][17] = "❤"
}