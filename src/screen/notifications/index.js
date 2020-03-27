import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { withNavigation } from 'react-navigation';
import { NavigationEvents } from 'react-navigation';
import { TopNavigationAction, Icon, Text, StyleService, useStyleSheet } from '@ui-kitten/components';
import Ripple from 'react-native-material-ripple';

import Notifications from '../../components/notifications/index';
import NotificationsSK from '../../components/skeletons/notificationsSK';
import TopNavSimple from '../../components/navigation/topNavSimple';
import ViewNotifications from '../../commonFunctions/viewNotifications';

const NotificationsScreen = (props) => {
  const styles = useStyleSheet(themedStyles);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function loadData(){
      const response = await ViewNotifications(props.access_token);
      setData(response.length > 0 ? response : -1);
    }
    loadData();
  }, [])

  const reloadData = async () => {
    setData([]);
    const response = await ViewNotifications(props.access_token);
    setData(response.length > 0 ? response : -1);
  }

  const RefreshIcon = () => <Icon name='refresh-outline' fill='#FFF' />;

  const RefreshAction = () => (
    <Ripple onPress={reloadData}>
      <TopNavigationAction icon={RefreshIcon} />
    </Ripple>
  );

  const NoData = () => {
    return(
      <View style={styles.noData}>
        <Text>No notification at this time!</Text>
      </View>
    )
  }

  return (
    <View style={styles.backContainer}>
      <NavigationEvents
        onWillFocus={reloadData}
      />
      <TopNavSimple screenTitle='Notifications' backHandler={() => props.navigation.goBack()} rightControl={true} rightControlFun={RefreshAction} />
      <ScrollView contentContainerStyle={styles.container} showsHorizontalScrollIndicator={false}>
        { data === -1 ? <NoData/> : data.length === 0 ? <NotificationsSK/> : <Notifications data={data} token={props.access_token} reload={reloadData} />}
      </ScrollView>
    </View>
  )
}

const mapStateToProps = (state) => {
  return state.common.userData;
}

export default connect(mapStateToProps)(withNavigation(NotificationsScreen));

const themedStyles = StyleService.create({
  backContainer:{
    backgroundColor: 'background-basic-color-1',
    height: '100%',
  },
  container:{
    alignItems: 'center',
    paddingBottom: 10
  },
  noData:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 700,
  },
})