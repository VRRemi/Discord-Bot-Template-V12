const event = {
    name: "message",
    run: async (client, msg) => {
    if (msg.author.bot) return;
  
    if (!msg.content.startsWith(client.config.prefix)) return;
  
    const args = msg.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
  
    if (!cmd) return;

    const command = client.commands.get(cmd) ?? client.aliases.get(cmd);

    if (command) {
        command.run(client, msg, args);
    }
  
    }
}
exports.event = event;
