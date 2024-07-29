const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
//번역 api호출 위한 추가코드-----
const bodyParser = require('body-parser');
const axios = require('axios');
const port = 3000;

const apiKey = 'YAIzaSyDTtd9JTFAIkuR4rwLjU1IRuL2WEO97rh0'; // 여기에 실제 API 키를 입력하세요.

app.use(bodyParser.json());

app.post('/translate', async (req, res) => {
  const { text, targetLanguage } = req.body;

  if (!text || !targetLanguage) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const response = await axios.post(`https://translation.googleapis.com/language/translate/v2`, {
      q: text,
      target: targetLanguage,
      key: apiKey
    });
    
    const translation = response.data.data.translations[0].translatedText;
    res.json({ translatedText: translation });
  } catch (error) {
    console.error('Error during translation:', error);
    res.status(500).json({ error: 'Translation error' });
  }
});
//-----번역 코드 끝
// ===================================== 세션 관련 라이브러리 불러오기 =====================================
const session = require('express-session')
const fileStore = require('session-file-store')(session)

// ===================================== Router 불러오기 =====================================
const mainRouter = require('./routes/mainRouter')
const userRouter = require('./routes/userRouter')
const kioskRouter = require('./routes/kioskRouter')
const gameRouter = require('./routes/gameRouter')
const macKioskRouter = require('./routes/macKioskRouter')

// ===================================== 넌적스 세팅 부분 =====================================
app.set('view engine', 'html')
nunjucks.configure('views',{
    express : app,
    watch : true
})

// 파비콘 에러 무시
app.get('/favicon.ico', (req, res) => res.status(204));

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

// ===================================== JSON 형식의 요청 본문 파싱 미들웨어 추가 =====================================
app.use(express.json()); 

// ===================================== PUBLIC폴더 접근 경로 설정 부분 =====================================
app.use(express.static('public'))
app.use(express.static('script'))
app.use(express.static('CSS'))

// ===================================== ('/',라우터 연결) 부분 =====================================
app.use('/', mainRouter)
app.use('/user', userRouter)
app.use('/kiosk', kioskRouter)
app.use('/game',gameRouter)
app.use('/macKiosk', macKioskRouter)
// ===================================== port 연결 부분 =====================================
app.listen(3000, ()=>{
    console.log("3000 port waiting...");
})