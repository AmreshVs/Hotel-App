import snackbarMessage from '../redux/thunkActions/snackbarMessage';

const CheckUserData = (data) => {

  const userData = data;
  const keys = [];
  if (Object.keys(userData).length > 0) {
    for(let item in userData){
      if (item !== 'access_token' && item !== 'oneSignalUserId' && item !== 'user_id') {
        if (userData[item] === null || userData[item] === '') {
          keys.push(item.charAt(0).toUpperCase() + item.slice(1));
        }
      }
    }
    if (keys.length > 0) {
      snackbarMessage('Please update ' + keys.join(',') + ' in your profile', '#e5b700');
    }
    return keys;
  }
}

export default CheckUserData;