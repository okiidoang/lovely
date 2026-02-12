const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const container = document.querySelector('.container');
const celebration = document.getElementById('celebration');
const romanticMessage = document.getElementById('romanticMessage');
const mainGif = document.getElementById('mainGif');
const romanticMusic = document.getElementById('romanticMusic');

let noBtnSize = 1;
let noBtnClickCount = 0;
let canClickYes = false;

// Array GIF kucing sedih yang akan berganti setiap klik No
const sadCatGifs = [
    'https://media.giphy.com/media/33OrQ7lkbir3y/giphy.gif',                    // Kucing mata besar sedih
    'https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif',                    // Kucing nangis
    'https://media.giphy.com/media/6qFFgNgextP9u/giphy.gif',                    // Kucing loncat cute
    'https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif',                    // Kucing tidur
    'https://media.giphy.com/media/LmC8Seiz0nwoo/giphy.gif',                    // Kucing kaget
    'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',                    // Kucing di box
    'https://media.giphy.com/media/o0vwzuFwCGAFO/giphy.gif'                     // Kucing meow sedih
];

// Pesan-pesan romantis yang muncul saat coba klik Yes terlalu cepat
const romanticMessages = [
    { main: '💕 Sabar ya sayang... Coba tombol yang lain dulu 💕', sub: 'Aku mau lihat usaha kamu sampai akhir~' },
    { main: '✨ Belum boleh sayang... Tombol sebelah menunggu 💗', sub: 'Buktikan dulu kalau kamu serius~' },
    { main: '💖 Jangan buru-buru dong... Klik yang kiri dulu yaa 💖', sub: 'Perjalanan cinta butuh proses kan? 😊' },
    { main: '🌹 Hampir sampai kok... Tombol No-nya masih ada tuh 🌹', sub: 'Tunjukkan kesabaran kamu padaku~' },
    { main: '💝 Dikit lagi sayang... Coba lagi yaa 💝', sub: 'Cinta sejati butuh perjuangan kan? 💪' }
];

yesBtn.addEventListener('click', () => {
    // Validasi: Cek apakah tombol No sudah menghilang
    if (!canClickYes && noBtn.style.display !== 'none') {
        // Tampilkan pesan romantis
        const messageIndex = Math.min(noBtnClickCount, romanticMessages.length - 1);
        const message = romanticMessages[messageIndex];
        
        romanticMessage.querySelector('p:first-child').textContent = message.main;
        romanticMessage.querySelector('.sub-message').textContent = message.sub;
        romanticMessage.classList.remove('hidden');
        
        // Animasi shake pada tombol Yes
        yesBtn.style.animation = 'shake 0.5s';
        setTimeout(() => {
            yesBtn.style.animation = '';
        }, 500);
        
        // Sembunyikan pesan setelah 3 detik
        setTimeout(() => {
            romanticMessage.classList.add('hidden');
        }, 3000);
        
        return; // Ga bisa proceed
    }
    
    // Kalau sudah boleh, lanjut ke celebration
    container.style.display = 'none';
    celebration.classList.remove('hidden');
    
    // Play musik romantis
    romanticMusic.play().catch(err => {
        console.log('Audio autoplay dicegah browser:', err);
    });
    
    createHearts();
});

noBtn.addEventListener('click', () => {
    noBtnClickCount++;
    
    // Ganti GIF menjadi kucing sedih
    const gifIndex = (noBtnClickCount - 1) % sadCatGifs.length;
    mainGif.src = sadCatGifs[gifIndex];
    mainGif.style.animation = 'fadeIn 0.5s ease';
    
    // Perkecil tombol No
    noBtnSize *= 0.8;
    noBtn.style.transform = `scale(${noBtnSize})`;
    
    // Perbesar tombol Yes
    const yesCurrentSize = 1 + (noBtnClickCount * 0.3);
    yesBtn.style.transform = `scale(${yesCurrentSize})`;
    
    // Pindahkan tombol No ke posisi random
    moveButton();
    
    // Ubah teks tombol No
    const noTexts = ['Yakin?', 'Serius?', 'Masa sih?', 'Coba lagi deh', 'Jangan dong', 'Yakin nih?', 'Beneran?'];
    if (noBtnClickCount <= noTexts.length) {
        noBtn.textContent = noTexts[noBtnClickCount - 1];
    }
    
    // Sembunyikan tombol No jika terlalu kecil
    if (noBtnSize < 0.3) {
        noBtn.style.display = 'none';
        canClickYes = true; // Sekarang tombol Yes bisa diklik
        
        // Tampilkan pesan khusus
        romanticMessage.querySelector('p:first-child').textContent = '💕 Sekarang kamu boleh klik Yes sayang... 💕';
        romanticMessage.querySelector('.sub-message').textContent = 'Aku tunggu lama lho~ 😊💖';
        romanticMessage.classList.remove('hidden');
        
        setTimeout(() => {
            romanticMessage.classList.add('hidden');
        }, 3000);
    }
});

function moveButton() {
    const buttonContainer = document.querySelector('.button-container');
    const containerRect = buttonContainer.getBoundingClientRect();
    
    const maxX = containerRect.width - (noBtn.offsetWidth * noBtnSize);
    const maxY = 100;
    
    const randomX = Math.random() * maxX;
    const randomY = (Math.random() - 0.5) * maxY;
    
    noBtn.style.position = 'absolute';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

function createHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = Math.random() * 30 + 20 + 'px';
        heart.style.animation = 'floatUp 3s ease-in forwards';
        heart.style.zIndex = '9999';
        heart.style.pointerEvents = 'none';
        document.body.appendChild(heart);
        
        setTimeout(() => heart.remove(), 3000);
    }, 300);
}
