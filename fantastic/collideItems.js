function collideItems() {
    for (let item of items) {
        if (item.x < w && item.created == false) {
            createItem(item)
        }
        item.x -= roll_speed
        item.noise++
        let s = item.sprite
        if (s != null) {
            if (item.noise % (30 * 3) == 0) { // every 3 second changes direction
                if (bacteria.includes(item.type) || virus.includes(item.type)) {
                    s.setSpeed(microbe_speed, random(360))
                }
            }
            s.position.x -= roll_speed
            let sx = s.position.x
            let sy = s.position.y
            if (sx < 0) {
                s.remove()
                item.sprite = null
            }
        }
    }

    you.displace(items_group, function (sprite_you, sprite_item) {
        let type = sprite_item.type
        if (bacteria.includes(type) || virus.includes(type)) {
            infect(type)
            sprite_item.remove()
            ouch.play()
        }
        if (love.includes(type)) {
            //less lonely
            loneliness -= 10
            if (loneliness < 0) {
                loneliness = 0
            }
            //get infected
            if (active_protection.includes("☔")) {
                removeProtection("☔")
            } else {
                if (love.includes(type)) {
                    for (let type of sprite_item.infection) {
                        infect(type)
                    }
                }
            }
            sprite_item.remove()
            kiss.play()
        }
        if (type == "ceftriaxone") {
            if (removeInfection("Gonorrhea")) {
                sprite_item.remove()
                a.play()
            }
        }
        if (type == "doxycycline") {
            if (removeInfection("Chlamydia")) {
                sprite_item.remove()
                gulu.play()
            }
        }
        if (type == "Benzathine penicillin G") {
            if (removeInfection("Syphilis")) {
                sprite_item.remove()
                a.play()
            }
        }
        if (type == "PrEP") {
            if (!active_protection.includes(type)) {
                active_protection.push(type)
                sprite_item.remove()
                prep.play()
                setTimeout(function () {
                    removeProtection(type)
                }, 10 * 1000)
            }
        }
        if (type == "PEP") {
            if (hiv_count_down > 0) {
                sprite_item.remove()
                pep.play()
                hiv_count_down = -1
                clearInterval(hiv_flash)
                clearTimeout(hiv_infect_timeout)
            }
        }
        if (vaccine.includes(type)) {
            if (!active_protection.includes(type)) {
                active_protection.push(type)
                sprite_item.remove()
                a.play()
            }
        }
        if (type == "ART") {
            if (active_infection.includes("HIV") && countInfection("HIV") >= 2) {
                removeInfection("HIV")
                sprite_item.remove()
                gulu.play()
            }
        }

        if (type == "☔") {
            active_protection.push(type)
            sprite_item.remove()
            condom.play()
        }

        if (type == "💬") {
            talkative = true
            setTimeout(function () {
                talkative = false
            }, 5000)
            sprite_item.remove()
            talk.play()
        }

        if (type == "🧪") {
            displayInfection()
            sprite_item.remove()
            bing.play()
        }

    })

    items_group.displace(items_group, function (a, b) {

    })
}