import React from 'react';
import { bindActionCreators } from 'redux';
import { View, ScrollView } from 'react-native';
import { Icon, Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import TopNavSimple from '../../components/navigation/topNavSimple';
import FavouriteHotels from '../../components/favouriteHotels/index';
import GetFavourites from '../../redux/thunkActions/getFavourites';
import { clearData } from '../../redux/actions/hotelDetailActions';
import FavouriteHotelSK from '../../components/skeletons/favouriteHotelSK';
import CheckUserData from '../../commonFunctions/checkUserData';

const NoFavourites = () => {

  const styles = useStyleSheet(style);

  return (
    <View style={styles.noDataContainer}>
      <Text style={styles.noDataText}>No </Text>
      <Icon name='heart' width={30} height={30} fill='red' />
      <Text style={styles.noDataText}> Favourites has been added yet!</Text>
    </View>
  );
}

const FavouritesScreen = (props) => {

  const navigation = useNavigation();
  const styles = useStyleSheet(style);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    CheckUserData(props.userData);
    async function loadDatas() {
      setLoading(true);
      const response = await GetFavourites(props.userData.access_token);
      setData(response);
      setLoading(false);
    }
    loadDatas();
    navigation.addListener('focus', () => {
      reloadData();
    });
  }, []);

  const reloadData = async () => {
    CheckUserData(props.userData);
    setLoading(true);
    setData([]);
    const response = await GetFavourites(props.userData.access_token);
    setData(response);
    setLoading(false);
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
    <View style={styles.bodyContainer}>
      <TopNavSimple screenTitle='Favourite Rooms' backHandler={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.favourites} >
        {loading === true ?
          [1, 2, 3].map((item) => <FavouriteHotelSK key={item} />)
          :
          (data.length === 0 ? <NoFavourites /> : data.map((item) => <FavouriteHotels key={item.id} alias={item.alias} navigate={() => navigateHotelDetails(item.alias, item.id, item.is_favorite)} reloadData={reloadData} hotelId={item.id} image={item.image[0].file} hotelName={item.title} price={item.price_start} rating={item.avg_rating} token={props.access_token} />))}
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return state.common;
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ clearData: clearData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(FavouritesScreen));

const style = StyleService.create({
  bodyContainer: {
    backgroundColor: 'background-basic-color-1',
    height: '100%',
  },
  noDataContainer: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: 'color-basic-700',
  },
  favourites: {
    paddingTop: 10,
  }
});