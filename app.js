const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const postRoutes = require('./routes/postRoutes');
const errorHandler = require('./middlewares/errorHandler');
const notFoundHandler = require('./middlewares/notFoundHandler'); 

const app = express();

//mongoDB 연결
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/simpleCRUD');
        console.log("MongoDB 연결 성공!");
    } catch (err) {
        console.error("MongoDB 연결 실패:", err);
        process.exit(1); // 연결 실패 시 서버 종료
    }
};
connectDB();

// 미들웨어
// Express에서 EJS를 뷰 엔진(View Engine)으로 설정
app.set("view engine", "ejs");
// 'public' 폴더를 정적(static) 파일(css, js, img) 제공 폴더로 설정
app.use(express.static("public"));
// 요청 데이터 파싱 미들웨어 설정
app.use(express.urlencoded({ extended: true })); // 폼 데이터 처리
app.use(express.json()); // JSON 데이터 처리
// method-override를 사용하여 폼에서 PUT 및 DELETE 요청을 가능하게 함
app.use(methodOverride("_method"));

// 라우트 설정
app.get('/', (req, res) => {
    res.redirect('/posts'); // 기본 페이지에서 게시글 목록으로 이동
});


// '/posts' 경로로 들어오는 요청을 postRoutes에서 처리하도록 설정
app.use('/posts', postRoutes);
 
// 404 처리 미들웨어 추가
app.use(notFoundHandler);

// 에러 처리 미들웨어
app.use(errorHandler); 

//서버 실행 (환경변수로 설정 => PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`서버 실행 중 => http://localhost:${PORT}`);
}); 