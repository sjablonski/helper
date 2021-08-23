import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, Slider, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Appbar, IconButton } from 'react-native-paper';
import { Camera } from 'expo-camera';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CircularProgress from 'components/CircularProgress';
import useCamera from 'hooks/useCamera';
import styles from './styles';

const CameraScreen = ({ navigation, addToGallery }) => {
  const cameraRef = useRef(null);
  const snapButtonRef = useRef(null);
  const [zoom, setZoom] = useState(0);
  const {
    longPress,
    progress,
    cameraType,
    changeCameraType,
    setCameraReady,
    handleCaptureIn,
    handleCaptureOut,
    handleShortCapture,
    handleLongCapture,
  } = useCamera(cameraRef, addToGallery);

  useEffect(() => {
    StatusBar.setHidden(true);
    return () => StatusBar.setHidden(false);
  }, []);

  if (longPress) {
    snapButtonRef.current.setOpacityTo(1);
  }

  return (
    <Camera style={styles.camera} ratio="16:9" zoom={zoom} ref={cameraRef} onCameraReady={setCameraReady}>
      <SafeAreaView style={styles.wrapper}>
        <Appbar.Header style={{ backgroundColor: 'transparent' }}>
          <Appbar.Action icon="close" color="white" onPress={() => navigation.pop()} />
        </Appbar.Header>
        <View style={styles.wrapper}>
          <View style={styles.sliderWrapper}>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={1}
              onValueChange={setZoom}
              value={zoom}
              maximumTrackTintColor="white"
              thumbTintColor="white"
            />
          </View>
        </View>
        <View style={styles.footer}>
          <View>
            <TouchableOpacity
              onPressIn={handleCaptureIn}
              onPressOut={handleCaptureOut}
              onPress={handleShortCapture}
              onLongPress={handleLongCapture}
              ref={snapButtonRef}
            >
              <View style={styles.snapButton}>
                {longPress ? (
                  <CircularProgress size={110} textOff percent={Math.floor((progress / 180) * 100)} />
                ) : (
                  <MaterialCommunityIcons name="circle-slice-8" style={styles.snapIcon} />
                )}
              </View>
            </TouchableOpacity>
          </View>
          <IconButton
            icon="camera-switch"
            color="white"
            style={styles.changeCamera}
            onPress={() => changeCameraType(cameraType)}
          />
        </View>
      </SafeAreaView>
    </Camera>
  );
};

export default CameraScreen;
