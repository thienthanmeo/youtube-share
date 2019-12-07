import BaseView from 'frontend/Containers/BaseView'
import React, { Component } from 'react'
import {
  BackHandler,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux'
import { COLORS, ISIOS, height, width } from 'utils/globalStyles'
import { actionsType, RouteKey } from 'utils/globalConstants'
import PropTypes from 'prop-types'

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }
  componentDidMount () {
    if (ISIOS) {
      SplashScreen.hide()
    } else {
      setTimeout(() => SplashScreen.hide(), 100)
    }
  }
  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
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
  render () {
    const { login } = this.props

    return (
      <BaseView>
        <View style={styles.container}>
          <View style={styles.container}>
            <View style={styles.containerLoginForm}>
              <View style={styles.containerTitle}>
                <Text style={styles.textTitle}>Please input info login</Text>
              </View>
              <View style={styles.containerInputForm}>
                <TextInput style={styles.input}/>
                <TextInput style={styles.input}/>
              </View>
              <TouchableOpacity onPress={() => login()} style={styles.btnLogin}>
                <Text style={styles.txtBtn}>Login</Text>
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
  login: () => dispatch({ type: actionsType.LOGIN }),
  close: () => dispatch({ type: 'pop' })
})
export default connect(
  mapStateToProps,
  mapactionsTypeToProps
)(LoginScreen)

LoginScreen.defaultProps = {
  login: () => {},
  navigate: {},
  close: () => {}
}

LoginScreen.propTypes = {
  login: PropTypes.func,
  navigate: PropTypes.any,
  close: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2'
  },
  containerBottom: { flex: 0.5, backgroundColor: '#f2f2f2' },
  containerLoginForm: {
    borderWidth: 1,
    borderRadius: 8,
    paddingBottom: 16,
    height: height(50),
    alignItems: 'center',
    borderColor: '#c3c3c3'
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
    paddingHorizontal: 32,
    backgroundColor: COLORS.BACKGROUND_COLOR,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtBtn: {
    color: COLORS.TEXT
  },
  textTitle: {
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
  }
})
