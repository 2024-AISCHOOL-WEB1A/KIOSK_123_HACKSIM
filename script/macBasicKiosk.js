const macStartBtn = document.getElementById('macStartBtn');
const macStartModal = document.getElementById('macStartModal')
const macIdxS = document.getElementById('macIdxS');
const macIdxT = document.getElementById('macIdxT');

const selectOrdering = document.getElementById('selectOrdering');
const selectOrderingBtn = document.getElementById('selectOrderingBtn');

window.onload = function() {
    let audioStart = document.getElementById('audioStart');
    audioStart.currentTime = 0;
    audioStart.play();
};

macStartBtn.addEventListener('touchstart', () => {
    macStartModal.style.display= 'flex';
    macStartBtn.classList.remove('blinkingBorder');

    macIdxS.classList.add('blinkingBorder');

    let audioPlace = document.getElementById('audioPlace')
    audioPlace.currentTime = 0;
    audioPlace.play();
})

macIdxS.addEventListener('touchstart', () => {
    location.href = '/macBasicKioIndex';
})

macIdxT.addEventListener('touchstart', () => {
    location.href = '/macBasicKioIndex';
})

selectOrderingBtn.addEventListener('touchstart', () => {
    selectOrdering.style.display = 'none';
})
