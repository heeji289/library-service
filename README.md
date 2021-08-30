# 도서관 대여 서비스 📚

## 목차
1. [**프로젝트 개요**](#1)
2. [**디렉토리 구조**](#2)
3. [**API 명세**](#3)
4. [**실행 방법**](#4)
5. [**상세 기능**](#5)

<div id="1">
  
## 프로젝트 개요

도서관에 있는 책을 온라인으로 관리할 수 있는 웹 서비스로 책의 상세 정보, 대여/반납 기능을 유저에게 제공한다.

`Node.js` `express` `MySQL` `Redis` `Sequelize`

  
[데모페이지](http://kdt-1st-project-29.koreacentral.cloudapp.azure.com)  
[발표자료](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/78ad8589-b1fd-4dc6-b87a-131fa68d70ae/0828_%EB%B0%9C%ED%91%9C%EC%9E%90%EB%A3%8C.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210830%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210830T093246Z&X-Amz-Expires=86400&X-Amz-Signature=b7b41f1f4d7a36adede62b9b3d3ed25ea45ebd10a0b78df65a4a69371092a25c&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%220828%2520%25EB%25B0%259C%25ED%2591%259C%25EC%259E%2590%25EB%25A3%258C.pdf%22)
  
</div>

<div id="2">

## 디렉토리 구조

```bash
├── public : css 및 img파일
├── views : HTML 파일
├── passport : Authentication을 위함
│   ├── local.js
│   ├── githubStrategy.js
│   └── index.js : passport 패키지 설정
├── routes : 라우팅 수행
│   ├── auth.js
│   ├── book.js
│   ├── rating.js
│   └── index.js
├── controller : user요청에 맞는 로직 수행
│   ├── user.js
│   ├── book.js
│   └── rating.js
├── services : model에 접근해 쿼리문 수행
│   ├── user.js
│   ├── book.js
│   ├── rating.js
│   └── record.js
├── models : 데이터베이스 스키마 설정
│   ├── user.js
│   ├── book.js
│   ├── record.js
│   ├── rating.js
│   └── (..)
└── app.js : 서버 실행 파일
```
  
</div>

<div id="3">

## API 명세

[Swagger page](https://app.swaggerhub.com/apis-docs/elice_heeji/elice_library/1.0.0)

- 수정 중

<details>
<summary>Naming Convention</summary>
<div markdown="1">

### 기본

- 단일 글자로 짓지 않는다. 이름을 보고 쓰임새를 알 수 있도록 한다.
- 이름 맨 앞, 맨 뒤에 '\_'을 쓰지 않는다.
- 약어는 모두 소문자 혹은 대문자로 표기한다.
- exports되는 파일 내 모든 상수는 대문자로 표기한다.
- 이름에 복수형을 표기하지 않는다.
- 줄임말을 사용하지 않는다.

### 파일 및 패키지

- 파일의 이름은 소문자로 표기한다. `helloworld.js`
- 패키지 이름은 lowerCamelCase로 표기한다.
- 파일의 이름은 default export의 이름과 일치해야 한다.

### 변수

- 변수의 이름은 lowerCamelCase로 표기한다.
- 변수의 이름은 알파벳으로 시작해야한다.

### 함수

- 함수의 이름은 lowerCamelCase로 표기한다.
- 함수의 이름은 동사 또는 동사구문으로 표기한다.
- 함수를 export할 때는 camelCase로 표기한다. (파일 이름과 구분되어야 함)
- 함수 라이브러리를 export할 때는 PascalCase로 표기한다.
- 함수의 파라미터는 lowerCamelCase로 표기한다.

### 객체

- 이름은 lowerCamelCase로 표기한다.
- export할 때는 PascalCase로 표기한다.

### 클래스

- 클래스나 생성자의 이름은 PascalCase로 표기한다.
- 이름은 명사 또는 명사구문으로 표기한다

</div>
</details>

</div>

<div id="4">

## 실행방법

### 개발

`npm install`  
`npm start`

### 배포

`npm start` (pm2 start app.js)  
`npx pm2 list` - 돌고 있는 노드 프로세스 확인  
`npx pm2 logs -err` - 로그확인  
`npx pm2 kill` - 서버 죽이기  
`npx pm2 reload all` - 서버 재시작  
`npx pm2 monit` - 모니터링  

</div>

<div id="5">

## 상세 기능

- **Authentication**
  - 아이디, 비밀번호, 이름을 입력받아 회원가입 시 유저 정보 저장
  - 유효성 검사 - 아이디는 이메일 형식, 이름은 한글 혹은 영어로만 입력, 비밀번호는 영어, 숫자, 특수문자를 모두 포함한 8자 이상
  - 아이디, 비밀번호 정보를 받아 로그인 성공 시 세션에 저장
  - 유효성 검사 - 아이디는 이메일 형식, 비밀번호는 영어, 숫자, 특수문자를 모두 포함한 8자 이상인지 유효성 검사 진행
  - 로그아웃 시 현재 세션에서 제거
  - oAuth - Github 로그인 가능

- 책 정보 출력
  - DB에 존재하는 책 리스트를 메인페이지에 출력
  - 기본순, 최신발간일 순, 최고 평점 순으로 정렬하여 볼 수 있음
  - 책마다 남은 재고 수와 평균 별점을 표기함
  - 한 페이지 당 9권의 책을 표시하도록 페이지네이션 기능
  - 제목을 클릭 시, 책 상세 정보 출력
    - 책에 달린 리뷰를 최신순으로 보여줌. 새로운 리뷰 작성, 수정, 삭제 가능

- 대여 및 반납
  - 책 재고가 남아있을 경우 유저가 책 대여 가능 (재고가 없거나 이미 빌린 책이면 대여 불가능 메세지 반환)
  - 반납하기를 눌러 책을 반납. 

- 대여기록
  - 유저의 대여기록을 보여줌 (대여, 반납 일 등)

- 검색
  - 책 이름, 출판사, 작가이름으로 책 검색

</div>
