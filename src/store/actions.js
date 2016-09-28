import * as menuAction from './modules/menu/action'
import * as newsAction from './modules/news/action'
import * as videosAction from './modules/videos/action'
import * as userAction from './modules/user/action'

export default {
  ...menuAction,
  ...newsAction,
  ...videosAction,
  ...userAction,
}
