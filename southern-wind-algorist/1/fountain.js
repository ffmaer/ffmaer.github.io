MAX_HANZI_GROUP_SIZE = 108*2

function setupFountain() {
	hanzi_index = 0;
	fountain_graph = createGraphics(width, height)
	createBorders();
	hanzi_group = new Group();
	hanzi_group.diameter = 30;
	hanzi_group.vel.y = -random(2, 4);
	borders.overlaps(hanzi_group, disappear)
	floor = new Sprite();
	floor.collider = 'k';
	floor.x = width / 2
	floor.y = height / 4;
	floor.w = 200;
	floor.h = 5;
	floor.color = "lime";
	floor.draw = function () {
		fountain_graph.rectMode(CENTER)
		fountain_graph.rect(this.x, this.y, this.w, this.h);
	}
	floor.visible = false;
	nextPause = 0
	nextPause = getNextPause()

	
}
function shall_we_pause(){
	if(millis()>nextPause){
		hanzi_group.removeAll()
		nextPause = getNextPause();
	}
}
function getNextPause(){
	return nextPause + random(5,10)*60*1000 // next pause between 1 to 5 minutes
}
function drawFountain() {
	shall_we_pause()
	createHanzi()
	image(fountain_graph, -width / 2, -height / 2)
	manage_memory()
}

function manage_memory(){
	if(hanzi_group.length>MAX_HANZI_GROUP_SIZE){
		hanzi_group[0].remove()
		console.log("just removed")
	}
}

function createHanzi() {
	if (frameCount % 30 == 0) { // tik tok tik tok
		let hanzi = new hanzi_group.Sprite();
		hanzi.x = random(50) + width / 2
		hanzi.y = height - 20;
		hanzi.char = qingzhenji.charAt(hanzi_index)
		hanzi.en_idx = 0
		hanzi.en = function(){ // there can be several definition
			let en_arr = toEn(hanzi.char);
			let result = en_arr[this.en_idx]
			if(frameCount % 30 == 0){
				this.en_idx++
				this.en_idx%=en_arr.length
			}
			
			return result
		}
		hanzi.color = color(rndColor())
		hanzi.seed = int(random(10000))
		hanzi_index++
		hanzi_index = hanzi_index % qingzhenji.length;
		hanzi.draw = function () {
			fountain_graph.textAlign(CENTER, CENTER);
			let my_noise = noise((frameCount + this.seed) / 100)
			let c = lerpColor(this.color, color(255), my_noise)
			fountain_graph.fill(c);
			fountain_graph.blendMode(ADD)
			fountain_graph.noStroke();
			fountain_graph.textSize(30)
			fountain_graph.textFont(source_font)
			if (my_noise > 0.5 || this.en == "") {
				fountain_graph.text(this.char, this.x, this.y);
			} else {
				fountain_graph.text(this.en(), this.x, this.y);
			}

		};

	}
}

function disappear(border,hanzi) {
	hanzi.remove();
}

function createBorders() {
	borders = new Group();
	borders.color = "lime"
	borders.collider = 'k';

	gap_b = 100;

	top_b = new borders.Sprite();
	top_b.x = width / 2;
	top_b.y = -gap_b;
	top_b.h = 10;
	top_b.w = width + 2 * gap_b;

	btm_b = new borders.Sprite();
	btm_b.x = width / 2;
	btm_b.y = height + gap_b;
	btm_b.h = 10;
	btm_b.w = width + 2 * gap_b;

	lft_b = new borders.Sprite();
	lft_b.x = -gap_b;
	lft_b.y = height / 2;
	lft_b.h = height + 2 * gap_b;
	lft_b.w = 10;

	rgh_b = new borders.Sprite();
	rgh_b.x = width + gap_b;
	rgh_b.y = height / 2;
	rgh_b.h = height + 2 * gap_b;
	rgh_b.w = 10;

	// make invisible
	top_b.visible = false
	btm_b.visible = false
	lft_b.visible = false
	rgh_b.visible = false
}

function toEn(hanzi){
    if(hanzi in cedict){
		let def = cedict[hanzi]
		def = def.replace(/\(.+\)/g,"")
		def = def.replace(/\[.+\]/g,"")
		def = def.replace(/^to /g,"")
		def = def.split(";")
        return def
    }
    return ""
}