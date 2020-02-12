import axios from 'axios';
import { API_URL } from '../../constants';

const UserLoginAuth = async (data) => {
    return await axios({
        method: 'POST',
        url: API_URL + '/login',
        data: data,
    })
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return error.response;
    });

}

export default UserLoginAuth;