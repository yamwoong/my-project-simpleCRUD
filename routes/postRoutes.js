const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// 게시글 목록 조회 & 새 게시글 저장
router.route('/')
    .get(postController.getAllPosts)   // 모든 게시글 조회
    .post(postController.createPost);  // 새 게시글 저장

// 새 게시글 작성 폼
router.get('/new', postController.renderNewPostForm); 

// 특정 게시글 조회, 수정, 삭제
router.route('/:id')
    .get(postController.getPostById)   // 특정 게시글 조회
    .put(postController.updatePost)    // 게시글 수정
    .delete(postController.deletePost); // 게시글 삭제

// 게시글 수정 폼
router.get('/:id/edit', postController.renderEditPostForm);

module.exports = router;
