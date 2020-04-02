import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon, TopNavigation, TopNavigationAction } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';

const HotelsDetailNav = (props) => {

  const navigation = useNavigation();
  const BackIcon = () => <Icon name='arrow-ios-back-outline' fill='#FFF' />;

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <Ripple onPress={navigateBack}>
      <TopNavigationAction icon={BackIcon} />
    </Ripple>
  );

  return (
    <TopNavigation title={props.screenTitle} titleStyle={styles.title} alignment='center' leftControl={BackAction()} style={styles.header} />
  )
}

export default HotelsDetailNav;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
  },
  title: {
    width: '60%',
    height: 30,
    fontSize: 16,
    fontWeight: 'bold',
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    color: '#FFF',
  },
})