import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Button } from 'react-native-paper';
import { BlurView } from 'expo-blur';
import Input from 'components/Input';
import styles from './Modal.styles';

const CustomModal = forwardRef(({ children, formikProps, formikKey, label }, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    close() {
      setVisible(false);
    },
  }));

  const toggleModal = () => {
    setVisible(!visible);
  };

  return (
    <View>
      <Modal animationType="slide" transparent visible={visible} onRequestClose={toggleModal}>
        <BlurView tint="light" intensity={80} style={styles.notBlurred}>
          <SafeAreaView style={styles.wrapper}>
            <View style={styles.content} testID="content">
              {children}
            </View>
            <View style={styles.buttonContent}>
              <Button mode="outlined" onPress={toggleModal} testID="button">
                Powrót
              </Button>
            </View>
          </SafeAreaView>
        </BlurView>
      </Modal>
      <TouchableOpacity onPress={toggleModal}>
        <Input editable={false} formikKey={formikKey} formikProps={formikProps} label={label} pointerEvents="none" />
      </TouchableOpacity>
    </View>
  );
});

export default CustomModal;
