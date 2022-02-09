const ytdl = require('ytdl-core')
var search = require('youtube-search');
const {YT_API_KEY} = require('../config.json')

var opts = {
    maxResults: 1,
    key: YT_API_KEY
};

//This is a recursive function which means that it calls itself over and over again. We use recursion so it plays the next song when the song is finished.
const play = (guild, song, queue) => {
    const serverQueue = queue.get(guild.id);
    if (!song) {
      serverQueue.voiceChannel.leave();
      queue.delete(guild.id);
      return;
    }
    
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url), {bitrate: 192000 /* 192kbps */})
      .on("finish", () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0], queue);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`+song.url);
}

const execute = async (message, serverQueue, queue)=>{
    const args = message.content.split(" ")
    const voiceChannel = message.member.voice.channel
    if(!voiceChannel){
        console.log(message.client.user)
        return message.channel.send("You need to be in a voice channel to play music")
    }
    const permissions = voiceChannel.permissionsFor(message.client.user)
    if(!permissions.has("CONNECT") || !permissions.has("SPEAK")){
        return message.channel.send("I need the permissions to join and speak in your voice channel")
    }
    // Getting the song info from youtube
    search(args[1], opts, async function(err, results) {
        if(err) return console.log(err);
        link = results[0].link
        console.log(link)
        const songInfo = await ytdl.getInfo(link)
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url
        }
        // If serverQueue is already defined means music is already playing.
        if(!serverQueue){
            // Creating the contract for our queue
            const queueContruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
                playing: true,
            };
            // Setting the queue using our contract
            queue.set(message.guild.id, queueContruct);
            // Pushing the song to our songs array
            queueContruct.songs.push(song);
            
            try {
                // Here we try to join the voicechat and save our connection into our object.
                var connection = await voiceChannel.join();
                queueContruct.connection = connection;
                // Calling the play function to start the song
                play(message.guild, queueContruct.songs[0], queue);
            } catch (err) {
                // Printing the error message if the bot fails to join the voicechat
                console.log(err);
                queue.delete(message.guild.id);
                return message.channel.send(err);
            }
        }else{
            serverQueue.songs.push(song)
            console.log(serverQueue.songs, "here")
            return message.channel.send(`${song.title} has been added to your queue`+song.url)
        }
    });
}

module.exports = {play, execute}