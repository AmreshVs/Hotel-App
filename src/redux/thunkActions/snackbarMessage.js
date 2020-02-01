import { snackMessage } from '../actions/commonActions';
import store from '../stores/store';

const snackbarMessage = (msg, bgcolor = '#484848') => {
    store.dispatch(snackMessage({visible: true, message: msg, backgroundColor: bgcolor}));
    setTimeout(() => {
        store.dispatch(snackMessage({visible: false, message: '', backgroundColor: bgcolor}));
    }, 2000);
}

export default snackbarMessage;