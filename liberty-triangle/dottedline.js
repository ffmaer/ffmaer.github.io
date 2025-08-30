function dottedLine(x1, y1, x2, y2, connected) {
    push()
    strokeWeight(2)
    if (currentlvl > lvl) {
        stroke(sixcolors[lvl-1])
    } else if (currentlvl == lvl && connected) {
        stroke(sixcolors[lvl-1])
    } else {
        stroke("grey")
        drawingContext.setLineDash([5, 40]);
    }
    line(x1, y1, x2, y2)
    pop()
}