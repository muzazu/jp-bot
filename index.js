/* eslint-disable consistent-return */
/* eslint-disable no-console */
const { Client, Collection, MessageEmbed } = require('discord.js')
const commands = require('./commands')
const getcommand = require('./utils/getcommand')

// eslint-disable-next-line global-require
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const cache = {}
const client = new Client()
client.commands = new Collection()
client.prefix = process.env.PREFIX
// handle login bot
client.login(process.env.TOKEN)

// log when ready
client.on('ready', () => {
	console.log(`use ${process.env.PREFIX}help for command list`)
	client.user.setActivity(`use ${process.env.PREFIX}help for command list`)
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
	const now = Date.now()

	if (
		cache[message.author.id][command.name] &&
		cache[message.author.id][command.name].cooldown > now
	)
		return new MessageEmbed()
			.setTitle(`Oops you're too fast`)
			.description(
				`try it again after **${
					now - cache[message.author.id][command.name].cooldown
				} seconds**`
			)
			.setColor('#eb3434')

	cache[message.author.id][command.name] = {
		cooldown: now + command.cooldown || 1000,
	}

	try {
		command.execute(message, arg, filters)
	} catch (error) {
		console.log(error)
	}
})
