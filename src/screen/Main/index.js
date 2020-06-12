import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AsyncStorage, StyleSheet, View } from 'react-native';

import { userLogin } from '../../redux/actions/commonActions';

const Main = (props) => {

  const navigation = useNavigation();

  React.useEffect(() => {
    retrieveData();
  }, [])

  const retrieveData = async () => {
    try {
      const userData = await AsyncStorage.getItem('@Darpad:userData');
      if (userData !== null) {
        props.userLogin(JSON.parse(userData));
        navigation.replace('Home');
      }
      else {
        navigation.replace('LoginScreen');
      }
    } catch (error) {

    }
  }

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={{ uri: 'http://srjungleresort.com/images/logo.png' }} />
      <Image style={styles.img} source={{ uri: 'https://yalantis.com/uploads/ckeditor/pictures/365/content_Loading-Loop-1.gif' }} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ userLogin: userLogin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF'
  },
  img: {
    width: 100,
    height: 100
  },
  logo: {
    width: 300,
    height: 100,
    resizeMode: 'contain',
  }
});