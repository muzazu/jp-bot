/* eslint-disable no-param-reassign */
const { Collection } = require('discord.js')
const commands = require('../commands')

/**
 * mock message data
 * @param {object} message
 * @returns {object} message
 */
exports.mockMessage = (message) => {
	message.client = {
		commands: new Collection(),
		user: {
			username: 'jp-bot',
		},
		prefix: process.env.PREFIX,
	}
	message.channel.send = (data) => new Promise((resolve) => resolve(data))

	Object.keys(commands).forEach((key) => {
		message.client.commands.set(key, commands[key])
	})

	return message
}
