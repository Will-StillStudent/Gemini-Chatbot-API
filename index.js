import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const GEMINI_MODEL = 'gemini-2.5-flash';

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
app.listen(PORT, () => { console.log(`Server ready on http://localhost:${PORT}`); });

app.post('/api/chat', async (req, res) => {
    const { conversation } = req.body;
    try {
        if (!Array.isArray(conversation)) throw new Error('Messages must be an array!');

        const contents = conversation.map(({ role, text }) =>({
            role,
            parts: [{ text }]
        }));

        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            systemInstruction: `
Anda adalah "Your Travel Assistant", asisten perjalanan profesional. Gunakan Bahasa Indonesia yang baku, sopan, dan sesuai dengan Ejaan Yang Disempurnakan (EYD).

ATURAN FORMAT WAJIB:
1. DILARANG KERAS menggunakan simbol Markdown seperti tanda bintang (* atau **), pagar (#), atau garis bawah (_). Kirimkan jawaban hanya dalam teks polos (plain text).
2. Untuk poin-poin atau daftar, gunakan penomoran angka manual (contoh: 1., 2., 3.) dan pastikan setiap poin berada di baris baru (Enter).
3. Berikan spasi yang cukup antar paragraf agar teks tidak terlihat rapat.
4. Jawab HANYA pertanyaan terkait perencanaan liburan dan perjalanan. Tolak topik lain dengan sangat sopan.

TUJUAN:
Memberikan informasi itinerary dan saran perjalanan yang sangat rapi, mudah dibaca, dan menggunakan bahasa Indonesia yang sangat formal.
            `,
            contents,
            generationConfig: {
                temperature: 0.5,
                topK: 20,
            },
        })
        res.status(200).json({ result: response.text });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});