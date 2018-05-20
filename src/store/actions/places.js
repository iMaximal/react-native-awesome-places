import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

export const addPlace = (placeName, location, image) => {
  return (dispatch) => {
    dispatch(uiStartLoading());
    fetch('https://us-central1-react-native-awe-1526404146569.cloudfunctions.net/storeImage', {
      method: 'POST',
      body: JSON.stringify({
        image: image.base64,
      }),
    })
      .catch(error => {
        console.log(error);
        alert('Something went wrong, please try again!');
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        const placeData = {
          name: placeName,
          location,
          image: parsedRes.imageUrl,
        };
        return fetch('https://react-native-awe-1526404146569.firebaseio.com/places.json', {
          method: 'POST',
          body: JSON.stringify(placeData),
        })
          .catch(error => {
            console.log(error);
            alert('Something went wrong, please try again!');
            dispatch(uiStopLoading());
          })
          .then((res) => res.json())
          .then((parsedRes) => {
            console.log(parsedRes);
            dispatch(uiStopLoading());
          });
      });
  };
};

export const getPlaces = () => {
  return (dispatch) => {
    fetch('https://react-native-awe-1526404146569.firebaseio.com/places.json')
      .catch((error) => {
        alert('Something went wrong, sorry!');
        console.log(error);
      })
      .then((res) => res.json())
      .then((parsedRes => {
        const places = [];
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            image: {
              uri: parsedRes[key].image,
            },
            key,
          });
        }
        dispatch(setPlaces(places));
      }));
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
    dispatch(removePlace(key));
    fetch('https://react-native-awe-1526404146569.firebaseio.com/places/' + key + '.json', {
      method: 'DELETE',
    })
      .catch((error) => {
        alert('Something went wrong, sorry!');
        console.log(error);
      })
      .then((res) => res.json())
      .then((parsedRes) => {
        console.log('Done!');
      });
  };
};

export const removePlace = (key) => {
  return {
    type: REMOVE_PLACE,
    key,
  };
};