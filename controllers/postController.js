const Post = require('../models/post');
const asyncHandler = require('../utils/asyncHandler')

// 전체 게시글 조회 (GET /posts)
const getAllPosts = asyncHandler(async(req, res) => {
    const posts = await Post.find(); // DB에서 모든 게시글 가져오기
    console.log(posts); // 콘솔에 데이터 출력
    res.send(posts); // 클라이언트에 응답
});

module.exports = { getAllPosts };