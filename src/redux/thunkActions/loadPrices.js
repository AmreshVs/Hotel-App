import { loadPrices } from '../actions/hotelDetailActions';
import axios from 'axios';
import { API_URL } from '../../constants';
import Logout from '../../commonFunctions/logout';

const LoadPrices = (data, token) => {
  return dispatch => {
    dispatch(loadPrices({ pricesLoading: true, data: { data: [] } }));
    axios({
      method: 'POST',
      url: API_URL + '/choose-room',
      headers: {
        'Accept-Language': 'en',
        'Content-Type': 'application/json',
        'Authorization': token
      },
      data: data,
    })
      .then(function (response) {
        dispatch(loadPrices({ pricesLoading: false, data: response.data }));
      })
      .catch(function (error) {
        if (error.response.data.message === 'Please Login to Continue') {
          Logout();
        }
        dispatch(loadPrices({ pricesLoading: false, data: { data: [] }, error: error.response.data.message }));
      });
  }
}

export default LoadPrices;