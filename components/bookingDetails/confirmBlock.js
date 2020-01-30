import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, Icon } from '@ui-kitten/components';

const ConfirmBlock = (props) => {

    var bgClr = '';
    if(props.status === '1' || props.status === '4'){
        bgClr = '#19b752';
    }
    if(props.status === '2'){
        bgClr = '#DB2C36';
    }

    return(
        <Card style={[styles.container, {backgroundColor: bgClr}]}>
            <View style={styles.bookingContainer}>
                <View style={styles.confirmContainer}>
                    <Icon name='checkmark-circle-outline' style={styles.checkIcon} fill='#FFF' />
                    <Text style={styles.confirmed}>Your Booking is {props.status_label}!</Text>
                </View>
                <Text style={styles.bookingCaption}>Your booking ID is #{props.booking_id}.</Text> 
                <Text style={styles.caption}>The amount of ₹{props.total} can be payed upon your arrival. This booking can be cancelled anytime here.</Text>
            </View>
        </Card>
    )
}

export default ConfirmBlock;

const styles = StyleSheet.create({
    container:{
        width: '100%',
        marginTop: 10,
        borderRadius: 10,
    },
    bookingContainer:{
        alignItems: 'center',
    },
    confirmContainer:{
        flexDirection: 'row',
    },
    confirmed:{
        color: '#FFF',
        fontSize: 17,
        fontWeight: '700',
        paddingTop: 2,
    },
    checkIcon:{
        width: 28,
        height: 28,
        marginRight: 5,
    },
    caption:{
        paddingTop: 20,
        paddingBottom: 5,
        textAlign: 'center',
        color: '#FFF'
    },
    bookingCaption:{
        textAlign: 'center',
        color: '#FFF',
        fontSize: 17,
        paddingTop: 10,
    }
});