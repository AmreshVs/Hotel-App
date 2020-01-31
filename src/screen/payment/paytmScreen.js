import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import BookHotel from '../../redux/thunkActions/bookHotel';

const PaytmScreen = (props) => {

    const [url, setUrl] = React.useState('');
    const [webUrl, setWebUrl] = React.useState('');

    const bookingData = {
        hotelId: props.hotelDetail.hotelIds.hotelId, 
        roomId: props.hotelDetail.hotelIds.roomId,
        payment_type: props.navigation.state.params.payment_type,
        dates: props.hotelDetail.dates,
        rooms: props.hotelDetail.rooms,
        service: props.hotelDetail.services,
        coupons: props.hotelDetail.prices_services.data.data.coupons[0].code,
        user: {
            firstname: props.common.userData.firstname,
            mobile: props.common.userData.mobile,
        }
    };

    useEffect(() => {
      async function loadDatas(){
        const response = await BookHotel(bookingData, props.common.userData.access_token);
        setUrl(response.url);
      }
      loadDatas();
    }, []);

    const jsCode = "window.ReactNativeWebView.postMessage(document.querySelectorAll('body')[0].innerText)";
    return(
        <WebView
            source={{uri: url}}
            onNavigationStateChange={navState => {
                setWebUrl(navState.url);
            }}
            onMessage={event => {
                if(webUrl === 'https://pandaapi.amreshrepos.ml/api/payment/status'){
                    props.navigation.navigate('AfterBooking', {payment_type: 2, data: event.nativeEvent.data});
                }
            }}
            injectedJavaScript={jsCode}
        />
    )
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(PaytmScreen);