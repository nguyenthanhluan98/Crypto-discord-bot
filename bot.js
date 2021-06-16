const { default: axios } = require('axios');
const {Client} = require('discord.js');
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

            return message.reply(`
            \nThe current price of 1 **${coin.toUpperCase()}**
            \nPrice[${currency}]: ${data.ticker.last}
            \nLow price: ${data.ticker.low}
            \nHigh price: ${data.ticker.high}`);

        } catch (error) {
            console.log('Failed to get price', error);
        }
    }

})

