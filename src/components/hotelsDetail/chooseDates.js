import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';
import { View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { withNavigation } from 'react-navigation';
import { addGuests } from '../../redux/actions/hotelDetailActions';
import moment from 'moment';

const ChooseDates = (props) => {

    const styles = useStyleSheet(style);
    if(props.hotelDetail.rooms !== undefined){
        var rooms = props.hotelDetail.rooms;
        var length = Object.keys(rooms).length;
        var roomNum = 0; var guests = 0;
        for(var i=1;i<=length; i++){
            roomNum++;
            if(rooms[i] !== undefined){
                guests += rooms[i].adult + rooms[i].children;
            }
        }
    }

    const hotelDates = () => {
        if(Object.keys(rooms).length <= 0){
            props.addGuests({room: 1 , guests: {adult: 1, children: 0}});
        }
        props.navigation.navigate('HotelDates', {alias: props.alias});
    }

    if(props.hotelDetail.dates !== undefined){
        var fromDate = moment(props.hotelDetail.dates.startDate).format('MMM Do');
        var toDate = moment(props.hotelDetail.dates.endDate).format('MMM Do');
    }

    const dates = (fromDate !== undefined && toDate !== undefined) ? fromDate + ' - ' + toDate : '-';

    return(
        <View style={styles.cardContainer}>
            <Text style={styles.heading}>Choose Room's and Guest's</Text>
            <Ripple rippleSize={150} rippleDuration={600} style={styles.choosedates} onPress={hotelDates}>
                <View style={styles.container}>
                    <Icon name='calendar-outline' width={22} height={22} fill={styles.iconColor.color} />
                    <Text style={styles.text}>{dates}</Text>
                </View>
                <View style={styles.container}>
                    <Icon name='people-outline' width={22} height={22} fill={styles.iconColor.color} />
                    <Text style={styles.text}>{roomNum} Room's, {guests} Guest's</Text>
                </View>
            </Ripple>
        </View>
    );
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ addGuests: addGuests }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ChooseDates));

const style = StyleService.create({
    cardContainer:{
        width: '95%',
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: 'background-basic-color-1',
        padding: 13,
        borderWidth: 1,
        borderColor: 'color-basic-300',
    },
    heading:{
        fontSize: 16,
        marginBottom: 3,
        color: 'color-basic-700',
        fontWeight: '700',
    },
    choosedates:{
        marginTop: 10,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: 'color-basic-300',
        padding: 15,
        flexDirection: 'row'
    },
    container:{
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text:{
        paddingLeft: 5,
        fontSize: 14,
    },
    iconColor:{
        color: 'color-primary-500'
    }
})