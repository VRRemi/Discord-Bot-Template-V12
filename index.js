const Discord = require("discord.js");
const fs = require("fs");
const dotenv = require('dotenv');
dotenv.config();

const client = new Discord.Client();
client.config = process.env;

client.login(client.config.token);

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection();

fs.readdirSync('./commands').forEach(dir => {
    const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));
    commands.forEach(file => {
      const props = require(`./commands/${dir}/${file}`);
      let commandName = file.split(".")[0];
      if (commandName) {
        client.commands.set(commandName, props);
      };
    });
  });
  