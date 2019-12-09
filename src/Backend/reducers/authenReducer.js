import { actionsType, initState } from 'utils/globalConstants'

export default (state = initState.authenStateInit, action) => {
  switch (action.type) {
  case actionsType.LOGIN_SUCCESS:
    return action.payload
  case actionsType.AUTHEN_SUCCESS:
    return action.payload
  case actionsType.LOGOUT:
    return initState.authenStateInit
  default:
    return state
  }
}
