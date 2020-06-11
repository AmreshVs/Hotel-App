import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { Spinner } from '@ui-kitten/components';

const Loader = ({ topBar, topBottom }) => {
  return(
    <View level={2} style={[styles.root, topBar === true ? { height: Dimensions.get('window').height - 55 } : topBottom === true ? { height: Dimensions.get('window').height - 100 } : {} ]}>
      <Spinner/>
    </View>
  )
}

export default Loader;

const styles = StyleSheet.create({
  root:{
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});