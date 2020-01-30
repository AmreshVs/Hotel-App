import axios from 'axios';

const FindHotels = async (data, token) => {
    return await axios({
        method: 'POST',
        url: 'https://pandaapi.amreshrepos.ml/api/v1/find-hotels',
        headers:{
            'Accept-Language' : 'en',
            'Authorization': token,
            'Content-Type': 'application/json'
        },
        data: data
    })
    .then(function (response) {
        return response.data.data;
    })
    .catch(function (error) {
        return error.response.data;
    });
}

export default FindHotels;