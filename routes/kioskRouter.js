const express = require('express');
const router = express.Router();
const conn = require('../config/db');

// 페이지 정보 저장 라우트
router.post('/save-page-info', (req, res) => {
    if (req.session.nick) {
        const userNick = req.session.nick;
        const catIdx = 1; // 예시값
        const noteDate = new Date();
        const infoPageNum = 1; // 예시값

        const query = `
            INSERT INTO KIOSK_NOTE_TB (USER_NICK, CAT_IDX, NOTE_DATE, INFO_PAGENUM)
            VALUES (?, ?, ?, ?)`;

        console.log('Executing query:', query);
        console.log('With values:', [userNick, catIdx, noteDate, infoPageNum]);

        conn.query(query, [userNick, catIdx, noteDate, infoPageNum], (error, results) => {
            if (error) {
                console.error('데이터베이스 쿼리 오류:', error);
                res.status(500).json({ success: false, message: '서버 오류가 발생했습니다.' });
            } else {
                console.log('Query executed successfully:', results);
                res.json({ success: true });
            }
        });
    } else {
        res.json({ success: false, message: '학습 저장은 로그인한 회원만 이용할 수 있습니다.' });
    }
});

module.exports = router;
