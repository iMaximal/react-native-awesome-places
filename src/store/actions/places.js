import { SET_PLACES, REMOVE_PLACE, PLACE_ADDED, START_ADD_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const startAddPlace = () => {
  return {
    type: START_ADD_PLACE,
  };
};

export const addPlace = (placeName, location, image) => {
  return (dispatch) => {
    let authToken = null;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert('No valid token found!');
      })
      .then((token) => {
        authToken = token;
        return fetch('https://us-central1-react-native-awe-1526404146569.cloudfunctions.net/storeImage', {
          method: 'POST',
          body: JSON.stringify({
            image: image.base64,
          }),
          headers: {
            'Authorization': `Bearer ${authToken}`
          },
        })
      })
      .catch(error => {
        console.log(error);
        alert('Something went wrong, please try again!');
        dispatch(uiStopLoading());
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then(parsedRes => {
        const placeData = {
          name: placeName,
          location,
          image: parsedRes.imageUrl,
          imagePath: parsedRes.imagePath,
        };
        return fetch(`https://react-native-awe-1526404146569.firebaseio.com/places.json?auth=${authToken}`, {
          method: 'POST',
          body: JSON.stringify(placeData),
        });
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((parsedRes) => {
        console.log(parsedRes);
        dispatch(uiStopLoading());
        dispatch(placeAdded());
      })
      .catch(error => {
        console.log(error);
        alert('Something went wrong, please try again!');
        dispatch(uiStopLoading());
      });
  };
};

export const placeAdded = () => {
  return {
    type: PLACE_ADDED,
  };
};

export const getPlaces = () => {
  return (dispatch) => {
    let authToken;
    dispatch(authGetToken())
      .then((token) => {
        authToken = token;
        return fetch(`https://react-native-awe-1526404146569.firebaseio.com/places.json?auth=${token}`);
      })
      .catch(() => {
        alert('No valid token found!');
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((parsedRes => {
        const places = [];
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image + '?alt=media&token=' + authToken, // todo
            },
            key,
          });
        }
        dispatch(setPlaces(places));
      }))
      .catch((error) => {
        alert('Something went wrong, sorry!');
        console.log(error);
      });
  };
};

export const setPlaces = (places) => {
  return {
    type: SET_PLACES,
    places,
  };
};

export const deletePlace = (key) => {
  return (dispatch) => {
    dispatch(authGetToken())
      .catch(() => {
        alert('No valid token found!');
      })
      .then((token) => {
        dispatch(removePlace(key));
        return fetch(`https://react-native-awe-1526404146569.firebaseio.com/places/${key}.json?auth=${token}`, {
          method: 'DELETE',
        });
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((parsedRes) => {
        console.log('Done!');
      })
      .catch((error) => {
        alert('Something went wrong, sorry!');
        console.log(error);
      });
  };
};

export const removePlace = (key) => {
  return {
    type: REMOVE_PLACE,
    key,
  };
};
