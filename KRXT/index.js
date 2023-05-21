const { Client, Intents } = require('discord.js')
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ]
});

const prefix = '-';

const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);
});

client.on('messageCreate', (msg) => {
    if (msg.author.bot) {
        return;
    }
    if (msg.content === 'กิต') {
        msg.reply('เรื้อน')
    }
});

client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'play'){
        client.commands.get('play').execute(message, args);
    } else if (command === 'leave'){
        client.commands.get('leave').execute(message, args);
    }
});

client.login('MTA3MzgyOTYzNTI5NDQ5NDc3MA.GwtjD9.vNR_eXHqGIvNQYT4z4rTi7POgpdtFNyg0t52L8');
