const Post = require('../models/post'); // 게시글 모델 가져오기
const asyncHandler = require('../utils/asyncHandler') // 비동기 오류 처리를 위한 미들웨어
const findByIdOrFail  = require('../utils/findByIdOrFail');

// 전체 게시글 조회 (GET /posts)
const getAllPosts = asyncHandler(async(req, res) => {
    const posts = await Post.find(); // DB에서 모든 게시글 가져오기
    // console.log(posts);              // 콘솔에 데이터 출력
    res.render('posts/index', {posts});    // 클라이언트에 응답
});

// 게시글 상세 조회 (GET /posts/:id)
const getPostById = asyncHandler(async (req, res) => {
    const post = await findByIdOrFail(req.params.id);  // URL에서 게시글 ID를 가져와서 해당 게시글을 찾음
    res.render('posts/show', { post }); // 상세 페이지 렌더링 (views/posts/show.ejs)
});

// 새 게시글 작성 폼 렌더링
const renderNewPostForm = asyncHandler((req, res) => {
    res.render('posts/new'); // views/posts/new.ejs 렌더링 (세 개시글)
});

// 새 게시글 저장
const createPost = asyncHandler(async(req, res) => {
    const {title, content} = req.body;          // 요청에서 제목과 내용 가져오기
    const newPost = new Post({title, content}); // 새 게시글 생성
    await newPost.save(); // 데이터베이스에 저장
    res.redirect('/posts') // 저장 후 게시글 몰록 페이지로 이동
});

// 게시글 수정 폼 렌더링
const renderEditPostForm = asyncHandler(async(req, res) => {
    const post = await findByIdOrFail(req.params.id); // 데이터베이스에서 해당 ID의 게시글 찾기
    res.render('posts/edit', {post}); // 'posts/edit' 템플릿을 렌더링하면서 post 데이터 전달
});


// 게시글 수정 (PUT 요청)
const updatePost = asyncHandler(async (req, res) => {
    const {title, content} = req.body; // 요청의 body에서 수정할 제목(title)과 내용(content) 값을 가져옴
    const post = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true }); // 해당 ID의 게시글을 찾아서 새로운 title, content로 업데이트
    
    if (!post) {
        return res.status(404).send('수정할 게시글을 찾을 수 없습니다.');
    }
    
    res.redirect(`/posts/${req.params.id}`); // 수정 후 해당 게시글의 상세 페이지로 리디렉트 (클라이언트가 변경된 데이터를 볼 수 있도록)
});

// 게시글 삭제
const deletePost = asyncHandler(async(req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);  // 요청받은 ID로 게시글을 찾아서 삭제
    // 만약 게시글이 존재하지 않으면, 404 에러를 던짐
    if (!post) {
        return res.status(404).send('삭제할 게시글을 찾을 수 없습니다.');
    }
    
    res.redirect('/posts');
});

// 컨트롤러 모듈 내보내기
module.exports = {
    getAllPosts,
    getPostById,
    renderNewPostForm,
    createPost,
    renderEditPostForm,
    updatePost,
    deletePost
};