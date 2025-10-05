import * as React from 'react';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

const Rosto4 = (props) => (
  <Svg width="380" height="401" viewBox="0 0 380 401" {...props}>
    <Circle cx="190.193" cy="167.193" r="121.193" fill={props.fill} />
    <Rect x="69" y="164.499" width="242.385" height="191.215" fill={props.fill} />
    <Path d="M69 336H311V356H69V336Z" fill={props.shadowFill} />
  </Svg>
);

export default Rosto4;