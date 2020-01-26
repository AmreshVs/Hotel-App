import axios from 'axios';

const LoadAllReviews = async (id, token) => {
    return await axios({
        method: 'GET',
        url: 'https://pandaapi.amreshrepos.ml/api/v1/get-all-reviews?hotel_id='+id,
        headers:{
            'Authorization': token
        }
    })
    .then(function (response) {
        return response.data.data;
    })
    .catch(function (error) {
        return error.response.data;
    });
}

export default LoadAllReviews;