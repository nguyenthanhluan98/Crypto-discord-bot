const {Client} = require('discord.js');
const dotenv = require('dotenv');

// load environment variables
dotenv.config();

const bot = new Client();


bot.login(process.env.DISCORD_BOT_TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
  });

bot.on('message', msg => {
    if(msg.content === 'ping') {
        msg.reply('hello bro');
        msg.channel.send('pong');
    }
    if(msg.content.includes('doge coin')) {
        msg.reply('To the moon');
    }
})

