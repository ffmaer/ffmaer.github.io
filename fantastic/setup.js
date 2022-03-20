function setup() {
    w = 960 //width
    h = 600 //height
    m = 10 //margin
    you_speed = 6
    microbe_speed = 2
    roll_speed = 4
    sprite_size = 30
    loneliness = 10
    infection = 20
    items = []
    items_group = new Group()
    age = 18
    hiv_count_down = -1
    hiv_flash = null
    hiv_infect_timeout = null
    years = 81 - 18 + 1

    people_died_of_AIDS = [
        ["Keith Haring", 1958, 1990],
        ["Freddie Mercury", 1946, 1991],
        ["Michel Foucault", 1926, 1984],
        ["Felix Gonzalez-Torres", 1957, 1996],
        ["Paul Monette", 1945, 1995],
        ["Larry Kramer", 1935, 2020],
        ["Rudolf Nureyev", 1938, 1993],
    ]

    AIDS_activists = ["Magic Johnson", "ACT UP", "Gay Men's Health Crisis", "International AIDS Society", "Through Positive Eyes", "World AIDS Day", "AIDS Walk", "UNAIDS", "Larry Kramer"]

    person_died_of_AIDS_index = 0
    AIDS_activist_index = 0
    talkative = false

    //background movement
    separate_x = w / 2

    colors = ["red", "yellow", "gold", "DeepSkyBlue", "Magenta", "GreenYellow"]
    color_index = 0

    bacteria = ["Gonorrhea", "Chlamydia", "Syphilis"]
    virus = ["Oral-Herpes", "Genital-Herpes", "Hepatitis", "HIV", "HPV"]
    vaccine = ["Herpes-Vaccine", "Hepatitis-Vaccine", "HPV-Vaccine"]
    prevention = ["☔", "PrEP", "💬", "🧪"]
    cure = ["doxycycline", "ceftriaxone", "Benzathine penicillin G", "PEP", "ART"]
    love = ["💖", "🍑", "🍆"]

    active_infection = []
    active_protection = []

    frameRate(30)
    stroke("black")
    textAlign(CENTER, CENTER)
    angleMode(DEGREES)

    cnv = createCanvas(w, h);
    cnv.position((windowWidth - w) / 2, (windowHeight - h) / 2);

    for (let i = 0; i < years * 20; i++) {
        items.push(new Item(random(m, w / 2 * years), random(m, h - m), random([...bacteria, ...virus,...love, ...vaccine, ...prevention, ...cure, "💀", "💡", "HIV", "HIV", "ART" ])))
    }

    you = createSprite(w / 2, h / 2, sprite_size, sprite_size)
    you.draw = function () {
        push()
        noFill();
        stroke("black")
        beginShape();
        for (let i = 0; i < 30; i++) {
            vertex(random(-20, 20), random(-20, 20));
        }
        endShape(CLOSE);
        if (frameCount < frameRate() * 10){
            textSize(12)
            text("🎯Live & LOVE 81 Years", 0,30)
        }
        if (talkative) {
            textSize(15)
            let g = 7 //gap
            text("💬", g, g)
            text("💬", -g, -g)
        }
        pop()
    }
    setupSounds()
    
}