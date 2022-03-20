function draw() {
    background("white")
    clock()
    drawMovingBG()
    collideItems();
    moveYou()
    drawSprites();
    updateAndDrawStats();
    drawAgeAndProtection()
    drawHIVCountDown()
    drawTooInfected()
}

function drawMovingBG() {
    push()
    noStroke()
    separate_x -= roll_speed
    separate_x_2 = separate_x + w / 2
    fill(colors[color_index])
    rect(0, 0, separate_x, h)
    fill(colors[(color_index + 1) % colors.length])
    rect(separate_x, 0, w / 2, h)
    fill(colors[(color_index + 2) % colors.length])
    rect(separate_x_2, 0, w / 2, h)
    if (separate_x < 0) {
        separate_x = w / 2
        age++
        color_index++
        color_index = color_index % colors.length
    }
    pop()
}

function clock() {
    if (frameCount % 30 == 0) {
        loneliness++
    }
    if (frameCount % (30 * 10) == 0) {
        if (active_infection.includes("HIV")) {
            active_infection.push("HIV")
        }
    }
}

function updateAndDrawStats() {

    infection = active_infection.length / (bacteria.length + virus.length)

    if (loneliness > 100) {
        loneliness = 100
        noLoop() // passed away
    }
    push()
    fill("red")
    stroke("black")
    strokeWeight(10)
    let lonely_w = w * (loneliness / 100)
    rect(0, 0, lonely_w, h)
    rect(0, 0, w, h * infection)
    let stack_height = 20
    let stack_count = -1
    if (loneliness > 0) {
        for (let i = 0; i < loneliness; i++) {
            push()
            fill("black")
            noStroke()
            textSize(15)

            if (i % stack_height == 0) {
                stack_count++
            }
            textSize(20)
            textAlign(LEFT, BOTTOM)
            text(lonelyText(i), 10 + 100 * stack_count, h - ((h - 120) / stack_height) * (i % stack_height) - 40) // height margin for "active infection" texts on the top
            pop()
        }
    }
    if (active_infection.length > 0) {
        noStroke()
        fill("black")
        textSize(20)
        textAlign(LEFT, TOP)
        textWrap(WORD);
        text("Active Infection: " + active_infection.join(", "), 10, 10, w - 20)
    }
    pop()
}

function moveYou() {

    if(keyDown('s') || keyDown('w') ||keyDown('a') ||keyDown('d') ){
        if(!kandinsky.isPlaying()){
            kandinsky.loop()
        }
    }
    
    if (keyDown('s')) {
        you.position.y += you_speed
    }
    if (keyDown('w')) {
        you.position.y -= you_speed
    }
    if (keyDown('a')) {
        you.position.x -= you_speed
    }
    if (keyDown('d')) {
        you.position.x += you_speed
    }
}

function drawAgeAndProtection() {
    push()
    fill("black")
    if (active_protection.length > 0) {
        let str = `🛡️: ${active_protection.join(" ")}`
        textSize(20)
        textAlign(LEFT, BOTTOM)
        text(str, 10, h - 10)
    }
    textSize(30)
    textAlign(RIGHT, BOTTOM)
    text(`Age: ${age}`, w - 10, h - 10)
    pop()

    if (age == 81) {
        push()
        textSize(90)
        fill("black")
        text("🎆 YOU MADE IT 🎇", w / 2, h / 2)
        noLoop()
        pop()
    }
}

function drawHIVCountDown() {
    if (hiv_count_down > 0) {
        push()
        noFill()
        stroke("black")
        strokeWeight(3)
        textSize(100);
        text(`HIV infects in ${hiv_count_down}`, w / 2, h / 2)
        pop()
    }
}

function drawTooInfected() {
    if (infection >= 1) {
        push()
        textSize(90)
        fill("black")
        text("☠️ TOO INFECTED ☠️", w / 2, h / 2)
        pop()
        noLoop() //passed away
    }
}