import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Button, Card, Icon, Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

const ProfileView = (props) => {

  const navigation = useNavigation();
  const styles = useStyleSheet(style);
  
  const logout = async () => {
    const userData = await AsyncStorage.removeItem('@Darpad:userData');
    if (userData === null) {
      navigation.navigate('LoginScreen');
    }
  }

  const EditIcon = () => (
    <Icon style={styles.editIconStyle} fill={styles.editIconStyle.fill} animation={'zoom'} name='edit-outline' />
  );

  const LogoutIcon = () => (
    <Icon style={styles.logoutIconStyle} fill={styles.logoutIconStyle.fill} animation={'zoom'} name='log-out-outline' />
  );

  return (
    <View style={styles.bodyContainer}>
      <Card style={styles.cardContainer}>
        <View>
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Icon name='person-outline' style={styles.icons} fill={styles.iconColor.color} />
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.inputText}>{props.data.firstname} {props.data.lastname}</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Icon name='email-outline' style={styles.icons} fill={styles.iconColor.color} />
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.inputText}>{props.data.email}</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Icon name='phone-outline' style={styles.icons} fill={styles.iconColor.color} />
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.inputText}>+91 {props.data.mobile}</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Icon name='map-outline' style={styles.icons} fill={styles.iconColor.color} />
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.inputText}>{props.data.address}</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Icon name='pin-outline' style={styles.icons} fill={styles.iconColor.color} />
            </View>
            <View style={styles.nameContainer}>
              <Text style={styles.inputText}>{props.data.city}</Text>
            </View>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button style={styles.logoutButton} status='danger' size='small' appearance='outline' onPress={logout} icon={LogoutIcon}>Logout</Button>
          <Button style={styles.logoutButton} appearance='outline' size='small' onPress={props.handleClick} icon={EditIcon}>Edit</Button>
        </View>
      </Card>
    </View>
  );
}

export default ProfileView;

const style = StyleService.create({
  bodyContainer: {
    backgroundColor: 'background-basic-color-1',
    height: '100%',
    alignItems: 'center',
  },
  cardContainer: {
    width: '95%',
    marginTop: 10,
    borderRadius: 10,
  },
  logoutButton: {
    width: '45%',
  },
  icons: {
    width: 25,
    height: 25,
  },
  inputContainer: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  iconContainer: {
    width: '10%',
    justifyContent: 'center',
  },
  nameContainer: {
    justifyContent: 'center',
    width: '90%',
    paddingLeft: 10,
  },
  inputText: {
    fontSize: 16,
    color: 'color-basic-700',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconColor: {
    color: 'color-primary-500'
  },
  editIconStyle: {
    fill: 'color-primary-600',
    marginRight: 0
  },
  logoutIconStyle: {
    fill: 'color-danger-600',
    marginRight: 0
  },
});