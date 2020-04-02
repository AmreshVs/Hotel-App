import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

import { PAYTM_API_URL } from '../../constants/index';
import BookHotel from '../../redux/thunkActions/bookHotel';

const PaytmScreen = (props) => {

  const navigation = useNavigation();
  const [url, setUrl] = React.useState('');
  const [webUrl, setWebUrl] = React.useState('');

  const hotelDetail = props.hotelDetail;
  const userData = props.common.userData;

  const bookingData = {
    hotelId: hotelDetail.hotelIds.hotelId,
    roomId: hotelDetail.hotelIds.roomId,
    payment_type: props.route.params.payment_type,
    dates: hotelDetail.dates,
    rooms: hotelDetail.rooms,
    service: hotelDetail.services,
    coupons: hotelDetail.prices_services.data.data.coupons[0].code,
    user: {
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      address: userData.address,
      city: userData.city,
      mobile: userData.mobile,
    }
  };

  useEffect(() => {
    async function loadDatas() {
      const response = await BookHotel(bookingData, userData.access_token);
      setUrl(response.url);
    }
    loadDatas();
  }, []);

  const jsCode = "window.ReactNativeWebView.postMessage(document.querySelectorAll('body')[0].innerText)";
  return (
    <WebView
      source={{ uri: url }}
      onNavigationStateChange={navState => {
        setWebUrl(navState.url);
      }}
      onMessage={event => {
        if (webUrl === PAYTM_API_URL) {
          navigation.navigate('AfterBooking', { payment_type: 2, data: event.nativeEvent.data });
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