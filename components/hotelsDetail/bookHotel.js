import React from 'react';
import { Text, Card, Button } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';
import { withNavigation } from 'react-navigation';

const BookHotel = (props) => {

    const navigatePayment = () => {
        props.navigation.navigate('PaymentScreen');
    }

    return(
        <View style={styles.cardContainer}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.total}>₹{props.data.price !== undefined ? props.data.price.discount_after_price : 0}</Text>
                    <Text style={styles.totalCaption}>Total</Text>
                </View>
                <View style={styles.btnContainer}>
                    {props.data.price !== undefined ? <Button onPress={navigatePayment}>Book Now</Button> : <Button disabled={true}>Book Now</Button> }
                </View>
            </View>
        </View>
    );
}

export default withNavigation(BookHotel);

const styles = StyleSheet.create({
    cardContainer:{
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        backgroundColor: '#FFF',
    },
    heading:{
        fontSize: 16,
        marginBottom: 3,
        color: '#626262',
        fontWeight: '700',
    },
    textContainer:{
        width: '30%',
        paddingLeft: 10,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    total:{
        fontSize: 20,
        fontWeight: '700'
    },
    totalCaption:{
        color: '#AAA'
    },
    btnContainer:{
        width: '70%',
        paddingRight: 10,
    },
    container:{
        flexDirection: 'row'
    }
})