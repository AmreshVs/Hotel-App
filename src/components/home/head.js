import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Text, withStyles} from '@ui-kitten/components';

const Head = (props) => {

  const theme = props.theme;

  const styles = StyleSheet.create({
    headingCaption:{
      position: 'absolute',
      color: theme['color-basic-100'],
      padding: 15,
      textAlign: 'center'
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
      backgroundColor: theme['color-primary-500'],
    },
  });

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

export default withStyles(Head);
