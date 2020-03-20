import { API_URL } from '../constants/index';
import axios from 'axios';

const SaveNotification = (data, token) => {
  axios({
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
    console.log(error.response.data);
  });
}

export default SaveNotification;