const s_big = (sketch) => {
    const fps = 30
    let drop_list = []
    let floor_height 
    let data = []
    let prediction_data = []
    let acc_list = []
    let [htx, hty] = [500,80] // horizontal tower
    let [vtx, vty] = [600,170] // vertical tower
    let life = 20
    let max_life = life
    let jet_size = 20 // jet size
    let labels =['horizontal','vertical']
    const lockedOnSec = 3
    sketch.setup = function(){
        sketch.createCanvas(800,1200)
        floor_height = sketch.height/4
        sketch.angleMode(sketch.DEGREES)
        sketch.frameRate(fps)
    }

    sketch.draw = function(){
        
        sketch.background("black")
        
        sketch.jet(sketch.frameCount%sketch.width,50)
        sketch.jet(sketch.frameCount%sketch.width+100,50)
        if(state === "prediction") sketch.jet(sketch.frameCount%sketch.width+250,50, "prediction")
        sketch.separatingLines()
        sketch.bigHole()
        sketch.drop()
        sketch.network()
        sketch.acc()
        sketch.laser()
        sketch.tower(htx,hty,"horizontal")
        sketch.tower(vtx,vty,"vertical")
        sketch.life()
    }

    sketch.bigHole = function(){
        sketch.push()
        sketch.fill("black")
        sketch.strokeWeight(5)
        sketch.stroke("white")
        sketch.ellipse(sketch.width/2,floor_height+floor_height/2,sketch.width-100,floor_height/4*3)
        sketch.pop()
    }
    sketch.separatingLines = function(){
        sketch.push()
        sketch.strokeWeight(5)
        sketch.stroke("white")
        sketch.line(0,floor_height*1,sketch.width,floor_height*1)
        sketch.line(0,floor_height*2,sketch.width,floor_height*2)
        sketch.line(0,floor_height*3,sketch.width,floor_height*3)
        sketch.pop()
    }

    sketch.tower = function(offset_x,offset_y,type){
        sketch.push()
        sketch.translate(0,floor_height*3)
        sketch.noFill()
        sketch.stroke("white")
        sketch.strokeWeight(5)
        sketch.ellipse(offset_x,offset_y+0,50,30)
        sketch.ellipse(offset_x,offset_y+20,80,30)
        sketch.ellipse(offset_x,offset_y+40,110,30)
        sketch.fill("white")
        sketch.ellipse(offset_x,offset_y+40,20,100)
        sketch.ellipse(offset_x,offset_y-20,30,30) //sphere
        sketch.stroke("black")
        if(type==="vertical"){
            sketch.line(offset_x,offset_y-30,offset_x,offset_y-10)
        }else if(type==="horizontal"){
            sketch.line(offset_x-8,offset_y-20,offset_x+8,offset_y-20)
        }
        sketch.pop()
    }

    sketch.network = function(){
        sketch.push()
        sketch.noStroke()
        sketch.fill("white")
        sketch.noStroke()
        sketch.translate(0,floor_height*2+50)

        let x_base = -sketch.random(30,160) // layer 1
        for(let i=0;i<8;i++){
            let size = 24
            x_base += sketch.random(30,160)
            sketch.circle(x_base, 0, size)
        }

        x_base = -sketch.random(30,160) // layer 2
        for(let i=0;i<8;i++){
            let size = 12
            x_base += sketch.random(30,160)
            sketch.circle(x_base, 60, size)
        }

        x_base = -sketch.random(30,80) // layer 3
        for(let i=0;i<16;i++){
            let size = 8
            x_base += sketch.random(30,80)
            sketch.circle(x_base, 120, size)
        }

        x_base = -sketch.random(30,80) // layer 4
        for(let i=0;i<16;i++){
            let size = 4
            x_base += sketch.random(30,80)
            sketch.circle(x_base, 170, size)
        }

        x_base = -sketch.random(5,15) // layer 5
        for(let i=0;i<256;i++){
            let size = 2
            x_base += sketch.random(5,15)
            sketch.circle(x_base, 210, size)
        }
        sketch.pop()
    }

    sketch.drop = function(){
        let to_remove = []
        sketch.push()
        for(let i=0;i<drop_list.length;i++){
            let [offset_x, offset_y, start_frameCount, line, type, pred, label, lockedOn] = drop_list[i]
            offset_y = offset_y+sketch.frameCount-start_frameCount
            if(type === "training" && offset_y > 3*floor_height-sketch.random(28,28*6)) to_remove.push(i)
            if(type === "prediction" && offset_y > 4*floor_height){
                to_remove.push(i)
                if(life>0 && label !== "creative") life--
            }
            if(type === "prediction" && lockedOn >= lockedOnSec*fps) to_remove.push(i)
            sketch.stroke("white")
            if(label === "creative") sketch.stroke("violet")
            sketch.strokeWeight(5)
            sketch.noFill()
            sketch.line(offset_x+line.x1,offset_y+line.y1,offset_x+line.x2,offset_y+line.y2)
            sketch.rect(offset_x,offset_y,28,28)
        }
        sketch.pop()
        drop_list = drop_list.filter((val,index)=> !to_remove.includes(index))
    }

    sketch.jet = function(offset_x,offset_y, type="training"){
        let data_in_use
        if(type === "prediction"){
            data_in_use = prediction_data
        }else{
            data_in_use = data
        }
        
        sketch.push()
        if(sketch.frameCount % fps === 0){
            if(data_in_use.length>0){
                let drop
                if(type === "prediction"){
                    let [line, pred, label] = data_in_use.pop()
                    drop = [offset_x-jet_size/2,offset_y-jet_size/2,sketch.frameCount, line, type, pred, label, 0]
                }else{
                    drop = [offset_x-jet_size/2,offset_y-jet_size/2,sketch.frameCount,data_in_use.pop(), type]
                }
                drop_list.push(drop)
            }
        }
        
        sketch.stroke("white")
        sketch.strokeWeight(5)
        sketch.translate(offset_x,offset_y)
        if(type==="prediction") sketch.rotate(sketch.frameCount)
        sketch.fill("white")
        sketch.quad(-2*jet_size,-2*jet_size,-1*jet_size,-1*jet_size,-1*jet_size,jet_size,-2*jet_size,2*jet_size)
        sketch.noFill()
        sketch.rect(-1*jet_size,-1*jet_size,jet_size*2,jet_size*2)
        sketch.fill("white")
        sketch.quad(1*jet_size,-1*jet_size,2*jet_size,-2*jet_size,2*jet_size,2*jet_size,1*jet_size,1*jet_size)
        sketch.pop()
    }

    sketch.mousePressed = function(){
        if(state == 'prediction'){
            doPrediction(model, 1)
        }
    }

    sketch.laser = function(){
        let prediction_drop_list = drop_list.filter((val,index)=>val[4]==="prediction") // val[4] is type
        for(let i=0;i<prediction_drop_list.length;i++){
            let drop = prediction_drop_list[i]
            let [offset_x, offset_y, start_frameCount, line, type, pred, label, lockedOn] = drop
            offset_y = offset_y+sketch.frameCount-start_frameCount
            if(labels[pred] === label){ // correct prediction
                drop[7] ++
                sketch.push()
                sketch.strokeWeight(lockedOn/lockedOnSec/3)
                sketch.stroke("white")
                if(pred === 0){
                    sketch.line(htx, 3*floor_height + hty,offset_x+28/2,offset_y+28/2)
                }else{
                    sketch.line(vtx, 3*floor_height + vty,offset_x+28/2,offset_y+28/2)
                }
                sketch.pop()
            }else if(label !== "creative"){
                sketch.push()
                sketch.stroke("white")
                sketch.strokeWeight(5)
                sketch.noFill()

                sketch.line(offset_x,offset_y, offset_x-28/6,offset_y-28/6)
                sketch.line(offset_x+28,offset_y, offset_x+28+28/6,offset_y-28/6)
                sketch.line(offset_x+28,offset_y+28, offset_x+28+28/6,offset_y+28+28/6)
                sketch.line(offset_x,offset_y+28, offset_x-28/6,offset_y+28+28/6)
                sketch.pop()
            }
        }
    }

    sketch.addPrediction = function(preds, labels, lines){
        for(let i=0;i<lines.length;i++){
            let pred = preds[i]
            let label = labels[i]
            let line = lines[i]
            prediction_data.push([line,pred,label])
        }
    }

    sketch.addCanvas=function(inputs){
        if(state !== "prediction"){
            data.push(inputs)
        }    
    }

    sketch.acc = function(){
        sketch.push()
        sketch.translate(0,floor_height*4)
        sketch.noStroke()
        sketch.fill("white")
        for(let i =0;i<acc_list.length;i++){
            let acc = acc_list[i]
            sketch.circle(10*i%sketch.width,-floor_height*acc,10)
        }
        sketch.pop()
    }

    sketch.addAccuracy = function(acc){
        console.log(acc)
        acc_list.push(acc)
    }

    sketch.life = function(){
        sketch.push()
        sketch.translate(20,floor_height*4-20)
        sketch.fill("white")
        sketch.textSize(25)
        sketch.noStroke()
        sketch.text("❤".repeat(life)+"♡".repeat(max_life-life), 0,0)
        sketch.pop()
    }
}

let big_canvas = new p5(s_big);