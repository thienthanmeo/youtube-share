import { Alert } from 'react-native'
import auth from '@react-native-firebase/auth'

export const signUp = async (email, password) => {
  try {
    const res = await auth().createUserWithEmailAndPassword(email, password)
    return res
  } catch (e) {
    Alert.alert('Error!', e.message)
  }
}

export const signIn = async (email, password) => {
  try {
    const res = await auth().signInWithEmailAndPassword(email, password)
    console.log('signIn', res)

    return res
  } catch (e) {
    Alert.alert('Error!', e.message)
  }
}

export const signOut = async () => {
  try {
    const res = await auth().currentUser.signOut()
    console.log('signOut', res)
    return res
  } catch (e) {
    Alert.alert('Error!', e.message)
  }
}

export const onAuthStateChanged = async () => {
  try {
    const user = await auth().onAuthStateChanged()
    return user
  } catch (e) {
    Alert.alert('Error!', e.message)
  }
}
