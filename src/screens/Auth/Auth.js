import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
import startMainTabs from '../MainTabs/startMainTabs';
import DefaultImport from '../../components/UI/DefaultInput/DefaultInput';
import HeadingText from '../../components/UI/HeadingText/HeadingText';
import MainText from '../../components/UI/MainText/MainText';
import ButtonWithBackground from '../../components/UI/ButtonWithBackground/ButtonWithBackground';
import backgroundImage from '../../assets/background.jpg';
import validate from '../../utility/validation';

class AuthScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape',
      controls: {
        email: {
          value: '',
          valid: false,
          validationRules: {
            isEmail: true,
          }
        },
        password: {
          value: '',
          valid: false,
          validationRules: {
            minLength: 6,
          }
        },
        confirmPassword: {
          value: '',
          valid: false,
          validationRules: {
            equalTo: 'password',
          }
        },
      },
    };

    Dimensions.addEventListener('change', this.updateStyle);
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.updateStyle)
  }

  updateStyle = (dims) => {
    this.setState({
      viewMode: dims.window.height > 500 ? 'portrait' : 'landscape',
    });
  };

  loginHandler = () => {
    startMainTabs();
  };

  updateInputState = (key, value) => {
    let connectedValue = {};
    if (this.state.controls[key].validationRules.equalTo) {
      const equalControl = this.state.controls[key].validationRules.equalTo;
      const equalValue = this.state.controls[equalControl].value;

      connectedValue = {
        ...connectedValue,
        equalTo: equalValue,
      }
    }

    if(key === 'password') {
      connectedValue = {
        ...connectedValue,
        equalTo: value,
      }
    }

    this.setState(prevState => {
      return {
        controls: {
          ...prevState.controls,
          confirmPassword: {
            ...prevState.controls.confirmPassword,
            valid: key === 'password'
              ? validate(
                prevState.controls.confirmPassword.value,
                prevState.controls.confirmPassword.validationRules,
                connectedValue
              )
              : prevState.controls.confirmPassword.valid,
          },
          [key]: {
            ...prevState.controls[key],
            value,
            valid: validate(
              value,
              prevState.controls[key].validationRules,
              connectedValue
            ),
          },
        }
      }
    });
  };

  render() {
    let headingText = null;

    if (this.state.viewMode === 'portrait') {
      headingText = (
        <MainText>
          <HeadingText>Please Log In</HeadingText>
        </MainText>
      );
    }

    return (
      <ImageBackground
        source={ backgroundImage }
        style={ styles.backgroundImage }
      >
        <View style={ styles.container }>
          { headingText }
          <ButtonWithBackground color="#29aaf4" onPress={ () => alert('Hello') }>Switch to Login</ButtonWithBackground>
          <View style={ styles.inputContainer }>
            <DefaultImport
              placeholder="Your E-Mail Address"
              style={ styles.input }
              value={this.state.controls.email.value}
              onChangeTextHandler={(value) => this.updateInputState('email', value)}
            />
            <View style={
              this.state.viewMode === 'portrait'
                ? styles.portraitPasswordContainer
                : styles.landscapePasswordContainer
            }
            >
              <View style={
                this.state.viewMode === 'portrait'
                  ? styles.portraitPasswordWrapper
                  : styles.landscapePasswordWrapper
              }
              >
                <DefaultImport
                  placeholder="Password"
                  style={ styles.input }
                  value={this.state.controls.password.value}
                  onChangeTextHandler={(value) => this.updateInputState('password', value)}
                />
              </View>
              <View style={
                this.state.viewMode === 'portrait'
                  ? styles.portraitPasswordWrapper
                  : styles.landscapePasswordWrapper
              }
              >
                <DefaultImport
                  placeholder="Confirm Password"
                  style={ styles.input }
                  value={this.state.controls.confirmPassword.value}
                  onChangeTextHandler={(value) => this.updateInputState('confirmPassword', value)}
                />
              </View>
            </View>
          </View>
          <ButtonWithBackground
            onPress={ this.loginHandler }
            color="#29aaf4"
          >
            Submit
          </ButtonWithBackground>
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
  },
  landscapePasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  portraitPasswordContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  landscapePasswordWrapper: {
    width: '45%',
  },
  portraitPasswordWrapper: {
    width: '100%',
  },
});

export default AuthScreen;
