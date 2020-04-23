import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import TopNavSimple from '../../components/navigation/topNavSimple';
import LoadProfileData from '../../redux/thunkActions/loadProfileData';
import ProfileView from '../../components/profile/profileView';
import ProfileEdit from '../../components/profile/profileEdit';
import ProfileSK from '../../components/skeletons/ProfileSK';

const UserProfileScreen = (props) => {

  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  const [edit, setEdit] = React.useState(false);

  const handleClick = () => {
    setEdit(!edit);
  }

  useEffect(() => {
    async function loadDatas() {
      const response = await LoadProfileData(props.access_token);
      setData(response);
    }
    loadDatas();
    navigation.addListener('focus', () => {
      reloadData();
    });
  }, []);

  const reloadData = async () => {
    setData([]);
    const response = await LoadProfileData(props.access_token);
    setData(response);
  }

  return (
    <View>
      <TopNavSimple screenTitle='User Profile' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {data.length <= 0 ? <ProfileSK /> : (edit === false ? <ProfileView data={data} handleClick={handleClick} /> : <ProfileEdit data={data} handleClick={handleClick} reloadData={reloadData} />)}
        </View>
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return state.common.userData;
}

export default connect(mapStateToProps)(UserProfileScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  }
});