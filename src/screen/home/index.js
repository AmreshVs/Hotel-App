import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import styles from './styles';
import SearchHotelCard from '../../components/home/searchHotelCard';
import Head from '../../components/home/head';
import RecommendedRooms from '../../components/home/recommenedRooms';
import ExclusiveRooms from '../../components/home/exclusiveRooms';
import LoadHomeData from '../../redux/thunkActions/loadHomeData';
import { NavigationEvents } from 'react-navigation';
import CheckUserData from '../../commonFunctions/checkUserData';

const HomeScreen = (props) => {

  const [data, setData] = React.useState({});

  useEffect(() => {
    CheckUserData(props.userData);
    async function loadDatas(){
      const response = await LoadHomeData(props.userData.access_token);
      setData(response);
    }
    loadDatas();
  }, [])

  const reloadData = async () => {
    CheckUserData(props.userData);
    setData({});
    const rdata = await LoadHomeData(props.userData.access_token);
    setData(rdata);
  }

  return (
    <ScrollView style={styles.statusBarTop} showsVerticalScrollIndicator={false}>
      <NavigationEvents
        onDidFocus={reloadData}
      />
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

export default connect(mapStateToProps)(HomeScreen);
