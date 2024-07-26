const express = require('express')
const router = express.Router()
const path = require('path')
// 페이지 렌더링 관련 Router 작성
router.use(express.static(path.join(__dirname, '../views')));
router.get('/', (req, res) =>{
    if (req.session.nick){
        console.log('session', req.session.nick)
    res.render('main', {nick: req.session.nick})
    } else {
        res.render('main')
    }
})
router.get('/hospitalB2', (req, res)=>{
    res.render('hospitalKioskB2')
})

router.get('/hospitalB1', (req, res)=>{
    res.render('hospitalKioskB1')
})

router.get('/hospital', (req, res)=>{
    res.render('hospitalKiosk')
})

router.get('/study', (req,res)=>{
    res.render('study')
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
    res.render('update', {nick : req.session.nick} )
})

router.get('/delete', (req,res)=>{
    res.render('delete', {nick : req.session.nick} )
})

router.get('/game', (req,res)=>{
    res.render('touchGame')
})

router.get('/learningNote', (req, res)=>{
    res.render('learningNote')
})

router.get('/help', (req, res)=>{
    res.render('help')
})

router.get('/hospitalKiosk.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'hospitalKiosk.html'));
});

router.get('/hospitalKiosk2.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'hospitalKiosk2.html'));
});

router.get('/hospitalKiosk3.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'hospitalKiosk3.html'));
});

router.get('/hospitalKiosk4.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'hospitalKiosk4.html'));
});

router.get('/hospitalKiosk5.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'hospitalKiosk5.html'));
});

router.get('/hospitalKiosk6.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'hospitalKiosk6.html'));
});

router.get('/hpKiosksoonap1.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'hpKiosksoonap1.html'));
});

router.get('/hpKiosksoonap2.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'hpKiosksoonap2.html'));
});

router.get('/hpKiosksoonap3.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'hpKiosksoonap3.html'));
});



module.exports = router