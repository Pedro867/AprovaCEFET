import * as React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

const Rosto8 = (props) => (
  <Svg width="380" height="399" viewBox="0 0 380 399" {...props}>
    <Circle cx="189.5" cy="199.5" r="133.5" fill={props.fill} />
    <Path
      d="M323.31 192.745C323.429 195.064 323.491 197.397 323.491 199.745C323.491 273.611 263.611 333.49 189.745 333.49C115.88 333.49 56 273.611 56 199.745C56 197.397 56.0602 195.064 56.1797 192.745C59.8205 263.357 118.228 319.49 189.745 319.49C261.263 319.49 319.669 263.357 323.31 192.745Z"
      fill={props.shadowFill}
    />
  </Svg>
);

export default Rosto8;