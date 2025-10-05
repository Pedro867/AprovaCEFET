import * as React from 'react';
import Svg, { Path, Ellipse } from 'react-native-svg';


const Rosto1 = (props) => (
  <Svg width="380" height="401" viewBox="0 0 380 401" {...props}>
    {/* Parte 1 do Rosto Principal */}
    <Path
      d="M310 289.46H309.983C309.993 289.758 310 290.056 310 290.355C310 321.471 256.899 370.999 191.396 371C125.892 371 72.791 321.471 72.791 290.355C72.791 290.056 72.7979 289.758 72.8076 289.46H72.791V123.122H310V289.46Z"
      fill={props.fill} // <-- Usa a cor principal
    />
    {/* Parte da Sombra */}
    <Path
      d="M72.791 269.891H72.8076C72.7979 270.189 72.791 270.487 72.791 270.786C72.7914 301.902 125.892 351.43 191.396 351.43C256.899 351.43 310 301.902 310 270.786C310 270.487 309.993 270.189 309.983 269.891H310V289.46H309.983C309.993 289.758 310 290.057 310 290.356C310 321.472 256.899 371 191.396 371C125.892 371 72.7914 321.472 72.791 290.356C72.791 290.057 72.7978 289.758 72.8076 289.46H72.791V269.891Z"
      fill={props.shadowFill} // <-- Usa a cor da sombra
    />
    {/* Parte 2 do Rosto Principal */}
    <Ellipse
      cx="190.5"
      cy="129"
      rx="119.5"
      ry="105"
      fill={props.fill} // <-- Usa a cor principal
    />
  </Svg>
);

export default Rosto1;