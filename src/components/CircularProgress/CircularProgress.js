import React from 'react';
import Svg, { Circle, Text } from 'react-native-svg';
import PropTypes from 'prop-types';
import styles from './CircularProgress.styles';

const CircularProgress = ({ size, strokeWidth, percent, textOff }) => {
  const radius = (size - strokeWidth) / 2;
  const viewBox = `0 0 ${size} ${size}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percent) / 100;

  return (
    <Svg width={size} height={size} viewBox={viewBox}>
      <Circle style={styles.background} cx={size / 2} cy={size / 2} r={radius} strokeWidth={`${strokeWidth}px`} />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={`${strokeWidth}px`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{
          ...styles.progress,
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
        }}
      />
      {!textOff ? (
        <Text style={styles.text} textAnchor="middle" x="50%" y="50%" dy=".3em">
          {`${percent}%`}
        </Text>
      ) : null}
    </Svg>
  );
};

CircularProgress.propTypes = {
  percent: PropTypes.number,
  size: PropTypes.number,
  strokeWidth: PropTypes.number,
  textOff: PropTypes.bool,
};

CircularProgress.defaultProps = {
  percent: 0,
  size: 192,
  strokeWidth: 10,
  textOff: false,
};

export default CircularProgress;
