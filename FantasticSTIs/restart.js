function rebirth_at_18() {
    age = 18
    hiv_count_down = -1
    active_infection = []
    active_protection = []
    loneliness = 0
    loop()
}

function keyPressed() {
    if (key === 'r' || key === 'R') {
        rebirth_at_18()
    }
}