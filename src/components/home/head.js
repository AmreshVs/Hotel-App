import React from 'react';
import {View, Image} from 'react-native';
import {Text, StyleService, useStyleSheet} from '@ui-kitten/components';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Head = () => {
  const styles = useStyleSheet(style);

  return(
    <View style={styles.headBack}>
      <Image style={styles.headImg} source={{uri: 'https://r-cf.bstatic.com/images/hotel/max1024x768/779/77938171.jpg'}} />
      <View style={styles.headImgOverlay} />
      <Text category="h5" style={styles.headingCaption}>
        Let's Book your favourite Hotel Room now!
      </Text>
    </View>
  );
}

export default Head;

const style = StyleService.create({
  headingCaption:{
    position: 'absolute',
    color: 'color-basic-100',
    padding: 15,
    textAlign: 'center',
    fontSize: hp('3%')
  },
  headBack:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  headImg:{
    height: 350,
    width: '100%',
  },
  headImgOverlay:{
    position: 'absolute',
    opacity: 0.5,
    height: 350,
    width: '100%',
    backgroundColor: 'color-primary-500',
  },
});