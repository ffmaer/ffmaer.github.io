function seed() {
    cells = new Group();
    // cells.overlaps(swipe, function(a,b){
    //     console.log("!")
    //     synth.triggerAttackRelease(random(["D4", "F4", "A4", "C5", "E5"]), "4n");
    // })
    // cells.collides(nose_sprite,function(){
    //     synth.triggerAttackRelease(random(["D4", "F4", "A4", "C5", "E5"]), "2n");
    // })
    row = floor(height / 100)
    col = floor(width / 100)
    cell_arr = new Array(row).fill(0).map(() => new Array(col).fill(0));
    for (let i = 0; i < col; i++) { //col
        for (let j = 0; j < row; j++) { //row
            cell = new cells.Sprite()
            cell_arr[j][i] = cell
            cell.alive = random([true, false])
            cell.size = 100
            cell.margin = 20
            setCellSizeAndHanzi(cell)
            cell.x = i * cell.size + cell.size / 2
            cell.y = j * cell.size + cell.size / 2
            cell.x_reset = i * cell.size + cell.size / 2
            cell.y_reset = j * cell.size + cell.size / 2

            cell.color = color("red");
            cell.next = false

            cell.draw = function () {
                gol_plane.fill(255, 0, 0, 0) // cell background alpha 0, for debug
                gol_plane.noStroke()
                gol_plane.rectMode(CENTER)
                gol_plane.square(this.x, this.y, this.diameter, 20)
                gol_plane.fill(this.color);
                gol_plane.textAlign(CENTER, CENTER)
                gol_plane.textFont(source_font);
                gol_plane.textSize(this.size / 1.5)
                gol_plane.text(this.hanzi, this.x, this.y - 10)

            }
        }
    }
}



function reSeed() {
    cells.removeAll();
    seed();
}

function countNeighbors(i, j) { // col, row
    // left i-1
    // right i+1
    // top j-1
    // bottom j+1
    // upper-left i-1, j-1
    // upper-right i+1, j-1
    // lower-left i-1, j+1
    // lower-right i+1, j+1

    let n_count = 0;

    n_count += alive(i - 1, j)
    n_count += alive(i + 1, j)
    n_count += alive(i, j - 1)
    n_count += alive(i, j + 1)

    n_count += alive(i - 1, j - 1)
    n_count += alive(i + 1, j - 1)
    n_count += alive(i - 1, j + 1)
    n_count += alive(i + 1, j + 1)

    return n_count
}

function alive(col, row) {
    if (col < 0 || col >= cell_arr[0].length || row < 0 || row >= cell_arr.length) {
        return 0
    }
    if (cell_arr[row][col].alive) {
        return 1
    } else {
        return 0
    }
}

function createNextGen() {
    for (let i = 0; i < col; i++) { //col
        for (let j = 0; j < row; j++) { //row
            c = countNeighbors(i, j)
            cell = cell_arr[j][i]
            cell.x = cell.x_reset
            cell.y = cell.y_reset
            if (c == 2) {
                cell.next = cell.alive;
            } else if (c == 3) {
                cell.next = true;
            } else {
                cell.next = false;
            }
        }
    }
}

function switchToNextGen() {
    gol_plane.clear()
    for (let i = 0; i < col; i++) { //col
        for (let j = 0; j < row; j++) { //row
            cell = cell_arr[j][i]
            cell.alive = cell.next
            setCellSizeAndHanzi(cell)
        }
    }
}

function setCellSizeAndHanzi(cell) {
    if (cell.alive) {
        cell.diameter = cell.size + cell.margin
        cell.hanzi = getHanzi()

    } else {
        cell.diameter = cell.size + cell.margin
        cell.hanzi = ""
    }
}

function aliveCount() {
    let count = 0;
    for (let i = 0; i < col; i++) { //col
        for (let j = 0; j < row; j++) { //row
            cell = cell_arr[j][i]
            if (cell.alive) count++
        }
    }
    return count
}

function setupGameOfLife() {
    qingqiji_i = 0
    gol_plane = createGraphics(width, height)
    seed();
}

function drawGameOfLife() {
    if (aliveCount() < 18) {
        reSeed();
    } else if (frameCount % 200 == 0) {
        createNextGen();
        switchToNextGen();
    }

    image(gol_plane, -width / 2, -height / 2)
}

function mousePressed() {
    createNextGen();
    switchToNextGen();
}

function getHanzi() {
    c = qingqiji.charAt(qingqiji_i)
    qingqiji_i++
    qingqiji_i %= qingqiji.length
    return c
}