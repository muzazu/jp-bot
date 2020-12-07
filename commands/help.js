const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'help',
	aliases: ['h'],
	description: `Display all commands and descriptions`,
	execute(message, arg) {
		const commands = message.client.commands.array()

		const helpEmbed = new MessageEmbed()
			.setTitle(`${message.client.user.username} Help`)
			.setDescription(
				`Add third argument to find specific command ex: \`${process.env.PREFIX}help kanji\``
			)
			.setColor('#F8AA2A')

		commands.forEach((cmd) => {
			if (!arg) {
				helpEmbed.addField(
					`**${message.client.prefix}${cmd.name} ${
						cmd.aliases ? `(${cmd.aliases})` : ''
					}**`,
					`${cmd.description}`,
					false
				)
			} else if (arg.toLowerCase() === cmd.name.toLowerCase()) {
				helpEmbed.addField(
					`**${message.client.prefix}${cmd.name} ${
						cmd.aliases ? `(${cmd.aliases})` : ''
					}**`,
					`${cmd.description}`,
					false
				)
			}
		})

		helpEmbed.setTimestamp()

		return message.channel.send(helpEmbed).catch(console.error)
	},
}
