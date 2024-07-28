const macStartBtn = document.getElementById('macStartBtn');
const macIdxS = document.getElementById('macIdxS');
const macIdxT = document.getElementById('macIdxT');

macStartBtn.addEventListener('touchstart', () => {
    macStartModal.style.display= 'flex';
})

macIdxS.addEventListener('touchstart', () => {
    location.href = '/macBasicKioIndex';
})

macIdxT.addEventListener('touchstart', () => {
    location.href = '/macBasicKioIndex';
})