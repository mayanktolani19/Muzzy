const Discord = require("discord.js")
const {prefix, token} = require('./config.json')
const {execute} = require('./functions/play')
const {skip} = require('./functions/skip')
const {stop} = require('./functions/stop')
const {displayQueue} = require('./functions/displayQueue')

const client = new Discord.Client()
const queue = new Map();

client.login(token)

client.on('ready',()=>{
    console.log("READY!!!")
})


client.on('message', async (message)=>{
    if(message.author.bot)
        return
    if(!message.content.startsWith(prefix))
        return
    console.log(message.content)
    const serverQueue = queue.get(message.guild.id)
    if(message.content.startsWith(`${prefix}play`)){
        execute(message, serverQueue, queue)
        return;
    }else if(message.content.startsWith(`${prefix}skip`)){
        skip(message, serverQueue)
        return;
    }else if(message.content.startsWith(`${prefix}stop`)){
        stop(message, serverQueue)
        return;
    }else if(message.content.startsWith(`${prefix}queue`)){
        displayQueue(message, serverQueue)
        return;
    }
})