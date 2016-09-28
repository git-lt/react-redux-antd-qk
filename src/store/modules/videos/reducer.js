import types from '../../types'
import initState from './initState'

export default function videos(state = initState, action = {}) {
  switch (action.type) {
    case `${types.GET_VIDEOS_BY_TYPE}_LOADING`:
      return state.merge({'loading': true});
    case `${types.GET_VIDEOS_BY_TYPE}_SUCCESS`:
      let data = action.payload.result;
      return state.merge({
        'list':data.list,
        'loading': false,
        'count': data.count
      })
    case `${types.GET_VIDEOS_BY_TYPE}_ERROR`:
      return state.merge({
        'loading': false,
        'errmsg': types.ERROR_SERVER
      })
    default:
      return state;
  }
}
