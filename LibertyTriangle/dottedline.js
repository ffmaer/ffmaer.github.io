function dottedLine(x1, y1, x2, y2, connected) {
    push()
    
    if (currentlvl > lvl) {
        strokeWeight(10)
        stroke(sixcolors[lvl-1])
    } else if (currentlvl == lvl && connected) {
        strokeWeight(10)
        stroke(sixcolors[lvl-1])
    } else {
        strokeWeight(2)
        stroke("grey")
        drawingContext.setLineDash([5, 40]);
    }
    line(x1, y1, x2, y2)
    pop()
}