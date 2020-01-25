import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Icon, Button } from '@ui-kitten/components';
import { withNavigation } from 'react-navigation';

const BookingConfirmed = ({navigation}) => {
    return(
        <View style={styles.bookingContainer}>
            <View style={styles.confirmContainer}>
                <Icon name='checkmark-circle-outline' style={styles.checkIcon} fill='#29B858' />
                <Text style={styles.confirmed}>Your Booking is Confirmed!</Text>
            </View>
            <Text style={styles.caption}>Your booking ID is #2626293. The amount of ₹1168 can be payed upon your arrival. This booking can be cancelled anytime on Bookings Section</Text>
            <Button onPress={() => navigation.navigate('Main')}>Return to home</Button>
        </View>
    );
}

export default withNavigation(BookingConfirmed);

const styles = StyleSheet.create({
    bookingContainer:{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
    },
    confirmContainer:{
        flexDirection: 'row',
    },
    confirmed:{
        color: '#626262',
        fontSize: 17,
        fontWeight: '700',
        paddingTop: 2,
    },
    checkIcon:{
        width: 28,
        height: 28,
        color: 'red',
        marginRight: 5,
    },
    caption:{
        paddingTop: 20,
        padding: 30,
        textAlign: 'center',
        color: '#AAA'
    }
});