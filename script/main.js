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

    // 번역 기능 초기화
    initTranslation({
        translateButtonId: 'translateButton',
        elementsToTranslate: [
            { id: 'titleText', text: '키오스크 실습 교육 플랫폼' },
            { id: 'kioskTitle', text: '키오스크 실습 교육' },
            { id: 'startButton1', text: '시작하기' },
            { id: 'startButton2', text: '시작하기' },
            { id: 'startButton3', text: '시작하기' },
            { id: 'wordGameTitle', text: '낱말 학습 게임' },
            { id: 'loginTitle', text: '로그인/회원가입' },
            { id: 'helpTitle', text: '도움말' },
            { id: 'orderButton', text: '주문하기 버튼을 눌러주세요.' },
            { id: 'orderStartButton', text: '주문하기' },
            { id: 'pointSaveButton', text: '포인트를 적립하세요' },
            { id: 'helpFunctionButton', text: '도움기능' },
            { id: 'selectDiningPlace', text: '식사장소를 선택해 주세요' },
            { id: 'dineIn', text: '매장' },
            { id: 'takeOut', text: '포장' }
        ],
        apiKey: 'AIzaSyDTtd9JTFAIkuR4rwLjU1IRuL2WEO97rh0'
    });
});

/**
 * 번역 기능을 초기화합니다.
 * @param {Object} options - 옵션 객체.
 * @param {string} options.translateButtonId - 번역 버튼의 ID.
 * @param {Array} options.elementsToTranslate - 번역할 요소 배열.
 * @param {string} options.apiKey - Google Translate API 키.
 */
function initTranslation({ translateButtonId, elementsToTranslate, apiKey }) {
    const translateButton = document.getElementById(translateButtonId);
    if (!translateButton) return;

    let isKorean = true;
    const originalTexts = {};
    let translatedTexts = [];

    // 페이지 로드 시 번역 상태 복원
    const savedLanguage = localStorage.getItem('language') || 'ko';
    if (savedLanguage === 'en') {
        isKorean = false;
        translateButton.innerText = '한국어로 번역';
        applyTranslations(translatedTexts, elementsToTranslate);
    }

    translateButton.addEventListener('click', async () => {
        if (isKorean) {
            await translateToEnglish(elementsToTranslate);
        } else {
            applyTranslations(originalTexts, elementsToTranslate);
            translateButton.innerText = 'Translate to English';
            saveLanguageState('ko');
            isKorean = true;
        }
    });

    async function translateToEnglish(elements) {
        if (translatedTexts.length === 0) {
            try {
                const results = await Promise.all(elements.map(el => translateText(el.text)));
                translatedTexts = results.map(result => result.translatedText);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        applyTranslations(translatedTexts, elements);
        translateButton.innerText = '한국어로 번역';
        saveLanguageState('en');
        isKorean = false;
    }

    function applyTranslations(translations, elements) {
        elements.forEach((element, index) => {
            const elem = document.getElementById(element.id);
            if (elem) {
                if (!originalTexts[element.id]) {
                    originalTexts[element.id] = elem.innerText;
                }
                elem.innerText = translations[index];
            }
        });
    }

    async function translateText(text) {
        const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
        try {
            const response = await axios.post(url, null, {
                params: { q: text, target: 'en', format: 'text' }
            });
            return response.data.data.translations[0];
        } catch (error) {
            console.error('Error:', error);
            return { translatedText: text };
        }
    }

    function saveLanguageState(language) {
        localStorage.setItem('language', language);
    }
}
document.addEventListener('DOMContentLoaded', function () {
    // 번역 기능 초기화
    initTranslation({
        translateButtonId: 'translateToggle',
        elementsToTranslate: [
            { id: 'title', text: '일단 이거 세번만 해볼까요?' },
            { id: 'subtitle', text: '어떤 키오스크 학습을 진행하시겠습니까?' },
            { id: 'KioskMacStart', text: '음식점' },
            { id: 'KioskHpStart', text: '병원' },
            { id: 'KioskOpStart', text: '행정' },
            { id: 'KioskTrStart', text: '교통' },
            { id: 'footerText', text: '일단 이거 세번 해볼까요?' },
            { id: 'title', text: '맥도날드 <br>키오스크 실습 교육' },
            { id: 'subtitle', text: '난이도를 아래에서 선택해주세요' },
            { id: 'description', text: '기초: 음성 안내가 나옴<br>심화:자유롭게 키오스크 선택 가능' },
            { id: 'basicEducation', text: '기초 교육' },
            { id: 'advancedEducation', text: '심화 교육' },
            { id: 'footerText', text: '일단 이거 세번 해볼까요?' }
        ],
        apiKey: 'AIzaSyDTtd9JTFAIkuR4rwLjU1IRuL2WEO97rh0'
    });
});
document.addEventListener('DOMContentLoaded', function () {
    // 번역 기능 초기화
    initTranslation({
        translateButtonId: 'translateToggle',
        elementsToTranslate: [
            // 여기에 번역할 요소를 추가합니다.
        ],
        apiKey: 'AIzaSyDTtd9JTFAIkuR4rwLjU1IRuL2WEO97rh0'
    });
});
