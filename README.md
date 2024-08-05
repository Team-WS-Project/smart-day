# 🗓️ 캘린더 웹 사이트 제작 프로젝트

## 프로젝트 소개 

업무의 효율을 높여주는 **시간 관리 서비스**입니다. 아래의 기능들을 중점적으로 제작했습니다. 

- TODO 리스트 관리
- 월별 일정 관리
- 단기 예보 API를 활용한 날씨 정보 제공

<br/>
  
## 팀 소개

프로그래머스 데브코스 웹 풀 사이클 3기 **완승팀**입니다.

### 멘토

- **유승완**

### 프론트엔드 (FE)

| 역할 | 이름 | 담당 업무 |
| --- | --- | --- |
| 팀장 | [이진성](https://github.com/JSLEE753) | Todolist 페이지<br>전체 모달 구현<br>전역 데이터 구현<br>단기 예보 API 연동 |
| 팀원 | [이도형](https://github.com/leedohyung28) | 공통 컴포넌트 및 모달 구현<br>페이지 구현<br>로그인 구현 |
| 팀원 | [신유정](https://github.com/II-122) | 메인 페이지 구현<br>캘린더 페이지 구현<br>라우팅 기능 구현<br>단기 예보 API 적용 |

### 백엔드 (BE)

| 역할 | 이름 | 담당 업무 |
| --- | --- | --- |
| 팀원 | [양유나](https://github.com/una3325) | Schedules API 구현 |
| 팀원 | [이민형](https://github.com/leemh98) | Users API 구현<br>Favorites API 구현 |
| 팀원 | [최효은](https://github.com/hyoeun0001) | Todos API 구현<br>서버 배포 |

<br/>
 
## 프로젝트 폴더 구조

### 📦 client


<summary>프로젝트 구조</summary>

```less
less코드 복사
📂src
 ┣ 📂apis              // 백엔드 서버에 요청할 API 파일들을 모아놓은 폴더
 ┣ 📂components        // 모달에 사용되는 컴포넌트와 공통 페이지에 사용되는 컴포넌트 관리
 ┃ ┣ 📂ModalComponents
 ┃ ┗ 📂PageComponents
 ┣ 📂pages             // 핵심 페이지들의 컴포넌트 관리
 ┃ ┣ 📂MainPage
 ┃ ┣ 📂SchedulePage
 ┃ ┗ 📂TodolistPage
 ┣ 📂routes            // 상단의 헤더를 통해 페이지를 이동할 수 있도록 라우트 기능 관리
 ┃ ┗ 📜MainRoutes.tsx
 ┣ 📂store             // 전역 state 파일들을 관리
 ┣ 📜App.css.ts
 ┣ 📜App.tsx
 ┣ 📜index.css
 ┗ 📜main.tsx

```


### 📦 server


<summary>프로젝트 구조</summary>

```arduino
arduino코드 복사
┣ 📂controller          // 컨트롤러 파일
┣ 📂models              // SQL 함수 관리 폴더
┣ 📂node_modules
┣ 📂routes              // 경로 관리
┣ 📜.env
┣ 📜.gitignore
┣ 📜.prettierrc
┣ 📜app.js
┣ 📜auth.js
┣ 📜eslint.config.mjs
┗ 📜mariadb.js

```

<br/>

## .env 파일 설정

```
env코드 복사
PORT=0000
PRIVATE_KEY="PRIVATE_KEY"
TOKEN_EXPIRED_TIME=0h

```
