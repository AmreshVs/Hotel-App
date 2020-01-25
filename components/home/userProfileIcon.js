import React from 'react';
import {Icon} from '@ui-kitten/components';
import {View} from 'react-native';
import styles from './styles';

const UserProfileIcon = () => {
  return (
    <View style={styles.profileIcon}>
      <View style={styles.userIcon}>
        <Icon name="person-outline" width={32} height={32} fill="#30ACFF" />
      </View>
    </View>
  );
};

export default UserProfileIcon;
