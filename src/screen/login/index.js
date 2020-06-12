import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Platform, KeyboardAvoidingView, Animated, BackHandler } from 'react-native';
import TimedSlideshow from 'react-native-timed-slideshow';
import { Icon, Input, Button } from '@ui-kitten/components';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';
import OneSignal from 'react-native-onesignal';
import  * as Animatable from 'react-native-animatable';
import axios from 'axios';

import styles from './styles';
import UserLoginAuth from '../../redux/thunkActions/userLoginAuth';
import { userLogin } from '../../redux/actions/commonActions';
import snackbarMessage from '../../redux/thunkActions/snackbarMessage';

var onesignal = '';
const LoginScreen = (props) => {

  const navigation = useNavigation();
  const items = [
    {
      uri: "https://r-cf.bstatic.com/images/hotel/max1024x768/779/77938171.jpg",
    },
    {
      uri: "https://q-cf.bstatic.com/images/hotel/max1024x768/205/205138280.jpg",
    },
    {
      uri: "https://www.bedbreakfast.ee/wp-content/uploads/2016/10/hotel-room.jpg",
    }
  ];

  const [value, setValue] = React.useState('');
  const [otpValue, setOtpValue] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [visible, setVisible] = React.useState(false);
  const [slideAnim] = React.useState(new Animated.Value(0));
  const [slideAnimOtp] = React.useState(new Animated.Value(500));

  React.useEffect(() => {
    const retrieveData = async () => {
      try {
        const userData = await AsyncStorage.getItem('@Darpad:userData');
        if (userData !== null) {
          props.userLogin(JSON.parse(userData));
          navigation.replace('Home');
        }
      } catch (error) {

      }
    }
    OneSignal.addEventListener('ids', onIds);
    retrieveData();

    return () => {
      OneSignal.removeEventListener('ids');
    }
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  // return one signal user id
  const onIds = (data) => {
    onesignal = data.userId;
    setUserId(data.userId);
  }

  const slideComp = () => {
    if (validateData()) {
      sendOtp();
      Animated.spring(slideAnim, {
        toValue: 200,
        useNativeDriver: true
      }).start();
      Animated.spring(slideAnimOtp, {
        toValue: 0,
        useNativeDriver: true
      }).start();
      setVisible(true);
    }
  }

  const slideBack = () => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true
    }).start();
    Animated.spring(slideAnimOtp, {
      toValue: 500,
      useNativeDriver: true
    }).start();
    setVisible(false);
  }

  const renderIcon = (style) => (
    <Icon {...style} name='phone-call-outline' />
  );

  const renderMsgIcon = (style) => (
    <Icon {...style} name='message-square-outline' />
  );

  const storeAsyncData = async (userData) => {
    await AsyncStorage.setItem('@Darpad:userData', userData);
  };

  const sendOtp = async () => {
    const userData = await UserLoginAuth({ mobile_number: value });
    snackbarMessage(userData.message);
  }

  const validateData = () => {
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

    if (value.length <= 0) {
      snackbarMessage('Enter a mobile number');
      return false;
    }
    else if(value.length > 0 && !value.match(phoneno)){
      snackbarMessage('Enter a valid phone number');
      return false;
    }
    else{
      return true;
    }
  }

  const loginWithOtp = async () => {

    if(otpValue.length <= 0){
      snackbarMessage('Enter OTP');
    }
    else{
      const userData = await UserLoginAuth({ mobile_number: value, otp: otpValue, oneSignalUserId: onesignal || userId });
      if(userData.message.otp){
        snackbarMessage(userData.message.otp);
      }
      else{
        await props.userLogin(userData.data);
        const token = userData.data.access_token;
        axios.defaults.headers.common['Authorization'] = token;
        if (token !== undefined && token !== '') {
          await storeAsyncData(JSON.stringify(userData.data));
          navigation.replace('Home');
        }
      }
    }

  }

  return (
    <View style={styles.statusBarTop} behavior="padding" enabled>
      <TimedSlideshow
        items={items}
        footerStyle={{ backgroundColor: 'transparent' }}
        showProgressBar={false}
        renderIcon={() => null}
        renderCloseIcon={() => null}
      />
      <Animated.View
        style={[styles.inputContainer, {
          visibility: visible === true ? '' : 'hidden',
          transform: [{
            translateY: slideAnim
          }]
        }]}
      >
        <KeyboardAvoidingView behavior="padding" enabled>
          <Animatable.View animation="bounceInLeft" direction="normal" duration={800} useNativeDriver={true}>
            <View style={styles.mobileNumber}>
              <Input
                value={'+91'}
                style={styles.countryCode}
                disabled={true}
              />
              <Input
                value={value}
                keyboardType={Platform.OS === 'android' ? "numeric" : "number-pad"}
                style={styles.phone}
                placeholder='Enter mobile number'
                icon={renderIcon}
                onChangeText={setValue}
              />
            </View>
            <Button style={styles.btnInput} appearance='filled' onPress={slideComp}>Get OTP</Button>
          </Animatable.View>
        </KeyboardAvoidingView>
      </Animated.View>
      <Animated.View
        style={[styles.inputContainer, {
          transform: [
            {
              translateY: slideAnimOtp
            }
          ]
        }]}
      >
        <KeyboardAvoidingView style={styles.inputOtpContainer} behavior="padding" enabled>
          <Input
            value={otpValue}
            keyboardType={Platform.OS === 'android' ? "numeric" : "number-pad"}
            style={styles.input}
            placeholder='Enter OTP'
            icon={renderMsgIcon}
            onChangeText={setOtpValue}
          />
          <View style={styles.btnContainer}>
            <Button style={styles.backInput} appearance='filled' status='info' onPress={slideBack}>Back</Button>
            <Button style={styles.backInput} appearance='filled' onPress={loginWithOtp}>Submit</Button>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ userLogin: userLogin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);