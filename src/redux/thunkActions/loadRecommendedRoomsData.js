import axios from 'axios';
import { API_URL } from '../../constants';
import Logout from '../../commonFunctions/logout';

const LoadRecommendedRoomsData = async (token) => {
  return await axios({
    method: 'GET',
    url: API_URL + '/view-recommended',
    headers: {
      'Accept-Language': 'en',
      'Authorization': token
    }
  })
    .then(function (response) {
      return response.data.data.recommended;
    })
    .catch(function (error) {
      if (error.response.data.message === 'Please Login to Continue') {
        Logout();
      }
      return error.response.data;
    });
}

export default LoadRecommendedRoomsData;