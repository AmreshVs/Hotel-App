import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ScrollView, RefreshControl } from 'react-native';
import { useStyleSheet } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

import themedStyle from './styles';
import SearchHotelCardSK from '../../components/skeletons/searchHotelCardSK';
import SearchHotelCard from '../../components/home/searchHotelCard';
import Head from '../../components/home/head';
import RecommendedRooms from '../../components/home/recommenedRooms';
import ExclusiveRooms from '../../components/home/exclusiveRooms';
import LoadHomeData from '../../redux/thunkActions/loadHomeData';
import CheckUserData from '../../commonFunctions/checkUserData';

const HomeScreen = (props) => {

  const navigation = useNavigation();
  const styles = useStyleSheet(themedStyle);
  const [data, setData] = React.useState({});
  const [refresh, setRefresh] = React.useState(false);

  useEffect(() => {
    CheckUserData(props.userData);
    async function loadDatas(){
      const response = await LoadHomeData(props.userData.access_token);
      setData(response);
    }
    loadDatas();
    navigation.addListener('focus', () => {
      reloadData();
    });

    return () => {
      navigation.removeListener('focus');
    }
  }, [])

  const reloadData = async () => {
    setRefresh(true);
    CheckUserData(props.userData);
    const rdata = await LoadHomeData(props.userData.access_token);
    setData(rdata);
    setRefresh(false);
  }

  return (
    <ScrollView style={styles.statusBarTop} showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={reloadData}
        />
      }
    >
      <Animatable.View animation="fadeIn" direction="normal" duration={800} useNativeDriver={true} >
        <Head/>
      </Animatable.View>
      {data.price_range === undefined ? <SearchHotelCardSK/> : <SearchHotelCard data={data.price_range} /> }
      <RecommendedRooms data={data.recommended} />
      <ExclusiveRooms data={data.exclusive} />
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return state.common;
}

export default connect(mapStateToProps)(React.memo(HomeScreen));