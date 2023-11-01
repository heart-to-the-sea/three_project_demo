precision highp float;
uniform float u_height;

varying vec3 v_position;
void main() {
    float height_opc = ((v_position.y + .5) / 1.5);
    gl_FragColor = vec4(0.0, 0.4, 0.55, height_opc);
}