const express = require('express')
const app = express()
const nunjucks = require('nunjucks')

// ===================================== 세션 관련 라이브러리 불러오기 =====================================
const session = require('express-session')
const fileStore = require('session-file-store')(session)

// ===================================== Router 불러오기 =====================================
const mainRouter = require('./routes/mainRouter')
const userRouter = require('./routes/userRouter')
const kioskRouter = require('./routes/kioskRouter')
const gameRouter = require('./routes/gameRouter')

// ===================================== 넌적스 세팅 부분 =====================================
app.set('view engine', 'html')
nunjucks.configure('views',{
    express : app,
    watch : true
})

// ===================================== 세션 미들웨어 세팅 부분 =====================================
app.use(session({
    httpOnly : true,            // http 요청으로 온것만 처리
    resave : false,             // 세션을 항상 재저장할건지?
    secret : 'secret',          // 암호화 할때 사용하는 키
    store : new fileStore(),    // 세션을 어디에 저장할건지?
    saveUninitialized : false   // 세션에 저장할 내용이 없더라도 저장여부
}))

// ===================================== POST 값 받아오기 허용 부분 =====================================
app.use(express.urlencoded({extended : true}))

// ===================================== PUBLIC폴더 접근 경로 설정 부분 =====================================
app.use(express.static('public'))

// ===================================== ('/',라우터 연결) 부분 =====================================
app.use('/', mainRouter)
app.use('/user', userRouter)
app.use('/', kioskRouter)
app.use('/game',gameRouter)

// ===================================== port 연결 부분 =====================================
app.listen(3000, ()=>{
    console.log("3000 port waiting...");
})