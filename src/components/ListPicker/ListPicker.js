import React, { useCallback, useRef, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Divider, Paragraph, Subheading } from 'react-native-paper';
import Modal from 'components/Modal';
import styles from './ListPicker.styles';

const Item = ({ label, value, selected, onSelect }) => {
  return (
    <TouchableOpacity testID="item" onPress={() => onSelect({ label, value })}>
      <Paragraph style={[styles.item, selected ? styles.selectedItem : null]}>{label}</Paragraph>
    </TouchableOpacity>
  );
};

const ListPicker = ({ formikProps, formikKey, data, label }) => {
  const { setFieldValue } = formikProps;
  const [selected, setSelected] = useState(null);
  const modalRef = useRef(null);

  const onSelect = useCallback(
    obj => {
      setSelected(obj);
      setFieldValue(formikKey, obj.value);
      modalRef.current.close();
    },
    [selected],
  );

  return (
    <Modal ref={modalRef} formikProps={formikProps} formikKey={formikKey} label={label}>
      <Subheading style={styles.header}>Wybierz rodzaj zgłoszenia</Subheading>
      <FlatList
        keyExtractor={item => item.value}
        data={data}
        ItemSeparatorComponent={() => <Divider />}
        testID="flatList"
        renderItem={({ item }) => (
          <Item
            label={item.label}
            selected={selected ? selected.value === item.value : null}
            onSelect={onSelect}
            value={item.value}
          />
        )}
        extraData={selected}
      />
    </Modal>
  );
};

export default ListPicker;
