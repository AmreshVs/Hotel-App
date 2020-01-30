import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {mapping, light as theme} from '@eva-design/eva';
// import { default as appTheme } from './custom-theme.json';
import {Platform, AppRegistry} from 'react-native';
import store from './src/redux/stores/store';
import {Provider} from 'react-redux';
import Main from './src/components/main/index';

const App = () => {
  return (
    <React.Fragment>
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={theme}>
          <Main/>
        </ApplicationProvider>
      </Provider>
    </React.Fragment>
  );
};

if (Platform.OS === 'web') {
  AppRegistry.runApplication('JR Jungle Resort', {
    rootTag: document.getElementById('root'),
  });
}

export default App;

AppRegistry.registerComponent('JR Jungle Resort', () => App);
