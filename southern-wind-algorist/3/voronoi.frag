precision lowp float;
uniform vec2 dots[10];
uniform vec3 colors[10];
uniform bool hasLove;

vec3 rgb(float r, float g, float b){
  return vec3(r / 255.0, g / 255.0, b / 255.0);
}


void main() {

  vec2 pix = gl_FragCoord.xy;
  float min_dist = 999999.0;
  vec3 min_color = colors[0];
  for(int i=0;i<10;++i)
  {
    float dist = distance(dots[i], pix);
    if(dist < min_dist){
      min_dist = dist;
      min_color = colors[i];
    }
  }
  gl_FragColor = vec4(min_color, 0.5);

}






