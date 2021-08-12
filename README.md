# Bklog App

## App Commands

```bash
# install
$ yarn

# react-scripts start
$ yarn start

# postcss src/assets/tailwind.css -o src/assets/main.css
$ yarn build:css

# yarn build:css && react-scripts build
$ yarn build

# react-scripts test
$ yarn test

# react-scripts eject
$ yarn eject
```

---

## App Structure
```
(src)
├─── /assets
├─── /components
├─── /containers
├─── /hooks
├─── /pages
├─── /store
└─── /utils

(component)
├─── /utils
├─── component
└─── index

(store)
├─── /utils
|     ├─ actions
|     ├─ apiUtils
|     └─ index
├─── handler
├─── saga
└─── index
```
---


## Commit Message Convention

### 1. Commit Message Structure
```
#issue type

body
```


### 2. Commit Type
+ feat: 새로운 기능 추가
+ fix: 버그 수정
+ docs: 문서 수정
+ style: 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
+ refactor: 코드 리팩토링
+ test: 테스트 코드
+ chore: 빌드 업무 수정, 패키지 매니저 수정
+ temp: 임시 저장 
