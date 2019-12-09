
import ServerAPI from 'backend/api'
import { Observable } from 'rxjs'
import { actionsType, strMessageTimeout, TIME_OUT, ttError } from 'utils/globalConstants'
import { fetchAllVideoShared } from 'backend/api/firebase-database'

export default (action$, store, dependencies) => {
  const fetchAllVideoShared$ = action$.ofType(actionsType.FETCH_ALL_VIDEO_SHARED).switchMap((action) => {
    return Observable.fromPromise(fetchAllVideoShared())
      .takeUntil(Observable.timer(TIME_OUT))
      .takeUntil(action$.ofType(actionsType.CANCEL_FETCH_ALL_VIDEO_SHARED))
      .mergeMap((response) => {
        if (response) {
          return Observable.concat(
            Observable.of({ type: actionsType.FETCH_ALL_VIDEO_SHARED_SUCCESS, payload: response || [] })
          )
        } else {
          ServerAPI.showAlert(ttError, strMessageTimeout)
          return Observable.concat(
            Observable.of({ type: actionsType.FETCH_ALL_VIDEO_SHARED_FAIL })
          )
        }
      })
  })

  return Observable.merge(
    fetchAllVideoShared$
  )
}
