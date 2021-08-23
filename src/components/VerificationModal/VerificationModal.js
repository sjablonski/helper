import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Modal, View } from 'react-native';
import { Appbar, Button, Paragraph, Portal } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import Alert from 'components/Alert';
import CodeInput from 'components/CodeInput';
import KeyboardAvoidView from 'components/KeyboardAvoidView';
import Spacer from 'components/Spacer';
import Wrapper from 'components/Wrapper';
import styles from './VerificationModal.styles';

const VerificationModal = forwardRef(({ pending, onSubmit }, ref) => {
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(null);
  const initValues = {
    verifCode: '',
  };

  useImperativeHandle(ref, () => ({
    close() {
      setVisible(false);
    },
    open() {
      setVisible(true);
    },
    addError(err) {
      setError(err);
    },
  }));

  const toggleModal = () => {
    setVisible(!visible);
  };

  return (
    <Portal>
      <Modal animationType="slide" visible={visible} onRequestClose={toggleModal}>
        <Wrapper>
          <Appbar.Header>
            <Appbar.BackAction onPress={() => setVisible(false)} />
            <Appbar.Content titleStyle={{ textAlign: 'center' }} title="Weryfikacja" />
            <Appbar.Action />
          </Appbar.Header>
          <Formik initialValues={initValues} onSubmit={({ verifCode }) => onSubmit(verifCode)}>
            {formikProps => (
              <KeyboardAvoidView>
                <View style={styles.container}>
                  <Spacer>{error ? <Alert type="error" message={error.toString()} /> : null}</Spacer>
                  <View style={styles.iconWrapper}>
                    <MaterialCommunityIcons name="shield-lock-outline" style={styles.icon} size={128} />
                  </View>
                  <Spacer>
                    <Paragraph style={styles.description}>
                      Wpisz kod weryfikacyjny, który został wysłany na Twój numer telefonu:
                    </Paragraph>
                  </Spacer>
                  <Spacer>
                    <CodeInput formikProps={formikProps} formikKey="verifCode" length={6} />
                  </Spacer>
                  <Button loading={pending} mode="contained" onPress={formikProps.handleSubmit}>
                    Zatwierdź
                  </Button>
                </View>
              </KeyboardAvoidView>
            )}
          </Formik>
        </Wrapper>
      </Modal>
    </Portal>
  );
});

export default VerificationModal;
