import axios from 'axios';

const LoadHomeData = async token => {
  return await axios({
    method: 'GET',
    url: 'https://pandaapi.amreshrepos.ml/api/v1/home',
    headers: {
      'Accept-Language': 'en',
      Authorization: token,
    },
  })
    .then(function(response) {
      return response.data.data;
    })
    .catch(function(error) {
      return error.response.data;
    });
};

export default LoadHomeData;
