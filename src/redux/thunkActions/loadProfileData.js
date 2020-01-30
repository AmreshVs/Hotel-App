import axios from 'axios';

const LoadProfileData = async (token) => {
    return await axios({
        method: 'GET',
        url: 'https://pandaapi.amreshrepos.ml/api/v1/profile-view',
        headers:{
            'Accept-Language' : 'en',
            'Authorization': token,
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    .then(function (response) {
        return response.data.data;
    })
    .catch(function (error) {
        return error.response.data;
    });
}

export default LoadProfileData;