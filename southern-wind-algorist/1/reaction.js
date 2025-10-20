function setupReaction() {
    current_texture = createGraphics(width, height, WEBGL)
    current_texture.setAttributes({
        alpha: true
    });
    current_texture.canvas.getContext("2d", { willReadFrequently: true }) 

    start_texture = createGraphics(width, height, WEBGL)
    start_texture.canvas.getContext("2d", { willReadFrequently: true }) 
    
    mode = 1
    panwenxi_index = 0
}

function drawReaction() {
    if (frameCount % 5 == 0) {
        start_texture.clear();
        start_texture.textFont(source_font)
        start_texture.textSize(128)
        start_texture.textAlign(CENTER, CENTER)
        start_texture.textStyle(BOLD)
        start_texture.fill("white")
        start_texture.text(panwenzi.charAt(panwenxi_index), random(width) - width / 2, random(height) - height / 2)
        panwenxi_index++
        panwenxi_index = panwenxi_index % panwenzi.length
        if (frameCount > 1200) {
            mode = 2 // remove green 
        } else {
            mode = random([1, 2]) // add green 
        }
    } else {
        mode = 3 // reaction-diffusion
    }

    current_texture.shader(reaction_shader)
    reaction_shader.setUniform('mode', mode);
    reaction_shader.setUniform('dA', 1);
    reaction_shader.setUniform('dB', 0.5);
    reaction_shader.setUniform('feed', 0.0055); // feed rate
    reaction_shader.setUniform('k', 0.062); // kill rate
    reaction_shader.setUniform('dT', 1); //speed
    reaction_shader.setUniform('resolution', [width, height]);
    reaction_shader.setUniform('start_texture', start_texture);
    reaction_shader.setUniform('current_texture', current_texture);
    current_texture.rect(0, 0, width, height);
    image(current_texture, -width / 2, -height / 2)
}