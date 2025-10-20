function drawStrange() {
    scale = 10

    wang.x = wang_x * scale + width / 2
    wang.y = -wang_z * scale + height / 4 * 3
    wang.speed = 0;
    wang_dt = 0.01
    wang_dx = (wang_alpha * (wang_y - wang_x)) * wang_dt;
    wang_x += wang_dx;
    wang_dy = (wang_x * (wang_rho - wang_z) - wang_y) * wang_dt;
    wang_y += wang_dy;
    wang_dz = (wang_x * wang_y - wang_beta * wang_z) * wang_dt;
    wang_z += wang_dz;

    pan.x = pan_x * scale + width / 2
    pan.y = -pan_z * scale + height / 4 * 3
    pan.speed = 0;
    pan_dt = 0.01
    pan_dx = (pan_alpha * (pan_y - pan_x)) * pan_dt;
    pan_x += pan_dx;
    pan_dy = (pan_x * (pan_rho - pan_z) - pan_y) * pan_dt;
    pan_y += pan_dy;
    pan_dz = (pan_x * pan_y - pan_beta * pan_z) * pan_dt;
    pan_z += pan_dz;
}

function setupStrange() {
    pan_name = new PersonName("潘文子", "Pan Wenzi")
    wang_name = new PersonName("王仲先", "Wang Zhongxian")

    main_character_circle_d = 100
    //lorenz attractor - wang

    wang_x = 1
    wang_y = 0
    wang_z = 0
    wang_alpha = 10
    wang_beta = 8.0 / 3.0
    wang_rho = 28

    wang = new Sprite();
    wang.collider = 'static';
    wang.w = main_character_circle_d;
    wang.h = main_character_circle_d;
    wang.draw = function () {
        fountain_graph.fill("lime");
        fountain_graph.noStroke();
        fountain_graph.textSize(56)
        fountain_graph.text(pan_name.name, this.x, this.y);
    }

    //lorenz attractor - pan
    pan_x = 2
    pan_y = 0
    pan_z = 0
    pan_alpha = 10
    pan_beta = 8.0 / 3.0
    pan_rho = 28

    pan = new Sprite();
    pan.collider = 'static';
    pan.w = main_character_circle_d;
    pan.h = main_character_circle_d;
    pan.draw = function () {
        fountain_graph.fill("fuchsia");
        fountain_graph.noStroke();
        fountain_graph.textSize(56)
        fountain_graph.text(wang_name.name, this.x, this.y);

    }

}

class PersonName{
    constructor(cn, en){
        this.cn = cn
        this.en = en
        this.seed = random(10000)
    }
    get name(){
        let my_noise = noise(this.seed + frameCount/500)
        if(my_noise > 0.5){
            return this.cn
        }else{
            return this.en
        }
    }
}