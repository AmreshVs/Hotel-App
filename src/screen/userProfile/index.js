import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import TopNavSimple from '../../components/navigation/topNavSimple';
import LoadProfileData from '../../redux/thunkActions/loadProfileData';
import ProfileView from '../../components/profile/profileView';
import ProfileEdit from '../../components/profile/profileEdit';
import Loader from '../../components/loader';

const UserProfileScreen = (props) => {

  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  const [edit, setEdit] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const handleClick = () => {
    setEdit(!edit);
  }

  useEffect(() => {
    async function loadDatas() {
      const response = await LoadProfileData(props.access_token);
      setData(response);
      setLoading(false);
    }
    loadDatas();
    navigation.addListener('focus', () => {
      reloadData();
    });

    return () => {
      navigation.removeListener('focus');
    }
  }, []);

  const reloadData = async (status = false) => {
    if(status === true){
      navigation.navigate('HotelsDetail', {
        alias: props.route.params.alias,
        hotelId: props.route.params.hotelId,
        is_favorite: props.route.params.is_favorite
      });
    }
    setRefresh(true);
    const response = await LoadProfileData(props.access_token);
    setData(response);
    setRefresh(false);
  }

  return (
    <View>
      <TopNavSimple screenTitle='User Profile' />
      {loading === true ? 
        <Loader topBottom={true} />
        :
        <ScrollView showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={reloadData}
            />
          }
        >
          <View style={styles.container}>
            {(edit === false ? <ProfileView data={data} handleClick={handleClick} /> : <ProfileEdit data={data} handleClick={handleClick} reloadData={reloadData} />)}
          </View>
        </ScrollView>
      }
    </View>
  );
}

const mapStateToProps = (state) => {
  return state.common.userData;
}

export default connect(mapStateToProps)(UserProfileScreen);

const styles = StyleSheet.create({
  container: {
    height: '100%',
  }
});