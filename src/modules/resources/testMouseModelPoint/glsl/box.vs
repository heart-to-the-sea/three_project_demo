uniform vec3 u_point;
varying vec3 v_position;
varying vec3 v_normal;
varying vec2 v_uv;
void main() {
    const float scope = 10.0;
    v_position = position;
    v_normal = normal;
    v_uv = uv;
    vec3 pos = position;
    pos.z = pos.z + (abs(length(v_position.xy - u_point.xy) / 25.0)) * 10.;

    v_position = pos;
    // 模型坐标转换 = positation scale rotation
    // 模型和视图矩阵提供相机的变换
    // modleMatrix = position scale rotation of our model
    vec4 modelViewPosition = modelViewMatrix * vec4(pos, 1.0);
    vec4 projectPosition = projectionMatrix * modelViewPosition;
    gl_Position = projectPosition;
    gl_PointSize = 5.0;
}