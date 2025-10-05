import * as React from 'react';
import Svg, { Path, Ellipse } from 'react-native-svg';

const Rosto10 = (props) => (
  <Svg width="380" height="398" viewBox="0 0 380 398" {...props}>
    <Ellipse cx="190" cy="198.5" rx="132" ry="152.5" fill={props.fill} />
    <Path
      d="M322.034 192.433C322.097 194.366 322.129 196.308 322.129 198.259C322.129 282.542 263.002 350.867 190.064 350.867C117.127 350.867 58 282.542 58 198.259C58 196.308 58.031 194.366 58.0938 192.433C60.7434 274.017 118.815 339.215 190.064 339.215C261.314 339.215 319.384 274.017 322.034 192.433Z"
      fill={props.shadowFill}
    />
  </Svg>
);

export default Rosto10;