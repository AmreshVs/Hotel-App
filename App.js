import React from 'react';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import 'react-native-gesture-handler';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {mapping, light as theme} from '@eva-design/eva';
// import { default as appTheme } from './custom-theme.json';
import {TabNavigator} from './components/navigation/index';
import {Platform, AppRegistry, View, StyleSheet, StatusBar} from 'react-native';
import store from './redux/stores/store';
import {Provider} from 'react-redux';
import {enableScreens} from 'react-native-screens';
// if(__DEV__) {
//   import('./reactronConfig').then(() => console.log('Reactotron Configured'))
// }

const App = () => {
  enableScreens();
  return (
    <React.Fragment>
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={theme}>
          <StatusBar barStyle="light-content" />
          {/* <View style={styles.statusBar} /> */}
          <TabNavigator />
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

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#3366FF',
    height: StatusBar.currentHeight,
  },
});

export default App;

AppRegistry.registerComponent('JR Jungle Resort', () => App);
