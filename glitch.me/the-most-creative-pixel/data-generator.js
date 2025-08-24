const s = (sketch) => {
  sketch.setup = async function () {
    let cnv = sketch.createCanvas(28, 28)
    sketch.noLoop()
    sketch.background("black")
    cnv.hide()
    await run()
  }

  sketch.generateCreativeDate = function(count){
    let Xs = []
    let Ys = []
    let lines = []
    for(let i=0;i<count;i++){
      let gap = 10
      let x = sketch.random(sketch.width)
      let y = sketch.random(sketch.width)
      let label
      let inputs
      let rnd = sketch.random()
      if(rnd>0.67){
        inputs = {
          x1: x,
          y1: y,
          x2: x,
          y2: y+gap
        }
        label = 'vertical'
      }else if(rnd<=0.67 && rnd> 0.33){
        inputs = {
          x1: x,
          y1: y,
          x2: x+gap,
          y2: y
        }
        label = 'horizontal'
      }else{
        inputs = {
          x1: x,
          y1: y,
          x2: x+sketch.cos(sketch.PI/4)*gap,
          y2: y+sketch.sin(sketch.PI/4)*gap
        }
        label = 'creative'
      }
      sketch.background("black")
      sketch.stroke("white")
      sketch.line(inputs.x1,inputs.y1,inputs.x2,inputs.y2)
      big_canvas.addCanvas(inputs)
      Xs.push(sketch.get1dArray())
      Ys.push(label)
      lines.push(inputs)
    }
    return [Xs,Ys,lines]
  }

  sketch.generateData = function(count) {
    let Xs = []
    let Ys = []
    let lines = []
    for(let i=0;i<count;i++){
      let gap = 10
      let x = sketch.random(sketch.width)
      let y = sketch.random(sketch.width)
      let label
      let inputs
      if(sketch.random()>0.5){
        inputs = {
          x1: x,
          y1: y,
          x2: x,
          y2: y+gap
        }
        label = [0,1]
      }else{
        inputs = {
          x1: x,
          y1: y,
          x2: x+gap,
          y2: y
        }
        label = [1,0]
      }  
      sketch.background("black")
      sketch.stroke("white")
      sketch.line(inputs.x1,inputs.y1,inputs.x2,inputs.y2)
      big_canvas.addCanvas(inputs)
      Xs.push(sketch.get1dArray())
      Ys.push(label)
      lines.push(inputs)
    }
    return [Xs,Ys,lines]
  }
  
  sketch.get1dArray = function(){
    sketch.loadPixels()
    return Array.from(sketch.pixels.filter((val, i)=> i%4===0)).map(x=>x/255)
  }
}
let myp5 = new p5(s);