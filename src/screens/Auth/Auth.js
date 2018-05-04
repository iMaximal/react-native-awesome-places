import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultImport from '../../components/UI/DefaultInput/DefaultInput';

class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs();
  };

  render() {
    return (
      <View style={ styles.container }>
        <Text>Please Log In</Text>
        <Button title="Switch to Login" />
        <View style={ styles.inputContainer}>
          <DefaultImport placeholder="Your E-Mail Address" />
          <DefaultImport placeholder="Password" />
          <DefaultImport placeholder="Confirm Password" />
        </View>
        <Button title="Submit" onPress={this.loginHandler} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
});

export default AuthScreen;
