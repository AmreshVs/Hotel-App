import React from 'react';
import { View } from 'react-native';
import { Icon, TopNavigation, TopNavigationAction, StyleService, useStyleSheet } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';
import { RFPercentage } from "react-native-responsive-fontsize";

const TopNavSimple = (props) => {

  const navigation = useNavigation();
  const styles = useStyleSheet(style);
  const BackIcon = () => <Icon name='arrow-ios-back-outline' fill='#FFF' />;

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <Ripple onPress={props.backHandler !== undefined ? props.backHandler : navigateBack}>
      <TopNavigationAction icon={BackIcon} />
    </Ripple>
  );

  return (
    <View style={styles.root}>
      <TopNavigation title={props.screenTitle} titleStyle={styles.title} alignment='center' leftControl={props.backHandler !== undefined ? BackAction() : null} rightControls={props.rightControl === true ? props.rightControlFun() : null} style={styles.header} />
    </View>
  )
}

export default TopNavSimple;

const style = StyleService.create({
  root:{
    backgroundColor: 'topBar-color-3',
    height: 55
  },
  header: {
    backgroundColor: 'transparent',
  },
  title: {
    width: '60%',
    height: 30,
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    color: '#FFF',
  },
  topbar: {
    color1: 'topBar-color-1',
    color2: 'topBar-color-2',
    color3: 'topBar-color-3'
  }
})