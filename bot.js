const { default: axios } = require('axios');
const Discord = require('discord.js');
const {Client} = Discord;
const dotenv = require('dotenv');

// load environment variables
dotenv.config();

const bot = new Client();


bot.login(process.env.DISCORD_BOT_TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
  });

bot.on('message', async (message)  => {
    
    if(message.content.startsWith('/p')) {
        
        const [command, ...args] = message.content.split(' ');
        let [coin, currency] = args;
        if(currency === '' || currency === undefined) {
            currency = 'usdt'
        }

        try {
            const {data} = await axios.get(`https://api.wazirx.com/api/v2/tickers/${coin}${currency}`);

            const formatData = new Discord.MessageEmbed().addFields(
                { name: 'The current price of 1 ', value: `**${coin.toUpperCase()}**` },
                { name: 'Current price', value: `${data.ticker.last}`, inline: true },
                { name: 'Low price', value: `${data.ticker.low}`, inline: true },
                { name: 'High price', value: `${data.ticker.high}`, inline: true },
           );

            return message.reply(formatData);
        } catch (error) {
            message.reply("Can't find your bullshit coin");
        }
    }
})

