import { AsyncStorage } from 'react-native';
import NavigationService from '../components/navigation/navigationService';

const Logout = async () => {

  const userData = await AsyncStorage.removeItem('@Darpad:userData');
  if (userData === null) {
    NavigationService.navigate('LoginScreen');
  }

}

export default Logout;