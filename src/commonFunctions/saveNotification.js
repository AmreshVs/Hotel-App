import { API_URL } from '../constants/index';
import axios from 'axios';

const SaveNotification = async (data, token) => {
  return await axios({
    url: API_URL + '/save-notifications',
    method: 'POST',
    headers:{
      "Authorization" : token,
      "Content-Type": "application/json"
    },
    data: data,
  })
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    return error.response.data;
  });
}

export default SaveNotification;