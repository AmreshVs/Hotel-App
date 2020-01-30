import axios from 'axios';

const AddFavourite = async (data, token) => {
    return await axios({
        method: 'POST',
        url: 'https://pandaapi.amreshrepos.ml/api/v1/add-favourite',
        headers:{
            'Authorization': token
        },
        data: data,
    })
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        return error.response.data;
    });

}

export default AddFavourite;