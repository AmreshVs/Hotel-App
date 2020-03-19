import axios from 'axios';
import { API_URL } from '../../constants';

const FindHotels = async (data, token) => {
  return await axios({
    method: 'POST',
    url: API_URL + '/find-hotels',
    headers:{
      'Accept-Language' : 'en',
      'Authorization': token,
      'Content-Type': 'application/json'
    },
    data: data
  })
  .then(function (response) {
    return response.data.data;
  })
  .catch(function (error) {
    return error.response.data;
  });
}

export default FindHotels;