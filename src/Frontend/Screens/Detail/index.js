import _ from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import { getSum } from 'utils/globalFunctions'
import {Image} from 'react-native'
import StarRating from 'react-native-star-rating'
import BaseView from 'frontend/Containers/BaseView'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { actionsType, RouteKey } from 'utils/globalConstants'
// import PercentageCircle from 'react-native-percentage-circle'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'

class Detail extends Component {
  render () {
    const { pop, navigation, gotoPlay } = this.props
    const client = navigation.getParam('client', {})
    console.log('client :', client)
    const posterurl = _.get(client, 'posterurl')
    const title = _.get(client, 'title')
    const storyline = _.get(client, 'storyline')
    const arrRatings = _.get(client, 'ratings')// ratings
    let rate = 5
    rate = Number(arrRatings.reduce(getSum) / arrRatings.length)
    return (
      <BaseView
        isHeader
        title={title}
        leftAction={() => pop()}
        leftIcon={<IconFontAwesome
          name='chevron-left'
          style={{ color: 'white', fontSize: 25 }} />}
      >
        <View style={styles.body}>
          <View style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            opacity: 0.7,
            backgroundColor: '#111111' }}/>
          <Image
            style={styles.img}
            source={{
              uri: posterurl,
            }}
            resizeMode={'stretch'}/>
          <TouchableOpacity onPress={() => gotoPlay('tuan')} style={styles.containerMiddle}>
            <Image
              style={styles.imgCenter}
              source={{
                uri: posterurl,
              }}
              resizeMode={'stretch'}/>
            <View style={{
              width: '100%',
              paddingVertical: 10,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'space-between' }}>
              <EvilIcons name={'play'} color={'white'} size={100}/>
              <View style={styles.containerPlay}>
                <Text style={styles.txtPlay}>XEM PHIM</Text>
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.containerFooter}>
            <Text numberOfLines={4} style={styles.txtStory}>{storyline}</Text>
          </View>

          <View style={styles.containerLine}/>

          <View style={styles.containerRate}>
            <StarRating
              disabled
              maxStars={10}
              rating={rate}
              starSize={20}
              emptyStarColor={'#fff'}
              fullStarColor={'yellow'}
              containerStyle={styles.starRating}
            />
          </View>
        </View>
      </ BaseView>
    )
  }
}
const mapStateToProps = (state) => ({
})
const mapactionsTypeToProps = (dispatch) => ({
  pop: () => dispatch({ type: actionsType.POP }),
  gotoPlay: (client) => dispatch({ type: actionsType.PUSH, routeName: RouteKey.PlayScreen, params: { client } })
})
export default connect(mapStateToProps, mapactionsTypeToProps)(Detail)

Detail.defaultProps = {
  pop: () => {},
  navigation: {}
}

Detail.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.any
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    opacity: 0.2,
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: '#111111'
  },
  imgCenter: {
    width: '100%',
    height: '70%',
    opacity: 0.6
  },
  containerMiddle: {
    width: '70%',
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerPlay: {
    width: '100%',
    top: 20,
    opacity: 0.8,
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
    paddingVertical: 5
  },
  containerFooter: {
    paddingHorizontal: 15,
    paddingVertical: 30
  },
  containerLine: {
    height: 1,
    width: '90%',
    backgroundColor: '#fff'
  },
  containerRate: {
    width: '65%',
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  txtPlay: {
    color: '#fff',
    fontSize: 35
  },
  txtStory: {
    color: '#fff',
    fontSize: 15
  }
})
