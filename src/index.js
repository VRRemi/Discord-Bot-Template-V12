const Discord = require("discord.js");
const fs = require("fs");
const dotenv = require('dotenv');
const path  = require("path");
dotenv.config();

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.events = new Discord.Collection();
client.config = process.env;

client.login(client.config.token);

const eventPath = path.join(__dirname, "events");

console.log(eventPath);
fs.readdir(eventPath, (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const { event }  = require(`${eventPath}/${file}`);
    client.events.set(event.name, event);
    console.log(event)
    client.on(event.name, event.run.bind(null, client));
  });
});



const commandPath = path.join(__dirname, "commands");
console.log(commandPath);
fs.readdirSync(commandPath).forEach((dir) => {
    const commands = fs.readdirSync(`${commandPath}/${dir}/`).filter((file) => file.endsWith(".js"));

    for (const file of commands) {
      const { command } = require(`${commandPath}/${dir}/${file}`);
      client.commands.set(command.name, command);

      if (command?.aliases !== undefined) {
          command.aliases.forEach((alias) => {
            client.aliases.set(alias, command);
          });
      }
  }
  });
  