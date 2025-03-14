# 프로젝트 개요
- 프로젝트 이름 : simpleCRUD
- 기술 스택 : Node.js, MongoDB, Express, EJS
- 주요기능 : CRUD

# 구현 순서
- 모델 => 라우트 => 템플릿
- 이유 : 데이터 흐름을 먼저 설계하기 위해
- 모델(Model) : 데이터 구조 정의
- 라우트(Route) : 데이터 CRUD 로직 작성
- 템플릿(View) : 데이터와 연동하여 화면 구현

# 개발 중 체크리스트
- [x] 프로젝트 초기 설정 (`npm init`)
- [x] Express 설치 및 기본 서버 구축
- [x] MongoDB 연결 설정
- [] CRUD 기능 개발
    - # 라우터 구현 중 추천하는 테스트 순서
        - 1. GET /posts → 데이터가 없을 때도 빈 배열 []이 오는지 확인 [X]
        - 2. POST /posts → 데이터 추가가 정상적으로 되는지 확인 []
        - 3. GET /posts/:id → 추가한 데이터가 정상적으로 조회되는지 확인 []
        - 4. PUT /posts/:id → 게시글을 수정할 수 있는지 확인 []
        - 5. DELETE /posts/:id → 게시글 삭제가 정상 동작하는지 확인 []
- [] EJS 템플릿 만들기
- [] 배포하기 (Heroku 또는 Render)

# 사용된 npm 패키지

- 서버 및 프레임워크
    - express : 경량 Node.js 웹 프레임워크

- 데이터베이스
    - mongoose : MongoDB와 연결하는 ODM 라이브러리

- 템플릿 엔진
    - ejs : 서버 사이드 템플릿 엔진 => app.set("view engine", "ejs")를 설정하면 res.render("파일이름")으로 .ejs 파일을 자동으로 렌더링

- 유틸리티 $ 기타
    - method-override : HTML 폼에서 PUT, DELETE 사용 가능하게 함함 => method-override("_method")를 설정하면, ?_method=PUT을 추가해서 요청하면 PUT으로 인식

