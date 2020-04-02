import axios from 'axios';
import { API_URL } from '../constants/index';

const GetOneSignalAdminId = async (token) => {
  return await axios({
    method: 'GET',
    url: API_URL + '/onesignal-adminid',
    headers:{
      "Authorization": token
    },
  })
  .then(function (response) {
    return response.data.data;
  })
  .catch(function (error) {
    return error.response.data;
  });
}

export default GetOneSignalAdminId;
