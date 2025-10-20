function setup10Print() {
    nanmengmu_index = 0

    ten_gap = 120
    x_extra = 2
    y_extra = 2
    ten_graph = createGraphics(width + ten_gap * x_extra, height + ten_gap * y_extra)
    ten_graph.setAttributes({
        alpha: true
    });

    ten_row = floor(height / ten_gap) + y_extra
    ten_col = floor(width / ten_gap) + x_extra

    ten_grid = new Array(ten_row)
    for (let i = 0; i < ten_row; i++) { //row
        ten_grid[i] = new Array(ten_col) // col
    }

    for (let i = 0; i < ten_row; i++) { //row
        for (let j = 0; j < ten_col; j++) { //col
            ten_grid[i][j] = nextSymbol()
        }
    }

    refresh10Print()

    x_translate = 0;
    y_translate = 0;

    nextGoal()


}

function nextSymbol() {
    let output = random([`/`, `\\`]) + nanmengmu.charAt(nanmengmu_index)
    nanmengmu_index++
    nanmengmu_index = nanmengmu_index % nanmengmu.length
    return output;
}

function nextGoal() {
    goal = int(random(1000));
    goal_track = 0;
    direction = random(["x", "y"])
}

function refresh10Print() {
    ten_graph.clear()
    for (let i = 0; i < ten_row; i++) { //row
        for (let j = 0; j < ten_col; j++) { //col
            let symbol = ten_grid[i][j].charAt(0)
            let hanzi = ten_grid[i][j].charAt(1)
            let chance = random()
            if (chance < 0.9) {
                ten_graph.stroke("blue")
            } else {
                ten_graph.stroke("red")
            }

            ten_graph.strokeWeight(10)
            if (symbol == "/") {
                ten_graph.line(j * ten_gap - ten_gap / 2, i * ten_gap - ten_gap / 2, j * ten_gap + ten_gap / 2, i * ten_gap + ten_gap / 2);

            } else {
                ten_graph.line(j * ten_gap + ten_gap / 2, i * ten_gap - ten_gap / 2, j * ten_gap - ten_gap / 2, i * ten_gap + ten_gap / 2);
            }

            if (chance < 0.9) {
                ten_graph.strokeWeight(5)
                ten_graph.textStyle(BOLD)
                ten_graph.textAlign(CENTER, CENTER)
                ten_graph.fill("black")
                ten_graph.textSize(24)
                ten_graph.text(hanzi, j * ten_gap, i * ten_gap)
            }
        }
    }
}

function moveLeft() {
    for (let i = 0; i < ten_row; i++) { //row
        ten_grid[i].shift()
        ten_grid[i].push(nextSymbol())
    }
    refresh10Print()
}

function moveUp() {
    ten_grid.shift()
    ten_grid.push(new Array(ten_col))
    for (let i = 0; i < ten_col; i++) { //col
        ten_grid[ten_row - 1][i] = nextSymbol()
    }
    refresh10Print()
}

function draw10Print() {
    goal_track++
    if (direction == "x") {
        x_translate++;
        if (x_translate % ten_gap == 0) {
            moveLeft()
            x_translate = 0
        }
    } else if (direction == "y") {
        y_translate++;
        if (y_translate % ten_gap == 0) {
            moveUp()
            y_translate = 0
        }
    }

    if (goal_track == goal) {
        nextGoal();
    }

    push()
    translate(-x_translate, -y_translate)
    blendMode(ADD     )
    image(ten_graph, -width / 2, -height / 2, width + ten_gap * x_extra, height + ten_gap * y_extra)
    pop()
}