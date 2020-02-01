import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, Button } from '@ui-kitten/components';
import { View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import RoomsListSmall from '../rooms/roomsListSmall';
import styles from './styles';
import { withNavigation } from 'react-navigation';
import ExclusiveRoomsSK from '../skeletons/exclusiveRoomsSK';
import { loadPrices, removeServices, serviceChecked } from '../../redux/actions/hotelDetailActions';

const ExclusiveRooms = (props) => {

    const navigateDetails = () => {
        props.navigation.navigate('HotelsExploreRooms');
    }

    const navigateHotelDetails = (alias, id, is_favorite) => {
        props.removeServices([]);
        props.serviceChecked([]);
        props.loadPrices({});
        props.navigation.navigate('HotelsDetail',{
            alias: alias,
            hotelId: id,
            is_favorite: is_favorite
        });
      }
    
    var data = [];
    var loaded = null;
    if(props.data !== undefined && Object.keys(props.data).length > 0){
        data = props.data;
        loaded = true;
    }
    else{
        data = [1, 2];
        loaded = false;
    }

    return(
        <View>
            <View style={styles.headingBlock}>
                <Text style={styles.headingText}>Exclusive Rooms</Text>
                <Ripple rippleDuration={600} onPress={navigateDetails}>
                    <Text style={styles.caption}>View More</Text>
                </Ripple>
            </View>
            {data.map((item) => loaded === false ? <ExclusiveRoomsSK key={item + 1} pending={true} /> : <RoomsListSmall key={item.alias} navigate={() => navigateHotelDetails(item.alias, item.id, item.is_favorite)} image={item.image[0].file} rating={item.avg_rating} token={props.common.userData.access_token} hotelId={item.id} hotelName={item.title} address={item.alias} cost={item.price_start}  oldCost={Number(item.price_start) + 200} is_favourite={item.is_favorite} /> )}
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
    return bindActionCreators({loadPrices:loadPrices, removeServices: removeServices, serviceChecked: serviceChecked}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ExclusiveRooms));