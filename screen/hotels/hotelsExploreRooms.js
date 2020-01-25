import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { withNavigation } from 'react-navigation';
import RoomsListSmall from '../../components/rooms/roomsListSmall';
import TopNavSimple from '../../components/navigation/topNavSimple';
import ExclusiveRoomsSK from '../../components/skeletons/exclusiveRoomsSK';
import LoadExclusiveRoomsData from '../../redux/thunkActions/loadExclusiveRoomsData';
import { loadPrices } from '../../redux/actions/hotelDetailActions';

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

  const navigateHotelDetails = (alias) => {
    props.navigation.navigate('HotelsDetail',{
      alias: alias
    });
    props.loadPrices({});
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
        {loading === true ? <RenderSK/> : data.map((item) => <RoomsListSmall key={item.alias} navigate={() => navigateHotelDetails(item.alias)} image={item.image[0].file} rating={item.avg_rating} hotelName={item.title} address={item.alias} cost={item.price_start}  oldCost={(item.price_start) + 200} /> )}
        <View style={{marginBottom: 80}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({loadPrices: loadPrices}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(HotelsLargeListScreen));