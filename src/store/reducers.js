import { combineReducers } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'

import menu from './modules/menu/reducer'
import news from './modules/news/reducer'
import videos from './modules/videos/reducer'
import user from './modules/user/reducer'

export default combineReducers({
  menu,
  news,
  videos,
  user,
  routing: routerReducer
});
