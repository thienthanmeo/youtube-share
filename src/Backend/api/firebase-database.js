import { Alert } from 'react-native'
import database from '@react-native-firebase/database'

export const fetchAllVideoShared = async () => {
  try {
    const snapshot = await database().ref('share_video').once('value')
    return snapshot.val()
  } catch (e) {
    Alert.alert('Error!', e.message)
  }
}

// database.ref('users/' + userId).update({MobileNumber: newNumber});
export const updateAllVideoShared = async (id, data) => {
  try {
    const res = await database().ref('share_video/' + id).update(data)
    console.log('updateAllVideoShared', res)
    return res
  } catch (e) {
    Alert.alert('Error!', e.message)
  }
}
