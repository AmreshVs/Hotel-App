import { snackMessage } from '../actions/commonActions';
import store from '../stores/store';

const snackbarMessage = (msg) => {
    store.dispatch(snackMessage({visible: true, message: msg}));
    setTimeout(() => {
        store.dispatch(snackMessage({visible: false, message: ''}));
    }, 2000);
}

export default snackbarMessage;