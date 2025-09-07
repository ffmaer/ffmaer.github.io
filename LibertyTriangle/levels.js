function margin() {
    return 60 * lvl
}

function tri() {
    dottedLine(...p1(), ...p2(), e && w)
    dottedLine(...p1(), ...p3(), e && p)
    dottedLine(...p2(), ...p3(), w && p)
}

function p1() { //expression
    return [width / 2, margin() / 2]
}

function p2() { //welfare
    return [margin(), height - margin() / 2]
}

function p3() { //protection
    return [width - margin(), height - margin() / 2]
}

function levels() {
    lvl = 1
    tri()
    lvl = 2
    tri()
    lvl = 3
    tri()
    lvl = 4
    tri()
    lvl = 5
    tri()
    lvl = 6
    tri()
}

function setPillars() {
    lvl = currentlvl;
    [expression.position.x, expression.position.y] = p1();
    [welfare.position.x, welfare.position.y] = p2();
    [protection.position.x, protection.position.y] = p3();
}

function ifCompletesALevel() {
    if (e && w && p && !won) {
        csnd(libertysnd, currentlvl)
        if (currentlvl == 6) {
            won = true
            return
        }
        currentlvl += 1
        if (currentlvl == 4 || currentlvl == 6) createMimic()
        e = w = p = false
        setPillars()
    }
}

function levelColor() {
    return sixcolors[currentlvl - 1]
}

function createMimic() {
    let mimic = createSprite(width-50, random(50, height-50), 20, 20)
    mimic.color = random(sixcolors)
    mimic.draw = function () {
        noStroke();
        fill(this.color)
        textSize(12);
        text("m", 0, -2);
        stroke(this.color)
        noFill()
        rect(0, 0, 20, 20, 3)
    };
    mimics.add(mimic)
}