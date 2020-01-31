import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, Card, Icon } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';
import { withNavigation } from 'react-navigation';

const BookingsOverview = (props) => {

    const navigateBookingdetail = (id) => {
        props.navigation.navigate('BookingDetails',{
            id: id
        });
    }

    return(
        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {props.data.map((item) => 
            <View style={styles.container} key={item.booking_id}>
                <Ripple rippleDuration={600} onPress={() => navigateBookingdetail(item.booking_id)}>
                    <View style={styles.cardContainer}>
                        <View style={styles.row}>
                            <View style={styles.contentContainer}>
                                <View>
                                    <Image style={styles.image} source={{uri : item.image[0].file}} />
                                </View>
                                <View style={styles.content}>
                                    <Text style={styles.hotelName}>{item.title}</Text>
                                    <Text style={styles.caption}>Booking ID : {item.booking_id}</Text>
                                    <View style={styles.datesContainer}>
                                        <View style={styles.datesLeft}>
                                            <Text>Check In</Text>
                                            <Text style={styles.caption}>{item.start_date}</Text>    
                                        </View>
                                        <View style={styles.datesRight}>
                                            <Text>Check Out</Text>
                                            <Text style={styles.caption}>{item.end_date}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.iconContainer}>
                                <Icon name='star' style={styles.starIcon} fill='#FFD13A'/>
                                <Text style={styles.caption}>{item.avg_rating}</Text>
                            </View>
                        </View>
                        <View style={styles.info}>
                            <Text style={styles.address}>{item.address}</Text>
                            <Text style={styles.caption}>Booked on {item.created_at}</Text>
                        </View>
                    </View>
                </Ripple>
            </View>
        )}
        </ScrollView>
    )
}

export default withNavigation(BookingsOverview);

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
    },
    cardContainer:{
        width: '90%',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: '#FFF',
        borderColor: '#EEE',
    },
    image:{
        width: 100,
        height: 85,
        borderRadius: 7,
    },
    row:{
        flexDirection: 'row',
    },
    content:{
        width: '72%',
        paddingLeft: 10,
    },
    hotelName:{
        fontWeight: '700',
        color: '#626262',
    },
    caption:{
        color: '#BBB'
    },
    info:{
        marginTop: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    address:{
        width: '50%',
        color: '#626262',
    },
    starIcon:{
        width: 25,
        height: 25
    },
    contentContainer:{
        flexDirection: 'row',
    },
    iconContainer:{
        right: 20,
    },
    datesContainer:{
        marginTop: 5,
        flexDirection: 'row',
    },
    datesLeft:{
        paddingRight: 15,
        borderRightWidth: 1,
        borderRightColor: '#EEE'
    },
    datesRight:{
        paddingLeft: 15,
    },
    scroll:{
        backgroundColor: '#FAFAFA',
        paddingBottom: 170,
    }
})