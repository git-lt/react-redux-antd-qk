import types from '../../types'
import initState from './initState'
import _ from 'lodash'

export default function news(state = initState, action = {}) {
  switch (action.type) {
    case `${types.LOGIN}_LOADING`:
      return state.merge({'loading': true});
    case `${types.LOGIN}_SUCCESS`:
      return state.merge({
        'loading':false,
        'user':action.payload.user
      })
    case `${types.LOGIN}_ERROR`:
      return state.merge({
        'loading': false,
        'errmsg': types.ERROR_SERVER,
        'user':null,
      })
    case `${types.LOGOUT}_SUCCESS`:
      return state.merge({'user': null});
    default:
      return state;
  }
}
