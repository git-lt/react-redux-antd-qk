const _ = require('lodash');
const path = require('path');

// 数据说明： [请求类型, 请求地址, 返回的数据]
const routerConfig = [
  ['get', '*', loadPageFn],
  ['post', '/api/login', loginFn],
  ['post', '/api/logout', logoutFn],
  ['post', '/api/menu', './mock/menu'],
  ['post', '/api/getArticlesList', './mock/getArticlesList'],
  ['post', '/api/getQiakrVideoList', './mock/getQiakrVideoList'],
  ['post', '/api/delArticles', './mock/delArticles'],
  ['post', '/api/deleteQiakrVideo', './mock/deleteQiakrVideo'],
  ['post', '/api/updateArticlesStatus', './mock/updateArticlesStatus'],
  ['post', '/api/publishQiakrVideo', './mock/publishQiakrVideo'],
  ['post', '/api/deleteQiakrVideo', './mock/deleteQiakrVideo'],
]

const createRouter = function(app){
  var t = null;
  routerConfig.forEach(function(v){
    t = v[2];
    (function(app, t, method, url){
      if(_.isString(t)){
          app[method](url, function(req, res){
            res.json(require(t)());
          })
      }else if(_.isFunction(t)){
          app[method](url, t);

      }else if(_.isObject(t)){
          app[method](url, function(req, res){
            res.json(t);
          })
      }else{
        app[method](url, function(req, res){
          res.json({});
        })
      }
    })(app, t, v[0], v[1])
  });
}

module.exports = createRouter;

function loadPageFn(req, res){
  res.sendFile(path.resolve(__dirname, '', 'index.html'))
}

function loginFn(req, res){
  const credentials = req.body;
  if(credentials.user==='admin' && credentials.password==='123456'){
    res.cookie('uid', '1', {domain:'127.0.0.1'});
    res.json({'user': credentials.user, 'role': 'ADMIN', 'uid': 1});
  }else{
    res.status('500').send({'message' : 'Invalid user/password'});
  }
}

function logoutFn(req, res){
  res.clearCookie('uid');
  res.json({'user': 'admin', 'role': 'ADMIN'});
}
