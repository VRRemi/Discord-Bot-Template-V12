exports.run = (client, message, args) => {
    const Discord = require('discord.js');
    var serverIcon = message.member.guild.iconURL();
    
    const pingEmbed = new Discord.MessageEmbed()
        .setTitle("Bot Status",serverIcon)
        .setDescription(
            `\\> Ping: ${Math.round(client.ws.ping)}ms\n` +
            `\\> Bot Uptime: **${ms(client.uptime)}**\n` + 
            `\\> Memory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
            `)

    .setFooter(" ");

message.channel.send(pingEmbed);
}