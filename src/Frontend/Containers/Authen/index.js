
import BaseView from 'frontend/Containers/BaseView'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actionsType, RouteKey } from 'utils/globalConstants'
import PropTypes from 'prop-types'
import auth from '@react-native-firebase/auth'

class AppConnect extends Component {
  constructor (props) {
    super(props)
    auth().onAuthStateChanged(user => {
      if (user) {
        this.props.goToDrawer()
      } else {
        this.props.goToLogin()
      }
    })
  }

  render () {
    return (
      <BaseView />
    )
  }
}

const mapStateToProps = (state) => ({
})
const mapactionsTypeToProps = (dispatch) => ({
  goToDrawer: () => dispatch({ type: actionsType.PUSH, routeName: RouteKey.Drawer }),
  goToLogin: () => dispatch({ type: actionsType.PUSH, routeName: RouteKey.Login })
})

export default connect(mapStateToProps, mapactionsTypeToProps)(AppConnect)

AppConnect.defaultProps = {
  checkAuthen: () => {}
}

AppConnect.propTypes = {
  checkAuthen: PropTypes.func
}
