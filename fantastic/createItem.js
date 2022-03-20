function createItem(item) {
    let s
    if(item.type == "ART"){
        s= createSprite(item.x, item.y, 18*7, 18)
    }else{
        s= createSprite(item.x, item.y, sprite_size, sprite_size)
    }
    
    items_group.add(s)
    s.type = item.type
    item.sprite = s
    item.created = true
    if (item.type == "💀") {
        item.person = nextPersonDiedOfAIDS()
    }
    if (item.type == "💡") {
        item.person = nextAIDSActivist()
    }
    if (love.includes(item.type)) {
        s.infection = []
        s.display_infection = false
        if (random() > 0.2 && item.type != "💖") {
            s.infection.push(randomInfection())
            if (random() > 0.9) {
                s.infection.push(randomInfection())
            }
        }
    }
    s.draw = function () {
        if (bacteria.includes(item.type)) {
            if (item.data == null) {
                item.data = []
                for (let i = 0; i < item.type.length; i++) {
                    let distance = 15
                    item.data.push([random(-distance, distance), random(-distance, distance)])
                }
            }
            push()
            noFill()
            stroke("black")
            rotate(45)
            rect(0, 0, sprite_size, sprite_size / 2, 10)
            noStroke()
            fill("black")
            textSize(10)
            let data = item.data
            for (let i = 0; i < item.type.length; i++) {
                let x = data[i][0]
                let y = data[i][1]
                text(item.type.charAt(i), x, y)

            }
            pop()
        } else if (virus.includes(item.type)) {
            if (item.data == null) {
                item.data = []
                for (let i = 0; i < item.type.length; i++) {
                    item.data.push([random(-20, 20), random(-20, 20)])
                }
            }
            push()
            noFill()
            stroke("black")
            circle(0, 0, sprite_size / 2)
            push()
            let steps = 18
            for (let i = 0; i < steps; i++) {
                rotate(360 / steps)
                line(0, 0, 10, 10)
            }
            pop()
            noStroke()
            fill("black")
            textSize(10)
            let data = item.data
            for (let i = 0; i < item.type.length; i++) {
                let x = data[i][0]
                let y = data[i][1]
                text(item.type.charAt(i), x, y)

            }
            pop()
        } else if (item.type == "ceftriaxone" || vaccine.includes(item.type) || item.type == "Benzathine penicillin G") {
            textSize(sprite_size)
            text("💉", 0, 0)
            if (active_protection.includes(item.type)) {
                text("✔️", 0, 0)
            } else {
                textSize(15)
                textAlign(LEFT)
                let g = 7 //gap
                text(item.type, 18, -g)
                if (item.type == "ceftriaxone") {
                    text("Anti-Gonorrhea", 18, g)
                }
                if (item.type == "Benzathine penicillin G") {
                    text("Anti-Syphilis", 18, g)
                }
            }

        } else if (item.type == "doxycycline") {
            textSize(sprite_size)
            text("💊", 0, 0)
            textSize(15)
            textAlign(LEFT)
            let g = 7 //gap
            text(item.type, 18, -g)
            if (item.type == "doxycycline") {
                text("Anti-Chlamydia", 18, g)
            }
        } else if (item.type == "ART") {
            textSize(12)
            text("💊💊💊💊💊💊💊", 0, 0.9)
            noFill()
            stroke("black")
            rectMode(CENTER)
            rect(0, 0, 18*7, 18,5)
        } else if (item.type == "PrEP") {
            rotate(15)
            stroke("black")
            textSize(10)
            rectMode(CENTER)
            fill("DodgerBlue")
            rect(0, 0, 40, 22, 10)
            fill("LightCyan")
            noStroke()
            text(item.type, 0, 0)
        } else if (item.type == "PEP") {
            rotate(15)
            stroke("black")
            textSize(10)
            rectMode(CENTER)
            fill("HotPink")
            rect(0, 0, 40, 22, 10)
            fill("white")
            noStroke()
            text(item.type, 0, 0)

        } else if (item.type == "💀") {
            textSize(sprite_size)
            text(item.type, 0, 0)
            textSize(15)
            textAlign(LEFT)
            let g = 7 //gap
            let p = item.person
            text(p[0], 18, -g)
            text(`${p[1]} - ${p[2]}`, 18, g)
        }else if (item.type == "💡") {
            textSize(sprite_size)
            text(item.type, 0, 0)
            textSize(15)
            textAlign(LEFT)
            text(item.person, 18, 0)
        }
        else if(love.includes(item.type)){
            textSize(sprite_size)
            text(item.type, 0, 0)
            if(talkative || s.display_infection){
                for(let t of this.infection){ //type
                    textSize(10)
                    text("🐛", 0, 0)
                }
            }

        } else {
            textSize(sprite_size)
            text(item.type, 0, 0)
        }

    }
    if (bacteria.includes(item.type)) {
        s.setSpeed(microbe_speed, random(360))
    }


}

