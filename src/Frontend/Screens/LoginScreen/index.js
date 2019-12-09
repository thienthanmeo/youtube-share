import BaseView from 'frontend/Containers/BaseView'
import React, { Component } from 'react'
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Switch
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux'
import { COLORS, ISIOS, width } from 'utils/globalStyles'
import { actionsType, RouteKey } from 'utils/globalConstants'

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      registerMode: false,
      email: '',
      password: ''
    }
    !ISIOS && BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }
  componentDidMount () {
    if (ISIOS) {
      SplashScreen.hide()
    } else {
      setTimeout(() => SplashScreen.hide(), 100)
    }
  }
  componentWillUnmount () {
    !ISIOS && BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }
  getActiveScreen = navigationState => {
    if (navigationState.index !== undefined) {
      return this.getActiveScreen(
        navigationState.routes[navigationState.index]
      )
    } else {
      return navigationState
    }
  };
  onBackPress = () => {
    const { navigate } = this.props

    const activeRoute = this.getActiveScreen(navigate)
    if (
      activeRoute.routeName === RouteKey.HomeScreen ||
      activeRoute.routeName === RouteKey.Login
    ) {
      BackHandler.exitApp()
      return true
    } else {
      this.props.close()
      return true
    }
  };

  onChangeModeRegister = () => {
    this.setState({ registerMode: !this.state.registerMode })
  }

  onPress= () => {
    const { registerMode, email, password } = this.state
    const { signIn, signUp } = this.props

    if (registerMode) {
      signUp(email, password)
    } else {
      signIn(email, password)
    }
  }

  setEmail = (email) => {
    this.setState({ email })
  }

  setPassword = (password) => {
    this.setState({ password })
  }

  render () {
    const { registerMode, email, password } = this.state
    const titleMode = registerMode ? 'Sign In' : 'Sign Up'
    const titleForm = registerMode ? 'Please input info signUp' : 'Please input info signIn'
    const titleButton = registerMode ? 'Sign Up' : 'Sign In'
    return (
      <BaseView>
        <View style={styles.container}>
          <View style={styles.containerBottom}/>
          <View style={styles.container}>
            <View style={styles.containerLoginForm}>
              <View style={styles.containerTitle}>
                <View style={styles.containerSwitch}>
                  <Text style={styles.textMode}>{titleMode}</Text>
                  <Switch value={registerMode} onValueChange={this.onChangeModeRegister}/>
                </View>
                <Text style={styles.textTitle}>{titleForm}</Text>
              </View>
              <View style={styles.containerInputForm}>
                <TextInput
                  value={email}
                  style={styles.input}
                  autoCapitalize="none"
                  placeholder={'Email ...'}
                  keyboardType="email-address"
                  onChangeText={this.setEmail}
                />
                <TextInput
                  secureTextEntry
                  value={password}
                  style={styles.input}
                  placeholder={'Password ...'}
                  onChangeText={this.setPassword}
                />
              </View>
              <TouchableOpacity onPress={this.onPress} style={styles.btnLogin}>
                <Text style={styles.txtBtn}>{titleButton}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.containerBottom}/>
      </BaseView>
    )
  }
}

const mapStateToProps = state => ({
  navigate: state.navigate
})
const mapactionsTypeToProps = dispatch => ({
  signIn: (email, password) => dispatch({ type: actionsType.LOGIN, email, password }),
  signUp: (email, password) => dispatch({ type: actionsType.REGISTER, email, password }),
  close: () => dispatch({ type: 'pop' })
})
export default connect(
  mapStateToProps,
  mapactionsTypeToProps
)(LoginScreen)

LoginScreen.defaultProps = {
  login: () => {},
  signUp: () => {},
  navigate: {},
  close: () => {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2'
  },
  containerBottom: {
    flex: 0.3,
    backgroundColor: '#f2f2f2'
  },
  containerLoginForm: {
    borderWidth: 1,
    borderRadius: 8,
    paddingBottom: 16,
    alignItems: 'center',
    borderColor: '#c3c3c3'
  },
  containerSwitch: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  containerTitle: {
    flex: 1,
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8,
    width: width(94),
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: COLORS.BACKGROUND_COLOR
  },
  containerInputForm: {
    flex: 1
  },
  btnLogin: {
    height: 45,
    borderRadius: 5,
    marginVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BACKGROUND_COLOR
  },
  txtBtn: {
    color: COLORS.TEXT
  },
  textTitle: {
    flex: 1,
    fontSize: 27,
    color: COLORS.TEXT,
    fontWeight: 'bold'
  },
  input: {
    height: 45,
    marginTop: 12,
    width: width(90),
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginHorizontal: width(2)
  },
  textMode: {
    right: 16,
    color: COLORS.TEXT
  }
})
