import React from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { mapping } from '@eva-design/eva';
import 'react-native-gesture-handler';
import OneSignal from 'react-native-onesignal';
import { Platform, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import { default as appTheme } from './src/theme/light.json';
import store from './src/redux/stores/store';
import Main from './src/components/main/index';

const App = () => {

  React.useEffect(() => {
    OneSignal.init("9cf8c27d-0a89-4e7d-bb2a-d24e8bfd03ab");
  }, [])

  return (
    <React.Fragment>
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={appTheme}>
          <Main />
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