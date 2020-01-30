import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ScrollView } from 'react-native';
import TopNavSimple from '../../components/navigation/topNavSimple';
import { withNavigation } from 'react-navigation';
import LoadProfileData from '../../redux/thunkActions/loadProfileData';
import ProfileView from '../../components/profile/profileView';
import ProfileEdit from '../../components/profile/profileEdit';
import ProfileSK from '../../components/skeletons/ProfileSK';
import { NavigationEvents } from 'react-navigation';

const UserProfileScreen = (props) => {

    const [data, setData] = React.useState([]);
    const [edit, setEdit] = React.useState(false);

    const handleClick = () => {
        setEdit(!edit);
    }

    useEffect(() => {
      async function loadDatas(){
        const response = await LoadProfileData(props.access_token);
        setData(response);
      }
      loadDatas();
    }, []);

    const reloadData = async () => {
        setData([]);
        const response = await LoadProfileData(props.access_token);
        setData(response);
    }

    return(
        <View>
            <NavigationEvents
                onWillFocus={reloadData}
            />
            <TopNavSimple screenTitle='User Profile' backHandler={() => navigation.goBack()} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    {data.length <= 0 ? <ProfileSK/> : (edit === false ? <ProfileView data={data} handleClick={handleClick}/> : <ProfileEdit data={data} handleClick={handleClick} reloadData={reloadData}/>) }
                </View>
            </ScrollView>          
        </View>
    );
}

const mapStateToProps = (state) => {
    return state.common.userData;
}

export default connect(mapStateToProps)(withNavigation(UserProfileScreen));

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
    }
});