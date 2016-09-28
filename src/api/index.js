import Api from './api';

const api = new Api({
  baseURI: '/api',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export default  {
  menus: api.post('/menu'),

  news: api.post('/getArticlesList'),
  getNewsDetail: api.get('/getArticles'),
  updateNewsStatus: api.post('/updateArticlesStatus'),
  createNews: api.post('/addArticles'),
  delNews: api.post('/delArticles'),
  // updateNews: api.post('/'),

  videos: api.post('/getQiakrVideoList'),
  getVideoDetail: api.get('/getQiakrVideoById'),
  createVideo: api.post('/createQiakrVideo'),
  delVideo: api.post('/deleteQiakrVideo'),
  updateVideo: api.post('/updateQiakrVideo'),
  updateVideoStatus: api.post('/publishQiakrVideo'),

  login: api.post('/login'),
  logout: api.post('/logout'),
}
