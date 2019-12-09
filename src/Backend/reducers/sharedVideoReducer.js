import { actionsType } from 'utils/globalConstants'

const initState = {
  videos: [],
  isLoading: false,
  isRefresh: false,
  isLoadmore: false
}
export default (state = initState, action) => {
  switch (action.type) {
  case actionsType.FETCH_ALL_VIDEO_SHARED:
    return action.payload || []
  case actionsType.FETCH_ALL_VIDEO_SHARED_SUCCESS:
    return { videos: action.payload, isLoading: false, isRefresh: false, isLoadmore: false }
  case actionsType.CANCEL_FETCH_ALL_VIDEO_SHARED:
    return { videos: action.payload, isLoading: false, isRefresh: false, isLoadmore: false }
  default:
    return state
  }
}
