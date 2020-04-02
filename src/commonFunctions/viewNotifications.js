import { API_URL } from '../constants/index';
import axios from 'axios';

const ViewNotification = async (token) => {
  return await axios({
    url: API_URL + '/user-notifications',
    method: 'GET',
    headers:{
      "Authorization" : token,
    },
  })
  .then(function (response) {
    return response.data.data;
  })
  .catch(function (error) {
    // console.log(error);
  });
}

export default ViewNotification;