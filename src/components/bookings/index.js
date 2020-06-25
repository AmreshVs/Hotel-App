import React from 'react';
import { View, Image, ScrollView, RefreshControl } from 'react-native';
import { Text, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { RFPercentage } from "react-native-responsive-fontsize";

const BookingsOverview = (props) => {

  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyle);

  const navigateBookingdetail = (id) => {
    navigation.navigate('BookingDetails', {
      id: id
    });
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={props.refresh}
          onRefresh={props.reloadData}
        />
      }
    >
      {props.data.map((item, index) =>
        <Animatable.View animation="fadeInRight" direction="normal" duration={500} useNativeDriver={true} delay={index * 50} >
          <View style={styles.container} key={item.booking_id + Math.random()}>
            <Ripple rippleDuration={600} onPress={() => navigateBookingdetail(item.booking_id)}>
              <View style={styles.cardContainer}>
                <View style={styles.row}>
                  <View style={styles.contentContainer}>
                    <View>
                      <Image style={styles.image} source={{ uri: item.image[0].file }} />
                    </View>
                    <View style={styles.content}>
                      <Text style={styles.hotelName}>{item.title}</Text>
                      <Text style={styles.caption}>Booking ID : {item.booking_id}</Text>
                      <View style={styles.datesContainer}>
                        <View style={styles.datesLeft}>
                          <Text style={styles.text}>Check In</Text>
                          <Text style={styles.caption}>{item.start_date}</Text>
                        </View>
                        <View style={styles.datesRight}>
                          <Text style={styles.text}>Check Out</Text>
                          <Text style={styles.caption}>{item.end_date}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.iconContainer}>
                    <Icon name='star' style={styles.starIcon} fill='#FFD13A' />
                    <Text style={styles.caption}>{item.avg_rating}</Text>
                  </View>
                </View>
                <View style={styles.info}>
                  <Text style={styles.address}>{item.address}</Text>
                  <Text style={styles.caption}>Booked on {item.created_at}</Text>
                </View>
              </View>
            </Ripple>
          </View>
        </Animatable.View>
      )}
    </ScrollView>
  )
}

export default BookingsOverview;

const themedStyle = StyleService.create({
  container: {
    paddingTop: 10,
  },
  cardContainer: {
    width: '100%',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'background-basic-color-1',
    borderColor: 'color-basic-400',
  },
  image: {
    width: 100,
    height: 85,
    borderRadius: 7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  content: {
    paddingLeft: 10,
  },
  hotelName: {
    fontWeight: '700',
    color: 'color-basic-700',
    fontSize: RFPercentage(2)
  },
  caption: {
    color: 'color-basic-600',
    fontSize: RFPercentage(2)
  },
  info: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'color-basic-400',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  address: {
    width: '50%',
    color: 'color-basic-600',
    fontSize: RFPercentage(2)
  },
  starIcon: {
    width: 25,
    height: 25
  },
  contentContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    right: 0,
  },
  datesContainer: {
    marginTop: 5,
    flexDirection: 'row',
  },
  datesLeft: {
    paddingRight: 15,
    borderRightWidth: 1,
    borderRightColor: 'color-basic-400'
  },
  datesRight: {
    paddingLeft: 15,
  },
  scroll: {
    backgroundColor: 'transparent',
    paddingBottom: 170,
    width: '100%',
    paddingHorizontal: 10
  },
  text:{
    fontSize: RFPercentage(2)
  }
})