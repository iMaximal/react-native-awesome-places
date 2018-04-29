import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import ListItem from '../ListItem/ListItem';

const placeList = (props) => {
  const placesOutput = props.places.map((place, index) => (
    <ListItem
      key={ index }
      placeName={ place }
      onItemPressed={ () => props.onItemDeleted(index) }
    />
  ));

  return (
    <ScrollView
      style={ styles.listContainer }
    >
      { placesOutput }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default placeList;