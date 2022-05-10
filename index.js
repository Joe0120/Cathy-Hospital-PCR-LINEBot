//----------------------------------------
// 載入必要的模組
//----------------------------------------
var linebot = require('linebot');
var express = require('express');
require('dotenv').config();
const WEBAPI = require('./WEB_API');

//----------------------------------------
// 填入自己在Line Developers的channel值
//----------------------------------------
var bot = linebot({
    channelId: process.env.channelId,
    channelSecret: process.env.channelSecret,
    channelAccessToken: process.env.channelAccessToken
});


//----------------------------------------
// 機器人接受訊息的處理
//----------------------------------------
bot.on('message', function (event) {
    event.source.profile().then(
        function (profile) {
            async function Result() {
                const result = await WEBAPI.getResult()
                if (result?.status == 200 && result?.data) {
                    console.log(result.data.result)
                    event.reply(result.data.result)
                }
            }
            Result()
        }
    )
});


//----------------------------------------
// 建立一個網站應用程式app
// 如果連接根目錄, 交給機器人處理
//----------------------------------------
const app = express();
const linebotParser = bot.parser();
app.post('/', linebotParser);

app.get('/', function (req, res) {
    res.send('OK');
    if (req.query.result) {
        console.log(req.query.result);
        bot.push(process.env.USERID, req.query.result)
    }
});


//----------------------------------------
// 可直接取用檔案的資料夾
//----------------------------------------
app.use(express.static('public'));


//----------------------------------------
// 監聽3000埠號, 
// 或是監聽Heroku設定的埠號
//----------------------------------------
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("正在監聽埠號:", port);
});