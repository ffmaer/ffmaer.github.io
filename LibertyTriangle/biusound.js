function biuSound(){
    if (e && w && biusnds[currentlvl - 1][0] == 0) {
        biusnd.play()
        biusnds[currentlvl - 1][0] = 1
    }

    if (w && p && biusnds[currentlvl - 1][1] == 0) {
        biusnd.play()
        biusnds[currentlvl - 1][1] = 1
    }

    if (p && e && biusnds[currentlvl - 1][2] == 0) {
        biusnd.play()
        biusnds[currentlvl - 1][2] = 1
    }
}