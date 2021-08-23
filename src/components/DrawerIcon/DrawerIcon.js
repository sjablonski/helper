import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import styles from './DrawerIcon.styles';

const DrawerIcon = ({ name, color }) => <FontAwesome testID="icon" name={name} style={[styles.icon, { color }]} />;

export default DrawerIcon;
