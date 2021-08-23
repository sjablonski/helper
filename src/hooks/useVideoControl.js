import { useState } from 'react';

export default videoRef => {
  const [position, setPosition] = useState(null);
  const [duration, setDuration] = useState(null);
  const [sliderPosition, setSliderPosition] = useState(null);
  const [isPlaying, setIsPlaying] = useState(null);
  const [controlVisible, setControlVisible] = useState(false);

  const handlePlaybackStatusUpdate = status => {
    setPosition(status.positionMillis);
    setDuration(status.durationMillis);
    setSliderPosition(status.positionMillis / status.durationMillis);
    setIsPlaying(status.isPlaying);
  };

  const getSliderPosition = () => {
    if (position != null && duration != null) {
      return position / duration;
    }
    return 0;
  };

  const handlePlay = () => {
    videoRef.current.playAsync();
  };

  const handleReplay = () => {
    videoRef.current.replayAsync();
  };

  const handlePause = () => {
    videoRef.current.pauseAsync();
  };

  const handleVisible = () => {
    setControlVisible(prevState => !prevState);
  };

  const setPositionMillis = seekPosition => {
    const newPosition = Math.floor(seekPosition * duration);
    videoRef.current.setPositionAsync(newPosition);
  };

  return {
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
  };
};
