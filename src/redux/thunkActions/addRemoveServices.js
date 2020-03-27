import { addServices, removeServices } from '../../redux/actions/hotelDetailActions';

const AddRemoveServices = (type, services) => {
  return dispatch => {
    if (type === 'add') {
      dispatch(addServices(services));
    }
    else {
      dispatch(removeServices(services));
    }
  }
}

export default AddRemoveServices;