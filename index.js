const TelegramBot = require('node-telegram-bot-api');
const request = require('request');
// replace the value below with the Telegram token you receive from @BotFather
const token = '1079095133:AAGT5hhCZS5cpD85f9W9y9zNYfuBy9MyTO4';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/hell/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, 'Какая валюта?....',{
  reply_markup: {
    inline_keyboard:[
      [
      {
        text:'EUR',
        callback_data:'EUR'
      },
      {
        text:'USD',
        callback_data:'USD'
      },
      {
        text:'RUB',
        callback_data:'RUB'
      },
      {
        text:'BTC',
        callback_data:'BTC'
      }
    ]
    ]
  }
}
  );
});
//7777777777777
//66666
//555555555555555555555555
function formatDate(date) {

  var dd = date.getDate();
  if (date.getHours() <=5 ){dd-=1;}

  if (dd < 10) dd = '0' + dd;

  var mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

   return dd + '.' + mm + '.' + date.getFullYear();
}

bot.on('callback_query', query => {
  const id = query.message.chat.id;
  const today = new Date();
console.log(formatDate(today));
  const REQ_TEXT = 'https://api.privatbank.ua/p24api/exchange_rates?json&date='+formatDate(today);
  request(REQ_TEXT, function(error, response, body){
    const data = JSON.parse(body);
    const result = data.exchangeRate.filter(item => item.currency === query.data)[0];
    //data.exchangeRate.forEach(element => {console.log(element)
          
    let md = `
    _${result.baseCurrency}_ -> _${result.currency}_
    Buy:  _${result.purchaseRate}_
    Sale: _${result.saleRate}_
 `;
 bot.sendMessage(id, md, {parse_mode:'Markdown'});
})
})