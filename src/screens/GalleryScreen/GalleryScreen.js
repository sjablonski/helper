import React, { useRef } from 'react';
import { Image, Slider, View } from 'react-native';
import { Appbar, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-navigation';
import { Video } from 'expo-av';
import useVideoControl from 'hooks/useVideoControl';
import styles from './styles';

const GalleryScreen = ({ navigation }) => {
  const videoRef = useRef(null);
  const {
    state: { params },
  } = navigation;
  let action = null;

  const {
    sliderPosition,
    isPlaying,
    controlVisible,
    getSliderPosition,
    handlePlaybackStatusUpdate,
    handlePlay,
    handleReplay,
    handlePause,
    handleVisible,
    setPositionMillis,
  } = useVideoControl(videoRef);

  if (sliderPosition !== 1) {
    if (isPlaying) {
      action = <IconButton color="white" icon="pause" onPress={handlePause} />;
    } else {
      action = <IconButton color="white" icon="play" onPress={handlePlay} />;
    }
  } else {
    action = <IconButton color="white" icon="replay" onPress={handleReplay} />;
  }

  return (
    <View style={styles.wrapper}>
      {params.file.type === 'video' ? (
        <Video
          source={{ uri: params.file.uri }}
          shouldPlay
          resizeMode="cover"
          style={styles.background}
          ref={videoRef}
          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
        />
      ) : (
        <Image source={{ uri: params.file.uri }} resizeMode="cover" style={styles.background} />
      )}
      <Appbar.Header style={styles.header}>
        <Appbar.BackAction icon="menu" color="white" onPress={() => navigation.pop()} />
        <Appbar.Content title="" />
        {params.file.type === 'video' && <Appbar.Action icon="tune" color="white" onPress={handleVisible} />}
      </Appbar.Header>

      <SafeAreaView style={styles.wrapper}>
        <View style={styles.footer}>
          {params.action && params.icon && (
            <IconButton
              icon={params.icon}
              color="blue"
              size={40}
              style={styles.centralButton}
              onPress={() => params.action(params.file)}
            />
          )}
          {controlVisible ? (
            <View style={styles.videoControl}>
              {action}
              <Slider style={styles.slider} value={getSliderPosition()} onSlidingComplete={setPositionMillis} />
            </View>
          ) : null}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default GalleryScreen;
