const express = require('express')
const router = express.Router()

// 페이지 렌더링 관련 Router 작성

router.get('/', (req, res) =>{
    if (req.session.nick){
        console.log('session', req.session.nick)
    res.render('main', {nick: req.session.nick})
    } else {
        res.render('main')
    }
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

router.get('/game', (req,res)=>{
    res.render('touchGame')
})
module.exports = router