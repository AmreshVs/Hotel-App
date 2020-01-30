import axios from 'axios';

const LoadProfileData = async (token, data) => {
    return await axios({
        method: 'POST',
        url: 'https://pandaapi.amreshrepos.ml/api/v1/profile-update',
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