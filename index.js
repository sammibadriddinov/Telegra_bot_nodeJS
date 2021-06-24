const TelegramApi = require('node-telegram-bot-api')
const api = '1899318430:AAH728sWM84pE-yH4xwIAouLib78InGw3Zs'
const bot = new TelegramApi(api, {polling: true})
const chats = {}
const gameOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
      [{text: '3', callback_data: '3'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
      [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
      [{text: '0', callback_data: '0'}]
    ]
  })
}
const againOption = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{text: 'Boshqattan boshlash', callback_data: '/again'}]
    ]
  })
}
bot.setMyCommands([
  {command: '/start', description: "Boshlang'ich uchrashuv"},
  {command: '/info', description: "Siz xaqingizda malumot"},
  {command: '/game', description: "Play Game"}
])
const startGame = async (chatId) => {
  await bot.sendMessage(chatId, '0 dan 9 gacha son tanladim.')
  const randomNumber = Math.floor(Math.random() * 10) // 0.6 * 10 = 1.6
  chats[chatId] = randomNumber
  return bot.sendMessage(chatId, 'Sonni top', gameOptions)
}
const start = () => {
  bot.on('message', async msg => {
    const text = msg.text
    const chatId = msg.chat.id

    if(text === '/start') {
      await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/571/3e6/5713e61b-1872-3ed1-baf8-9b758bdb7d9d/1.webp')
      return bot.sendMessage(chatId, `Xush kelibsiz`)
    }
    if(text === '/info') {
      return bot.sendMessage(chatId, `Sizni ismingiz ${msg.from.first_name}`)
    }
    if(text === '/game') {
      return startGame(chatId)
    }
    return bot.sendMessage(chatId, 'Man bu narsani bilmayman')
  })

  bot.on('callback_query', msg => {
    const data = msg.data
    const chatId = msg.message.chat.id
    if(data === '/again') {
      return startGame(chatId)
    }
    if(data === chats[chatId]) {
      return bot.sendMessage(chatId, `Tabrikliman, siz tog'ri sonni tanladingiz, ${chats[chatId]}`)
    }else{
      return bot.sendMessage(chatId, `Afsuski, san tog'ri javob topa olmading ${chats[chatId]}`, againOption)
    }
  })
}
start()