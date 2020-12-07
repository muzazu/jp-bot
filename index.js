/* eslint-disable no-console */
import { Client, Collection } from 'discord.js'

const client = new Client()
client.commands = new Collection()
client.prefix = process.env.PREFIX
// handle login bot
client.login(process.env.TOKEN)

// log when ready
client.on('ready', () => {
	console.log('I am ready!')
	client.user.setActivity(`use ${process.env.PREFIX}help for command list`)
})
client.on('warn', (info) => console.log(info))
client.on('error', console.error)
