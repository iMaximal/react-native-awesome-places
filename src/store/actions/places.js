import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (placeName, location, image) => {
  return (dispatch) => {
    const placeData = {
      name: placeName,
      location,
    };
    fetch('https://react-native-awe-1526404146569.firebaseio.com/places.json', {
      method: 'POST',
      body: JSON.stringify(placeData),
    })
      .catch((error) => console.log(error))
      .then((res) => res.json())
      .then((parsedRes) => {
        console.log(parsedRes);
      });
  };
};

export const deletePlace = (key) => {
  return {
    type: DELETE_PLACE,
    placeKey: key,
  };
};
