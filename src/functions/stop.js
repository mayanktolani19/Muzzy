const stop = (message, serverQueue) =>{
    if(!message.member.voice.channel)
        return message.channel.send("You have to be in a voice channel to stop the music")
    if(!serverQueue)
        return message.channel.send("There is no song that could be stopped")
    serverQueue.songs = []
    serverQueue.connection.dispatcher.end()
}

module.exports = {stop}