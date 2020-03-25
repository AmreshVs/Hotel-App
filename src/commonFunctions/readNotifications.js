import { API_URL } from '../constants/index';
import axios from 'axios';

const ReadNotification = async (data, token) => {
  return await axios({
    url: API_URL + '/read-notifications',
    method: 'POST',
    headers:{
      "Authorization" : token,
      "Content-Type": "application/json"
    },
    data: data
  })
  .then(function (response) {
    return true;
  })
  .catch(function (error) {
    return false;
  });
}

export default ReadNotification;