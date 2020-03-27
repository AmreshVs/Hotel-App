import axios from 'axios';
import { API_URL } from '../../constants';
import Logout from '../../commonFunctions/logout';

const LoadHotelDetailsData = async (url, token) => {
  return await axios({
    method: 'GET',
    url: API_URL + '/view-hotel?alias=' + url,
    headers: {
      'Accept-Language': 'en',
      'Authorization': token
    }
  })
    .then(function (response) {
      return response.data.data;
    })
    .catch(function (error) {
      if (error.response.data.message === 'Please Login to Continue') {
        Logout();
      }
      return error.response.data;
    });
}

export default LoadHotelDetailsData;