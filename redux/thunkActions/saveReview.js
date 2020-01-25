import {saveReview} from '../actions/hotelDetailActions';
import axios from 'axios';

const saveReviewRating = (data, token) => {
  return dispatch => {
    dispatch(saveReview({error: false, message: ''}));
    axios({
      method: 'POST',
      url: 'https://pandaapi.amreshrepos.ml/api/v1/add-rating',
      headers: {
        Authorization: token,
      },
      data: data,
    })
      .then(function(response) {
        dispatch(saveReview({error: false, message: 'success'}));
      })
      .catch(function(error) {
        dispatch(
          saveReview({
            error: true,
            message: Object.values(error.response.data.error)[0][0],
          }),
        );
      });
  };
};

export default saveReviewRating;
