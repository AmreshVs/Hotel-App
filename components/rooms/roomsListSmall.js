import React from 'react';
import { Text, Icon } from '@ui-kitten/components';
import { View, StyleSheet, Image } from 'react-native';
import Ripple from 'react-native-material-ripple';
import ReviewRating from '../extra/reviewRating';
import AddFavourite from '../../redux/thunkActions/addFavourite';
import snackbarMessage from '../../redux/thunkActions/snackbarMessage';

const RoomsListSmall = (props) => {

    const [favcolor, setFavcolor] = React.useState(props.is_favourite === 1 ? '#FF4626' : '#AAA');

    const saveFavourite = async () => {
      setFavcolor(favcolor === '#AAA' ? '#FF4626' : '#AAA');
      const response = await AddFavourite({hotel_id: props.hotelId}, props.token);
      snackbarMessage(response.message + ' for ' + props.hotelName);
    }

    var maxlimit = 25;
    var hotelname =  ((props.hotelName).length > maxlimit) ? 
        (((props.hotelName).substring(0,maxlimit-3)) + '...') : 
        props.hotelName;

    return (
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
                <View style={styles.priceContainer}>
                    <Text style={styles.oldPrice}>₹{props.oldCost} </Text>
                    <Text style={styles.price}>₹{props.cost}</Text>
                    <Text style={styles.priceCaption}>  Per Night</Text>
                </View>
            </View>
        </View>
    );
}

export default RoomsListSmall;

const styles = StyleSheet.create({
    hotelListCard: {
        width: '95%',
        height: 150,
        marginLeft: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DDD',
        backgroundColor: '#FFF',
        flexDirection: 'row',
    },
    imgContainer: {
      width: '43%',
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
      width: '57%',
      justifyContent: 'space-between',
    },
    title: {
      fontSize: 15,
      marginBottom: 0,
      color: '#626262',
      fontWeight: '700',
    },
    priceContainer: {
      height: 35,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      borderTopWidth: 1,
      borderTopColor: '#DDD',
    },
    price: {
      marginTop: 5,
      fontSize: 20,
      fontWeight: '700',
      color: '#3366FF',
    },
    oldPrice: {
      fontSize: 15,
      paddingTop: 1,
      paddingRight: 5,
      color: '#AAA',
      textDecorationLine: 'line-through',
      textDecorationStyle: 'solid',
    },
    priceCaption: {
      color: '#BBB',
      fontSize: 13,
    },
    caption: {
      marginTop: 0,
      margin: 10,
      color: '#BBB',
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