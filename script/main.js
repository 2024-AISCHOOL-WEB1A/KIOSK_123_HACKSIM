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

////main.html 번역부분
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
        ];
        
        let englishTexts = [];
        let isKorean = true;

        // 페이지 로드 시 번역 상태 복원
        const savedLanguage = localStorage.getItem('language') || 'ko'; // 기본값은 한국어
        if (savedLanguage === 'kor') {
            isKorean = false;
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

//study.html 번역부분
const API_KEY = 'AIzaSyDTtd9JTFAIkuR4rwLjU1IRuL2WEO97rh0'; // 구글 번역 API 키를 여기에 입력하세요.

const elementsToTranslate = [
    { id: 'title', text: '일단 이거 세번만 해볼까요?' },
    { id: 'subtitle', text: '어떤 키오스크 학습을 진행하시겠습니까?' },
    { id: 'KioskMacStart', text: '음식점' },
    { id: 'KioskHpStart', text: '병원' },
    { id: 'KioskOpStart', text: '행정' },
    { id: 'KioskTrStart', text: '교통' },
    { id: 'footerText', text: '일단 이거 세번 해볼까요?' }
];

let isTranslated = false;
const originalTexts = {};
const translatedTexts = {};

// 번역 함수
async function translateText(text, targetLang) {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: text, target: targetLang })
    });
    const data = await response.json();
    return data.data.translations[0].translatedText;
}

// 번역 토글 함수
async function toggleTranslation() {
    for (const element of elementsToTranslate) {
        const elem = document.getElementById(element.id);
        const textElem = elem.tagName === 'P' ? elem : elem.querySelector('p') || elem;

        if (!isTranslated) {
            // 원본 텍스트 저장
            if (!originalTexts[element.id]) {
                originalTexts[element.id] = textElem.innerText;
            }

            // 번역된 텍스트 저장
            if (!translatedTexts[element.id]) {
                translatedTexts[element.id] = await translateText(originalTexts[element.id], 'en');
            }

            textElem.innerText = translatedTexts[element.id];
        } else {
            textElem.innerText = originalTexts[element.id];
        }
    }

    isTranslated = !isTranslated;
    // 현재 번역 상태를 로컬 스토리지에 저장
    localStorage.setItem('isTranslated', JSON.stringify(isTranslated));
}

// 페이지 로드 시 번역 상태 복원
document.addEventListener('DOMContentLoaded', function () {
    const savedState = JSON.parse(localStorage.getItem('isTranslated'));
    if (savedState) {
        isTranslated = savedState;
        toggleTranslation(); // 저장된 상태 적용
    }
});

// 번역 버튼 클릭 이벤트 리스너
document.getElementById('translateToggle').addEventListener('click', toggleTranslation);

    //음식점 난이도선택화면 번역
    const API_KEY1 = 'AIzaSyDTtd9JTFAIkuR4rwLjU1IRuL2WEO97rh0'; // 실제 구글 번역 API 키를 입력하세요

    const elementsToTranslate1 = [
        { id: 'title', text: '맥도날드 <br>키오스크 실습 교육' },
        { id: 'subtitle', text: '난이도를 아래에서 선택해주세요' },
        { id: 'description', text: '기초: 음성 안내가 나옴<br>심화:자유롭게 키오스크 선택 가능' },
        { id: 'basicEducation', text: '기초 교육' },
        { id: 'advancedEducation', text: '심화 교육' },
        { id: 'footerText', text: '일단 이거 세번 해볼까요?' }
    ];

    let isTranslated1 = false;
    const originalTexts1 = {};
    const translatedTexts1 = {};

    // 번역 함수
    async function translateText(text, targetLang) {
        const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ q: text, target: targetLang })
        });
        const data = await response.json();
        return data.data.translations[0].translatedText;
    }

    // 번역 토글 함수
    async function toggleTranslation() {
        for (const element of elementsToTranslate1) {
            const elem = document.getElementById(element.id);
            if (!elem) continue;

            // 요소의 텍스트를 얻음
            const textElem = elem.tagName === 'P' ? elem : elem.querySelector('p') || elem;

            if (!isTranslated1) {
                // 원본 텍스트 저장
                if (!originalTexts1[element.id]) {
                    originalTexts1[element.id] = textElem.innerHTML;
                }

                // 번역된 텍스트 저장
                if (!translatedTexts1[element.id]) {
                    translatedTexts1[element.id] = await translateText(originalTexts1[element.id], 'en');
                }

                textElem.innerHTML = translatedTexts1[element.id];
            } else {
                textElem.innerHTML = originalTexts1[element.id];
            }
        }

        isTranslated1 = !isTranslated1;
        // 현재 번역 상태를 로컬 스토리지에 저장
        localStorage.setItem('isTranslated1', JSON.stringify(isTranslated1));
    }

    // 페이지 로드 시 이전페이지 번역 상태 복원/ 페이지 로드시 자동번역되는부분
    // document.addEventListener('DOMContentLoaded', function () {
    //     const savedState = JSON.parse(localStorage.getItem('isTranslated1'));
    //     if (savedState !== null) {
    //         isTranslated1 = savedState;
    //         toggleTranslation(); 
    //     }
    // });

    // 번역 버튼 클릭 이벤트 리스너
    document.getElementById('translateToggle').addEventListener('click', toggleTranslation);

    // 이전 페이지 버튼
    const headLearnBt = document.getElementById('headLearnBt');
    headLearnBt.addEventListener('click', () => {
        location.href = '/study';
    });

    const macBasicKiosk = document.getElementById('macBasicKiosk');
    macBasicKiosk.addEventListener('click', () => {
        location.href = '/macBasicKioMain';
    });

    const macDeepKiosk = document.getElementById('macDeepKiosk');
    macDeepKiosk.addEventListener('click', () => {
        location.href = '/macDeepKioMain';
    });

    