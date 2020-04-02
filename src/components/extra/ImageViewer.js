import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import ImageView from 'react-native-image-view';

const ImageViewer = (props) => {
  const [index, setIndex] = React.useState(1);
  return (
    <SafeAreaView style={styles.background}>
      <ImageView
        glideAlways
        images={props.images}
        imageIndex={0}
        isVisible={props.show}
        controls={{ next: true, prev: true }}
        onImageChange={index => {
          setIndex(index + 1);
        }}
        isSwipeCloseEnabled={false}
        renderFooter={() => (<View><Text style={{ textAlign: 'center', color: '#FFF' }}>{index} / {props.images.length}</Text></View>)}
        onClose={props.onClose}
      />
    </SafeAreaView>
  );
};

export default ImageViewer;

const styles = StyleSheet.create({
  background: {
    // backgroundColor: '#FAFAFA', 
    // height: '100%',
  },
});