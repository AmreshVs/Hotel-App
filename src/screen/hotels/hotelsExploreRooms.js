import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import RoomsListSmall from '../../components/rooms/roomsListSmall';
import TopNavSimple from '../../components/navigation/topNavSimple';
import ExclusiveRoomsSK from '../../components/skeletons/exclusiveRoomsSK';
import LoadExclusiveRoomsData from '../../redux/thunkActions/loadExclusiveRoomsData';
import { loadPrices, removeServices, serviceChecked } from '../../redux/actions/hotelDetailActions';

const HotelsLargeListScreen = (props) => {

  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    async function loadDatas(){
      const response = await LoadExclusiveRoomsData(props.common.userData.access_token);
      setData(response);
      setLoading(false);
    }
    if(loading === true){
        loadDatas();
    }
  }, []);

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

  const RenderSK = () => {
    return(
      <View>
        <ExclusiveRoomsSK/>
        <ExclusiveRoomsSK/>
        <ExclusiveRoomsSK/>
        <ExclusiveRoomsSK/>
      </View>
    )
  }

  return (
    <SafeAreaView>
      <TopNavSimple screenTitle="Explore Rooms" />
      <ScrollView showsVerticalScrollIndicator={false} style={{paddingTop: 20}}>
        {loading === true ? <RenderSK/> : data.map((item) => <RoomsListSmall key={item.alias} navigate={() => navigateHotelDetails(item.alias, item.id, item.is_favourite)} image={item.image[0].file} rating={item.avg_rating} token={props.common.userData.access_token} hotelId={item.id} hotelName={item.title} address={item.alias} cost={item.price_start}  oldCost={(item.price_start) + 200}  is_favourite={item.is_favorite} /> )}
        <View style={{marginBottom: 80}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({loadPrices:loadPrices, removeServices: removeServices, serviceChecked: serviceChecked}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(HotelsLargeListScreen));