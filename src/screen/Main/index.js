import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import { userLogin } from '../../redux/actions/commonActions';
import { AsyncStorage, StyleSheet, View } from 'react-native';

const Main = (props) => {

  React.useEffect(() => {
    const retrieveData = async () => {
      try {
        const userData = await AsyncStorage.getItem('@Darpad:userData');
        if (userData !== null) {
          props.userLogin(JSON.parse(userData));
          props.navigation.navigate('Home');
        }
        else {
          props.navigation.navigate('LoginScreen');
        }
      } catch (error) {

      }
    }
    retrieveData();
  }, [])

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

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Main));

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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