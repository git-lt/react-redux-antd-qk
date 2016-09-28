import api from '../../../api'
import types from '../../types'


export function getVideosByType(index, length, type) {
  return {
    type: types.GET_VIDEOS_BY_TYPE,
    payload: {
      promise: api.videos({index, length, type})
    }
  }
}
