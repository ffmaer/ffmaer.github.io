// Based on Daniel Shiffman's Coding Challenge: Reaction Diffusion Algorithm in p5.js https://www.youtube.com/watch?v=BV9ny785UNc and https://leclub.github.io/2016/06/ThreeJS-Gray-Scott-Reaction-Diffusion/

precision lowp float;

uniform int mode;
uniform vec2 resolution;
uniform sampler2D start_texture;
uniform sampler2D current_texture;

vec2 pos;
vec2 texColor;
vec2 offset;

uniform float dA;
uniform float dB;
uniform float kill;
uniform float feed;
uniform float dT;

vec2 getLaplace() {
    vec2 one_pixel = vec2( 1.0 ) / resolution;
    // 0 1 2
    // 3 4 5
    // 6 7 8
    vec2 pos0 = pos + vec2( -one_pixel.x,  -one_pixel.y );
    vec2 pos1 = pos + vec2(       0.0,  -one_pixel.y );
    vec2 pos2 = pos + vec2(  one_pixel.x,  -one_pixel.y );
    vec2 pos3 = pos + vec2( -one_pixel.x,        0.0 );
    vec2 pos4 = pos + vec2(       0.0,        0.0 );
    vec2 pos5 = pos + vec2(  one_pixel.x,        0.0 );
    vec2 pos6 = pos + vec2( -one_pixel.x,   one_pixel.y );
    vec2 pos7 = pos + vec2(       0.0,   one_pixel.y );
    vec2 pos8 = pos + vec2(  one_pixel.x,   one_pixel.y );

    vec2 col0 = texture2D( current_texture, pos0 ).rg;
    vec2 col1 = texture2D( current_texture, pos1 ).rg;
    vec2 col2 = texture2D( current_texture, pos2 ).rg;
    vec2 col3 = texture2D( current_texture, pos3 ).rg;
    vec2 col4 = texture2D( current_texture, pos4 ).rg;
    vec2 col5 = texture2D( current_texture, pos5 ).rg;
    vec2 col6 = texture2D( current_texture, pos6 ).rg;
    vec2 col7 = texture2D( current_texture, pos7 ).rg;
    vec2 col8 = texture2D( current_texture, pos8 ).rg;

    return col0 * 0.05 + col1 * 0.2 + col2 * 0.05 +
            col3 * 0.2  - col4 * 1.0 + col5 * 0.2  +
            col6 * 0.05 + col7 * 0.2 + col8 * 0.05;
}

void main( void ){
    pos = gl_FragCoord.xy / resolution;
    pos.x = pos.x;
    pos.y = 1.0 - pos.y; // p5.js & webgl y-axis flip

    vec2 color;
    vec2 green_input = vec2(0.0, step(0.1, texture2D( start_texture, pos).g)); // with the step function, if green is more than 0.1 then return 1
    if( mode == 1 ) { // add green
        vec2 pixel_color = texture2D(current_texture, vec2(pos.x, pos.y)).rg;
        color = green_input * 0.3 + pixel_color; 
    }
    else if(mode == 2){ // remove green
        vec2 pixel_color = texture2D(current_texture, vec2(pos.x, pos.y)).rg;
        color = pixel_color - green_input * 30.0; 
    }
    else if (mode == 3) { // regular reaction-diffusion
        vec2 pixel_color = texture2D(current_texture, vec2(pos.x, pos.y)).rg;
        offset = vec2( 1.0 ) / resolution;

        float r = pixel_color.r;
        float g = pixel_color.g;
    
        float reaction = r * g * g;
        vec2 laplace = getLaplace();

        float red = ( dA * laplace.r ) - reaction + ( feed * ( 1.0 - r ) );
        float green = ( dB * laplace.g ) +  reaction - ( ( kill + feed ) * g );
        color = pixel_color + vec2( red, green ) * dT;
        
    }

    gl_FragColor = vec4( color, 0.0, 1.0 );
}