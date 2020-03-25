import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {mapping} from '@eva-design/eva';
import 'react-native-gesture-handler';
import OneSignal from 'react-native-onesignal';
import {Platform, AppRegistry} from 'react-native';
import {Provider} from 'react-redux';

import { default as appTheme } from './src/theme/light.json';
import store from './src/redux/stores/store';
import Main from './src/components/main/index';

import axios from 'axios';

const App = () => {

  React.useEffect(() => {
    OneSignal.init("9cf8c27d-0a89-4e7d-bb2a-d24e8bfd03ab");

    // OneSignal.addEventListener('received', this.onReceived);
    // OneSignal.addEventListener('opened', this.onOpened);
    // OneSignal.addEventListener('ids', onIds);

  }, [])

  // const onIds = (data) => {console.log(data);}

  // var message = { 
  //   app_id: "9cf8c27d-0a89-4e7d-bb2a-d24e8bfd03ab",
  //   headings: {"en": 'Test'},
  //   // subtitle: {"en": "Chech to approve or cancel!"},
  //   contents: {"en": 'Notification'},
  //   include_player_ids: ["68867ecb-7bc0-479b-b795-0fcb697e5e47"],
  //   data: {id: '100'},
  //   buttons: [{"id": "notify-cancel", "text": "Cancel", "action": "CancelBooking"}, {"id": "notify-approve", "text": "Approve", "action": "ApproveBooking"}],
  //   // big_picture: "http://i.imgur.com/N8SN8ZS.png",
  // };

  // axios({
  //   method: 'POST',
  //   url: 'https://onesignal.com/api/v1/notifications',
  //   headers:{
  //     "Content-Type": "application/json; charset=utf-8"
  //   },
  //   data: message,
  // })
  // .then(function (response) {
  //   console.log(response.data);
  // })
  // .catch(function (error) {
  //   console.log(error.response.data);
  // });

  return (
    <React.Fragment>
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={appTheme}>
          <Main/>
        </ApplicationProvider>
      </Provider>
    </React.Fragment>
  );
};

if (Platform.OS === 'web') {
  AppRegistry.runApplication('Darpad', {
    rootTag: document.getElementById('root'),
  });
}

export default App;

AppRegistry.registerComponent('Darpad', () => App);