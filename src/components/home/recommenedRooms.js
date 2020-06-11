import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import { View, ScrollView } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { useNavigation } from '@react-navigation/native';

import RoomsListLarge from '../rooms/roomsListLarge';
import { clearData } from '../../redux/actions/hotelDetailActions';

const RecommendedRooms = (props) => {

  const navigation = useNavigation();
  const styles = useStyleSheet(style);

  const navigateDetails = () => {
    navigation.navigate('HotelsLargeList');
  }

  const navigateHotelDetails = (alias, id, is_favorite) => {
    props.clearData();
    navigation.navigate('HotelsDetail', {
      alias: alias,
      hotelId: id,
      is_favorite: is_favorite
    });
  }

  return (
    <View>
      <View style={styles.headingBlock}>
        <Text style={styles.headingText}>Recommended Rooms</Text>
        <Ripple rippleDuration={600} onPress={navigateDetails}>
          <Text style={styles.caption}>View More</Text>
        </Ripple>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {props.data.map((item, index) => <RoomsListLarge key={item.alias + Math.random()} reload={props.reload} delay={index} navigate={() => navigateHotelDetails(item.alias, item.id, item.is_favorite)} image={item.image[0].file} rating={item.avg_rating} token={props.common.userData.access_token} hotelId={item.id} hotelName={item.title} cost={item.price_start} oldCost={Number(item.price_start) + 200} pending={false} is_favourite={item.is_favorite} />)}
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ clearData: clearData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(RecommendedRooms));

const style = StyleService.create({
  headingText: {
    fontWeight: '700',
    fontSize: 16,
    color: 'color-basic-700'
  },
  caption: {
    color: 'color-basic-600',
    padding: 5,
    marginTop: -5,
  },
  headingBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 15,
  },
});