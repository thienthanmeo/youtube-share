import { Alert } from 'react-native'

export default class ServerApi {
  static showAlert = async (title = '', message = '') => {
    setTimeout(() => Alert.alert(title, message), 0)
  }
}
export * from './firebase'
