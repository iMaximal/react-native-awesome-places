import React, { Component } from 'react';
import { View, Button, StyleSheet, ImageBackground } from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultImport from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import backgroundImage from '../../assets/background.jpg';

class AuthScreen extends Component {
  loginHandler = () => {
    startMainTabs();
  };

  render() {
    return (
      <ImageBackground
        source={ backgroundImage }
        style={ styles.backgroundImage }
      >
        <View style={ styles.container }>
          <MainText>
            <HeadingText>Please Log In</HeadingText>
          </MainText>
          <Button title="Switch to Login"/>
          <View style={ styles.inputContainer }>
            <DefaultImport placeholder="Your E-Mail Address" style={ styles.input }/>
            <DefaultImport placeholder="Password" style={ styles.input }/>
            <DefaultImport placeholder="Confirm Password" style={ styles.input }/>
          </View>
          <Button
            title="Submit"
            onPress={ this.loginHandler }
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: '#eee',
    borderColor: '#bbb',
  }
});

export default AuthScreen;
