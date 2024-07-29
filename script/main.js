// 모든 '시작하기' 버튼을 선택합니다.
const buttons = document.querySelectorAll('.game-button, .game-button1');
const startStdBtn = document.getElementById('startStdBtn')
const startGameBtn = document.getElementById('startGameBtn');
const startLoginBtn = document.getElementById('startLoginBtn');
const startHelpBtn = document.getElementById('startHelpBtn');

// 각 버튼에 클릭 이벤트 리스너를 추가합니다.
buttons.forEach(button => {
    button.addEventListener('click', function () {
        // 클릭된 버튼에 'active' 클래스를 추가합니다.
        this.classList.add('active');

        // 잠시 후 'active' 클래스를 제거하여 효과가 반복되도록 합니다.
        setTimeout(() => {
            this.classList.remove('active');
        }, 300); // 300ms는 CSS 트랜지션 시간과 일치해야 합니다.
    });
});
startStdBtn.addEventListener('click', ()=>{
    location.href = '/study'
})

startGameBtn.addEventListener('click', ()=> {
    location.href = '/game'
})

startLoginBtn.addEventListener('click', () => {
    location.href = '/login'
})

startHelpBtn.addEventListener('click', () =>{
    location.href = '/help'
})

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('translateButton').addEventListener('click', toggleTranslation);

    let isKorean = true;
    const koreanTexts = [
        "키오스크 실습 교육 플랫폼",
        "키오스크 실습 교육",
        "시작하기",
        "낱말 학습 게임",
        "로그인/회원가입",
        "도움말"
    ];
    let englishTexts = [];

    async function toggleTranslation() {
        if (isKorean) {
            await translateToEnglish();
        } else {
            applyTranslations(koreanTexts);
            document.getElementById('translateButton').innerText = 'Translate to English';
            isKorean = true;
        }
    }

    async function translateToEnglish() {
        if (englishTexts.length === 0) {
            const promises = koreanTexts.map(text => translateText(text));

            try {
                const results = await Promise.all(promises);
                englishTexts = results.map(result => result.translatedText);
                applyTranslations(englishTexts);
                document.getElementById('translateButton').innerText = '한국어로 번역';
                isKorean = false;
            } catch (error) {
                console.error('Error:', error);
            }
        } else {
            applyTranslations(englishTexts);
            document.getElementById('translateButton').innerText = '한국어로 번역';
            isKorean = false;
        }
    }

    function applyTranslations(translations) {
        document.getElementById('titleText').innerText = translations[0];
        document.getElementById('kioskTitle').innerHTML = translations[1].replace("\n", "<br>");
        document.querySelectorAll('.game-button')[0].innerText = translations[2];
        document.getElementById('wordGameTitle').innerHTML = translations[3].replace("\n", "<br>");
        document.querySelectorAll('.game-button')[1].innerText = translations[2];
        document.getElementById('loginTitle').innerHTML = translations[4].replace("\n", "<br>");
        document.querySelectorAll('.game-button')[2].innerText = translations[2];
        document.getElementById('helpTitle').innerText = translations[5];
        document.querySelectorAll('.game-button1')[0].innerText = translations[2];
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
    //맥도날드 모달창 번역기능
    document.getElementById('translateButton').addEventListener('click', function() {
        const translations = {
            selectSetInfo: "For the burger, please select the <strong>1955 Burger</strong>,<br>for the side, please select <strong>French Fries</strong>,<br>for the drink, please select <strong>Coca-Cola</strong>,<br>and press the <strong>Order</strong> button.<br>",
            selectSetModal: "<strong>Select Set</strong> please.",
            selectSideModal: "Please select <strong>French Fries</strong>.",
            selectBeverageModal: "Please select <strong>Coca-Cola</strong>.",
            selectCartModal: "Please select <strong>Add to Cart</strong>.",
            selectpaymentModal: "Please press the <strong>Order</strong> button.",
            selectEndModal: "Please press the <strong>Pay</strong> button."
        };
    
        document.querySelectorAll('.missionModal').forEach(modal => {
            const pContainer = modal.querySelector('.pContainer p');
            if (pContainer) {
                const modalId = modal.id;
                if (translations[modalId]) {
                    pContainer.innerHTML = translations[modalId];
                }
            }
        });
    });
    
});