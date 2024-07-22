const express = require('express')
const router = express.Router()

// 페이지 렌더링 관련 Router 작성

router.get('/', (req, res) =>{
    res.render('main')
})

router.get('/join', (req, res)=>{
    res.render('join')
})

router.get('/login', (req,res)=>{
    res.render('login')
})

router.get('/myPage', (req,res)=>{
    res.render('myPage')
})

router.get('/update', (req,res)=>{
    res.render('update')
})

router.get('/delete', (req,res)=>{
    res.render('delete')
})
module.exports = router