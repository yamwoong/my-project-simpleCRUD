const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

const postRoutes = require('./routes/postRoutes');

const app = express();

//mongoDB 연결const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/simpleCRUD')
    .then(() => {console.log("CONNECTION OPEN!!")})
    .catch(err => {console.log("OH NO ERROR!!", err)})


// 미들웨어
// Express에서 EJS를 뷰 엔진(View Engine)으로 설정
app.set("view engine", "ejs");

// 'public' 폴더를 정적(static) 파일(css, js, img) 제공 폴더로 설정
// EX => /public/style.css → /style.css
app.use(express.static("public"));

// method-override를 사용하여 폼에서 PUT 및 DELETE 요청을 가능하게 함
app.use(methodOverride("_method"));

// body-parser를 사용하여 form 데이터를 해석(파싱)할 수 있도록 설정
app.use(bodyParser.urlencoded({ extended: true }));

// 라우트 설정정
app.get('/', (req, res) => {
    res.send('home');
})


// '/posts' 경로로 들어오는 요청을 postRoutes에서 처리하도록 설정
app.use('/posts', postRoutes); 

//서버 실행 (환경변수로 설정 => PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버 실행 중 => http://localhost:${PORT}`);
}); 