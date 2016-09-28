/**
 * Api数据全局处理
 */
import types from '../types'
import STATUS_CODE from '../../constants/statusCode'
import { message } from 'antd'

export default store => next => action => {
  if (action.payload) {
    const status = action.payload.status;
    const type = action.type;
    const actionType = type.split('_')[0];
    const aTypes = ['DEL','UPDATE','CREATE'];
    const exceptTypes = [types.UPDATE_NAVPATH];

    // 需要重新登录
    if(status === '403'){
      message.error(STATUS_CODE[status]);
      setTimeout(()=>{
        // 跳转到登录页
      }, 3000)
      return;
    }

    // 统一的错误信息处理
    let msg = action.payload.errmsg;
    if(aTypes.indexOf(actionType)>-1 && exceptTypes.indexOf(type)===-1){
      switch (status) {
        case '0': message.success(STATUS_CODE[status]); break;
        case '1': message.error(msg || STATUS_CODE[status]); break;
        case '500': message.error(STATUS_CODE[status]); break;
        default: message.error('服务器繁忙，请刷新重试'); break;
      }
    }
  }
  next(action)
}
