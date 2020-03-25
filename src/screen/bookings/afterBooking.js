import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import TopNavSimple from '../../components/navigation/topNavSimple';
import { withNavigation } from 'react-navigation';
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
  const [data, setData] = React.useState([]);

  const bookingData = {
    hotelId: props.hotelDetail.hotelIds.hotelId,
    roomId: props.hotelDetail.hotelIds.roomId,
    payment_type: props.navigation.state.params.payment_type,
    transaction_id: (props.navigation.state.params.data !== '' && props.navigation.state.params.data !== undefined ? JSON.parse(props.navigation.state.params.data).data.transaction_id : ''),
    dates: props.hotelDetail.dates,
    rooms: props.hotelDetail.rooms,
    service: props.hotelDetail.services,
    coupons: props.hotelDetail.coupons.code !== undefined ? props.hotelDetail.coupons.code : '',
    user: {
      firstname: props.common.userData.firstname,
      lastname: props.common.userData.lastname,
      email: props.common.userData.email,
      address: props.common.userData.address,
      city: props.common.userData.city,
      mobile: props.common.userData.mobile,
    }
  };

  useEffect(() => {
    async function loadDatas() {
      const response = await BookHotel(bookingData, props.common.userData.access_token);
      setData(response[0]);
      const heading = props.common.userData.firstname + " " + props.common.userData.lastname + " has booked " + Object.keys(props.hotelDetail.rooms).length + " room's on " + response[0].title;
      const content = "Booking ID : "+ response[0].booking_id + ", Check In : " + response[0].start_date + ", Check Out : " + response[0].end_date + ", Adult's : " + response[0].adults + ", Children's : " + response[0].children + ", Total : " + response[0].total;
      const saveNotify = await SaveNotification({ user_id: props.common.userData.user_id, booking_id: response[0].booking_id, type: 'booking', heading: heading, content: content }, props.common.userData.access_token);
      const buttons = [{"id": "notify-cancel", "text": "Cancel"}, {"id": "notify-approve", "text": "Approve"}]
      const notifyData = { action: 'approve', notification_id: saveNotify.data.id, booking_id: saveNotify.data.booking_id, oneSignalUserId: props.common.userData.oneSignalUserId, user_id: props.common.userData.user_id };
      SendNotification(heading, content, buttons, notifyData);
    }
    loadDatas();
  }, []);

  const reloadData = async () => {
    setData([]);
    const response = await BookHotel(bookingData, props.common.userData.access_token);
    setData(response[0]);
  }

  return (
    <View style={styles.bodyContainer}>
      <TopNavSimple screenTitle='Booking Details' backHandler={() => props.navigation.navigate('BookingsScreen')} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          {data.length <= 0 ? <ConfirmBlockSK /> : <ConfirmBlock booking_id={data.booking_id} total={data.total} status={data.status} status_label={data.status_label} transaction_id={data.transaction_id} />}
          {data.length <= 0 ? <BookedDetailsSK /> : <BookedHotelDetails data={data} token={props.common.userData.access_token} user_id={props.common.userData.user_id} reloadData={reloadData} />}
          {data.length <= 0 ? <HelpBlockSK /> : <HelpBlock />}
        </View>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(withNavigation(AfterBooking));

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