import { useContext, useEffect, useState } from 'react';
import { NavigationContext } from 'react-navigation';
import { Camera } from 'expo-camera';
import { CAMERA, AUDIO_RECORDING } from 'expo-permissions';
import getPermissions from 'utils/getPermissions';

export default (cameraRef, action) => {
  const navigation = useContext(NavigationContext);
  const { Type: CameraTypes } = Camera.Constants;
  const [isPermission, setIsPermission] = useState(null);
  const [cameraType, setCameraType] = useState(CameraTypes.back);
  const [capturing, setCapturing] = useState(false);
  const [progress, setProgress] = useState(null);
  const [longPress, setLongPress] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  let interval = null;

  const setVideoDuration = () => {
    interval = setInterval(() => {
      setProgress(prevState => prevState + 1);
    }, 100);
  };

  const setCameraReady = () => setIsCameraReady(true);

  const changeCameraType = type => setCameraType(type === CameraTypes.back ? CameraTypes.front : CameraTypes.back);

  const handleCaptureIn = () => setCapturing(true);

  const handleCaptureOut = () => {
    if (capturing) {
      cameraRef.current.stopRecording();
      setCapturing(false);
      clearInterval(interval);
      setProgress(null);
    }
  };

  const handleShortCapture = async () => {
    if (cameraRef && isPermission && isCameraReady) {
      const photoData = await cameraRef.current.takePictureAsync();
      navigation.navigate({
        routeName: 'Gallery',
        params: {
          file: {
            type: 'image',
            ...photoData,
          },
          icon: 'send',
          action,
        },
      });
    }
  };

  const handleLongCapture = async () => {
    if (cameraRef && isPermission && isCameraReady) {
      setLongPress(true);
      setVideoDuration();
      const videoData = await cameraRef.current.recordAsync({ maxDuration: 20 });
      clearInterval(interval);
      setLongPress(false);
      navigation.navigate({
        routeName: 'Gallery',
        params: {
          file: {
            type: 'video',
            ...videoData,
          },
          icon: 'send',
          action,
        },
      });
    }
  };

  const permissions = async () => {
    const status = await getPermissions(CAMERA, AUDIO_RECORDING);
    setIsPermission(status);
  };

  useEffect(() => {
    permissions();
  }, []);

  return {
    longPress,
    progress,
    cameraType,
    changeCameraType,
    setCameraReady,
    handleCaptureIn,
    handleCaptureOut,
    handleShortCapture,
    handleLongCapture,
  };
};
