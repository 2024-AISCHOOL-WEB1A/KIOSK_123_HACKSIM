const express = require('express')
const router = express.Router()
const conn = require('../config/db')

// 회원가입
router.post('/join', (req, res) => {
    console.log('join 실행', req.body)

    let { nick, pw, btd, gen } = req.body

    let sql = "insert into KIOSK_USER_TB values (?, ?, ?, ?)"
    conn.query(sql, [nick, pw, btd, gen], (err, rows) => {
        console.log(err);
        console.log('insert 완료', rows)
        if (rows) {
            res.redirect('/')
        } else {
            res.send(`<script>
                        alert('다시 시도해주세요')
                        window.location.href='/join'
                    </script>`)
        }

    })

})

// 로그인
router.post('/login', (req, res) => {
    console.log('login', req.body)
    let { userNick, userPw } = req.body

    let sql = 'SELECT USER_NICK FROM KIOSK_USER_TB WHERE USER_NICK = ? AND USER_PW = ?'
    conn.query(sql, [userNick, userPw], (err, rows) => {
        console.log('rows', rows)
        if (rows.length > 0) {
            req.session.nick = userNick;
            res.redirect('/')
        } else {
            res.send('<script>("아이디 혹은 비밀번호를 잘못입력하셨습니다.")</script>')
        }
    })
})

// 회원정보 수정
router.post('/update', (req, res) => {
    console.log('회원정보 수정', req.body)

    let { nick, pw } = req.body
    let sql = "UPDATE KIOSK_USER_TB SET USER_NICK = ? WHERE USER_PW = ?"
    conn.query(sql, [ nick, pw ], (err, rows) => {
        console.log('rows', rows)
        if (rows.affectedRows > 0) {
            res.redirect('/')
        } else {
            res.send(`<script>
                alert("별명 혹은 비밀번호를 다시 입력해주세요.")
                window.location.href="/update"
                </script>`)
        }
    })
})
module.exports = router