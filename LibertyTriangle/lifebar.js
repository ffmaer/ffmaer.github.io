function lifeBar(){
    push()
    rectMode(CENTER)
    stroke("white")
    noFill()
    rect(width/2,height-15,100*2+10,20)
    noStroke()
    if(life>80){
        fill("lime")
    }else if(life > 60){
        fill("yellow")
    }else if(life > 40){
        fill("orange")
    }else{
        fill("red")
    }
    rectMode(CORNER)
    rect(width/2-100,height-20,life*2,10)
    pop()
}