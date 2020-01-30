import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text } from '@ui-kitten/components';
import { View, ScrollView } from 'react-native';
import Ripple from 'react-native-material-ripple';
import RoomsListLarge from '../rooms/roomsListLarge';
import styles from './styles';
import { withNavigation } from 'react-navigation';
import RecommendedRoomsSK from '../skeletons/recommendedRoomsSK';
import { loadPrices } from '../../redux/actions/hotelDetailActions';

const RecommendedRooms = (props) => {

    const navigateDetails = () => {
        props.navigation.navigate('HotelsLargeList');
    }

    const navigateHotelDetails = (alias, id, is_favorite) => {
        props.navigation.navigate('HotelsDetail',{
            alias: alias,
            hotelId: id,
            is_favorite: is_favorite
        });
        props.loadPrices({});
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
                <Text style={styles.headingText}>Recommended Rooms</Text>
                <Ripple rippleDuration={600} onPress={navigateDetails}>
                    <Text style={styles.caption}>View More</Text>
                </Ripple>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {data.map((item) => loaded === false ? <RecommendedRoomsSK key={item + 1} pending={true} /> : <RoomsListLarge key={item.alias} navigate={() => navigateHotelDetails(item.alias, item.id, item.is_favorite)} image={item.image[0].file} rating={item.avg_rating} token={props.common.userData.access_token} hotelId={item.id} hotelName={item.title} cost={item.price_start} oldCost={Number(item.price_start) + 200} pending={false} is_favourite={item.is_favorite} /> )}
            </ScrollView>
        </View>
    );
}

const mapStateToProps = (state) => {
    return state;
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loadPrices:loadPrices}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(RecommendedRooms));