# 🗓️ 캘린더 웹 사이트 제작 프로젝트

## 프로젝트 소개 

업무의 효율을 높여주는 **시간 관리 서비스**입니다. 아래의 기능들을 중점적으로 제작했습니다. 

- TODO 리스트 관리
- 월별 일정 관리
- 단기 예보 API를 활용한 날씨 정보 제공

<br/>
  
## 팀 소개

프로그래머스 데브코스 웹 풀 사이클 3기 **완승팀**입니다.

### 프로젝트 기간
2024.6 - 2024.7 1개월

### 멘토

- **[유승완](https://github.com/Seung-wan)**

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

## 개발 환경

프레임 워크
- Typescript, React, Vite
- axios, Zustand			
- Node.js, Express, MariaDB, JWT	
- Notion, Figma, Slack, dbdiagram.io
    
</br>

## 설계

### ERD

users, todolists, schedules, favorites 테이블 <br>
<img width="265" alt="image (6)" src="https://github.com/user-attachments/assets/154dc67c-0515-4566-a7e6-a2a37f5b9746" />

### API 설계 
userAPI, todosAPI, schedulesAPI, 즐겨찾기 각각으로 구분하여 get, post, delete, put 기능을 설계 <br>
ex) <br>
<img width="348" alt="image (6)" src="https://github.com/user-attachments/assets/f95f9c5a-b9ee-4928-8e07-703efef98049" />

</br>
 
## 프로젝트 폴더 구조

### 📦 client

```less
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

```arduino
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

## 주요 기능

### 초기 화면 
로그인을 하고나면 당일로 부터 4일의 일정을 확인할 수 있습니다. 일정 추가를 누르면 모달이 뜨면서 내용을 추가 할 수 있습니다.<br>
<img width="700" alt="image" src="https://github.com/user-attachments/assets/189bcdbe-46c5-4418-9792-ec217e2521f9" />
<img width="700" alt="image (1)" src="https://github.com/user-attachments/assets/3d5ae99a-ea49-444d-aa54-b616bfb25cc9" />
<img width="700" alt="image (2)" src="https://github.com/user-attachments/assets/795b7600-89a0-49f1-907e-039dbce6ecf2" />
<img width="700" alt="image (3)" src="https://github.com/user-attachments/assets/c190e24c-7d6d-499a-9bab-3f7bc49318bd" />
<br>
로그인과 할 일 추가, todolist는 모달이 뜨면서 양식에 맞게 데이터를 저장할 수 있습니다.<br>
<img width="200" alt="image (4)" src="https://github.com/user-attachments/assets/9d6c3e74-13a7-4abd-9b2c-83163e67bf29" />
<img width="300" alt="image (5)" src="https://github.com/user-attachments/assets/c963d579-8d0d-49aa-b3b0-0669129666c7" />

