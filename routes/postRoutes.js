const express = require('express');
const router = express.Router();
const {getAllPosts} = require('../controllers/postController');

// GET /posts 엔드포인트 설정
router.get('/', getAllPosts);

module.exports = router;