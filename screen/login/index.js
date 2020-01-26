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
import SnackBar from 'react-native-snackbar-component';

const LoginScreen = (props) => {

    const items = [
        {
            uri: "http://pandadev.amreshrepos.ml/medias/room/medium/7/christopher-jolly-616571-unsplash.jpg",
        },
        {
            uri: "http://pandadev.amreshrepos.ml/medias/room/medium/10/armin-djuhic-609206-unsplash.jpg",
        },
        {
            uri: "http://pandadev.amreshrepos.ml/medias/room/medium/9/rhema-kallianpur-275251-unsplash.jpg",
        }
    ];

    const [value, setValue] = React.useState('8675529268');
    const [otpValue, setOtpValue] = React.useState('');
    const [visible, setVisible] = React.useState(false);
    const [slideAnim] = React.useState(new Animated.Value(0));
    const [slideAnimOtp] = React.useState(new Animated.Value(500));
    const [svisible, setSvisible] = React.useState(false);
    const [smessage, setSmessage] = React.useState('');

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
        setSvisible(true);
        setSmessage(userData.message)
        setTimeout(() => {
            setSvisible(false);
            setSmessage('');
        }, 1500);
    }

    const loginWithOtp = async () => {
        const userData = await UserLoginAuth({mobile_number: value, otp: otpValue});
        props.userLogin(userData.data);
        const token = userData.data.access_token;
        setSvisible(true);
        setSmessage(userData.message)
        setTimeout(() => {
            setSvisible(false);
            setSmessage('');
        }, 1500);
        if(token !== undefined && token !== ''){
            storeAsyncData(JSON.stringify(userData.data));
            props.navigation.navigate('Home');
        }
    }

    return (
        <KeyboardAvoidingView style={styles.statusBarTop} behavior="padding" enabled>
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
                    <SnackBar visible={svisible} textMessage={smessage} autoHidingTime={5000} actionText="Ok"/>
                </KeyboardAvoidingView>
            </Animated.View>
        </KeyboardAvoidingView>
    );
};

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({userLogin:userLogin}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(LoginScreen));