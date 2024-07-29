document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.game-button, .game-button1');
    const startButtons = {
        'startStdBtn': '/study',
        'startGameBtn': '/game',
        'startLoginBtn': '/login',
        'startHelpBtn': '/help'
    };

    // 시작 버튼에 이벤트 리스너 추가
    Object.keys(startButtons).forEach(id => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.addEventListener('click', () => {
                location.href = startButtons[id];
            });
        }
    });

    // 모든 '시작하기' 버튼에 클릭 효과 추가
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
            }, 300); // 300ms는 CSS 트랜지션 시간과 일치해야 합니다.
        });
    });

    // 번역 버튼 및 텍스트 설정
    const translateButton = document.getElementById('translateButton');
    if (translateButton) {
        const koreanTexts = [
            "키오스크 실습 교육 플랫폼",
            "키오스크 실습 교육",
            "시작하기",
            "낱말 학습 게임",
            "로그인/회원가입",
            "도움말",
            "주문하기 버튼을 눌러주세요.",
            "주문하기",
            "포인트를 적립하세요",
            "도움기능",
            "식사장소를 선택해 주세요",
            "매장",
            "포장",
            "버거는 1955버거를 선택해주시고, 사이드는 후렌치 후라이를 선택, 음료는 코카콜라를 선택하시고 주문하기 버튼을 눌러주세요."
        ];

        let englishTexts = [];
        let isKorean = true;

        // 페이지 로드 시 번역 상태 복원
        const savedLanguage = localStorage.getItem('language') || 'ko'; // 기본값은 한국어
        if (savedLanguage === 'kor') {
            isKorean = true;
            translateButton.innerText = '한국어로 번역';
            applyTranslations(koreanTexts);
        }

        translateButton.addEventListener('click', async () => {
            if (isKorean) {
                await translateToEnglish(koreanTexts);
            } else {
                applyTranslations(koreanTexts);
                translateButton.innerText = 'Translate to English';
                saveLanguageState('ko');
                isKorean = true;
            }
        });

        async function translateToEnglish(texts) {
            if (englishTexts.length === 0) {
                try {
                    const results = await Promise.all(texts.map(text => translateText(text)));
                    englishTexts = results.map(result => result.translatedText);
                } catch (error) {
                    console.error('Error:', error);
                }
            }
            applyTranslations(englishTexts);
            translateButton.innerText = '한국어로 번역';
            saveLanguageState('en');
            isKorean = false;
        }

        function applyTranslations(translations) {
            console.log('Applying translations:', translations);
        
            const titleText = document.getElementById('titleText');
            if (titleText) titleText.innerText = translations[0];
        
            const kioskTitle = document.getElementById('kioskTitle');
            if (kioskTitle) kioskTitle.innerHTML = translations[1].replace("\n", "<br>");
        
            const gameButtons = document.querySelectorAll('.game-button');
            if (gameButtons[0]) gameButtons[0].innerText = translations[2];
            if (gameButtons[1]) gameButtons[1].innerText = translations[2];
            if (gameButtons[2]) gameButtons[2].innerText = translations[2];
        
            const wordGameTitle = document.getElementById('wordGameTitle');
            if (wordGameTitle) wordGameTitle.innerHTML = translations[3].replace("\n", "<br>");
        
            const loginTitle = document.getElementById('loginTitle');
            if (loginTitle) loginTitle.innerHTML = translations[4].replace("\n", "<br>");
        
            const helpTitle = document.getElementById('helpTitle');
            if (helpTitle) helpTitle.innerText = translations[5];
        
            const gameButton1s = document.querySelectorAll('.game-button1');
            if (gameButton1s[0]) gameButton1s[0].innerText = translations[2];
        }
        
        const titleText = document.getElementById('titleText');
        if (titleText) {
            console.log('titleText found');
            titleText.innerText = translations[0];
        } else {
            console.warn('titleText not found');
        }

        async function translateText(text) {
            const apiKey = 'AIzaSyDTtd9JTFAIkuR4rwLjU1IRuL2WEO97rh0'; // 실제 API 키로 교체하세요
            try {
                const response = await axios.post(`https://translation.googleapis.com/language/translate/v2`, {}, {
                    params: {
                        q: text,
                        target: 'en',
                        key: apiKey
                    }
                });
                return { translatedText: response.data.data.translations[0].translatedText };
            } catch (error) {
                console.error('Error:', error);
                return { translatedText: text }; // 실패 시 원본 텍스트 반환
            }
        }

        function saveLanguageState(language) {
            localStorage.setItem('language', language);
        }
    }
});

