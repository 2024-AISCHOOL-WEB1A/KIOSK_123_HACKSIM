const express = require('express')
const router = express.Router()

// 페이지 렌더링 관련 Router 작성

router.get('/', (req, res) =>{
    res.render('main')
})

module.exports = router