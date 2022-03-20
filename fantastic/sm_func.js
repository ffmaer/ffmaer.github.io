class Item {
    constructor(x, y, type) {
        this.x = x
        this.y = y
        this.created = false
        this.type = type
        this.sprite = null
        this.noise = int(random(100))
        this.data = null
    }
}

function nextPersonDiedOfAIDS() {
    person = people_died_of_AIDS[person_died_of_AIDS_index]
    person_died_of_AIDS_index++
    person_died_of_AIDS_index = person_died_of_AIDS_index % people_died_of_AIDS.length
    return person
}

function nextAIDSActivist() {
    person = AIDS_activists[AIDS_activist_index]
    AIDS_activist_index++
    AIDS_activist_index = AIDS_activist_index % AIDS_activists.length
    return person
}

function randomInfection() {
    return random([...bacteria, ...virus])
}

function infect(type) {
    if (!active_infection.includes(type)) {
        if (type == "HIV") {
            if (active_protection.includes("PrEP")) {
                console.log("PrEP prevented you from HIV infection.")
            } else if(hiv_count_down<=0) {
                hiv_count_down = 10
                hiv_flash = setInterval(function () {
                    hiv_count_down--
                }, 1000)
                hiv_infect_timeout = setTimeout(function () {
                    if (!active_protection.includes("PEP")) {
                        active_infection.push(type)
                    }
                    clearInterval(hiv_flash)
                }, 1000 * hiv_count_down)
            }

        } else {
            if ((type == "Oral-Herpes" || type == "Genital-Herpes") && active_protection.includes("Herpes-Vaccine")) {
                //do nothing
            } else if (type == "Hepatitis" && active_protection.includes("Hepatitis-Vaccine")) {
                //do nothing
            } else if (type == "HPV" && active_protection.includes("HPV-Vaccine")) {
                //do nothing
            } else {
                active_infection.push(type)
            }

        }
    }
}

function displayInfection() {
    for (let item of items) {
        if (item.sprite != null) {
            item.sprite.display_infection = true
        }
    }
}

function lonelyText(i) {
    if (i == 99) return "圆寂 PASSED AWAY"
    return i % 2 == 0 ? "LONELY" : "寂寞"
}


function countInfection(name) {
    let count = 0
    for (let infection of active_infection) {
        if (infection == name) {
            count++
        }
    }
    return count
}

function removeInfection(name) {
    let index = active_infection.indexOf(name)
    if (index != -1) {
        active_infection.splice(index, 1)
        return true
    }
    return false
}

function removeProtection(name) {
    let index = active_protection.indexOf(name)
    if (index != -1) {
        active_protection.splice(index, 1)
        return true
    }
    return false
}