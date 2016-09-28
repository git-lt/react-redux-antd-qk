require('babel-register')

const webpack = require('webpack');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const config = require('./webpack.config');

const isProduction = process.env.NODE_ENV === 'production';
const isDeveloping = !isProduction;

const app = express();

// Webpack developer
if (isDeveloping) {
  const compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath,
    noInfo: true
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

const publicPath = path.resolve(__dirname);
app.use(bodyParser.json({ type: 'application/json' }))
app.use(express.static(publicPath));

const port = isProduction ? (process.env.PORT || 80) : 3033;

require('./router.config')(app);

// 500
app.use(function respondError(err, req, res, next) {
	console.log('500');
	var status, errmsg;
	status = err.status || 500;
	res.status(status);
	errmsg = err.message || 'oo there was a problem!';

	if(req.method === 'GET'){
    res.status('500').send('服务器错误：'+errmsg)
	}else{
		res.type('txt').send(errmsg + '\n');
	}
});

// Listen
app.listen(port, function (err, result) {
  if(err){
    console.log(err);
  }
  console.log('Server running on 127.0.0.1:%s', port);
});
