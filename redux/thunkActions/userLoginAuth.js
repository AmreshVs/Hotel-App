import axios from 'axios';

const UserLoginAuth = async data => {
  return await axios({
    method: 'POST',
    url: 'https://pandaapi.amreshrepos.ml/api/v1/login',
    data: data,
  })
    .then(function(response) {
      return response.data.data;
    })
    .catch(function(error) {
      console.log(error.response);
    });
};

export default UserLoginAuth;
