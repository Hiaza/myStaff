require('dotenv').config();

module.exports = {
    ServerPort: process.env["PORT"] || 4000,
    DatabaseUrl: process.env["DATABASE"]||'mongodb://localhost:27017/lab5db',
    google_clientID: "919825828754-ad9pesh84s67sokgels21ptlf3ivkh9s.apps.googleusercontent.com",
    google_clientSecret:"0o7P8WRdIY4YwDCiaR7rd1e_",
    bot_token: process.env["TELEGRAM_BOT"],
    cloudinary: {  cloud_name: 'drmonx1pj',
        api_key: '664184294934417',
        api_secret: 'KBgjVC_LFHJ6GIgGje_b48vklBg'}
};
