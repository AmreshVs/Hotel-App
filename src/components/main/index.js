import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, StatusBar } from 'react-native';
import SnackBar from 'react-native-snackbar-component';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigator from '../navigation/index';
import NavigationService from '../navigation/navigationService';

const Main = (props) => {
  return (
    <View style={styles.mainView}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <View style={styles.statusBar} />
        <TabNavigator
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
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