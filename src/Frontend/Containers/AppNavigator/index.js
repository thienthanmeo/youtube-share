import Authen from 'frontend/Containers/Authen'
import Detail from 'frontend/Screens/Detail'
import DrawerContent from 'frontend/Screens/DrawerContent'
import HomeScreen from 'frontend/Screens/HomeScreen'
import LoginScreen from 'frontend/Screens/LoginScreen'
import Setting from 'frontend/Screens/Setting'
import PlayScreen from 'frontend/Screens/Play'

import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator, createDrawerNavigator, createStackNavigator } from 'react-navigation'
import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'
import { RouteKey } from 'utils/globalConstants'
import transition from './transitions'

import SharedElements from 'frontend/Screens/Examples/SharedElements'
import AppearingElements from 'frontend/Screens/Examples/AppearingElements'
import ImageTransition from 'frontend/Screens/Examples/ImageTransition'
import LayoutTransition from 'frontend/Screens/Examples/LayoutTransition'
import Onboarding from 'frontend/Screens/Examples/Onboarding'
import ShoeShop from 'frontend/Screens/Examples/ShoeShop'
import FlatList from 'frontend/Screens/Examples/FlatList'
import AnimatedProperty from 'frontend/Screens/Examples/AnimatedProperty'
import Examples from 'frontend/Screens/Examples'

const middlewareNav = createReactNavigationReduxMiddleware(
  'root',
  (state) => state.navigate
)

const HomeStack = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen },
    Detail: { screen: Detail },
    PlayScreen: { screen: PlayScreen }
  }, {
    headerMode: 'none',
    transitionConfig: transition
  }
)

const MainTabbar = createBottomTabNavigator(
  {
    Home: HomeStack,
    Settings: Setting
  },
  {
    navigationOptions: ({ navigation }) => ({
      // eslint-disable-next-line react/display-name
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state
        let iconName = ''
        if (routeName === RouteKey.Home) {
          iconName = `ios-home`
        } else if (routeName === RouteKey.Settings) {
          iconName = `ios-settings`
        }

        return <Icon
          name={iconName}
          style={{ color: focused ? 'red' : '#7e7e7e', fontSize: 20 }}
        />
      }
    }),
    tabBarOptions: {
      activeTintColor: 'red',
      inactiveTintColor: 'gray'
    }
  }
)
const getActiveScreen = (navigationState) => {
  if (navigationState.index !== undefined) {
    return getActiveScreen(navigationState.routes[navigationState.index])
  } else {
    return navigationState
  }
}

MainTabbar.navigationOptions = ({ navigation }) => {
  let drawerLockMode = 'locked-closed'
  const activeRoute = getActiveScreen(navigation.state)
  if (activeRoute.routeName === RouteKey.HomeScreen || activeRoute.routeName === RouteKey.Settings) {
    // Only open drawer for 2 these screen
    drawerLockMode = 'unlocked'
  }
  return {
    drawerLockMode
  }
}

const Drawer = createDrawerNavigator(
  {
    MainTabbar: {
      screen: MainTabbar
    }
  },
  {
    drawerPosition: 'right',
    contentComponent: DrawerContent,
    drawerWidth: 300
  }
)

const AnimaTranslationStack = createStackNavigator({
  Examples: { screen: Examples },
  shared: { screen: SharedElements },
  appear: { screen: AppearingElements },
  image: { screen: ImageTransition },
  layout: { screen: LayoutTransition },
  onboarding: { screen: Onboarding },
  shoes: { screen: ShoeShop },
  flatlist: { screen: FlatList },
  animatedProperty: { screen: AnimatedProperty }
}, {
  headerMode: 'none'
})

const RootNavigator = createStackNavigator(
  {
    Authen: { screen: Authen },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    Drawer: {
      screen: Drawer,
      navigationOptions: {
        gesturesEnabled: false
      }
    },
    AnimaTranslationStack: { screen: AnimaTranslationStack }
  }, {
    headerMode: 'none'
  }
)

const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root')

const mapStateToProps = (state) => ({
  state: state.navigate
})

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState)

export { RootNavigator, AppNavigator, middlewareNav }
