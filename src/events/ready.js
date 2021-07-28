const event = {
    name: "ready",
    run: (client) => {
        console.log(`Ready to serve!`);

        client.user.setPresence({ activity: { name: 'github.com/VRRemi', type: 'WATCHING' }, status: 'dnd' })
            .catch(console.error);
    }

}

exports.event = event;

// Type Options: WATCHING, PLAYING, STREAMING
// Status Options: online, idle, dnd
// Example: client.user.setPresence({ activity: { name: 'test', type: 'STREAMING'}, status: 'idle' })
//          .catch(console.error);
//              }