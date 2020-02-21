import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {mapping} from '@eva-design/eva';
import 'react-native-gesture-handler';
import { default as appTheme } from './src/theme/light.json';
import {Platform, AppRegistry} from 'react-native';
import store from './src/redux/stores/store';
import {Provider} from 'react-redux';
import Main from './src/components/main/index';
import OneSignal from 'react-native-onesignal';

const App = () => {

  React.useEffect(() => {
    OneSignal.init("9cf8c27d-0a89-4e7d-bb2a-d24e8bfd03ab");

    // OneSignal.addEventListener('received', this.onReceived);
    // OneSignal.addEventListener('opened', this.onOpened);
    // OneSignal.addEventListener('ids', this.onIds);
  }, [])

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