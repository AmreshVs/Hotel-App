import React from 'react';
import { Text, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import { View, Image } from 'react-native';
import Ripple from 'react-native-material-ripple';
import * as Animatable from 'react-native-animatable';

import AddFavourite from '../../redux/thunkActions/addFavourite';

const RoomsListLarge = (props) => {

  const styles = useStyleSheet(style);
  const [favcolor, setFavcolor] = React.useState(props.is_favourite === 1 ? '#FF4626' : '#AAA');

  const addFavourite = async () => {
    setFavcolor(favcolor === '#AAA' ? '#FF4626' : '#AAA');
    await AddFavourite({ hotel_id: props.hotelId }, props.token);
  }

  const RenderRoom = () => {
    return(
      <View style={styles.hotelCard}>
        <Ripple rippleSize={300} rippleDuration={600} onPress={props.navigate}>
          <Image
            style={styles.hotelImg}
            source={{ uri: props.image }}
          />
        </Ripple>
        <View style={styles.topBlock}>
          <View style={styles.rating}>
            <Icon name='star' style={styles.starIcon} fill='#FFD13A' />
            <Text style={styles.ratingCount}>{props.rating}</Text>
          </View>
          <View style={styles.favourite}>
            <Ripple rippleSize={50} rippleDuration={600} onPress={addFavourite}>
              <Icon name='heart' style={styles.heartIcon} fill={favcolor} />
            </Ripple>
          </View>
        </View>
        <Ripple style={styles.namePrice} onPress={props.navigate}>
          <Text style={styles.title}>{props.hotelName}</Text>
          <View style={styles.priceBlock}>
            <Text style={styles.oldPrice}>₹{props.oldCost} </Text>
            <Text style={styles.price}>₹{props.cost}</Text>
            <Text style={styles.priceCaption}>  Per Night</Text>
          </View>
        </Ripple>
      </View>
    )
  }

  return (
    props.reload === true ?
    <View>
      <RenderRoom/>
    </View>
    :
    <Animatable.View animation="fadeInRight" direction="normal" duration={800} useNativeDriver={true} delay={props.delay * 50}>
      <RenderRoom/>
    </Animatable.View>
  );
}

export default React.memo(RoomsListLarge);

const style = StyleService.create({
  hotelCard: {
    position: 'relative',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 235,
  },
  hotelImg: {
    width: 300,
    height: 180,
    backgroundColor: '#FFF',
    borderColor: 'background-basic-color-1',
    borderWidth: 1,
    borderRadius: 10,
  },
  placeholderContainer: {
    flex: 1,
    width: 350,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    position: 'relative',
    height: 280,
  },
  hotelImgPlaceholder: {
    width: 350,
    height: 220,
    borderRadius: 10,
  },
  textPlaceholder: {
    position: 'absolute',
    bottom: 38,
    width: 200,
    height: 50,
    alignItems: 'center',
    padding: 1,
    borderRadius: 50,
    borderColor: '#DDD',
  },
  namePrice: {
    position: 'absolute',
    bottom: 30,
    width: '80%',
    height: 50,
    alignItems: 'center',
    padding: 1,
    backgroundColor: 'background-basic-color-1',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'background-basic-color-4',
  },
  title: {
    fontSize: 15,
    marginBottom: 0,
    color: 'color-basic-700',
    fontWeight: '700',
  },
  priceBlock: {
    flexDirection: 'row',
  },
  price: {
    marginTop: 4,
    fontSize: 20,
    fontWeight: '700',
    color: 'color-primary-500',
  },
  priceCaption: {
    fontSize: 14,
    marginTop: 2,
    color: 'color-basic-600'
  },
  topBlock: {
    width: '100%',
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rating: {
    width: 30,
    height: 50,
    alignItems: 'center',
    marginLeft: '6%',
    borderColor: '#EEE',
    borderTopColor: '#FFF',
    borderWidth: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: '#FFF'
  },
  starIcon: {
    marginTop: 2,
    width: 21,
    height: 21
  },
  heartIcon: {
    width: 21,
    height: 21
  },
  ratingCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#626262'
  },
  favourite: {
    width: 30,
    height: 30,
    marginRight: '4%',
    marginTop: 12,
    borderRadius: 50,
    borderColor: '#DDD',
    borderWidth: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  favouritePlaceholder: {
    position: 'absolute',
    right: 15,
    width: 40,
    height: 40,
    marginTop: 12,
    borderRadius: 50,
  },
  oldPrice: {
    fontSize: 16,
    paddingTop: 2,
    paddingRight: 5,
    color: 'color-basic-600',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid'
  },
})