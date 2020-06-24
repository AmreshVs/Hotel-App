import React from 'react';
import { Text, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import { View, Image } from 'react-native';
import Ripple from 'react-native-material-ripple';
import * as Animatable from 'react-native-animatable';
import { RFPercentage } from "react-native-responsive-fontsize";

import ReviewRating from '../extra/reviewRating';
import AddFavourite from '../../redux/thunkActions/addFavourite';

const RoomsListSmall = (props) => {

  const styles = useStyleSheet(style);
  const [favcolor, setFavcolor] = React.useState(props.is_favourite === 1 ? '#FF4626' : '#AAA');

  const saveFavourite = async () => {
    setFavcolor(favcolor === '#AAA' ? '#FF4626' : '#AAA');
    await AddFavourite({ hotel_id: props.hotelId }, props.token);
  }

  var maxlimit = 25;
  var hotelname = ((props.hotelName).length > maxlimit) ?
    (((props.hotelName).substring(0, maxlimit - 3)) + '...') :
    props.hotelName;

  const RenderRoom = () => {
    return(
      <View style={styles.hotelListCard}>
        <View style={styles.imgContainer}>
          <Ripple onPress={props.navigate}>
            <Image
              style={styles.image}
              source={{ uri: props.image }}
            />
          </Ripple>
        </View>
        <View style={styles.contentContainer}>
          <View>
            <View style={styles.favContainer}>
              <Ripple onPress={props.navigate}>
                <Text style={styles.title}>{hotelname}</Text>
              </Ripple>
              <Ripple rippleSize={50} rippleDuration={600} onPress={saveFavourite} style={styles.heartIconContainer}>
                <Icon name='heart' style={styles.heartIcon} fill={favcolor} />
              </Ripple>
            </View>
            <Ripple onPress={props.navigate}>
              <Text style={styles.caption}>{props.address}</Text>
            </Ripple>
            <View style={styles.ratingContainer}>
              <Ripple onPress={props.navigate}>
                <ReviewRating rating={props.rating} />
              </Ripple>
            </View>
          </View>
          {props.status === 1 ?
            <View style={styles.priceContainer}>
              <Text style={styles.oldPrice}>₹{props.oldCost} </Text>
              <Text style={styles.price}>₹{props.cost}</Text>
              <Text style={styles.priceCaption}>  Per Night</Text>
            </View>
          :
            <View style={styles.priceContainer}>
              <Text status='danger'>Room's Not Available</Text>
            </View>
          }
        </View>
      </View>
    )
  }

  return (
    props.reload === true ?
    <View>
      <RenderRoom/>
    </View>
    :
    <Animatable.View animation="fadeInLeft" direction="normal" duration={800} useNativeDriver={true} delay={props.delay * 50} >
      <RenderRoom/>
    </Animatable.View>
  );
}

export default RoomsListSmall;

const style = StyleService.create({
  hotelListCard: {
    width: '95%',
    height: 140,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    backgroundColor: 'background-basic-color-1',
    flexDirection: 'row',
  },
  imgContainer: {
    width: '40%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  contentContainer: {
    width: '60%',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: RFPercentage(2),
    marginBottom: 0,
    color: 'color-basic-700',
    fontWeight: '700',
  },
  priceContainer: {
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'color-basic-300',
  },
  price: {
    marginTop: 5,
    fontSize: RFPercentage(2.5),
    fontWeight: '700',
    color: 'color-primary-500',
  },
  oldPrice: {
    fontSize: RFPercentage(2),
    paddingTop: 1,
    paddingRight: 5,
    color: 'color-basic-600',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  priceCaption: {
    color: 'color-basic-600',
    fontSize: RFPercentage(2),
  },
  caption: {
    marginTop: 0,
    marginLeft: 10,
    color: 'color-basic-600',
    fontSize: RFPercentage(2)
  },
  starIcon: {
    width: 25,
    height: 25,
  },
  starIconOutline: {
    width: 25,
    height: 25,
    position: 'absolute',
    top: -25,
  },
  iconContainer: {
    marginTop: 3,
  },
  ratingContainer: {
    margin: 10,
    flexDirection: 'row',
  },
  stars: {
    marginLeft: 1,
    marginRight: 1,
  },
  heartIcon: {
    width: 23,
    height: 23,
  },
  heartIconContainer: {
    width: 30,
    alignItems: 'center',
  },
  favContainer: {
    margin: 10,
    marginBottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});