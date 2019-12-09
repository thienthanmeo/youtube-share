
import ServerAPI, { signUp, signIn, onAuthStateChanged, signOut } from 'backend/api'
import { Observable } from 'rxjs'
import { actionsType, strMessageTimeout, TIME_OUT, ttError, RouteKey } from 'utils/globalConstants'

export default (action$, store, dependencies) => {
  const checkAuthen$ = action$.ofType(actionsType.CHECK_AUTHEN).switchMap((action) => {
    return Observable.fromPromise(onAuthStateChanged())
      .mergeMap((response) => {
        if (response) {
          console.log('login response: ', response)
          return Observable.concat(
            Observable.of({ type: actionsType.AUTHEN_SUCCESS, payload: response }),
            Observable.of({ type: actionsType.RESET_TO_ROUTE, routeName: RouteKey.Drawer })
          )
        } else {
          return Observable.concat(
            Observable.of({ type: actionsType.RESET_TO_ROUTE, routeName: RouteKey.Login })
          )
        }
      })
  })

  const login$ = action$.ofType(actionsType.LOGIN).switchMap((action) => {
    console.log('log', action)
    return Observable.fromPromise(signIn(action.email, action.password))
      .takeUntil(Observable.timer(TIME_OUT))
      .takeUntil(action$.ofType(actionsType.CANCEL_LOGIN))
      .mergeMap((response) => {
        if (response) {
          console.log('login response: ', response)
          return Observable.concat(
            Observable.of({ type: actionsType.LOGIN_SUCCESS, payload: response }),
            Observable.of({ type: actionsType.PUSH, routeName: RouteKey.Drawer })
          )
        } else {
          ServerAPI.showAlert(ttError, strMessageTimeout)
          return Observable.concat(
            Observable.of({ type: actionsType.LOGIN_FAIL })
          )
        }
      })
  })

  const register$ = action$.ofType(actionsType.REGISTER).switchMap((action) => {
    console.log('log', action)
    const email = action.email || ' '
    const password = action.password || ' '
    return Observable.fromPromise(signUp(email, password))
      .takeUntil(Observable.timer(TIME_OUT))
      .takeUntil(action$.ofType(actionsType.CANCEL_REGISTER))
      .mergeMap((response) => {
        if (response) {
          console.log('REGISTER response: ', response)
          alert('Register successfully!! Please change mode to SIGN IN')
          return Observable.concat(
            Observable.of({ type: actionsType.REGISTER_SUCCESS, payload: response })
          )
        } else {
          ServerAPI.showAlert(ttError, strMessageTimeout)
          return Observable.concat(
            Observable.of({ type: actionsType.REGISTER_FAIL })
          )
        }
      })
  })

  const logout$ = action$.ofType(actionsType.LOGOUT).switchMap((action) => {
    return Observable.fromPromise(signOut())
      .mergeMap(() => {
        return Observable.concat(
          Observable.of({ type: actionsType.PUSH, routeName: RouteKey.Login })
        )
      })
  })

  return Observable.merge(
    checkAuthen$,
    login$,
    logout$,
    register$
  )
}
