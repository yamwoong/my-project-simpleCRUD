const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true // 필수값 설정
    },
    content : {
        type : String,
        required : true // 필수값 설정
    },
    createAt : {
        type : Date,
        default : Date.now
    }
});

// Mongoose에서 모델을 생성하고 내보내는 핵심 코드
module.exports = mongoose.model('Post', postSchema);