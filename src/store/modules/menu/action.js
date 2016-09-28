import api from '../../../api'
import types from '../../types'

export function getAllMenu(path) {
  return {
    type: types.GET_ALL_MENU,
    payload: {
      promise: api.menus()
    },
    params: { path }
  }
}

export function updateNavPath(path) {
  return {
    type: types.UPDATE_NAVPATH,
    payload: {
      path
    }
  }
}
