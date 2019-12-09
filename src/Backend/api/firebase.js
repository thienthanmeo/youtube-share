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
    const res = await auth().signOut()
    console.log('signOut', res)
    return res
  } catch (e) {
    Alert.alert('Error!', e.message)
  }
}

export const onAuthStateChanged = async () => {
  try {
    await auth().onAuthStateChanged((user) => {
      if (user) {
        console.log('user', user)
        // Signed in
        return user
      } else {
        // Signed out
      }
    })
  } catch (e) {
    Alert.alert('Error!', e.message)
  }
}
