function setup() {
    sixcolors = ["red", "orange", "gold", "lime", "deepskyblue", "BlueViolet"]
    lvl = 1
    currentlvl = 1
    life = 100
    e = false
    w = false
    p = false
    shield = false
    startShield()

    mimicing = false
    won = false
    mimics = new Group()

    biusnds = new Array(6).fill(0).map(() => new Array(3).fill(0));
    charcircles = new Group()
    charindex = 0

    textFont(noticia)
    textAlign(CENTER, CENTER);

    cnv = createCanvas(960, 600);
    // cnv.position((windowWidth - width) / 2, (windowHeight - height) / 2);

    agency = createSprite(100, 100, 20, 20);
    csnd(agencysnd, 2)
    agency.setDefaultCollider()
    // agency.debug = true;
    agency.color = random(sixcolors)
    agency.draw = function () {
        noStroke();
        textSize(36)
        if (shield) {
            fill(this.color);
            text("A", 0, -10);
            raidus = 25
            this.setCollider("circle", 0, 0, raidus)
            stroke(this.color)
            noFill()
            strokeWeight(3)
            circle(0, 0, raidus * 2)
        } else if (mimicing) {
            fill("white");
            text("S", 0, -10);
            this.setCollider("circle", 0, 0, 1)
        } else if (won) {
            fill(this.color);
            text("A", 0, -10);
            this.setDefaultCollider()
        } else {
            fill(this.color);
            text("A", 0, -10);
            this.setDefaultCollider()
        }
    };
    structures = new Group()
    for (let i = 0; i < 100; i++) {
        let structure = createSprite(random(width), random(height), 12, 12)
        structure.color = random(sixcolors)
        structure.setDefaultCollider()
        // structure.rotateToDirection = true
        // structure.debug = true;
        structure.draw = function () {
            noStroke();
            if (won) fill(this.color)
            else fill("white");
            textSize(12);
            text("S", 0, -2);
        };
        structures.add(structure)
    }

    function pillarText(touched, t, c) {
        if (won) {
            noFill()
            stroke(c)
            textSize(64)
        } else {
            noStroke();
            if (touched) {
                fill(c)
            } else {
                fill("white");
            }
            textSize(24)
        }

        textFont(alfa)
        text(t, 0, -2.5);
    }
    expression = createSprite(...p1(), 23, 23);
    // expression.debug = true;
    expression.color = levelColor
    expression.draw = function () {
        pillarText(e, "E", this.color())
    };

    welfare = createSprite(...p2(), 23, 23);
    // welfare.debug = true;
    welfare.color = levelColor
    welfare.draw = function () {
        pillarText(w, "W", this.color())
    };

    protection = createSprite(...p3(), 23, 23);
    // protection.debug = true;
    protection.color = levelColor
    protection.draw = function () {
        pillarText(p, "P", this.color())
    };

    // createMimic()
    // life = 0
}

function draw() {
    ifCompletesALevel()
    background("black");
    levels()
    lifeBar()

    drawWon()

    for (let i = 0; i < structures.size(); i++) {
        let structure = structures.get(i)

        if (mimicing) {
            let autonomy = 2
            structure.setVelocity(random(-autonomy, autonomy), random(-autonomy, autonomy))
            structure.attractionPoint(0.1, agency.position.x, agency.position.y)
        } else if (won) {
            structure.attractionPoint(0.5, agency.position.x, agency.position.y)
        } else {
            let autonomy = 10
            structure.setVelocity(random(-autonomy, autonomy), random(-autonomy, autonomy))
            structure.attractionPoint(1, agency.position.x, agency.position.y)
        }
    }

    if (keyWentDown("a") || keyWentDown("s") || keyWentDown("d") || keyWentDown("w")) {
        agency.color = random(sixcolors)
    }

    if (keyDown("a")) {
        agency.position.x -= 3;
        agency.rotation = -90
    }
    if (keyDown("s")) {
        agency.position.y += 3;
        agency.rotation = 180
    }
    if (keyDown("d")) {
        agency.position.x += 3;
        agency.rotation = 90

    }
    if (keyDown("w")) {
        agency.position.y -= 3;
        agency.rotation = 0
    }

    if (keyDown("a") && keyDown("w")) agency.rotation = -45
    if (keyDown("w") && keyDown("d")) agency.rotation = 45
    if (keyDown("s") && keyDown("d")) agency.rotation = 135
    if (keyDown("a") && keyDown("s")) agency.rotation = -135

    if (agency.position.x > width) agency.position.x = 0
    if (agency.position.x < 0) agency.position.x = width
    if (agency.position.y > height) agency.position.y = 0
    if (agency.position.y < 0) agency.position.y = height

    agency.collide(expression, function () {
        e = true
        expressionsnd.play()
        biuSound()
    })
    agency.collide(welfare, function () {
        w = true
        welfaresnd.play()
        biuSound()
    })
    agency.collide(protection, function () {
        p = true
        protectionsnd.play()
        biuSound()
    })

    if (!won) {
        agency.collide(structures, function () {
            if (shield || mimicing) return
            if (life > 0) {
                life -= 1
                structuresnd.play()
            } else {
                bangsnd.play()
                push()
                stroke("gold")
                noFill()
                textSize(200)
                strokeWeight(5)
                text("OP", width / 2, height / 2 - 140)
                text("PRESSED", width / 2, height / 2 + 20)
                textSize(64)
                strokeWeight(2)
                text("PRESS R TO RESTART", width / 2, height / 2 + 200)
                pop()
                noLoop()
            }
        })
    }

    structures.collide(charcircles, function () {})

    agency.collide(mimics, function (sa, sb) {
        sb.remove()
        mimicing = true
        mimicsnd.play()
        setTimeout(function () {
            mimicing = false
        }, 5000)
    })


    drawSprites();
    infos()
}