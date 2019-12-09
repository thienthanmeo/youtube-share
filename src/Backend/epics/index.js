import { combineEpics } from 'redux-observable'
import authenEpic from './authenEpic'
import clientEpic from './clientEpic'
import sharedVideoEpic from './sharedVideoEpic'

export default combineEpics(
  authenEpic,
  clientEpic,
  sharedVideoEpic
)
