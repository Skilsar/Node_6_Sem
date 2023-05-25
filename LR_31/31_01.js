const express = require("express");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
const botToken = "6256114543:AAFeHeVM9krFuDA9TXha3pR42N98ud2Uxbg";
const bot = new TelegramBot(botToken, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const message = msg.text;

  const replyMarkup = {
    keyboard: [["Get bot`s name"], ["Get date"], ["Get time"]],
    resize_keyboard: true,
    one_time_keyboard: true,
  };

  if (message === "/start") {
  } else if (message === "Get bot`s name") {
    bot
      .getMe()
      .then((botInfo) => {
        const botName = botInfo.username;
        bot.sendMessage(chatId, `Bot's name is ${botName}`);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  } else if (message === "Get date") {
    const nowDate = new Date().toLocaleDateString();
    bot.sendMessage(chatId, `Current date: ${nowDate}`);
  } else if (message === "Get time") {
    const nowTime = new Date().toLocaleTimeString();
    bot.sendMessage(chatId, `Current time: ${nowTime}`);
  } else {
    bot.sendMessage(chatId, `echo: ${message}`);
  }

  bot.sendMessage(chatId, "Change an option or send a message", {
    reply_markup: replyMarkup,
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000/");
});
