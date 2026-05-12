const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const submitButton = chatForm.querySelector('button');

// 1. Header Logic: Pastikan judul benar dan toggle di kiri
let chatHeader = document.getElementById('chat-header');
if (!chatHeader) {
    chatHeader = document.createElement('div');
    chatHeader.id = 'chat-header';
    chatBox.parentNode.insertBefore(chatHeader, chatBox);
}

// Bersihkan konten lama dan susun ulang: Toggle (Kiri) -> Judul (Kanan)
chatHeader.innerHTML = '';

const toggleBtn = document.createElement('button');
toggleBtn.id = 'dark-mode-toggle';
toggleBtn.textContent = '🌙'; // Hanya ikon
chatHeader.appendChild(toggleBtn);

toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙'; // Hanya ikon
});

const titleElement = document.createElement('h1'); // Menggunakan h1 untuk judul utama
titleElement.textContent = 'Your Travel Assistant';
titleElement.style.fontSize = '18px'; // Menjaga ukuran font agar tidak terlalu besar
chatHeader.appendChild(titleElement);

// Spacer untuk menyeimbangkan posisi judul agar tetap di tengah
const spacer = document.createElement('div');
spacer.className = 'header-spacer';
chatHeader.appendChild(spacer);

// Menyuntikkan CSS agar tampilan rapi dan berwarna hijau
const style = document.createElement('style');
style.textContent = `
    :root {
        --primary-green: #25d366;
        --bg-color: #f0f2f5;
        --text-color: #111b21;
        --message-user: #dcf8c6;
        --message-bot: #ffffff;
    }
    body.dark-mode {
        --bg-color: #0b141a;
        --text-color: #e9edef;
    }
    body { font-family: 'Segoe UI', Helvetica, Arial, sans-serif; background-color: var(--bg-color); color: var(--text-color); transition: 0.3s; margin: 0; padding: 10px; display: flex; flex-direction: column; align-items: center; }
    .container { width: 100%; max-width: 600px; }
    #chat-header {
        padding: 10px 15px; border-radius: 12px 12px 0 0;
        background-color: #075e54; /* Warna header solid hijau */
        color: white;
        display: flex; justify-content: space-between; align-items: center; gap: 10px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    }
    #chat-header h1 { /* Menggunakan h1 untuk judul */
        font-size: 18px;
        flex: 1;
        text-align: center;
        margin: 0;
    }
    #chat-box { 
        height: 500px; overflow-y: auto; padding: 15px; 
        overflow-y: auto; padding: 15px; border-radius: 0 0 12px 12px;
        background-color: #e5ddd5;
        background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
        background-blend-mode: overlay;
        box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        box-sizing: border-box;
        display: flex; flex-direction: column;
        border: none;
    }
    .message { 
        max-width: 80%; padding: 8px 12px; 
        border-radius: 8px; font-size: 14.5px; line-height: 1.4;
        box-shadow: 0 1px 1px rgba(0,0,0,0.15);
        word-wrap: break-word;
        color: #111b21 !important;
        white-space: pre-wrap;
    }
    .user-message { 
        background-color: #dcf8c6; margin-left: auto; 
        border-top-right-radius: 0; /* Gaya WhatsApp */
    }
    .model-message { 
        background-color: #ffffff; margin-right: auto; 
        border-top-left-radius: 0; /* Gaya WhatsApp */
    }
    #chat-form { margin-top: 15px; display: flex; gap: 10px; }
    #user-input { 
        flex: 1; padding: 12px 18px; border-radius: 25px; border: none;
        background-color: #ffffff; color: #111b21;
        box-shadow: 0 1px 2px rgba(0,0,0,0.2);
    }
    #dark-mode-toggle {
        background: rgba(255,255,255,0.2); color: white; border: none;
        width: 35px; height: 35px; border-radius: 50%; /* Lingkaran sempurna */
        display: flex; align-items: center; justify-content: center;
        cursor: pointer; font-size: 16px;
    }
    .header-spacer { width: 35px; } /* Sesuaikan lebar spacer */
    body.dark-mode #dark-mode-toggle { background: #202c33; color: #e9edef; border-color: #3b4a54; }
    button[type="submit"] { 
        background: #128c7e; /* Warna hijau WhatsApp */
        color: white; border: none; 
        padding: 0 20px; border-radius: 25px; cursor: pointer;
    }
`;
document.head.appendChild(style);

// Local state to maintain the conversation history for context
let conversationHistory = [];

/**
 * Appends a message to the chat box UI.
 * @param {string} role - 'user' or 'model'
 * @param {string} text - The message content
 * @returns {HTMLElement} - The created message element
 */
function appendMessage(role, text) {
    const messageDiv = document.createElement('div');
    // Matches styles for .user-message and .model-message
    messageDiv.classList.add('message', `${role}-message`);
    // textContent is used to prevent XSS attacks
    messageDiv.textContent = text;
    
    chatBox.appendChild(messageDiv);

    // Auto-scroll to the newest message
    chatBox.scrollTop = chatBox.scrollHeight;
    
    return messageDiv;
}

// Masukkan pesan salam pembuka ke dalam bubble saat load
window.addEventListener('DOMContentLoaded', () => {
    const greeting = `Halo! Senang bertemu dengan Anda. Saya siap membantu Anda merencanakan liburan impian.

Untuk memulainya, boleh saya tahu beberapa informasi berikut?

1. Ke mana Anda berencana untuk berlibur?
   Misalnya: kota, negara, pantai, gunung, atau destinasi tertentu.

2. Berapa lama waktu yang Anda miliki untuk liburan ini?
   Misalnya: 3 hari, 1 minggu, 10 hari, dan sebagainya.

Setelah mendapatkan informasi tersebut, saya akan mulai menyusun itinerary liburan yang menarik dan sesuai dengan kebutuhan Anda.`;
    appendMessage('model', greeting);
});

chatForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const text = userInput.value.trim();
    if (!text) return;

    // 1. Add User Message to UI and History
    appendMessage('user', text);
    conversationHistory.push({ role: 'user', text: text });

    // Clear input field immediately
    // 2. Lock UI state
    userInput.value = '';
    userInput.disabled = true;
    submitButton.disabled = true;

    // 2. Tampilkan pesan loading asisten
    const botMessageElement = appendMessage('model', 'Sedang berpikir...');

    try {
        // 3. Kirim permintaan POST ke backend dengan riwayat percakapan
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ conversation: conversationHistory }),
        });

        if (!response.ok) throw new Error('Gagal mendapatkan respons dari server.');

        const data = await response.json();

        // 4. Bersihkan tanda bintang dan tampilkan jawaban asli
        if (data && data.result) {
            // Menghapus semua tanda bintang (*) dan pagar (#)
            const cleanText = data.result.replace(/[*#]/g, '').trim();
            botMessageElement.textContent = cleanText;
            // Simpan teks yang sudah BERSIH ke history agar bot tidak bingung di chat selanjutnya
            conversationHistory.push({ role: 'model', text: cleanText });
        } else {
            botMessageElement.textContent = "Maaf, tidak ada jawaban dari asisten.";
        }
    } catch (error) {
        console.error('Chat Error:', error);
        botMessageElement.textContent = "Gagal terhubung ke server travel.";
    } finally {
        // 5. Buka kembali kontrol UI
        userInput.disabled = false;
        submitButton.disabled = false;
        userInput.focus();
    }
});
