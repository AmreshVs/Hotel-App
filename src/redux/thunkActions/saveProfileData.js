import axios from 'axios';
import { API_URL } from '../../constants';

const LoadProfileData = async (token, data) => {
    return await axios({
        method: 'POST',
        url: API_URL + '/profile-update',
        headers:{
            'Authorization': token,
        },
        data: data
    })
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return error.response.data;
    });
}

export default LoadProfileData;