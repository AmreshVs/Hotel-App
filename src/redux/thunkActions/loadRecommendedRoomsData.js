import axios from 'axios';
import { API_URL } from '../../constants';

const LoadRecommendedRoomsData = async (token) => {
    return await axios({
        method: 'GET',
        url: API_URL + '/view-recommended',
        headers:{
            'Accept-Language' : 'en',
            'Authorization': token
        }
    })
    .then(function (response) {
        return response.data.data.recommended;
    })
    .catch(function (error) {
        return error.response.data;
    });
}

export default LoadRecommendedRoomsData;