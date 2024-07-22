const express = require('express')
const router = express.Router()
const conn = require('../config/db')

// 회원가입
router.post('/join', (req, res) => {
    console.log('join 실행', req.body);

    let { nick, pw, btd, gen } = req.body;

    if (!nick || !pw) {
        return res.send("<script>alert('별명과 비밀번호를 입력해주세요'); window.history.back();</script>");
    }

    let checkNickSql = "SELECT * FROM KIOSK_USER_TB WHERE USER_NICK = ?";
    conn.query(checkNickSql, [nick], (err, results) => {
        if (err) {
            console.error(err);
            return res.send("<script>alert('오류가 발생했습니다. 다시 시도해주세요.'); window.history.back();</script>");
        }

        if (results.length > 0) {
            return res.send("<script>alert('이미 존재하는 별명입니다'); window.history.back();</script>");
        }

        let sql = "INSERT INTO KIOSK_USER_TB VALUES (?, ?, ?, ?)";
        conn.query(sql, [nick, pw, btd, gen], (err, rows) => {
            if (err) {
                console.error(err);
                return res.send("<script>alert('오류가 발생했습니다. 다시 시도해주세요.'); window.history.back();</script>");
            }

            console.log('insert 완료', rows);
            res.redirect('/');
        });
    });
});

// 로그인
router.post('/login', (req, res) => {
    console.log('login', req.body);
    let { nick, pw } = req.body;

    // 입력 데이터 검증
    if (!nick || !pw) {
        return res.send('<script>alert("아이디와 비밀번호를 입력해주세요."); window.history.back();</script>');
    }

    let sql = 'SELECT USER_NICK, USER_PW FROM KIOSK_USER_TB WHERE USER_NICK = ? AND USER_PW = ?';
    conn.query(sql, [nick, pw], (err, rows) => {
        if (err) {
            console.error(err);
            return res.send('<script>alert("오류가 발생했습니다. 다시 시도해주세요."); window.history.back();</script>');
        }

        console.log('rows', rows);
        if (rows.length > 0) {
            req.session.nick = nick;
            res.redirect('/');
        } else {
            res.send('<script>alert("아이디 혹은 비밀번호를 잘못 입력하셨습니다."); window.history.back();</script>');
        }
    });
});

// 로그아웃 (<script>문 사용시 ;을 제대로 적어주지 않으면 기능 수행되지 않음)
router.get('/logout', (req, res) => {
    console.log('로그아웃')
    req.session.destroy()
    res.send('<script>window.location.href="/";</script>');
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
                window.location.href="/update"</script>`)
        }
    })
})
module.exports = router