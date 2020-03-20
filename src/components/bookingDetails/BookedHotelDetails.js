import React from 'react';
import { View, Image, Alert } from 'react-native';
import { Card, Button, Text, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import CancelBooking from '../../redux/thunkActions/cancelBooking';
import snackbarMessage from '../../redux/thunkActions/snackbarMessage';
import SendNotification from '../../commonFunctions/sendNotification';
import SaveNotification from '../../commonFunctions/saveNotification';

const BookedHotelDetails = (props) => {
  const styles = useStyleSheet(style);
  const CloseIcon = () => (
    <Icon style={styles.btnIcons} name='close-circle-outline' fill='#FFF' />
  );

  const CallIcon = () => (
    <Icon style={styles.btnIcons} name='phone-call-outline' fill='#FFF' />
  );

  const cancelBook = () => {
    Alert.alert(
      'Are you sure to cancel this booking?',
      '',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            const response = await CancelBooking(props.data.booking_id, props.token);
            snackbarMessage(response.message);
            props.reloadData();
            const heading = "Booking cancelled!"
            const content = "#" + props.data.booking_id + " booking on " + props.data.title + " has been cancelled by " + props.data.customer_name;
            SendNotification(heading, content);
            SaveNotification({ user_id: props.user_id, booking_id: props.data.booking_id, type: 'cancel', heading: heading, content: content }, props.token);
          }
        },
      ],
      { cancelable: true },
    );
  }

  return (
    <Card style={styles.container}>
      <View style={styles.bookingContainer}>
        <View style={styles.confirmContainer}>
          <Text style={styles.confirmed}>{props.data.customer_name}</Text>
          <View style={styles.datesContainer}>
            <View style={styles.datesLeft}>
              <Text>Check In</Text>
              <Text style={styles.caption}>{props.data.start_date}</Text>
            </View>
            <Icon name='swap-outline' style={styles.personIcon} fill={styles.iconColor.color} />
            <View style={styles.datesRight}>
              <Text>Check Out</Text>
              <Text style={styles.caption}>{props.data.end_date}</Text>
            </View>
          </View>
        </View>
        <View style={styles.hrLine}></View>
        <View style={styles.contentContainer}>
          <View>
            <Image style={styles.image} source={{ uri: props.data.image[0].file }} />
          </View>
          <View style={styles.content}>
            <Text style={styles.hotelName}>{props.data.title}</Text>
            <Text style={styles.caption}>{props.data.address}</Text>
          </View>
        </View>
        <View style={styles.bookInfoContainer}>
          <View style={styles.bookInfo}>
            <Icon name='person-outline' style={styles.InfoIcon} fill={styles.iconColor.color} />
            <Text style={styles.infoCaption}>Adult's : {props.data.adults}</Text>
          </View>
          <View style={styles.bookInfo}>
            <Icon name='people-outline' style={styles.InfoIcon} fill={styles.iconColor.color} />
            <Text style={styles.infoCaption}>Children : {props.data.children}</Text>
          </View>
          <View style={styles.bookInfo}>
            <Icon name='npm-outline' style={styles.InfoIcon} fill={styles.iconColor.color} />
            <Text style={styles.infoCaption}>Room's : {props.data.rooms}</Text>
          </View>
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.heading}>Price & Extra Services</Text>
        {props.data.service.map((item) =>
          <View style={styles.serviceContainer} key={item.id}>
            <Text style={styles.serviceCaption}>{item.title}</Text>
            <Text style={styles.caption}>₹{item.price}</Text>
          </View>
        )}
        <View style={styles.serviceContainer}>
          <Text style={styles.serviceCaption}>Discount</Text>
          <Text style={styles.caption}>₹{props.data.discount}</Text>
        </View>
        <View style={styles.serviceContainer}>
          <Text style={styles.serviceCaption}>Total</Text>
          <Text style={styles.totalCaption}>₹{props.data.total}</Text>
        </View>
      </View>
      <View style={styles.hrLine}></View>
      <View style={styles.btnContainer}>
        <Button style={styles.btns} status='danger' size='small' icon={CloseIcon} disabled={props.data.status === '1' ? false : true} onPress={cancelBook}>Cancel Booking</Button>
        <Button style={styles.btns} status='primary' size='small' icon={CallIcon}>Call Hotel</Button>
      </View>
    </Card>
  )
}

export default BookedHotelDetails;

const style = StyleService.create({
  container: {
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
  },
  bookingContainer: {
    alignItems: 'center',
  },
  confirmContainer: {
    // flexDirection: 'row',
  },
  confirmed: {
    color: 'color-basic-700',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  personIcon: {
    width: 23,
    height: 23,
  },
  datesContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  datesLeft: {
    paddingRight: 15,
    alignItems: 'center',
  },
  datesRight: {
    paddingLeft: 15,
    alignItems: 'center',
  },
  caption: {
    color: 'color-basic-600'
  },
  hrLine: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'color-basic-300',
    marginTop: 30,
    marginBottom: 30,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 70,
    borderRadius: 7,
  },
  content: {
    width: '72%',
    paddingLeft: 10,
  },
  hotelName: {
    fontWeight: '700',
    color: 'color-basic-700',
  },
  info: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'color-basic-300',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  address: {
    color: 'color-basic-700',
  },
  bookInfoContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  InfoIcon: {
    width: 25,
    height: 25,
  },
  bookInfo: {
    width: '30%',
    alignItems: 'center',
  },
  infoCaption: {
    color: 'color-basic-600',
    paddingTop: 7,
  },
  heading: {
    textAlign: 'left',
  },
  serviceCaption: {
    color: 'color-basic-700'
  },
  priceContainer: {
    marginTop: 30,
  },
  serviceContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  totalCaption: {
    color: 'color-primary-500',
    fontWeight: '700',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btns: {
    width: '48%',
  },
  btnIcons: {
    width: 23,
    height: 23,
    marginRight: 0,
  },
  iconColor: {
    color: 'color-primary-500'
  }
});