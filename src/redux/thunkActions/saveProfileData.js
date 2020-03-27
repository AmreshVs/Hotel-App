import axios from 'axios';
import { API_URL } from '../../constants';
import Logout from '../../commonFunctions/logout';

const LoadProfileData = async (token, data) => {
  return await axios({
    method: 'POST',
    url: API_URL + '/profile-update',
    headers: {
      'Authorization': token,
    },
    data: data
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.response.data.message === 'Please Login to Continue') {
        Logout();
      }
      return error.response.data;
    });
}

export default LoadProfileData;