const express = require('express'); //express라는 모듈을 불러온다. 모듈을 이제는 express라고 부르자.
const app = express(); //express를 함수처럼 호출한다. return된 값은 app이라고 하는 변수에 담김.
const port = 3000;
var fs = require('fs');
var qs = require('querystring');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet')
app.use(helmet())

var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  }); 
});

app.use('/',indexRouter);
app.use('/topic', topicRouter);

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
  //4개 인자를 갖는 미들웨어는 express내에서 에러를 처리하는 함수(=미들웨어)라고 지정됨.
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


