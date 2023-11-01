precision highp float;
uniform float u_height;
uniform vec3 u_point;
varying vec3 v_position;
varying vec2 v_uv;
void main() {
    const float scope = 10.0;
    float height_opc = ((v_position.x + .5) / 1.5);
    vec3 point3 = u_point / 25.0;
    vec2 pos = vec2(2., 2.);
    float alpha = abs(length(v_position.xy - u_point.xy) / 10.0)*0.6;
    gl_FragColor = vec4(vec3(0.8039, 0.0824, 0.5765), alpha);

}