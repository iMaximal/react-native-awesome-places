import { TRY_AUTH } from './actionTypes';
import { API_AUTH_KEY } from './constants';
import { uiStartLoading, uiStopLoading} from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const tryAuth = (authData, authMode) => {
  return (dispatch) => {
    dispatch(uiStartLoading());

    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_AUTH_KEY}`;

    if (authMode === 'signup') {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_AUTH_KEY}`;
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .catch((error) => {
        console.log(error);
        dispatch(uiStopLoading());
        alert('Authentication failed, please try again!');
      })
      .then(res => res.json())
      .then((parsedRes) => {
        dispatch(uiStopLoading());
        if (parsedRes.error) {
          alert('Authentication failed, please try again!');
        } else {
          startMainTabs();
        }
      })
      .catch((error) => {
        dispatch(uiStopLoading());
        alert('Server error. Please, try again late.');
      });
  };
};
