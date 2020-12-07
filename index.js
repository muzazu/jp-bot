/* eslint-disable no-console */
const { Client, Collection } = require('discord.js')
const dotenv = require('dotenv').config()
const commands = require('./commands')
const getcommand = require('./utils/getcommand')

if (dotenv.error) {
	throw dotenv.error
}
const config = dotenv.parsed
const cache = {}
const client = new Client()
client.commands = new Collection()
client.prefix = config.PREFIX
// handle login bot
client.login(config.TOKEN)

// log when ready
client.on('ready', () => {
	console.log(`use ${config.PREFIX}help for command list`)
	client.user.setActivity(`use ${config.PREFIX}help for command list`)
})
client.on('warn', (info) => console.log(info))
client.on('error', console.error)

// register commands
Object.keys(commands).forEach((key) => {
	client.commands.set(key, commands[key])
})

client.on('message', async (message) => {
	if (message.author.bot) return
	if (!message.guild) return

	const [cmdName, arg, filters] = getcommand(message)
	const command =
		client.commands.get(cmdName) ||
		client.commands.find(
			(cmd) => cmd.aliases && cmd.aliases.includes(cmdName)
		)
	if (!command) return

	// set cache
	if (!cache[message.author.id]) cache[message.author.id] = {}
	const now = new Date()

	if (
		cache[message.author.id][command.name] &&
		cache[message.author.id][command.name].cooldown > now
	)
		return

	cache[message.author.id][command.name] = {
		cooldown: now + command.cooldown || 1000,
	}

	try {
		command.execute(message, arg, filters)
	} catch (error) {
		console.log(error)
	}
})
