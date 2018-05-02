import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ListItem from '../ListItem/ListItem';

const placeList = (props) => {
  return (
    <FlatList
      style={ styles.listContainer }
      data={props.places}
      keyExtractor={item => item.key}
      renderItem={(place) => (
        <ListItem
          placeName={ place.item.name }
          placeImage={ place.item.image }
          onItemPressed={ () => props.onItemSelected(place.item.key) }
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default placeList;

