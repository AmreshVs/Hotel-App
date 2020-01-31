import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Platform, KeyboardAvoidingView, Animated } from 'react-native';
import TimedSlideshow from 'react-native-timed-slideshow';
import styles from './styles';
import { Icon, Input, Button } from '@ui-kitten/components';
import { withNavigation } from 'react-navigation';
import UserLoginAuth from '../../redux/thunkActions/userLoginAuth';
import { userLogin } from '../../redux/actions/commonActions';
import {AsyncStorage} from 'react-native';
import snackbarMessage from '../../redux/thunkActions/snackbarMessage';

const LoginScreen = (props) => {

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

    const [value, setValue] = React.useState('8675529268');
    const [otpValue, setOtpValue] = React.useState('');
    const [visible, setVisible] = React.useState(false);
    const [slideAnim] = React.useState(new Animated.Value(0));
    const [slideAnimOtp] = React.useState(new Animated.Value(500));

    React.useEffect(() => {
        const retrieveData = async () => {
            try {
                const userData = await AsyncStorage.getItem('@Darpad:userData');
                if (userData !== null) {
                    props.userLogin(JSON.parse(userData));
                    props.navigation.navigate('Home');
                }
            } catch (error) {
                
            }
        }
        retrieveData();
    }, [])

    const slideComp = () => {
        sendOtp();
        Animated.spring(slideAnim, {
            toValue: -500,
        }).start();
        Animated.spring(slideAnimOtp, {
            toValue: 0,
        }).start();
        setVisible(true);
    }

    const slideBack = () => {
        Animated.spring(slideAnim, {
            toValue: 0,
        }).start();
        Animated.spring(slideAnimOtp, {
            toValue: 500,
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
        const userData = await UserLoginAuth({mobile_number: value});
        snackbarMessage(userData.message)
    }

    const loginWithOtp = async () => {
        const userData = await UserLoginAuth({mobile_number: value, otp: otpValue});
        props.userLogin(userData.data);
        const token = userData.data.access_token;
        snackbarMessage(userData.message)
        if(token !== undefined && token !== ''){
            storeAsyncData(JSON.stringify(userData.data));
            props.navigation.navigate('Home');
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
                style={[styles.inputContainer,{
                    visibility: visible === true ? '' : 'hidden',
                    transform: [{
                        translateX: slideAnim
                    }]
                }]}
            >
                <KeyboardAvoidingView  behavior="padding" enabled>
                    <Input
                        value={value}
                        keyboardType={Platform.OS === 'android' ? "numeric" : "number-pad"}
                        style={styles.input}
                        size='small'
                        placeholder='Enter mobile number'
                        icon={renderIcon}
                        onChangeText={setValue}
                    />
                    <Button style={styles.btnInput} appearance='filled' onPress={slideComp}>Get OTP</Button>
                </KeyboardAvoidingView>
            </Animated.View>
            <Animated.View
                style={[styles.inputContainer,{
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
                        size='small'
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
    return bindActionCreators({userLogin:userLogin}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LoginScreen));