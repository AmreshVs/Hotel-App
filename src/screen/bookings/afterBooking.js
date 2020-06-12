import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, BackHandler } from 'react-native';
import TopNavSimple from '../../components/navigation/topNavSimple';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { connect } from 'react-redux';

import ConfirmBlock from '../../components/bookingDetails/confirmBlock';
import HelpBlock from '../../components/bookingDetails/helpBlock';
import BookedHotelDetails from '../../components/bookingDetails/BookedHotelDetails';

import ConfirmBlockSK from '../../components/skeletons/bookingDetails/confirmBlockSK';
import HelpBlockSK from '../../components/skeletons/bookingDetails/helpBlockSK';
import BookedDetailsSK from '../../components/skeletons/bookingDetails/bookedDetailsSK';
import BookHotel from '../../redux/thunkActions/bookHotel';
import SendNotification from '../../commonFunctions/sendNotification';
import SaveNotification from '../../commonFunctions/saveNotification';

const AfterBooking = (props) => {

  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  const hotelDetail = props.hotelDetail;
  const userData = props.common.userData;

  const bookingData = {
    hotelId: hotelDetail.hotelIds.hotelId,
    roomId: hotelDetail.hotelIds.roomId,
    payment_type: props.route.params.payment_type,
    transaction_id: (props.route.params.data !== '' && props.route.params.data !== undefined ? JSON.parse(props.route.params.data).data.transaction_id : ''),
    dates: hotelDetail.dates,
    rooms: hotelDetail.rooms,
    service: hotelDetail.services,
    coupons: hotelDetail.coupons.code !== undefined ? hotelDetail.coupons.code : '',
    foods: hotelDetail.foods,
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
      setData(response[0]);
      const heading = userData.firstname + " " + userData.lastname + " has booked " + Object.keys(props.hotelDetail.rooms).length + " room's on " + response[0].title;
      const content = "Booking ID : " + response[0].booking_id + ", Check In : " + response[0].start_date + ", Check Out : " + response[0].end_date + ", Adult's : " + response[0].adults + ", Children's : " + response[0].children + ", Total : " + response[0].total;
      const saveNotify = await SaveNotification({ user_id: userData.user_id, booking_id: response[0].booking_id, type: 'booking', heading: heading, content: content, notify_to: 'admin' }, userData.access_token);
      const buttons = [{ "id": "notify-cancel", "text": "Cancel" }, { "id": "notify-approve", "text": "Approve" }]
      const notifyData = { action: 'approve', notification_id: saveNotify.data.id, booking_id: saveNotify.data.booking_id, oneSignalUserId: userData.oneSignalUserId, user_id: userData.user_id };
      SendNotification(heading, content, userData.access_token, buttons, notifyData);
    }
    loadDatas();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.push('BookingsScreen');
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  const reloadData = async () => {
    setData([]);
    const response = await BookHotel(bookingData, userData.access_token);
    setData(response[0]);
  }

  return (
    <View style={styles.bodyContainer}>
      <TopNavSimple screenTitle='Booking Details' backHandler={() => navigation.navigate('BookingsScreen')} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {data.length <= 0 ? <ConfirmBlockSK /> : <ConfirmBlock booking_id={data.booking_id} total={data.total} status={data.status} status_label={data.status_label} transaction_id={data.transaction_id} />}
          {data.length <= 0 ? <BookedDetailsSK /> : <BookedHotelDetails data={data} token={userData.access_token} user_id={userData.user_id} reloadData={reloadData} />}
          {data.length <= 0 ? <HelpBlockSK /> : <HelpBlock />}
        </View>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(AfterBooking);

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: '#FAFAFA',
    height: '100%',
  },
  container: {
    alignItems: 'center',
  },
  contentContainer: {
    width: '96%',
  }
});