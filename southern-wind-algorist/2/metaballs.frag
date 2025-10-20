precision lowp float;

uniform vec2 balls0;
uniform vec2 balls1;
uniform vec2 balls2;
uniform vec2 balls3;
uniform vec2 balls4;

uniform float noise0;
uniform float noise1;
uniform float noise2;
uniform float noise3;
uniform float noise4;


void main() {

  vec2 coord = gl_FragCoord.xy;
  float d = mod(distance(balls0, coord), 50.0 * noise0) +
    mod(distance(balls1, coord), 50.0 * noise1) +
    mod(distance(balls2, coord), 50.0 * noise2) +
    mod(distance(balls3, coord), 50.0 * noise3) +
    mod(distance(balls4, coord), 50.0 * noise4);

  gl_FragColor = vec4(d / 255.0, d / 255.0 / 10.0, 255.0 / 255.0, 0.5);


}