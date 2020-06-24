import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, CheckBox, Button, StyleService, useStyleSheet } from '@ui-kitten/components';
import { View, Modal, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
import { RFPercentage } from "react-native-responsive-fontsize";

import TopNavSimple from '../navigation/topNavSimple';
import ExtraServices from './extraServices';
import LoadPrices from '../../redux/thunkActions/loadPrices';
import { addCoupons } from '../../redux/actions/hotelDetailActions';

const PricingDetails = (props) => {
  console.log(props);
  const styles = useStyleSheet(style);
  const [modal, setModal] = React.useState(false);
  var servicesId = 0;
  let room_price = props.hotelDetail.prices_services.data.data.price !== undefined ? props.hotelDetail.prices_services.data.data.price.room_price : 0;
  let startDate = moment(props.hotelDetail.dates.startDate);
  let endDate = moment(props.hotelDetail.dates.endDate);
  let days = endDate.diff(startDate, 'days');

  if (props.hotelDetail.rooms !== undefined) {
    let rooms = props.hotelDetail.rooms;
    let length = Object.keys(rooms).length;
    var guests = 0; var roomNum = 0; 
    for (var i = 1; i <= length; i++) {
      roomNum++;
      if (rooms[i] !== undefined) {
        guests += rooms[i].adult + rooms[i].children;
      }
    }
  }

  const openModal = () => {
    if (props.hotelDetail.coupons.code === undefined) {
      setModal(!modal);
    }
    else {
      props.addCoupons({});
      props.LoadPrices({ hotelId: props.hotelDetail.hotelIds.hotelId, roomId: props.hotelDetail.hotelIds.roomId, dates: props.hotelDetail.dates, rooms: props.hotelDetail.rooms, service: props.hotelDetail.services, foods: props.hotelDetail.foods }, props.common.userData.access_token);
      setModal(false);
    }
  }
 
  const closeModal = (item, price) => {
    props.addCoupons({ code: item, price: price });
    props.LoadPrices({ hotelId: props.hotelDetail.hotelIds.hotelId, roomId: props.hotelDetail.hotelIds.roomId, dates: props.hotelDetail.dates, rooms: props.hotelDetail.rooms, service: props.hotelDetail.services, coupons: item, foods: props.hotelDetail.foods }, props.common.userData.access_token);
    setModal(!modal);
  }

  const RenderFoods = () => {
    let foods = props.hotelDetail.foods;
    let foodsArr = [];

    if(Object.keys(foods).length > 0){
      for(let item in foods){
        foodsArr.push(
          <View style={styles.textContainer}>
            <Text style={styles.text}>{foods[item].name} - {foods[item].qty}</Text>
            <Text style={styles.total}>{'₹' + foods[item].price * foods[item].qty}</Text>
          </View>
        )
      }
      return(
        foodsArr
      )
    }
    else{
      return null;
    }

  }

  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <View style={styles.cardContainer}>
        <Text style={styles.heading}>Pricing Details & Extra Services</Text>
        <View style={styles.textContainer}>
          {props.hotelDetail.coupons.code === undefined ? <Text>Apply Coupon</Text> : <Text style={[styles.coupon, { marginTop: 10 }]}>Coupon : {props.hotelDetail.coupons.code}</Text>}
          <View style={styles.checkboxContainer}>
            <Text style={styles.checkboxText}>{props.hotelDetail.coupons.price === undefined ? '' : '₹' + props.hotelDetail.coupons.price}</Text>
            {props.data.data.coupons !== undefined ? <CheckBox checked={props.hotelDetail.coupons.price !== undefined ? true : false} onChange={openModal} /> : <CheckBox disabled={true} />}
          </View>
        </View>
        {props.data.data.services !== undefined && props.data.data.services.map((item) => {
          servicesId++
          return <ExtraServices key={item.service_id} id={servicesId} service_id={item.service_id} name={item.service_name} desc={''} quantity={(item.service_type).search('qty') !== -1 ? true : false} price={'₹' + item.price} />
        })}
        <View style={styles.textContainer}>
          <View>
            <Text style={styles.text}>Night's - {days}</Text>
            <Text style={styles.textInfo}>Room's - {roomNum}</Text>
            <Text style={styles.textInfo}>Guest's - {guests}</Text>
          </View>
          <Text style={styles.total}>₹{room_price}</Text>
        </View>
        <RenderFoods/>
        {props.data.data.price !== undefined &&
          <View>
            <View style={styles.textContainer}>
              <Text style={styles.text}>Discount</Text>
              <Text style={styles.total}>- ₹{props.data.data.price.discount_price}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.total}>Tax</Text>
              <Text style={styles.total}>₹{props.data.data.price !== undefined ? props.data.data.price.vat : 0}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.total}>Total</Text>
              <Text style={styles.total}>₹{props.data.data.price.discount_after_price}</Text>
            </View>
          </View>
        }
        <Modal
          animationType="slide"
          transparent={false}
          visible={modal}
          onRequestClose={() => setModal(!modal)}
        >
          <View>
            <TopNavSimple backHandler={() => setModal(!modal)} screenTitle="Apply Coupon" />
            <ScrollView style={styles.applyCoupon} showsVerticalScrollIndicator={false}>
              <Text style={[styles.heading, styles.couponHeading]}>Availabe Coupons</Text>
              <View style={styles.couponsContainer}>
                {props.data.data.coupons !== undefined && Object.values(props.data.data.coupons).map((item, index) => {
                  return (
                    <Animatable.View style={styles.container} key={item.id} animation="fadeInRight" direction="normal" duration={500} useNativeDriver={true} delay={index * 50} >
                      <View style={styles.coupons}>
                        <View style={styles.textContent}>
                          <Text style={styles.coupon}>
                            {item.code}
                          </Text>
                        </View>
                        <View style={styles.btnContent}>
                          <Button style={styles.button} appearance='outline' size='tiny' onPress={() => closeModal(item.code, item.discount_price)}>Apply</Button>
                        </View>
                      </View>
                      <Text style={styles.couponDesc}>{item.desc}</Text>
                    </Animatable.View>
                  )
                })}
              </View>
              <View style={{ marginBottom: 70 }}></View>
            </ScrollView>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ LoadPrices: LoadPrices, addCoupons: addCoupons }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PricingDetails);

const style = StyleService.create({
  cardContainer: {
    width: '100%',
    borderRadius: 10,
    marginTop: 5,
    backgroundColor: 'background-basic-color-1',
    padding: 13,
    borderWidth: 1,
    borderColor: 'color-basic-300',
  },
  heading: {
    fontSize: RFPercentage(2.5),
    marginBottom: 10,
    color: 'color-basic-700',
    fontWeight: '700',
  },
  textContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  total: {
    fontWeight: '700',
    fontSize: RFPercentage(2.2)
  },
  checkboxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  checkboxText: {
    marginRight: 15,
  },
  couponsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    borderWidth: 1,
    borderColor: 'color-basic-300',
    borderRadius: 10,
    marginTop: 10,
    width: '95%',
    backgroundColor: 'background-basic-color-1'
  },
  coupons: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContent: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContent: {
    padding: 10,
  },
  coupon: {
    fontWeight: '700',
    backgroundColor: 'color-warning-100',
    padding: 7,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: 'color-warning-500',
    borderRadius: 6,
    fontSize: RFPercentage(2.2)
  },
  couponDesc: {
    marginLeft: 10,
    marginBottom: 10,
    fontSize: RFPercentage(2.2)
  },
  couponHeading: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: RFPercentage(2.2)
  },
  applyCoupon: {
    height: '100%',
    backgroundColor: 'background-basic-color-2',
    paddingBottom: 30,
  },
  text:{
    fontSize: RFPercentage(2.2)
  },
  textInfo:{
    fontSize: RFPercentage(2.2),
    marginTop: 15
  }
})