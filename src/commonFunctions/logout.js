import { AsyncStorage } from 'react-native';
import * as Navigation from '../components/navigation/rootNavigation';

const Logout = async () => {
  const userData = await AsyncStorage.removeItem('@Darpad:userData');
  if (userData === null) {
    Navigation.navigate('LoginScreen');
  }

}

export default Logout;