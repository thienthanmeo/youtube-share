import { actionsType, initState, KeyStore } from 'utils/globalConstants'
import AsyncStorage from '@react-native-community/async-storage'

export default (state = initState.authenStateInit, action) => {
  switch (action.type) {
  case actionsType.LOGIN_SUCCESS:
    console.log('action.payload.token: ', action.payload)
    AsyncStorage.setItem(KeyStore.AUTHEN_TOKEN, action.payload)
    return action.payload
  case actionsType.AUTHEN_SUCCESS:
    return action.payload
  case actionsType.LOGOUT:
    return initState.authenStateInit
  default:
    return state
  }
}
