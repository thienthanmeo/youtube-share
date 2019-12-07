
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { WebView } from 'react-native-webview'
import BaseView from 'frontend/Containers/BaseView'
import { actionsType, RouteKey } from 'utils/globalConstants'

class PlayScreen extends Component {
  render () {
    const linkVideo = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    let html = `
      <html lang="en">
      <head>
          <meta charset="utf-8">
          <title>Simple todo with React</title>
          <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/clappr@latest/dist/clappr.min.js"></script>
          
      </head>
      <body>
        <div id="player"></div>
        <script>
          var player = new Clappr.Player({
            source: '${linkVideo}', 
            parentId: "#player",
            height: '100%',
            width: '100%'
          });
        </script>
      </body>
      </html>
    `

    const { pop } = this.props
    return (
      <BaseView
        isHeader
        title={'Play'}
        onBack={pop}>
        <WebView
          source={{ html }}
          originWhitelist={['*']}
          style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
        />
      </BaseView>
    )
  }
}
const mapStateToProps = (state) => ({
  clientState: state.clientState,
  navigate: state.navigate
})
const mapactionsTypeToProps = (dispatch) => ({
  gotoPlay: (client) => dispatch({ type: actionsType.PUSH, routeName: RouteKey.PlayScreen, params: { client } }),
  pop: () => dispatch({ type: actionsType.POP })
})
export default connect(mapStateToProps, mapactionsTypeToProps)(PlayScreen)
