
import React from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'

import StarRating from 'react-native-star-rating'

import _ from 'lodash'
import PropTypes from 'prop-types'
import { width } from 'utils/globalStyles'
import { getSum } from 'utils/globalFunctions'

const ClientCell = ({ object, gotoDetail }) => {
  const client = object.item
  const title = _.get(object, 'item.title')
  const arrRatings = _.get(object, 'item.ratings')
  const storyline = _.get(object, 'item.storyline')
  const posterurl = _.get(object, 'item.posterurl')

  let rate = 5
  rate = Number((arrRatings.reduce(getSum) / arrRatings.length).toFixed(0))

  return (
    <TouchableOpacity
      onPress={() => gotoDetail(client)}
      style={styles.cell}>
      <Image
        style={styles.img}
        source={{
          uri: posterurl,
        }}
        resizeMode={'stretch'}
      />
      <StarRating
        disabled
        maxStars={10}
        rating={rate }
        starSize={15}
        fullStarColor={'yellow'}
        containerStyle={styles.starRating}
      />
      <Text numberOfLines={1} style={styles.txt}>{ title.toString() }</Text>
      <Text numberOfLines={1} style={styles.txtSub}>{ storyline.toString() }</Text>
    </TouchableOpacity>
  )
}
export default ClientCell

ClientCell.defaultProps = {
  object: {},
  gotoDetail: (client) => {}
}

ClientCell.propTypes = {
  object: PropTypes.object,
  gotoDetail: PropTypes.func
}

const styles = StyleSheet.create({
  cell: {
    height: 300,
    paddingLeft: 10,
    width: width(50),
    shadowColor: '#c3c3c3',
    shadowOffset: {
      width: 2,
      height: 2
    },
    elevation: 1,
    shadowRadius: 2,
    shadowOpacity: 0.8,
    backgroundColor: '#fff'
  },
  img: {
    height: '80%',
    width: '100%'
  },
  txt: {
    fontSize: 17,
    color: '#111',
    width: '100%',
    textAlign: 'center',
    marginTop: 10
  },
  txtSub: {
    marginTop: 2,
    fontSize: 13,
    width: '60%',
    color: '#c3c3c3',
    textAlign: 'center',
    alignSelf: 'center'
  },
  starRating: {
    alignSelf: 'center',
    position: 'absolute',
    top: '75%'
  }
})
