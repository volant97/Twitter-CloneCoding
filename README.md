# Deploy

https://twitter-clonecoding-65e79.web.app/

# Dev Notes

### 2024.02.27

#### 3.4

- 초기 세팅
- Routing
- LoadingScreen
- Firebase 세팅
- Login
- CreateAccount
- ProtectedRoute

### 2024.02.28

#### 3.6

- SNS 로그인 (Github)

### 2024.02.29

#### 4.0

- 네비게이션바
- 로그아웃

### 2024.03.01

#### 4.1

- tweet textarea
- label, input 관계
- accept (파일 확장자 유효성 검사 필요)

### 2024.03.02

#### 4.2

- firebase DB, Storage 세팅
- DB 업로드 로직

### 2024.03.03

#### 4.3

- tweet 업로드 : firebase Storage 이미지 업로드 및 DB 데이터에 연결
- file 유효성 검사 : 용량 1MB 제한

### 2024.03.04

#### 4.4

- query 추출
- tweet 화면에 출력

### 2024.03.05

#### 4.5

- tweet에 Realtime 적용
- 크롬, 사파리에서 스크롤바 숨기기
- useEffect clean-up 함수로 Realtime 구독해제
- query 페이지네이션으로 최초로 불러오는 데이터 제한 (페이지 로직 필요)

### 2024.03.06

#### 4.6

- tweet 삭제 버튼
- tweet delete button 접근 조건 추가
- 첨부된 이미지가 있다면 같이 삭제

### 2024.03.07

#### 5.0

- Profile
- User Avatar
- storage, updateProfile photoURL 저장
- 유저 이름, 아바타 표시
- transition CSS

### 2024.03.08

#### 5.1

- User's Timeline
- Query Filtering
- 해당 유저 tweets 표시

### 2024.03.09

#### 5.2

- User Name Change
- 프로필(name) 변경 로직 구현
- transition CSS

### 2024.03.10

#### 6.0

- Firebase Deploy

### 2024.03.11

#### 6.1

- Firebase Security Rules
  - read
  - write : create, update, delete 포함
- Database & Storage
- 자세한 코드는 Firebase Security Rules.txt에서 확인

### 2024.03.12

#### 6.2

- API Key Security
- 배포된 주소만 추가하여 허용
- 자세한 내용은 API Key Security.txt에서 확인

### 2024.03.13

#### 6.3

- 구현 기능 정리
  - 유저 인증
  - 계정 생성
  - 로그인 & 소셜로그인
  - 트윗 추가, 트윗 삭제, 사진 첨부
  - 프로필 변경(사진, 이름)
  - 파이어베이스 호스팅 및 보안
