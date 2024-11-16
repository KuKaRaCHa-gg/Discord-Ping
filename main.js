const Discord = require("discord.js");
const bot = new Discord.Client({intents:3276799});
const config = require("./config.js");

bot.on('ready', () => {
    console.log(`Bot connecté en tant que ${bot.user.tag}!`);
});

bot.on('message', message => {
    if (message.content === '!ping') {
        // Envoie un message de ping et édite le message pour montrer le temps de latence
        message.channel.send('Ping...').then(sentMessage => {
            const latency = sentMessage.createdTimestamp - message.createdTimestamp;
            sentMessage.edit(`Pong! La latence est de ${latency}ms.`);
        });
    }

    if (message.content === '!aide') {
        message.channel.send('Voici les commandes disponibles :\n!ping : Affiche la latence du bot.');
    }
});

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'bienvenue');
    if (!channel) return;
    channel.send(`Bienvenue sur le serveur, ${member}`);
});

bot.on('message', message => {
    if (message.content.startsWith('!supprimer')) {
        const args = message.content.split(' ');
        const amount = args[1];
        if (isNaN(amount)) {
            return message.channel.send('Veuillez spécifier un nombre de messages à supprimer.');
        } else {
            message.channel.bulkDelete(amount, true).catch(err => {
                console.error(err);
                message.channel.send('Il y a eu une erreur en essayant de supprimer les messages.');
            });
        }
    }

    if (message.content.startsWith('!sondage')) {
        const args = message.content.split(' ').slice(1);
        const question = args.join(' ');
        message.channel.send(`Sondage : ${question}`).then(sentMessage => {
            sentMessage.react('👍');
            sentMessage.react('👎');
        });
    }
});

bot.login(config.token);
