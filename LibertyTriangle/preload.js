function preload() {
    noticia = loadFont("./Noticia_Text/NoticiaText-Bold.ttf");
    alfa = loadFont("./Alfa_Slab_One/AlfaSlabOne-Regular.ttf")
    pacifico = loadFont("./Pacifico/Pacifico-Regular.ttf")

    agencysnd=loadSound("./snd/agency.ogg")
    ouchsnd=loadSound("./snd/ouch.ogg")
    structuresnd=loadSound("./snd/structure.ogg")
    structuresnd.playMode('restart')
    biusnd=loadSound("./snd/biu.ogg")
    clicksnd=loadSound("./snd/click.ogg")
    expressionsnd=loadSound("./snd/expression.ogg")
    expressionsnd.playMode('untilDone')
    welfaresnd=loadSound("./snd/welfare.ogg")
    welfaresnd.playMode('untilDone')
    protectionsnd=loadSound("./snd/protection.ogg")
    protectionsnd.playMode('untilDone')
    libertysnd=loadSound("./snd/liberty.ogg")
    mimicsnd=loadSound("./snd/mimic.ogg")
    bangsnd=loadSound("./snd/bang.ogg")

    gaysnd=loadSound("./snd/gay.ogg")
    issnd=loadSound("./snd/is.ogg")
    goodsnd=loadSound("./snd/good.ogg")
    lovesnd=loadSound("./snd/love.ogg")
    winssnd=loadSound("./snd/wins.ogg")
}
