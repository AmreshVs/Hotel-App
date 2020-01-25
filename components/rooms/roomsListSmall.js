import React from 'react';
import { Text, Icon } from '@ui-kitten/components';
import { View, StyleSheet, Image } from 'react-native';
import Ripple from 'react-native-material-ripple';
import ReviewRating from '../extra/reviewRating';

const RoomsListLarge = (props) => {

    const [favcolor, setFavcolor] = React.useState('#AAA');

    const saveFavourite = () => {
        setFavcolor(favcolor == '#AAA' ? '#FF4626' : '#AAA');
    }

    var maxlimit = 20;
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
                <View style={styles.priceContainer}>
                    <Text style={styles.oldPrice}>₹{props.oldCost} </Text>
                    <Text style={styles.price}>₹{props.cost}</Text>
                    <Text style={styles.priceCaption}>  Per Night</Text>
                </View>
            </View>
        </View>
    );
}

export default RoomsListLarge;

const styles = StyleSheet.create({
    hotelListCard: {
        width: '90%',
        height: 150,
        marginLeft: 20,
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
        width: '54%',
        margin: 10,
    },
    title: {
        fontSize: 15,
        marginBottom: 0,
        color: '#626262',
        fontWeight: '700',
    },
    priceContainer: {
        position: 'absolute',
        width: 209,
        height: 45,
        bottom: -10,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#DDD',
        borderBottomRightRadius: 20,
    },
    price: {
        marginTop: 5,
        fontSize: 20,
        fontWeight: '700',
        color: '#3366FF',
    },
    oldPrice:{
        fontSize: 15,
        paddingTop: 1,
        paddingRight: 5,
        color: '#AAA',
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid'
    },
    priceCaption: {
        color: '#BBB',
        fontSize: 13
    },
    caption: {
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
        top: -25
    },
    iconContainer: {
        marginTop: 3,
    },
    ratingContainer: {
        flexDirection: 'row'
    },
    stars:{
        marginLeft: 1, 
        marginRight: 1
    },
    heartIcon:{
        width: 23,
        height: 23,
    },
    heartIconContainer:{
        right: 10,
        width: 30,
        alignItems: 'center'
    },
    favContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})