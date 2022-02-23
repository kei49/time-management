const cron = require('node-cron');
const https = require('https');
require('dotenv').config()

cron.schedule('0,15,30,45 * * * *', () => {
  console.log("sending Slack notificaiton")
  sendSlackNotification();
});

function sendSlackNotification() {
  const messageWithMeta = {
    'username': '15min notification',
    'text': '<@kei> Check the BTC charts now!',
    'icon_emoji': ':ghost:',
    // "blocks": slackSection.slice(0, 49) // 50件までしかnotifyできない
  }

  let messageBody;
  try {
    messageBody = JSON.stringify(messageWithMeta);
  } catch (e) {
    throw new Error('Failed to stringify messageBody', e);
  }

  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(process.env.WEB_HOOK_URL_NOTIF, requestOptions, (res) => {
      let response = '';
      res.on('data', (d) => {
        response += d;
      });
      res.on('end', () => {
        resolve(response);
      })
    });
    // console.log("req; ", req)

    req.on('error', (e) => {
      reject(e);
    });

    req.write(messageBody);
    req.end();
  });
}