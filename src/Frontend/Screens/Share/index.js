/* eslint-disable no-return-assign */
import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native'
import VideoPlayer from 'react-native-video-player'
import { connect } from 'react-redux'
import { actionsType } from 'utils/globalConstants'
import BaseView from 'frontend/Containers/BaseView'
import { width, height } from 'utils/globalStyles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { updateAllVideoShared } from 'backend/api/firebase-database'
import auth from '@react-native-firebase/auth'

class SharedVideos extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShare: false,
      url: ''
    }
  }

  async componentDidMount () {
    this.props.getAllVideoShared()
  }

  updateData = async () => {
    const { sharedVideoState } = this.props
    const user = auth().currentUser
    updateAllVideoShared(sharedVideoState.videos.length, { url: this.state.url, host: user.email })
    this.props.getAllVideoShared()
  }

  renderItem = (props) => {
    const { item } = props
    return (
      <TouchableOpacity style={styles.containerItem}>
        <View style={styles.containerItemLeft}>
          <VideoPlayer
            endWithThumbnail
            thumbnail={{ uri: item.url }}
            video={{ uri: item.url }}
            videoWidth={width(30)}
            videoHeight={height(20)}
            ref={r => this.player = r}
          />
        </View>
        <View style={styles.containerItemRight}>
          <Text>{item.title}</Text>
          <Text>{`Shared by: ${item.host}`}</Text>
          <View style={styles.containerRow}>
            <View style={styles.containerRow}>
              <Text style={styles.textNumber} >{item.like}</Text>
              <AntDesign name="like2" color="#111" size={30}/>
            </View>
            <View style={styles.containerRow}>
              <Text style={styles.textNumber}>{item.like}</Text>
              <AntDesign name="dislike2" color="#111" size={30}/>
            </View>
          </View>

          {/* <Text style={styles.textDescription}>{`Description`}</Text>
          <Text>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    )
  }

  setUrl = (text) => {
    this.setState({ url: text })
  }

  render () {
    const { isShare, url } = this.state
    const { sharedVideoState } = this.props
    return (
      <BaseView
        rightAction={() => this.setState({ isShare: !isShare, url: '' })}
        rightIcon={<AntDesign name="sharealt" size={20} color="#fff"/>}
        isHeader
        isLoading={sharedVideoState.isLoading}>
        <View style={{ flex: 1 }}>
          {
            isShare &&
            <View style={[ styles.containerRowInput ]}>
              <TextInput onChangeText={this.setUrl} value={url} placeholder="Please input video url" style={styles.input}/>
              <TouchableOpacity style={styles.buttonShared} onPress={this.updateData}><Text>SHARED</Text></TouchableOpacity>
            </View>
          }
          <FlatList
            data={sharedVideoState.videos}
            renderItem={this.renderItem}
          />
        </View>
      </BaseView>
    )
  }
}

const mapStateToProps = state => ({
  navigate: state.navigate,
  sharedVideoState: state.sharedVideoState
})
const mapactionsTypeToProps = dispatch => ({
  getAllVideoShared: () => dispatch({ type: actionsType.FETCH_ALL_VIDEO_SHARED })
})
export default connect(
  mapStateToProps,
  mapactionsTypeToProps
)(SharedVideos)

const styles = StyleSheet.create({
  containerItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1
  },
  containerItemLeft: {
    flex: 1
  },
  containerRow: {
    flex: 1,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerRowInput: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerItemRight: {
    flex: 2,
    marginLeft: 16
  },
  textNumber: {
    fontSize: 13,
    fontWeight: 'bold'
  },
  input: {
    flex: 1,
    height: 45,
    paddingHorizontal: 16,
    backgroundColor: '#c3c3c3'
  },
  buttonShared: {
    marginHorizontal: 4
  }

})
