import React from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from './Gallery.styles';

const Gallery = ({ navigation, files, icon, action }) => {
  return (
    <View>
      {files ? (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.uri}
          data={files}
          testID="flatList"
          renderItem={({ item }) => (
            <TouchableOpacity
              testID="item"
              onPress={() =>
                navigation.navigate({
                  routeName: 'Gallery',
                  params: {
                    file: item,
                    icon,
                    action,
                  },
                })
              }
            >
              <Image source={{ uri: item.uri }} style={styles.image} />
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>Brak zdjęć</Text>
      )}
    </View>
  );
};

export default withNavigation(Gallery);
