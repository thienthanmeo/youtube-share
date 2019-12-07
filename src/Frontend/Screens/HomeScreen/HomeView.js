
import React from 'react'
import styles from './styles'
import PropTypes from 'prop-types'
import { FlatList, View } from 'react-native'
import ClientCell from './Components/ClientCell'
import BaseView from 'frontend/Containers/BaseView'

export const HomeView = ({ navigation, clientState, gotoDetail }) => {
  return (
    <BaseView
      isHeader={true}
      title='HomeScreen'
    >

      <View style={styles.body}>
        <FlatList
          // inverted={true}
          numColumns= {2}
          extraData= {clientState}
          data={clientState.clients}
          keyExtractor={(_, index) => index.toString()}
          renderItem={(object) => ClientCell({ object, gotoDetail })}
        />
      </View>
    </BaseView>
  )
}

HomeView.defaultProps = {
  navigation: {},
  gotoDetail: (clients) => {},
  clientState: {}
}

HomeView.propTypes = {
  navigation: PropTypes.object,
  gotoDetail: PropTypes.func,
  clientState: PropTypes.object
}
