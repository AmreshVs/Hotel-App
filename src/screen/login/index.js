import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Platform, KeyboardAvoidingView, Animated } from 'react-native';
import TimedSlideshow from 'react-native-timed-slideshow';
import { Icon, Input, Button } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';
import OneSignal from 'react-native-onesignal';

import styles from './styles';
import UserLoginAuth from '../../redux/thunkActions/userLoginAuth';
import { userLogin } from '../../redux/actions/commonActions';
import snackbarMessage from '../../redux/thunkActions/snackbarMessage';

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
      uri: "https://captainsolo.website/wp-content/uploads/2019/10/sr-jungle-resort-1.jpg",
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
          navigation.navigate('Home');
        }
      } catch (error) {

      }
    }
    OneSignal.addEventListener('ids', onIds);
    retrieveData();
  }, [])

  // return one signal user id
  const onIds = (data) => setUserId(data.userId);

  const slideComp = () => {
    sendOtp();
    Animated.spring(slideAnim, {
      toValue: -500,
      useNativeDriver: true
    }).start();
    Animated.spring(slideAnimOtp, {
      toValue: 0,
      useNativeDriver: true
    }).start();
    setVisible(true);
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
    snackbarMessage(userData.message)
  }

  const loginWithOtp = async () => {
    const userData = await UserLoginAuth({ mobile_number: value, otp: otpValue, oneSignalUserId: userId });
    props.userLogin(userData.data);
    const token = userData.data.access_token;
    snackbarMessage(userData.message)
    if (token !== undefined && token !== '') {
      storeAsyncData(JSON.stringify(userData.data));
      navigation.navigate('Home');
    }
  }

  return (
    <View style={styles.statusBarTop} behavior="padding" enabled>
      <TimedSlideshow
        items={items}
        progressBarColor='#3366FF'
        progressBarDirection='fromLeft'
        renderIcon={() => null}
        renderCloseIcon={() => null}
      />
      <Animated.View
        style={[styles.inputContainer, {
          visibility: visible === true ? '' : 'hidden',
          transform: [{
            translateX: slideAnim
          }]
        }]}
      >
        <KeyboardAvoidingView behavior="padding" enabled>
          <Input
            value={value}
            keyboardType={Platform.OS === 'android' ? "numeric" : "number-pad"}
            style={styles.input}
            placeholder='Enter mobile number'
            icon={renderIcon}
            onChangeText={setValue}
          />
          <Button style={styles.btnInput} appearance='filled' onPress={slideComp}>Get OTP</Button>
        </KeyboardAvoidingView>
      </Animated.View>
      <Animated.View
        style={[styles.inputContainer, {
          transform: [
            {
              translateX: slideAnimOtp
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