import React from 'react';
import {View, StyleSheet, AsyncStorage} from 'react-native';
import {Button, Card, Icon, Text, Input} from '@ui-kitten/components';
import TopNavSimple from '../../components/navigation/topNavSimple';
import {
  withNavigation,
  StackActions,
  NavigationActions,
} from 'react-navigation';

const UserProfileScreen = props => {
  const RenderTextContent = () => {
    return (
      <View>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Icon name="person-outline" style={styles.icons} fill="#BBB" />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.inputText}>Amresh V S</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Icon name="email-outline" style={styles.icons} fill="#BBB" />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.inputText}>amreshcse007@gmail.com</Text>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Icon name="phone-outline" style={styles.icons} fill="#BBB" />
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.inputText}>+91 8675529268</Text>
          </View>
        </View>
      </View>
    );
  };

  const RenderTextInput = () => {
    const [value, setValue] = React.useState('');

    return (
      <View>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Icon name="person-outline" style={styles.icons} fill="#BBB" />
          </View>
          <View style={styles.nameContainer}>
            <Input
              placeholder="Full Name"
              value={value}
              onChangeText={setValue}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Icon name="email-outline" style={styles.icons} fill="#BBB" />
          </View>
          <View style={styles.nameContainer}>
            <Input placeholder="Email" value={value} onChangeText={setValue} />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.iconContainer}>
            <Icon name="phone-outline" style={styles.icons} fill="#BBB" />
          </View>
          <View style={styles.nameContainer}>
            <Input
              placeholder="Phone Number"
              value={value}
              onChangeText={setValue}
            />
          </View>
        </View>
      </View>
    );
  };

  const [edit, setEdit] = React.useState(false);

  const handleClick = () => {
    setEdit(!edit);
  };

  const logout = async () => {
    try {
      const userData = await AsyncStorage.removeItem('@Darpad:userData');
      if (userData === null) {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'LoginScreen'})],
        });
        props.navigation.dispatch(resetAction);
      }
    } catch (error) {}
  };

  return (
    <View>
      <TopNavSimple
        screenTitle="User Profile"
        backHandler={() => props.navigation.goBack()}
      />
      <View style={styles.bodyContainer}>
        <Card style={styles.cardContainer}>
          {edit === false ? <RenderTextContent /> : <RenderTextInput />}
          <View style={styles.btnContainer}>
            <Button
              style={styles.logoutButton}
              appearance="outline"
              onPress={handleClick}>
              {edit === false ? 'Edit' : 'Save'}
            </Button>
            <Button
              style={styles.logoutButton}
              status="danger"
              appearance="outline"
              onPress={logout}>
              Logout
            </Button>
          </View>
        </Card>
      </View>
    </View>
  );
};

export default withNavigation(UserProfileScreen);

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: '#FAFAFA',
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
    color: '#626262',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
