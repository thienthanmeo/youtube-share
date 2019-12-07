
import { Observable } from 'rxjs'
import { actionsType } from 'utils/globalConstants'
import Data from '../../../database/movies.json'

export default (action$, store, dependencies) => {
  const fetchClient$ = action$.ofType(actionsType.FETCH_CLIENT).switchMap((action) => {
    const clients = []
    Data.map(item => {
      if (item.id && item.title) clients.push(item)
    })
    return Observable.concat(
      Observable.of({ type: actionsType.FETCH_CLIENT_SUCCESS, payload: { clients } })
    )
  })

  return Observable.merge(
    fetchClient$
  )
}
