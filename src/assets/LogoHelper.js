import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

const LogoHelper = ({ width, height, color }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      version="1.1"
      viewBox="0 0 256 64"
      style={{ alignSelf: 'center' }}
    >
      <G display="inline">
        <Path
          fill={color}
          fillOpacity="1"
          stroke={color}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.265"
          d="M-573.273 130.301v122.6h18.956v-51.316c0-16.91 15.543-32.495 36.883-33.142 10.557.876 35.533 6.952 35.146 36.75V252.9h18.575v-53.454c-.073-5.063-2.696-22.764-17.015-35.416-15.847-14.002-44.816-21.883-74.124-.933v-32.874z"
          transform="translate(0 -233) matrix(.4397 0 0 .43857 252.126 175.943)"
        />
        <Path
          fill={color}
          fillOpacity="1"
          stroke={color}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.265"
          d="M-401.672 152.6c-17.663.155-49.254 14.453-49.416 50.975 0 27.545 23.252 51.821 56.866 50.93v-17.908c-7.395-.434-32.728-1.75-38.755-27.796h83.845c0-9.085-3.85-54.754-50.876-56.173a31.098 31.098 0 00-1.664-.028zm1.962 17.778c14.183 0 26.282 10.465 30.239 21.072h-61.61c4.958-11.482 15.721-21.072 31.371-21.072z"
          clip-path="none"
          transform="translate(0 -233) matrix(.4397 0 0 .43857 252.126 175.943)"
        />
        <Path
          fill={color}
          fillOpacity="1"
          stroke={color}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeOpacity="1"
          strokeWidth="0.265"
          d="M-330.211 130.847c0 37.036 0 65.96.342 90.997.207 15.147 12.461 31.741 34.103 32.445v-18.71c-6.378-1.041-15.623-2.746-15.998-17.374-.463-18.032-.724-69.933-.328-87.358zM-232.432 152.592c-25.666.205-51.81 19.657-51.81 52.2v71.093h18.977V242.21c21.71 19.495 51.357 13.354 66.149 0 28.376-25.787 16.367-62.752-.133-76.44-9.098-9.096-21.087-13.275-33.183-13.178zm-.427 18.524a32.807 32.807 0 0132.808 32.807 32.807 32.807 0 01-32.808 32.808 32.807 32.807 0 01-32.807-32.808 32.807 32.807 0 0132.807-32.807zM-117.833 152.838c-17.662.155-49.253 14.453-49.415 50.974 0 27.546 23.252 51.822 56.865 50.93v-17.907c-7.394-.434-32.727-1.75-38.754-27.796h83.844c0-9.085-3.85-54.753-50.875-56.172a31.108 31.108 0 00-1.665-.03zm1.963 17.778c14.183 0 26.281 10.465 30.238 21.072h-61.61c4.959-11.482 15.723-21.072 31.372-21.072zM-31.538 252.767h-18.637c0-19.466.119-34.31.119-50.794 0-28.287 19.728-49.154 58.742-49.566v18.308c-11.176 0-19.426 2.055-25.912 6.179-9.112 5.793-14.266 13.42-14.288 27-.024 15.087-.024 31.806-.024 48.873z"
          transform="translate(0 -233) matrix(.4397 0 0 .43857 252.126 175.943)"
        />
      </G>
    </Svg>
  );
};

export default LogoHelper;