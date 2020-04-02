import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, StatusBar } from 'react-native';
import SnackBar from 'react-native-snackbar-component';
import { NavigationContainer } from '@react-navigation/native';

import { navigationRef, isMountedRef } from '../navigation/rootNavigation';
import TabNavigator from '../navigation/index';


const Main = (props) => {

  // Handling Reference Mount
  React.useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);

  return (
    <View style={styles.mainView}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <View style={styles.statusBar} />
        <TabNavigator/>
        <SnackBar style={styles.snack} visible={props.visible} textMessage={props.message} backgroundColor={props.backgroundColor} actionText="Ok" />
      </NavigationContainer>
    </View>
  )
}

const mapStateToProps = (state) => {
  return state.common.snackbar;
}

export default connect(mapStateToProps)(Main);

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFF'
  },
  statusBar: {
    backgroundColor: '#1939B7',
    height: StatusBar.currentHeight,
  },
  snack: {
    overflow: 'hidden',
    borderRadius: 5,
    margin: 10,
  }
});