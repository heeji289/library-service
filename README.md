## 📔 도서관 대출 서비스

### 프로젝트 개요

---

도서관에 있는 책을 온라인으로 관리할 수 있는 웹 서비스
책의 상세 정보를 확인할 수 있는 페이지, 대여/반납 기능을 통해 도서 관리

`Node.js` `express` `mysql` `sequelize` `nunjucks` `axios`

### 실행방법

---

[개발]

`npm install`  
`npm start`

[배포]

`npm start` (pm2 start app.js)
`npx pm2 list` - 돌고 있는 노드 프로세스 확인
`npx pm2 logs -err` - 로그확인
`npx pm2 kill` - 서버 죽이기
`npx pm2 reload all` - 서버 재시작
`npx pm2 monit` - 모니터링

### 디렉토리 구조

---

```bash
├── public : css 및 img파일
├── views : HTML 파일
├── passport
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

### API 명세

---

[Swagger page](https://app.swaggerhub.com/apis-docs/elice_heeji/elice_library/1.0.0)

- 수정 중

### Naming Convention

---

#### 기본

- 단일 글자로 짓지 않는다. 이름을 보고 쓰임새를 알 수 있도록 한다.
- 이름 맨 앞, 맨 뒤에 '\_'을 쓰지 않는다.
- 약어는 모두 소문자 혹은 대문자로 표기한다.
- exports되는 파일 내 모든 상수는 대문자로 표기한다.
- 이름에 복수형을 표기하지 않는다.
- 줄임말을 사용하지 않는다.

#### 파일 및 패키지

- 파일의 이름은 소문자로 표기한다. `helloworld.js`
- 패키지 이름은 lowerCamelCase로 표기한다.
- 파일의 이름은 default export의 이름과 일치해야 한다.

#### 변수

- 변수의 이름은 lowerCamelCase로 표기한다.
- 변수의 이름은 알파벳으로 시작해야한다.

#### 함수

- 함수의 이름은 lowerCamelCase로 표기한다.
- 함수의 이름은 동사 또는 동사구문으로 표기한다.
- 함수를 export할 때는 camelCase로 표기한다. (파일 이름과 구분되어야 함)
- 함수 라이브러리를 export할 때는 PascalCase로 표기한다.
- 함수의 파라미터는 lowerCamelCase로 표기한다.

#### 객체

- 이름은 lowerCamelCase로 표기한다.
- export할 때는 PascalCase로 표기한다.

#### 클래스

- 클래스나 생성자의 이름은 PascalCase로 표기한다.
- 이름은 명사 또는 명사구문으로 표기한다

### 기능 상세

---

#### 필수 기능

- **로그인**

  - [x] 유저로부터 아이디(이메일)와 비밀번호 정보를 입력받아 로그인 합니다.
  - [x] 아이디와 비밀번호는 필수 입력 사항 입니다.
  - [x] 로그인한 유저에 대해 session으로 관리해야 합니다.
  - [x] 비밀번호는 다음의 [링크1](<https://www.law.go.kr/%ED%96%89%EC%A0%95%EA%B7%9C%EC%B9%99/(%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%EB%B3%B4%ED%98%B8%EC%9C%84%EC%9B%90%ED%9A%8C)%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%EC%9D%98%EA%B8%B0%EC%88%A0%EC%A0%81%C2%B7%EA%B4%80%EB%A6%AC%EC%A0%81%EB%B3%B4%ED%98%B8%EC%A1%B0%EC%B9%98%EA%B8%B0%EC%A4%80/(2020-5,20200811)>), [링크2](https://www.kisa.or.kr/public/laws/laws3_View.jsp?cPage=7&mode=view&p_No=259&b_No=259&d_No=102&ST=T&SV=)에 맞추어 최소 8자리 이상의 길이로 입력 받아야 합니다.
  - [x] 아이디는 이메일 형식으로만 입력 받아야 합니다.

- **회원가입**

  - [x] 유저로부터 아이디(이메일), 비밀번호, 이름 정보를 입력받아 회원가입합니다.
  - [x] 비밀번호와 비밀번호 확인의 값이 일치해야 합니다.
  - [x] 아이디는 이메일 형식으로만 정보를 입력 받아야 합니다.
  - [x] 이름은 한글, 영문으로만 입력 받아야 합니다.
  - [x] 비밀번호는 다음의 [링크1](<https://www.law.go.kr/%ED%96%89%EC%A0%95%EA%B7%9C%EC%B9%99/(%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%EB%B3%B4%ED%98%B8%EC%9C%84%EC%9B%90%ED%9A%8C)%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%EC%9D%98%EA%B8%B0%EC%88%A0%EC%A0%81%C2%B7%EA%B4%80%EB%A6%AC%EC%A0%81%EB%B3%B4%ED%98%B8%EC%A1%B0%EC%B9%98%EA%B8%B0%EC%A4%80/(2020-5,20200811)>), [링크2](https://www.kisa.or.kr/public/laws/laws3_View.jsp?cPage=7&mode=view&p_No=259&b_No=259&d_No=102&ST=T&SV=)에 맞추어 영문, 숫자, 특수문자 중 2종류 이상을 조합하여 최소 10자리 이상 또는 3종류 이상을 조합하여 최소 8자리 이상의 길이로 구성합니다.

- **로그아웃**

  - [x] 현재 로그인한 유저에 대해 로그아웃 합니다.
  - [x] 로그아웃한 유저를 현재 session에서 제거해야 합니다.

- **메인 페이지**

  - [x] 현재 DB 상에 존재하는 모든 책 정보를 가져옵니다.
  - [x] 현재 DB 상에 존재하는 남은 책의 수를 표기합니다.
  - [x] 책 이름을 클릭 시 책 소개 페이지로 이동합니다.
  - [x] 책의 평점은 현재 DB 상에 담겨있는 모든 평점의 평균입니다. 숫자 한자리수로 반올림하여 표기합니다.
  - [x] 페이지네이션 기능을 추가합니다. 한 페이지 당 8권의 책만을 표기합니다.

- **대여하기**

  - [x] 메인 페이지의 대여하기 버튼을 클릭하여 실행합니다.
  - [x] 현재 DB 상에 책이 존재 하지 않는 경우, 대여되지 않습니다.
  - [x] 현재 DB 상에 책에 존재하는 경우, 책을 대여하고 책의 권수를 -1 합니다.
  - [x] 현재 DB 상에 책이 존재하지 않는 경우, 유저에게 대여가 불가능하다는 메세지를 반환합니다.
  - [x] 유저가 이미 이 책을 대여했을 경우, 이에 대한 안내 메세지를 반환합니다.

- **반납하기**

  - [x] 로그인한 유저가 대여한 책을 모두 보여줍니다.
  - [x] 반납하기 버튼을 통해 책을 반납합니다. 책을 반납한 후 DB 상에 책의 권수를 +1 합니다.

- **책소개**

  - [x] 메인 페이지의 책 이름을 클릭하여 접근합니다.
  - [x] 책에 대한 소개를 출력합니다.
  - [x] 가장 최신의 댓글이 보이도록 정렬하여 보여줍니다.
  - [x] 댓글을 작성함으로써 책에 대한 평가 점수를 기입합니다.
  - [x] 댓글 내용과 평가 점수는 모두 필수 입력 사항입니다.

- **대여기록**
  - [x] 로그인한 유저가 대여 후 반납했던 책에 대한 모든 사항을 출력합니다.

#### 추가 기능

- [x] 검색 (책이름, 출판사, 작가이름)
- [x] 정렬 (평점순, 출간일순)

- [x] 서평 삭제
- [x] 서평 수정 (내용만 수정가능)

- [x] 리팩토링 (MVC)
- [x] 리팩토링 (네이밍)

- [x] redis db에 세션 정보 저장
- [x] oAuth - github login 기능

### DEV NOTE

---

<details>
<summary>8.16</summary>
<div markdown="1">

- passport + session으로 로그인 관리
- 회원가입, 로그인 시 이메일, 글자 수 등 validation 추가 필요 (현재 html 상으로 구현)
- 책 정보 데이터베이스 업데이트 (스크립트 작성함)
- 계속 로그인하기 귀찮은데 관리자 권한 이런 거 없나
- 전체 책 이름 출력 기능 구현
  - 책 이름 누르면 상세 페이지 이동 구현할 것

</div>
</details>
<details>
<summary>8.17</summary>
<div markdown="1">

- 메인페이지
  - books에서 가져올 수 있는 것 모두 출력 (책 이미지, 책 제목, 남은 권 수)
  - 책 이미지는 png, jpg를 하드코딩해서 구분함, 크기는 임의로 100px로 줄임, 나중에 css로 수정할 것
- 상세페이지
  - GET /book/:id (메인페이지에서 클릭했을 때 요청)
  - 코멘트를 제외한 상세 내용 출력
- API를 swagger로 기록하는 거 계속 도전해보기
- 대여하기
  - axios로 post 요청 보냄 -> post borrow/:id
  - 데이터베이스에서 stock 값을 update함
  - 대여기록 남기는 거 구현해야함 => borrow.create()
  - 대여하고 나서 redirect시 자동으로 refresh가 안됨 😂
    - 해결 : axios response에서 재렌더링 부분 처리함
- Borrow DB : 빌린 사람, 빌린 책, 언제 빌렸는지, 언제 반납했는지

  - foreign key를 써서 만들어야할 것 같은데 조금 헷갈림
  - DB 구상은 완료함 > sequelize로 구현 어떻게 할지 고민중
  </div>
  </details>

<details>
<summary>8.19</summary>
<div markdown="1">

- 어제 밤에 실험해본다고 이것저것 건드려놨더니 눈뜨니까 프로그램이 망가져있었다.. 롤백했다! 잘게 커밋하는 이유를 알겠음이야
- 오늘은 record db 설계한 거 직접 구현할 것
  - 완료 belongsTo, hasMany로 관계 설정해둠
- 대여시 record db에 create할 것
  - 완료 생성 잘됨
  - 중복검사 기능 추가함
- 반납시 record db update
  - 반납하기 기능 구현완료
- css 스타일링 조금

- oAuth, 비밀번호 재설정, 검색하기, 페이지네이션, 코멘트 기능(별점), 카테고리, 인기대여작(대여횟수), 별점순, 최신순, 시계, validation

</div>
</details>

<details>
<summary>8.20</summary>
<div markdown="1">

- rating API 설계 (CRUD), 추가로 book, record db 수정 필요
- DB 수정할 것
  - book에 avg_rating 컬럼 추가할 것
  - record에 rated 컬럼 추가할 것
- DB 구축할 것
  - ratings -- user_name -- rating -- comment -- createAt (UserId, BookId: FK)
- Book detail page

  - 별점, 코멘트 데이터 받아오기 성공

- 메인 기능에 더 초점을 맞출 걸 추천 (코치님)
- create rating: 내일 book avg_rating 업데이트 부분 구현해야함

</div>
</details>

<details>
<summary>8.23</summary>
<div markdown="1">

- 메인페이지에 평균 별점 출력되도록 수정하였음.
- 리뷰가 최신순으로 출력되도록 수정하였음. (findAll할 때 where과 order를 한 객체에 담아 넘겨야한다... 문법오류 안잡아준다..!)

- 날짜 표기가 이상하게 되는 부분 수정완료.
- validation 부분 추가하였음. json으로 에러메세지 반환하도록 했는데 프론트에서 이쁘게 출력하려면 어떻게 해야할지..

  - 회원가입, 로그인, 댓글

- 더 추가하고 싶은 것
  - (완료) 대여기록에 서평 작성하기 버튼 추가
  - 검색기능 (책이름, 출판사, 작가이름)
  - 메인페이지 (최신순, 별점순, 인기순)
  - oAuth
  - My page

</div>
</details>

<details>
<summary>8.24</summary>
<div markdown="1">

- 페이지네이션 구현 완료
- 코멘트 수정, 삭제 권한에 맞게 표시하는 것 구현함
- 책 제목으로 검색할 수 있게 구현 완료
- 로그인, 회원가입 폼 간격들 수정함

- 메인페이지 최신순, 별점순, 인기순으로 출력하는 것 추가할 것
- oAuth 추가할 것
- my page 구상할 것

[오피스아워]

- 개발 / 프로덕트 분리 => .env
- DB 백업 restore로 옮기기 가능
- 발표할 때 개발 순서 관련 내용은?
  - 요구사항을 어떻게 분석했고
  - API 설계를 어떻게 했으며
  - DB는 어떻게 구축해서
  - 구현했다. 이런 플로우로 설명하면 된다.

</div>
</details>
