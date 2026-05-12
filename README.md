# Gemini Chatbot API

Gemini Chatbot API adalah proyek chatbot berbasis web yang menggunakan **Node.js**, **Express**, **Vanilla JavaScript**, dan **Google Gemini API**. Aplikasi ini memungkinkan pengguna mengirim pesan melalui antarmuka web, kemudian pesan tersebut diproses oleh backend dan diteruskan ke model Gemini untuk menghasilkan respons AI secara real-time.

Proyek ini dibuat sebagai implementasi sederhana dari integrasi AI API dalam aplikasi web, dengan tujuan memahami alur komunikasi antara frontend, backend, dan layanan AI generatif.

---

## 🚀 Fitur Utama

- Chatbot berbasis web dengan antarmuka sederhana.
- Menggunakan Google Gemini AI untuk menghasilkan respons percakapan.
- Backend menggunakan Node.js dan Express.
- Frontend menggunakan HTML, CSS, dan Vanilla JavaScript.
- Komunikasi frontend dan backend melalui endpoint REST API.
- API key disimpan secara aman menggunakan file `.env`.
- Mendukung respons dinamis, bukan jawaban statis atau hardcoded.
- Struktur project sederhana dan mudah dikembangkan.

---

## 🧠 Teknologi yang Digunakan

- **Node.js**
- **Express.js**
- **Vanilla JavaScript**
- **HTML**
- **CSS**
- **Google Gemini API**
- **@google/genai**
- **dotenv**
- **cors**

---

## 📁 Struktur Folder

```bash
gemini-chatbot-api/
│
├── public/
│   ├── index.html
│   ├── script.js
│   └── style.css
│
├── .env
├── .gitignore
├── index.js
├── package.json
└── README.md
