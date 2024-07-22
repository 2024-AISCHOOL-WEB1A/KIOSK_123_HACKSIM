// ==================================================== 게임 관련 ==========================================
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let isDrawing = false;  // 선이 그려지는 중인가?
let startX, startY;     // 시작 좌표
const images = [];
let lines = []; // 그려진 선들의 배열
// ==================================================== 게임 관련 ===========================================

// ==================================================== 모달 관련 ===========================================
const gameModal = document.getElementById('gameModal');
const closeBtn = document.querySelector('.gameModalClose');

const modalGameImage = document.getElementById('modalGameImage');
const modalGameText = document.getElementById('modalGameText');
const resetBtn = document.getElementById('resetBtn');
const mainBtn = document.getElementById('mainBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let imgTextName;
let currentIndex;
let resCnt;

// =========================================================================================================

document.addEventListener('DOMContentLoaded', () => {
    fetch('/game/data')
        .then(response => response.json())
        .then(data => {
            roadimagesData(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

function roadimagesData(imagesDatas){
    resCnt = 0;
    currentIndex = 0;
    imgTextName = [];
    imagesDatas.forEach((data, index) => {
        const img = new Image();
        img.onload = function() {
            img.name = data.GAME_ANSWER;
            imgTextName.push(data.GAME_ANSWER);
            images[index] = img;
            if (images.length === imagesDatas.length) {
                imgTextName = shuffleArray(imgTextName);
                drawImages();
            }
        };

        img.onerror = function() {
            console.error(`Failed to load image: ${data.IMG_PATH}`);
        };
        img.src = data.IMG_PATH;
    });
}

function drawImages() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    images.forEach((img, index) => {
        const x = 30;
        const y = 100 + index * 280;

        ctx.strokeStyle = 'YELLOW';
        ctx.lineWidth = 3;
        
        ctx.drawImage(img, x, y, 250, 180);
        ctx.strokeRect(x, y, 250, 180);
        
        ctx.fillStyle = '#000';
        ctx.font = '18px Arial';
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#000';

        ctx.strokeRect(x + 505, y + 73, 230, 40);
        ctx.fillText(imgTextName[index], x + 620, y + 100);
    });
}

function shuffleArray(array) {
    const newArray = array.slice()
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', drawLine);
canvas.addEventListener('touchend', stopDrawing);

function startDrawing(event) {
    isDrawing = true;
    lines.push([]);
    const touch = event.touches[0];
    startX = touch.clientX - canvas.getBoundingClientRect().left;
    startY = touch.clientY - canvas.getBoundingClientRect().top;
}

function drawLine(event) {
    if (!isDrawing) return;
    event.preventDefault(); // 터치 이벤트가 발생하면 기본 마우스 이벤트를 방지합니다.
    const currentLine = lines[lines.length - 1];
    const touch = event.touches[0];
    const x = touch.clientX - canvas.getBoundingClientRect().left;
    const y = touch.clientY - canvas.getBoundingClientRect().top;
    const previousPoint = currentLine.length > 0 ? currentLine[currentLine.length - 1] : { x: startX, y: startY };

    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000';

    ctx.beginPath();
    ctx.moveTo(previousPoint.x, previousPoint.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    currentLine.push({ x, y });
}

function stopDrawing() {
    isDrawing = false;
}

let downName = '';

canvas.addEventListener('touchstart', function(event) {
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches[0];
    const mouseX = touch.clientX - rect.left;
    const mouseY = touch.clientY - rect.top;

    images.forEach((img) => {
        const imgX = 30;
        const imgY = 100 + images.indexOf(img) * 280;
        const imgWidth = 250;
        const imgHeight = 180;
    
        if (mouseX >= imgX && mouseX <= imgX + imgWidth && 
            mouseY >= imgY && mouseY <= imgY + imgHeight) {
                downName = img.name;
                console.log(`클릭된 위치의 이미지 이름: ${img.name}`);
        }
    });
});

let upName = '';

canvas.addEventListener('touchend', function(event) {
    const rect = canvas.getBoundingClientRect();
    const touch = event.changedTouches[0];
    const mouseX = touch.clientX - rect.left;
    const mouseY = touch.clientY - rect.top;

    images.forEach((img,index) => {
        const imgX = 520;
        const imgY = 173 + images.indexOf(img) * 280;
        const imgWidth = 230;
        const imgHeight = 40;
        
        if (mouseX >= imgX && mouseX <= imgX + imgWidth && 
            mouseY >= imgY && mouseY <= imgY + imgHeight) {
                upName = imgTextName[index];
                console.log(`마우스 업된 위치의 이미지 이름: ${upName}`);
        }
    });

    if(upName == downName && upName !='' && downName != ''){
        alert("정답입니다.")
        resCnt+=1;
    }else{
        if (lines.length > 0) {
            alert("오답입니다. 다시한번 시도해보세요");
            const lastLine = lines.pop();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawImages();
            lines.forEach(line => {
                ctx.beginPath();
                ctx.moveTo(line[0].x, line[0].y);
                line.forEach(point => {
                    ctx.lineTo(point.x, point.y);
                });
                ctx.stroke();
            });
        }
    }
    if(resCnt == 5){
        modalGameImage.src = images[0].src;
        modalGameText.innerText = images[0].name;
        gameModal.style.display = 'flex'; // 모달을 보이게 설정
    }
});

// ==================================================== 모달 관련 ===========================================

// 게임 초기화
resetBtn.addEventListener('touchstart', () => {
    gameModal.style.display = 'none';
    location.href='/game';
})

// 메인화면으로 이동
mainBtn.addEventListener('touchstart', () => {
    gameModal.style.display = 'none';
    location.href='/';
})

closeBtn.addEventListener('touchstart', () => {
    gameModal.style.display = 'none'; // 모달을 숨김
});

window.addEventListener('touchstart', (event) => {
    if (event.target === gameModal) {
        gameModal.style.display = 'none'; // 모달 외부를 클릭했을 때 모달을 숨김
    }
});

// modalImage 변경하기
function showImage(index) {
    modalGameImage.src = images[index].src;
    modalGameText.innerText = images[index].name;
}

// 모달 이미지 prev
prevBtn.addEventListener('touchstart', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    showImage(currentIndex);
});

// 모달 이미지 next
nextBtn.addEventListener('touchstart', () => {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    showImage(currentIndex);
});