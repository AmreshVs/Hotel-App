import React from 'react';
import {View, Image} from 'react-native';
import {Text} from '@ui-kitten/components';
import styles from './styles';

const Head = () => (
  <View style={styles.headBack}>
    <Image style={styles.headImg} source={{uri: 'https://r-cf.bstatic.com/images/hotel/max1024x768/779/77938171.jpg'}} />
    <View style={styles.headImgOverlay} />
    <Text category="h5" style={styles.headingCaption}>
      Let's Book your favourite Hotel Room now!
    </Text>
  </View>
);

export default Head;
