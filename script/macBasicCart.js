// 기초 가이드 요소 선언
const selectSetInfo = document.getElementById('selectSetInfo'); //미션 시작 모달
const selectSetInfoBtn = document.getElementById('selectSetInfoBtn'); // 미션 시작 모달 닫기
const basicNum1 = document.getElementById('basicNum1'); //사이드바 버거 가이드

const selectBugerBar = document.getElementById('selectBugerBar'); // 버거선택 모달
const selectBugerBtn = document.getElementById('selectBugerBtn'); // 버거선택 모달 닫기
const addToCartS = document.getElementById('addToCartS');   // 세트선택 가이드

const orderModal = document.getElementById('orderModal'); //세트선택 모달
const selectSetModal = document.getElementById('selectSetModal'); // 세트선택 안내 모달
const selectSetModalBtn = document.getElementById('selectSetModalBtn'); //세트선택 안내 모달 닫기

const setModal = document.getElementById('setModal'); // 사이드 선택 모달
const selectSideModal = document.getElementById('selectSideModal'); //사이드 안내 모달
const selectSideModalBtn = document.getElementById('selectSideModalBtn'); //사이드 안내 모달 닫기

const beverageModal = document.getElementById('beverageModal'); // 음료선택 모달
const selectBeverageModal = document.getElementById('selectBeverageModal'); //음료선택 가이드 모달
const selectBeverageModalBtn = document.getElementById('selectBeverageModalBtn'); //음료선택 가이드 모달 닫기

const setEndModal = document.getElementById('setEndModal'); //세트선택 종료 모달
const selectCartModal = document.getElementById('selectCartModal'); //세트선택 가이드 모달
const selectCartModalBtn = document.getElementById('selectCartModalBtn'); // 세트선택 가이드 모달 닫기
const setEndBtn = document.getElementById('setEndBtn'); //장바구니에 추가 버튼

const totalPrice = document.getElementById('totalPrice'); // 총액 text
const paymentBtn = document.getElementById('paymentBtn'); // 주문하기 버튼
const paymentModal = document.getElementById('paymentModal'); //주문확인 모달

const payCartBtn = document.getElementById('payCartBtn'); //결제창 결제버튼
const selectpaymentModal = document.getElementById('selectpaymentModal'); //결제 안내 모달
const selectpaymentModalBtn = document.getElementById('selectpaymentModalBtn'); //결제안내 모달 닫기

const selectEndModal = document.getElementById('selectEndModal');
const selectEndModalBtn = document.getElementById('selectEndModalBtn');
const cardPayModal = document.getElementById('cardPayModal');

const endModal = document.getElementById('endModal');
const selectorderNumModal = document.getElementById('selectorderNumModal');
const selectorderNumModalBtn = document.getElementById('selectorderNumModalBtn');

const orderNumber = document.getElementById('orderNumber');

window.onload = function() {
    if (window.location.pathname == '/macBasicKioIndex') {
        selectSetInfo.style.display = 'flex';

        // 오디오 재생 추가
        let audioMission = document.getElementById('audioMission');
        audioMission.currentTime = 0;
        audioMission.play();
    }
};

// 1. 페이지 로드시 => 모달창 띄워 미션 보여주기 => 버거를 선택
selectSetInfoBtn.addEventListener('click', () => {
    selectSetInfo.style.display = 'none';
    if (window.location.pathname == '/macBasicKioIndex') {
        basicNum1.classList.add('blinkingBorder');

        let audioIntro = document.getElementById('audioIntro');
        audioIntro.currentTime = 0;
        audioIntro.play();
    }
});

// 2. 버거 선택시 미션 가이드라인 변경, 2번 tts 재생 => 1955버거 선택
window.addEventListener('load', () => {
    basicNum1.classList.remove('blinkingBorder');

    waitForPageLoad().then(() => {
        document.querySelector('div[data-name="1955버거"]').classList.add('blinkingBorder');
        selectBugerBar.style.display = 'flex';

        let audioBurger = document.getElementById('audioBurger');
        audioBurger.currentTime = 0;
        audioBurger.play();
    });

    function waitForPageLoad() {
        return new Promise((resolve) => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('load', resolve);
            }
        });
    }
});

// 1955버거 선택 모달
selectBugerBtn.addEventListener('click', () => {
    selectBugerBar.style.display = 'none';
});

// 1955버거 클릭시 나오는 모달, 음성 => 세트선택을 선택
document.addEventListener('DOMContentLoaded', () => {
    const bugerDiv1955 = document.querySelector('div[data-name="1955버거"]');
    bugerDiv1955.addEventListener('click', () => {
        bugerDiv1955.classList.remove('blinkingBorder');
        orderModal.style.display = 'flex';
        selectSetModal.style.display = 'flex';
        addToCartS.classList.add('blinkingBorder');

        let audioSetSel = document.getElementById('audioSetSel');
        audioSetSel.currentTime = 0;
        audioSetSel.play();
    });
});

// 세트선택 모달 닫아주는 버튼
selectSetModalBtn.addEventListener('click', () => {
    selectSetModal.style.display = 'none';
});

// 세트선택 클릭시 이벤트 db 값 가져오고 후렌치후라이 강조, 음성안내
document.addEventListener('DOMContentLoaded', () => {
    addToCartS.addEventListener('click', () => {
        fetch('/macKiosk/macBasicSelectS')
            .then((response) => response.json())
            .then((data) => {
                selectSide.innerHTML = '';
                data.forEach((item) => {
                    const sideMenuItem = document.createElement('div');
                    sideMenuItem.classList.add('sideMenuItem');

                    sideMenuItem.dataset.name = item.IMG_NAME;
                    sideMenuItem.dataset.path = item.IMG_GROUP + item.IMG_PATH;

                    const img = document.createElement('img');
                    img.src = item.IMG_GROUP + item.IMG_PATH;

                    const name = document.createElement('h3');
                    name.innerText = item.IMG_NAME;

                    sideMenuItem.appendChild(img);
                    sideMenuItem.appendChild(name);

                    selectSide.appendChild(sideMenuItem);
                });

                orderModal.style.display = 'none';
                setModal.style.display = 'flex';
            })
            .then(() => {
                selectSideModal.style.display = 'flex';
                let SideDivFly = document.querySelector('div[data-name="후렌치후라이"]');
                SideDivFly.classList.add('blinkingBorder');

                let audioSide = document.getElementById('audioSide');
                audioSide.currentTime = 0;
                audioSide.play();

                // 음료 선택 모달 창
                SideDivFly.addEventListener('click', () => {
                    SideDivFly.classList.remove('blinkingBorder');
                    fetch('/macKiosk/macBasicSelectB')
                        .then((response) => response.json())
                        .then((data) => {
                            data.forEach((item) => {
                                const beverageMenuItem = document.createElement('div');
                                beverageMenuItem.classList.add('beverageMenuItem');

                                beverageMenuItem.dataset.name = item.IMG_NAME;
                                beverageMenuItem.dataset.path = item.IMG_GROUP + item.IMG_PATH;

                                const img = document.createElement('img');
                                img.src = item.IMG_GROUP + item.IMG_PATH;

                                const name = document.createElement('h3');
                                name.innerText = item.IMG_NAME;

                                beverageMenuItem.appendChild(img);
                                beverageMenuItem.appendChild(name);

                                selectBeverage.appendChild(beverageMenuItem);
                            });
                            setModal.style.display = 'none';
                            beverageModal.style.display = 'flex';
                        })
                        .then(() => {
                            let BeverageDivCoke = document.querySelector('div[data-name="코카콜라"]');
                            selectBeverageModal.style.display = 'flex';
                            BeverageDivCoke.classList.add('blinkingBorder');

                            let audioCoke = document.getElementById('audioCoke');
                            audioCoke.currentTime = 0;
                            audioCoke.play();

                            BeverageDivCoke.addEventListener('click', () => {
                                beverageModal.style.display = 'none';
                                BeverageDivCoke.classList.remove('blinkingBorder');
                                setEndModal.style.display = 'flex';

                                selectCartModal.style.display = 'flex';
                                setEndBtn.classList.add('blinkingBorder');

                                let audioCart = document.getElementById('audioCart');
                                audioCart.currentTime = 0;
                                audioCart.play();
                            });
                        })
                        .catch((error) => {
                            console.error('Error fetching data:', error);
                        });
                });
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    });
});

selectSideModalBtn.addEventListener('click', () => {
    selectSideModal.style.display = 'none';
});

selectBeverageModalBtn.addEventListener('click', () => {
    selectBeverageModal.style.display = 'none';
});

selectCartModalBtn.addEventListener('click', () => {
    selectCartModal.style.display = 'none';
});

// end 모달 장바구니 추가 클릭 이벤트
setEndBtn.addEventListener('click', () => {
    setEndModal.style.display = 'none';
    totalPrice.innerText = '￦7800';
    paymentBtn.classList.add('blinkingBorder');

    selectpaymentModal.style.display = 'flex';

    let audioEnd = document.getElementById('audioEnd');
    audioEnd.currentTime = 0;
    audioEnd.play();
});

// 세트 선택이후 주문하기 버튼 안내 모달 닫기
selectpaymentModalBtn.addEventListener('click', () => {
    selectpaymentModal.style.display = 'none';
});

// 주문하기 버튼 클릭이벤트
paymentBtn.addEventListener('click', () => {
    paymentModal.style.display = 'flex';    //결제확인모달 띄우기
    paymentBtn.classList.remove('blinkingBorder');  //btn 안내 끄기
    payCartBtn.classList.add('blinkingBorder');

    selectEndModal.style.display = 'flex';
    let audioPayment = document.getElementById('audioPayment');
    audioPayment.currentTime = 0;
    audioPayment.play();
});

selectEndModalBtn.addEventListener('click', () => {
    selectEndModal.style.display = 'none';
})

payCartBtn.addEventListener('click', () => {
    paymentModal.style.display = 'none';
    cardPayModal.style.display = 'flex';

    let audioCard = document.getElementById('audioCard');
    audioCard.currentTime = 0;
    audioCard.play();

    // 주문번호 표시
    var orderRNumber = getOrderNumber();
    orderNumber.innerText = orderRNumber; // 주문번호를 화면에 표시

    setTimeout(() => {
        cardPayModal.style.display = 'none';
        endModal.style.display = 'flex';
        selectorderNumModal.style.display = 'flex';

        let audio1 = new Audio('/voice/macBasic2_orderNum.mp3');
        audio1.play();
        audio1.onended = function() {
            // 주문번호를 읽기 위해 SpeechSynthesis API를 사용
            let orderNum = orderNumber.innerText;
            let msg = new SpeechSynthesisUtterance(orderNum);
            msg.lang = 'ko-KR';
            window.speechSynthesis.speak(msg);
    
            // 주문번호 읽기가 끝난 후 두 번째 오디오 파일 재생
            msg.onend = function() {
                let audio2 = new Audio('/voice/macBasic2_orderEnd.mp3');
                audio2.play();
            };
        };
    }, 4000);
});

// 주문번호 생성 및 관리
function getOrderNumber() {
    let orderNumber = localStorage.getItem('orderNumber');
    if (orderNumber === null) {
        // 주문번호가 없으면 무작위 생성 (1~999)
        orderNumber = Math.floor(Math.random() * 999) + 1;
    } else {
        // 주문번호가 있으면 1 증가 (1~999 범위 체크)
        orderNumber = parseInt(orderNumber) + 1;
        if (orderNumber > 999) {
            orderNumber = 1; // 최대값 초과 시 1로 초기화
        }
    }
    localStorage.setItem('orderNumber', orderNumber); // 주문번호 저장
    return orderNumber;
}

selectorderNumModalBtn.addEventListener('click', () => {
    location.href = '/study'
})