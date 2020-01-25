import React from 'react';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';
// import { LinearGradient } from 'expo-linear-gradient';
import UserProfileIcon from './userProfileIcon';
import styles from './styles';

const Head = () => (
  // <LinearGradient
  //     colors={['#006cdb', '#4fcfff', '#0090fa']}
  //     startPoint={10}
  //     endPoint={50}
  //     locations={[0, 56, 100]}
  //     style={styles.headBlock}
  // >
  <View>
    <UserProfileIcon />
    <Text category="h4" style={styles.headingCaption}>
      Let's Book your favourite Hotel Room now!
    </Text>
  </View>
);

export default Head;
