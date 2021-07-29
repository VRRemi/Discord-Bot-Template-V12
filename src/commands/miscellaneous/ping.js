const Discord = require('discord.js');
const ms = require("ms");

const command = {
    descirption: "Get a pong ping",
    example: ["!ping"],
    group: "miscellaneous",
    name: "ping",

    run: async (client, msg, args) => {
        var serverIcon = msg.member.guild.iconURL();

        const pingEmbed = new Discord.MessageEmbed()
            .setTitle("Bot Status", serverIcon)
            .setDescription(
                `\\> Ping: ${Math.round(client.ws.ping)}ms\n` +
                `\\> Bot Uptime: **${ms(client.uptime)}**\n` +
                `\\> Memory Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
                `)

            .setFooter(" ");

        return msg.channel.send(pingEmbed);
    }
}

exports.command = command;
