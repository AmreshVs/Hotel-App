import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, Button, StyleService, useStyleSheet } from '@ui-kitten/components';
import { View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from '@react-navigation/native';
import { RFPercentage } from "react-native-responsive-fontsize";

import RoomsListSmall from '../rooms/roomsListSmall';
import { clearData } from '../../redux/actions/hotelDetailActions';

const ExclusiveRooms = (props) => {

  const navigation = useNavigation();
  const styles = useStyleSheet(style);

  const navigateDetails = () => {
    navigation.push('HotelsExploreRooms');
  }

  const navigateHotelDetails = (alias, id, is_favorite) => {
    props.clearData();
    navigation.push('HotelsDetail', {
      alias: alias,
      hotelId: id,
      is_favorite: is_favorite
    });
  }

  return (
    <View>
      <View style={styles.headingBlock}>
        <Text style={styles.headingText}>Exclusive Rooms</Text>
        <Ripple rippleDuration={600} onPress={navigateDetails}>
          <Text style={styles.caption}>View More</Text>
        </Ripple>
      </View>
      {props.data.map((item, index) => <RoomsListSmall key={item.alias + Math.random()} reload={props.reload} delay={index} navigate={() => navigateHotelDetails(item.alias, item.id, item.is_favorite)} image={item.image[0].file} rating={item.avg_rating} token={props.common.userData.access_token} hotelId={item.id} hotelName={item.title} address={item.alias} cost={item.price_start} oldCost={Number(item.price_start) + 200} is_favourite={item.is_favorite} status={item.status} />)}
      <Ripple rippleDuration={600} onPress={navigateDetails}>
        <Button style={styles.button} appearance='ghost' status='basic'>View More</Button>
      </Ripple>
    </View>
  );
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ clearData: clearData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ExclusiveRooms));

const style = StyleService.create({
  headingText: {
    fontWeight: '700',
    fontSize: RFPercentage(2),
    color: 'color-basic-700'
  },
  caption: {
    color: 'color-basic-600',
    padding: 5,
    marginTop: -5,
    fontSize: RFPercentage(2)
  },
  headingBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 15,
  },
});