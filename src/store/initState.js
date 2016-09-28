import userInitState from './modules/user/initState'
import menuInitState from './modules/menu/initState'
import newsInitState from './modules/news/initState'
import videosInitState from './modules/videos/initState'

const initialState = {
  user: userInitState,
  news: newsInitState,
  menu: menuInitState,
  videos: videosInitState
}

export default initialState
