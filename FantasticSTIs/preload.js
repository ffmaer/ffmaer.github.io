function preload(){
    
    kandinsky = loadSound("sounds/kandinsky.ogg")
    kiss=loadSet("kiss")
    condom = loadSet("condom")
    a = loadSet("a")
    ouch = loadSet("ouch")
    talk = loadSet("we should talk")
    pep = loadSet("pep")
    prep = loadSet("prep")
    gulu = loadSet("gulu")
    bing = loadSet("bing")
}

function setupSounds(){
    kandinsky.setVolume(0.2)
}

function loadSet(name){
    let s = loadSound("sounds/"+name+".ogg", function(){
        s.playMode('sustain')
    })
    return s
}