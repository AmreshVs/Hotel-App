import React from 'react';
import { Text, Icon } from '@ui-kitten/components';
import { View, StyleSheet, Image } from 'react-native';
import Ripple from 'react-native-material-ripple';
import AddFavourite from '../../redux/thunkActions/addFavourite';
import snackbarMessage from '../../redux/thunkActions/snackbarMessage';

const RoomsListAllLarge = (props) => {

    const [favcolor, setFavcolor] = React.useState(props.is_favourite === 1 ? '#FF4626' : '#AAA');

    const addFavourite = async () => {
        setFavcolor(favcolor === '#AAA' ? '#FF4626' : '#AAA');
        const response = await AddFavourite({hotel_id: props.hotelId}, props.token);
        snackbarMessage(response.message + ' for ' + props.hotelName);
    }

    return (
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
            <Ripple rippleSize={300} rippleDuration={600} style={styles.namePrice} onPress={props.navigate}>
                <Text style={styles.title}>{props.hotelName}</Text>
                <View style={styles.priceBlock}>
                    <Text style={styles.oldPrice}>₹{props.oldCost} </Text>
                    <Text style={styles.price}>₹{props.cost}</Text>
                    <Text style={styles.priceCaption}>  Per Night</Text>
                </View>
            </Ripple>
        </View>
    );
}

export default RoomsListAllLarge;

const styles = StyleSheet.create({
    hotelCard: {
        position: 'relative',
        alignItems: 'center',
        marginTop: 20,
        height: 242,
    },
    hotelImg:{
        width: 350,
        height: 220,
        // margin: 10,
        backgroundColor: '#FFF',
        borderColor: '#DDD',
        borderWidth: 1,
        borderRadius: 10,
    },
    namePrice:{
        position: 'absolute',
        bottom: 0,
        width: '65%',
        height: 50,
        alignItems: 'center',
        padding: 1,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#DDD',
    },
    title:{
        fontSize: 15,
        marginBottom: -1,
        color: '#626262',
        fontWeight: '700',
    },
    priceBlock:{
        flexDirection: 'row',
    },
    price:{
        marginTop: 5,
        fontSize: 20,
        fontWeight: '700',
        color: '#3366FF',
    },
    priceCaption:{
        marginTop: 3,
        color: '#AAA',
        fontSize: 13
    },
    topBlock:{
        top: 0,
        width: '100%',
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rating:{
        width: 40,
        height: 55,
        alignItems: 'center',
        marginLeft: '13%',
        borderColor: '#DDD',
        borderTopColor: '#FFF',
        borderWidth: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: '#FFF'
    },
    starIcon:{
        marginTop: 2,
        width: 25,
        height: 25
    },
    heartIcon:{
        width: 25,
        height: 25
    },
    ratingCount:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#626262'
    },
    favourite:{
        width: 35,
        height: 35,
        marginRight: 60,
        marginTop: 10,
        borderRadius: 50,
        borderColor: '#DDD',
        borderWidth: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center'
    },
    oldPrice:{
        fontSize: 16,
        paddingTop: 2,
        paddingRight: 5,
        color: '#AAA',
        textDecorationLine: 'line-through', 
        textDecorationStyle: 'solid'
    },
    placeholderContainer:{
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
    textPlaceholder:{
        position: 'absolute',
        bottom: 38,
        width: 200,
        height: 50,
        alignItems: 'center',
        padding: 1,
        borderRadius: 50,
        borderColor: '#DDD',
    },
    favouritePlaceholder: {
        position: 'absolute',
        right: 15,
        width: 40,
        height: 40,
        marginTop: 12,
        borderRadius: 50,
    },
})