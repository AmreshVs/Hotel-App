import axios from 'axios';
import { API_URL } from '../../constants';
import Logout from '../../commonFunctions/logout';

const LoadFoodsBeverages = async (token, id, page = 1) => {
  return await axios({
    method: 'GET',
    url: API_URL + '/foodsBeverages?hotel_id=' + id + '&page=' + page,
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

export default LoadFoodsBeverages;