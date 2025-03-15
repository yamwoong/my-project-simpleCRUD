const mongoose = require('mongoose');
const Post = require('../models/post');  // post 모델 가져오기


mongoose.connect('mongodb://127.0.0.1:27017/simpleCRUD')
    .then(() => {console.log("CONNECTION OPEN!!")})
    .catch(err => {console.log("OH NO ERROR!!", err)})

const seedFunction = async() => {
    try {
        await Post.deleteMany({});
        await Post.insertMany([
            { title: "첫 번째 게시글", content: "이것은 테스트 데이터입니다." },
            { title: "두 번째 게시글", content: "Node.js + Express + MongoDB 테스트" }
        ]);
        console.log("시드 데이터 추가 완료!");
    } catch(err) {
        console.log("시드 데이터 추가 실패 : ", err);
    } finally {
        // finally는 정상 실행이든, 에러가 나든 마지막에 꼭 실행해야 하는 코드를 넣는 곳
        // 데이터베이스 작업이 끝난 후 연결을 안전하게 닫기 위해 사용용
        mongoose.connection.close();
    }
}

// 실행 조건 설정
// node seeds/index.js --seed 뒤에 --seed를 넣어줘야 실행
if(process.argv.includes('--seed')){
    seedFunction();
}