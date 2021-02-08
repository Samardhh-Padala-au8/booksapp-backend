let Pusher = require('pusher');
require('dotenv').config();
let pusher = new Pusher({
      appId: process.env.PUSHER_API_ID,
      key: process.env.PUSHER_API_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: process.env.PUSHER_CLUSTER
    });

module.exports = pusher