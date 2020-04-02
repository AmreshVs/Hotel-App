import { API_URL } from '../../constants/index';
import axios from 'axios';
import Logout from '../../commonFunctions/logout';

const AddFavourite = async (data, token) => {
  return await axios({
    method: 'POST',
    url: API_URL + '/add-favourite',
    headers: {
      'Authorization': token
    },
    data: data,
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      if (error.response.data.message === 'Please Login to Continue') {
        Logout();
      }
      return error.response.data;
    });

}

export default AddFavourite;