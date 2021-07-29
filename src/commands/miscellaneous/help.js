const Discord = require('discord.js');
const { capitalize, commandPaginate } = require("../../utils");

const command = {
    aliases: ["h"],
    description : "list of commands",
    example: ["!help <page>", "!help <commandName>"],
    group: "miscellaneous",
    name: "help",

    run: async (client, msg, args) => {

        // eslint-disable-next-line prefer-destructuring
        let page = args[0];

        let pageOrCmd = "page";

        if (!/^\+?(0|[1-9]\d*)$/.exec(args[0])) pageOrCmd = "cmd";

        if (args.length === 0) {
            pageOrCmd = "page";
            page = "1";
        }

        switch (pageOrCmd) {
            case "page": {

                const commands = commandPaginate(client.commands.array(), 4, Number(page));
                const colour = msg.guild?.me?.displayColor;

                let finalPage = 1;
                let notMax = false;
                while (!notMax) {
                    const cmds = commandPaginate(client.commands.array(), 4, finalPage);
                    if (cmds.length !== 0) {
                        finalPage++;
                    } else {
                        notMax = true;
                    }
                }
                finalPage -= 1;

                const embed = new Discord.MessageEmbed()
                    .setTitle(`${client.user?.tag}'s ${client.commands.size} Commands`)
                    .setTimestamp()
                    .setColor(colour)
                    .setFooter(`Page ${page} of ${finalPage} pages`);
                if (commands.length === 0) {
                    embed.addField("Empty", "> This page is emtpy!");
                } else {
                    commands.forEach((cmd) => {

                        let aliases = "";

                        if (cmd.aliases !== undefined) aliases = `> **Aliases:** ${cmd.aliases.map((a) => `\`${a}\``)}`;

                        embed.addField(capitalize(cmd.name), `${`> **Description:** ${cmd.description} \n`
                            + `> **Group:** ${capitalize(cmd.group)}\n`
                            + `> **Example usage:** ${cmd.example.map((a) => `\`${a}\``).join(", ")}\n`}${aliases}`);

                    });
                }

                return msg.channel.send(embed).then(() => {
                    if (msg.deletable) return msg.delete();
                });

            }

            case "cmd": {

                const colour = msg.guild?.me?.displayColor;


                const cmd = client.commands.array().find((c) => {
                    if (c.aliases !== undefined) {
                        const alias = c.aliases.findIndex((a) => a === args[0]);

                        if (alias === -1) {
                            return c.name === args[0];
                        }

                        return c.aliases[alias];

                    }
                    return c.name === args[0];
                });

                // Const cmd = client.commands.get(args[0]);
                const embed = new Discord.MessageEmbed();

                if (cmd === undefined) {
                    embed.setTitle("Command not found");
                    embed.setTimestamp();
                    embed.setColor(colour);
                    return msg.channel.send(embed).then(() => {
                        if (msg.deletable) return msg.delete();
                    });

                }

                let aliases = "";

                if (cmd.aliases !== undefined) aliases = `\n> \n> **Aliases:** ${cmd.aliases.map((a) => `\`${a}\``)}`;

                embed.setTitle(`${capitalize(cmd.name)}'s Details`);
                embed.setTimestamp();
                embed.setColor(colour);
                embed.setDescription(
                    `> **Description:** ${cmd.description}\n> \n`
                    + `> **Group:** ${capitalize(cmd.group)}\n> \n`
                    + `> **Example Usage:** ${cmd.example.map((a) => `\`${a}\``).join(", ")}`
                    + `${aliases}`

                );


                return msg.channel.send(embed).then(() => {
                    if (msg.deletable) return msg.delete();
                });

            }
        }
    }
}

exports.command = command;
