import axios from 'axios';
import { API_URL } from '../../constants';
import Logout from '../../commonFunctions/logout';

const FindHotels = async (data, token) => {
  return await axios({
    method: 'POST',
    url: API_URL + '/find-hotels',
    headers: {
      'Accept-Language': 'en',
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    data: data
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

export default FindHotels;