function infos() {
    push()
    fill("gold")
    noStroke()
    text("#GayIsGood #LoveIsLove #LoveWins", width / 2, 20)
    textAlign(LEFT, CENTER)
    text("Navigation : ASDW    Defense : SPACE", 20, height - 20)
    textAlign(RIGHT, CENTER)
    text("Rainbow Game Jam 2021 Aug 29 - Sep 1 BY ffMaer", width - 20, height - 20)
    for (let i = 1; i < currentlvl; i++) {
        textAlign(LEFT, CENTER)
        text(`Liberty level ${i} achieved`, 20, 20 * i)
    }
    if(currentlvl==6 && won){
        textAlign(LEFT, CENTER)
        text(`Liberty level 6 achieved`, 20, 20 * 6)
        fill("deepskyblue")
        text(`* ALL LIBERTY LEVELS ACHIEVED *`, 20, 20 * 7)
    }
    pop()
}