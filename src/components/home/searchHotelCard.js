import React from 'react';
import { connect } from 'react-redux';
import { Text, Icon, Button, withStyles } from '@ui-kitten/components';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import Ripple from 'react-native-material-ripple';
import { StyleSheet } from 'react-native';
import moment from 'moment';

const SearchHotelCard = (props) =>{

  const theme = props.theme;

  const styles = StyleSheet.create({
    searchCard:{
        marginTop: -95,
        margin: 10,
        padding: 15,
        marginBottom: 30,
        borderRadius: 10,
        backgroundColor: theme['color-basic-100'],
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headBlock:{
        width: '100%',
        height: 250,
        borderBottomRightRadius: 50,
    },
    datesContainer:{
        width: '30%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    seperator:{
        width: 1,
        height:100,
        backgroundColor: theme['color-basic-100']
    },
    heading:{
        fontSize: 16,
        fontWeight: '700',
        color: theme['color-primary-500'],
        marginBottom: 5,
    },
    dateCaption:{
        fontSize: 16,
        color: theme['color-basic-600']
    },

  });

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

  const StarIcon = (style) => (
    <Icon {...style} name='search-outline' />
  );

  return(
  <View style={styles.searchCard}>
    <View style={styles.container}>
      <Ripple style={styles.datesContainer} rippleDuration={600} onPress={() => props.navigation.navigate('SearchDates', { index: 0 })}>
        <Icon name='log-in-outline' width={32} height={32} fill={theme['color-primary-500']} />
        <Text style={styles.heading}>Check In</Text>
        <Text style={styles.dateCaption}>{moment(props.hotelDetail.dates.startDate).format("DD MMM YYYY")}</Text>
      </Ripple>
      <View style={styles.seperator}/>
      <Ripple style={styles.datesContainer} rippleDuration={600} onPress={() => props.navigation.navigate('SearchDates', { index: 0 })}>
        <Icon name='log-out-outline' width={32} height={32} fill={theme['color-primary-500']} />
        <Text style={styles.heading}>Check Out</Text>
        <Text style={styles.dateCaption}>{moment(props.hotelDetail.dates.endDate).format("DD MMM YYYY")}</Text>
      </Ripple>
      <View style={styles.seperator}/>
      <Ripple style={styles.datesContainer} rippleDuration={600} onPress={() => props.navigation.navigate('SearchDates', { index: 1 })}>
        <Icon name='people-outline' width={32} height={32} fill={theme['color-primary-500']} />
        <Text style={styles.heading}>Rooms - Guest</Text>
        <Text style={styles.dateCaption}>{roomNum} - {guests}</Text>
      </Ripple>
    </View>
    <Button style={styles.button} status='primary' size='small' icon={StarIcon} onPress={() => props.navigation.navigate('SearchRooms')}>Search Rooms</Button>
  </View>
  );
}


const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(withNavigation(withStyles(SearchHotelCard)));