// 모든 '시작하기' 버튼을 선택합니다.
const buttons = document.querySelectorAll('.game-button, .game-button1');
const startGameBtn = document.getElementById('startGameBtn');
const startLoginBtn = document.getElementById('startLoginBtn');

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

startGameBtn.addEventListener('click', ()=> {
    location.href = '/game'
})

startLoginBtn.addEventListener('click', () => {
    location.href = '/login'
})

