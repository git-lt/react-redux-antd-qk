import api from '../../../api'
import types from '../../types'
import { getCookie } from '../../../utils';

// export function getProfile() {
//   let uid = getCookie('uid');
//
//   if (uid === undefined) {
//       return { type: types.USER_NOT_FOUND };
//   }
//
//   return {
//       type: types.GET_PROFILE,
//       payload: {
//         promise: api.getProfile.get(uid)
//       }
//   }
// }

export function login(user, password){
  return {
      type: types.LOGIN,
      payload: {
        promise: api.login({user, password})
      }
  }
}

export function logout(uid){
  return {
      type: types.LOGOUT,
      payload:{
        promise: api.logout({uid})
      }
  }
}
