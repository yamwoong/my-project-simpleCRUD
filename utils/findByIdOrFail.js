const Post = require('../models/post');

// 404 에러 핸들링 유틸 함수
const findByIdOrFail = async(id) => {
    const post = await Post.findById(id);
    if(!post) {
        const error = new Error('해당 게시글을 찾을 수 없습니다');
        error.status = 404;  // 커스텀 에러 상태 설정
        throw error;  // 에러 발생 → 글로벌 에러 핸들러에서 처리
    }
    return post
}

module.exports = findByIdOrFail;