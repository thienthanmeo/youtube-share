import { combineReducers } from 'redux'
import authenReducer from './authenReducer'
import clientReducer from './clientReducer'
import currencyReducer from './currencyReducer'
import languageReducer from './languageReducer'
import loadingReducer from './loadingReducer'
import routesReducer from './routersReducer'
import sharedVideoReducer from './sharedVideoReducer'

export default combineReducers({
  currency: currencyReducer,
  language: languageReducer,
  loading: loadingReducer,
  navigate: routesReducer,
  authen: authenReducer,
  clientState: clientReducer,
  sharedVideoState: sharedVideoReducer
})
