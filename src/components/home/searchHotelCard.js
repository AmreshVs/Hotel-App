import React from 'react';
import { connect } from 'react-redux';
import { Text, Icon, Button } from '@ui-kitten/components';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';
import Ripple from 'react-native-material-ripple';
import styles from './styles';
import moment from 'moment';

const SearchHotelCard = (props) =>{

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
    <Ripple rippleDuration={600} onPress={() => props.navigation.navigate('SearchDates')}>
      <View style={styles.container}>
        <View style={styles.datesContainer}>
          <Icon name='log-in-outline' width={32} height={32} fill='#3366FF'/>
          <Text style={styles.heading}>Check In</Text>
          <Text style={styles.dateCaption}>{moment(props.hotelDetail.dates.startDate).format("DD MMM YYYY")}</Text>
        </View>
        <View style={styles.seperator}/>
        <View style={styles.datesContainer}>
          <Icon name='log-out-outline' width={32} height={32} fill='#3366FF'/>
          <Text style={styles.heading}>Check Out</Text>
          <Text style={styles.dateCaption}>{moment(props.hotelDetail.dates.endDate).format("DD MMM YYYY")}</Text>
        </View>
        <View style={styles.seperator}/>
        <View style={styles.datesContainer}>
          <Icon name='people-outline' width={32} height={32} fill='#3366FF'/>
          <Text style={styles.heading}>Rooms - Guest</Text>
          <Text style={styles.dateCaption}>{roomNum} - {guests}</Text>
        </View>
      </View>
    </Ripple>
    <Button style={styles.button} status='primary' size='small' icon={StarIcon} onPress={() => props.navigation.navigate('SearchRooms')}>Search Rooms</Button>
  </View>
  );
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(withNavigation(SearchHotelCard));