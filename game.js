const prizes = [
    { name: '👜 包包', probability: 1, color: '#FF6B9D' },
    { name: '👟 鞋子', probability: 10, color: '#4ECDC4' },
    { name: '🍗 聖誕晚餐', probability: 49, color: '#FFE66D' },
    { name: '💕 聖誕節快樂', probability: 20, color: '#FF6B6B' },
    { name: '💄 保養品', probability: 20, color: '#95E1D3' }
];

const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const resultDiv = document.getElementById('result');

let currentRotation = 0;
let isSpinning = false;

// 繪製轉盤
function drawWheel() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 180;
    const sliceAngle = (2 * Math.PI) / prizes.length;

    prizes.forEach((prize, index) => {
        const startAngle = currentRotation + index * sliceAngle;
        const endAngle = startAngle + sliceAngle;

        // 繪製扇形
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = prize.color;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();

        // 繪製文字
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = '#333';
        ctx.font = 'bold 20px Arial';
        ctx.fillText(prize.name, radius / 1.5, 10);
        ctx.restore();
    });

    // 繪製中心圓
    ctx.beginPath();
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#c41e3a';
    ctx.lineWidth = 4;
    ctx.stroke();
}

// 根據機率選擇獎項
function selectPrize() {
    const random = Math.random() * 100;
    let cumulative = 0;

    for (let prize of prizes) {
        cumulative += prize.probability;
        if (random <= cumulative) {
            return prizes.indexOf(prize);
        }
    }

    // 如果沒有選中（包包 0%），返回聖誕晚餐
    return 2;
}

// 旋轉轉盤
function spinWheel() {
    if (isSpinning) return;

    isSpinning = true;
    spinBtn.disabled = true;
    resultDiv.textContent = '';

    const selectedIndex = selectPrize();
    const sliceAngle = (2 * Math.PI) / prizes.length;
    const spins = 5; // 轉5圈

    // 箭頭在下方 = Math.PI/2
    // 要讓 selectedIndex 的中心停在 Math.PI/2 位置
    // selectedIndex 的中心角度 = selectedIndex * sliceAngle + sliceAngle/2
    // 所以 currentRotation + selectedIndex * sliceAngle + sliceAngle/2 = Math.PI/2
    // currentRotation = Math.PI/2 - selectedIndex * sliceAngle - sliceAngle/2

    const targetRotation = Math.PI / 2 - selectedIndex * sliceAngle - sliceAngle / 2;
    const totalRotation = spins * 2 * Math.PI + targetRotation;

    const duration = 4000;
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 緩動函數
        const easeOut = 1 - Math.pow(1 - progress, 4);

        currentRotation = totalRotation * easeOut;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            spinBtn.disabled = false;
            showResult(selectedIndex);
        }
    }

    animate();
}

// 顯示結果
function showResult(index) {
    const prize = prizes[index];
    resultDiv.textContent = `🎉 恭喜獲得：${prize.name} 🎉`;
}

// 初始化
drawWheel();

// 綁定按鈕事件
spinBtn.addEventListener('click', spinWheel);

