import { API_URL } from '../../constants/index';
import axios from 'axios';
import Logout from '../../commonFunctions/logout';

const CancelBooking = async (id, token) => {
  return await axios({
    method: 'POST',
    url: API_URL + '/cancel-booking',
    headers: {
      'Accept-Language': 'en',
      'Authorization': token
    },
    data: {
      booking_id: id
    }
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.response.data.message === 'Please Login to Continue') {
        Logout();
      }
      return error.response;
    });
}

export default CancelBooking;