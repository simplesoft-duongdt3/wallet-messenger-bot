'use strict';
var config = require('config');
const config = config.get('messenger_bot.auth');

const BootBot = require('bootbot');

const bot = new BootBot({
  accessToken: config.accessToken,
  verifyToken: config.verifyToken,
  appSecret: config.appSecret
});

bot.on('message', (payload, chat) => {
  const text = payload.message.text;
  console.log(`The user said: ${text}`);
  chat.say(`Echo: ${text}`);
});

bot.hear(['hi', 'hello'], (payload, chat) => {
	// Send a text message with quick replies
	chat.say({
		text: 'What do you want to eat today?',
		quickReplies: ['Mexican', 'Italian', 'American', 'Argentine']
	});
});

bot.hear(['help'], (payload, chat) => {
	// Send a text message with buttons
	chat.say({
		text: 'What do you need help with?',
		buttons: [
			{ type: 'postback', title: 'Settings', payload: 'HELP_SETTINGS' },
			{ type: 'postback', title: 'FAQ', payload: 'HELP_FAQ' },
			{ type: 'postback', title: 'Talk to a human', payload: 'HELP_HUMAN' }
		]
	});
});

bot.start();