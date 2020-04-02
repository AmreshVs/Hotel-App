import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Image } from 'react-native';
import { Text, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from '@react-navigation/native';

import AddFavourite from '../../redux/thunkActions/addFavourite';
import snackbarMessage from '../../redux/thunkActions/snackbarMessage';
import { clearData } from '../../redux/actions/hotelDetailActions';

const FavouriteHotels = (props) => {

  const navigation = useNavigation();
  const styles = useStyleSheet(style);

  const removeFavourite = async () => {
    const response = await AddFavourite({ hotel_id: props.hotelId }, props.token);
    snackbarMessage(response.message + ' for ' + props.hotelName);
    props.reloadData();
  }

  const navigateHotelDetails = (alias, id, is_favorite) => {
    props.clearData();
    navigation.navigate('HotelsDetail', {
      alias: alias,
      hotelId: id,
      is_favorite: is_favorite
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.favContainer}>
        <Ripple rippleSize={500} rippleDuration={600} onPress={() => navigateHotelDetails(props.alias, props.hotelId, 1)}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </Ripple>
        <Ripple rippleSize={50} rippleDuration={600} onPress={removeFavourite} style={styles.heartContainer}>
          <Icon name='heart' style={styles.heartIcon} fill='#FF4626' />
        </Ripple>
        <View style={styles.contentContainer}>
          <View style={styles.leftContainer}>
            <Ripple rippleSize={500} rippleDuration={600} onPress={() => props.navigate(props.alias, props.hotelId, 1)}>
              <Text style={styles.hotelName}>{props.hotelName}</Text>
            </Ripple>
            <View style={styles.iconContainer}>
              <Icon name='star' style={styles.starIcon} fill='#FFD13A' />
              <Text style={styles.caption}>{props.rating}</Text>
            </View>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.price}>{'₹' + props.price}</Text>
            <Text style={styles.priceCaption}>  Per Night</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ clearData: clearData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteHotels);

const style = StyleService.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  favContainer: {
    width: '95%',
    height: 300,
    borderBottomWidth: 1,
    borderBottomColor: 'color-basic-400',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 7,
  },
  contentContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  hotelName: {
    fontSize: 16,
    marginBottom: 3,
    color: 'color-basic-700',
    fontWeight: '700',
  },
  leftContainer: {

  },
  rightContainer: {

  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  starIcon: {
    width: 21,
    height: 21
  },
  caption: {
    color: 'color-basic-600',
    paddingLeft: 5,
    fontSize: 14,
  },
  price: {
    textAlign: 'right',
    marginBottom: 3,
    fontSize: 18,
    fontWeight: '700',
    color: 'color-primary-500',
  },
  priceCaption: {
    color: 'color-basic-600',
    fontSize: 16
  },
  heartContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: 'background-basic-color-1',
    borderRadius: 20,
    padding: 4,
    zIndex: 1,
  },
  heartIcon: {
    width: 21,
    height: 21
  }
});