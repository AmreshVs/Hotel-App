import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { useStyleSheet } from '@ui-kitten/components';

import style from './styles';
import SearchHotelCard from '../../components/home/searchHotelCard';
import Head from '../../components/home/head';
import RecommendedRooms from '../../components/home/recommenedRooms';
import ExclusiveRooms from '../../components/home/exclusiveRooms';
import LoadHomeData from '../../redux/thunkActions/loadHomeData';
import CheckUserData from '../../commonFunctions/checkUserData';

const HomeScreen = (props) => {
  
  const styles = useStyleSheet(style);
  const [data, setData] = React.useState({});

  useEffect(() => {
    CheckUserData(props.userData);
    async function loadDatas(){
      const response = await LoadHomeData(props.userData.access_token);
      setData(response);
    }
    loadDatas();
    
    props.navigation.addListener('focus', () => {
      reloadData();
    })

  }, [])

  const reloadData = async () => {
    CheckUserData(props.userData);
    setData({});
    const rdata = await LoadHomeData(props.userData.access_token);
    setData(rdata);
  }

  return (
    <ScrollView style={styles.statusBarTop} showsVerticalScrollIndicator={false}>
      <Head/>
      <SearchHotelCard/>
      <RecommendedRooms data={data.recommended} />
      <ExclusiveRooms data={data.exclusive} />
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return state.common;
}

export default connect(mapStateToProps)(React.memo(HomeScreen));
