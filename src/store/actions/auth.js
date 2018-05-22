import { AsyncStorage } from 'react-native';
import { TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN } from './actionTypes';
import { API_AUTH_KEY } from './constants';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import App from '../../../App';

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
        if (!parsedRes.idToken) {
          alert('Authentication failed, please try again!');
        } else {
          dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken));
          startMainTabs();
        }
      })
      .catch((error) => {
        dispatch(uiStopLoading());
        alert('Server error. Please, try again late.');
      });
  };
};

export const authStoreToken = (token, expiresIn, refreshToken) => {
  return (dispatch) => {
    dispatch(authSetToken(token));
    const now = new Date();
    const expiryDate = now.getTime() + (expiresIn * 1000);
    AsyncStorage.setItem('ap:auth:token', token);
    AsyncStorage.setItem('ap:auth:expiryDate', String(expiryDate));
    AsyncStorage.setItem('ap:auth:refreshToken', refreshToken);
  };
};

export const authSetToken = (token) => {
  return {
    type: AUTH_SET_TOKEN,
    token,
  };
};

export const authGetToken = () => {
  return (dispatch, getState) => {
    const promise = new Promise((resolve, reject) => {
      const token = getState().auth.token;
      if (!token) {
        let fetchedToken = null;
        AsyncStorage.getItem('ap:auth:token')
          .catch((error) => reject())
          .then((tokenFromStorage) => {
            fetchedToken = tokenFromStorage;
            if (!tokenFromStorage) {
              reject();
              return;
            }
            return AsyncStorage.getItem('ap:auth:expiryDate');
          })
          .then((expiryDate) => {
            const parsedExpiryDate = new Date(parseInt(expiryDate));
            const now = new Date();
            if (parsedExpiryDate > now) {
              dispatch(authSetToken(fetchedToken));
              resolve(fetchedToken);
            } else {
              reject();
            }
          })
          .catch((error) => reject());
      } else {
        resolve(token);
      }
    });
    return promise
      .catch((error) => {
        return AsyncStorage.getItem('ap:auth:refreshToken')
          .then((refreshToken) => {
            return fetch(`https://securetoken.googleapis.com/v1/token?key=${API_AUTH_KEY}`, {
              method: 'POST',
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
            });
          })
          .then((res) => res.json())
          .then((parsedResponse) => {
            if (parsedResponse.id_token) {
              console.log('Refresh token worked!');
              dispatch(
                authStoreToken(
                  parsedResponse.id_token,
                  parsedResponse.expires_in,
                  parsedResponse.refresh_token
                ));
              return parsedResponse.id_token;
            } else {
              dispatch(authClearStorage());
            }
          });
      })
      .then((token) => {
        if (!token) {
          throw(new Error());
        } else {
          return token;
        }
      });
  };
};

export const authAutoSignIn = () => {
  return (dispatch) => {
    dispatch(authGetToken())
      .then((token) => {
        startMainTabs();
      })
      .catch((error) => console.log('Failed to fetch token!'));
  };
};

export const authClearStorage = () => {
  return (dispatch) => {
    AsyncStorage.removeItem('ap:auth:token');
    AsyncStorage.removeItem('ap:auth:expiryDate');
    return AsyncStorage.removeItem('ap:auth:refreshToken');
  };
};

export const authLogout = () => {
  return (dispatch) => {
    dispatch(authClearStorage())
      .then(() => App());
    dispatch(authRemoveToken());
  };
};

export const authRemoveToken = () => {
  return {
    type: AUTH_REMOVE_TOKEN,
  };
};
