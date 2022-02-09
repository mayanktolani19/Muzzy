const displayQueue = (message, serverQueue)=>{
    // message.channel.send(serverQueue)
    console.log(serverQueue.songs)
    output = ""
    serverQueue.songs.forEach(element => {
        output += String(element.title)
        output += '\n'        
    });
    message.channel.send(output)
}

module.exports = {displayQueue}