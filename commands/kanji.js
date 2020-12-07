/* eslint-disable no-plusplus */
const { MessageEmbed } = require('discord.js')
const fetch = require('node-fetch')

/**
 * handle generate description
 * @param {object} data
 */
const generateDescription = (data) => `
    JLPT : ${data.jlpt.join(', ')},
    common: ${data.is_common ? `yes` : `no`}
    Definitions
    ${data.senses
		.map((val) => {
			let result = `[${val.parts_of_speech.join(', ')}]: ${
				val.english_definitions
			}`
			if (val.links.length)
				result += `\n=> ${val.links.map(
					(link) => ` [${link.text}](${link.url})`
				)}`
			return result
		})
		.join('\n')}
    ---------------------\n
`
/**
 * generate random jlpt hashtag
 * TODO: generate word from popular kanji
 */
const generateHashtag = () => {
	const jlpts = [
		'%23jlpt-n5',
		'%23jlpt-n4',
		'%23jlpt-n3',
		'%23jlpt-n2',
		'%23jlpt-n1',
	]

	const randomize = Math.floor(Math.random() * 5) + 1

	return jlpts[randomize]
}

module.exports = {
	name: 'kanji',
	aliases: ['k'],
	cooldown: 5000,
	description: `Find kanji with english word for example \`${process.env.PREFIX}kanji "home"\`, if you want random kanji just use \`${process.env.PREFIX}kanji\``,
	async execute(message, arg, filters) {
		const title = !arg ? 'Random Kanji' : `Result of ${arg}`

		const helpEmbed = new MessageEmbed().setTitle(title).setColor('#32a852')
		try {
			const res = await fetch(
				`${process.env.API_URL}?keyword=${arg || generateHashtag()}`
			)
			const resJson = await res.json()
			let count = 0
			let limit = 4

			if (
				filters &&
				!Number.isNaN(filters.limit) &&
				parseInt(filters.limit, 10) < 4
			)
				limit = parseInt(filters.limit, 10)

			resJson.data.forEach((val) => {
				// TODO: simplify logic
				// handle filter -jlpt
				if (
					filters &&
					filters.jlpt &&
					val.jlpt.includes(`jlpt-${filters.jlpt}`)
				) {
					// handle filter limit
					if (limit <= count) return

					helpEmbed.addField(
						`**${val.slug} (${val.japanese[0].reading})**`,
						`${generateDescription(val)}`,
						false
					)
					count++
				} else if (!filters.jlpt) {
					// handle filter limit
					if (limit <= count) return

					helpEmbed.addField(
						`**${val.slug} (${val.japanese[0].reading})**`,
						`${generateDescription(val)}`,
						false
					)
					count++
				}
			})
			helpEmbed.setDescription(
				`Showing ${count} result of **${arg || 'random kanji'}**`
			)
			helpEmbed.setTimestamp()
			return message.channel.send(helpEmbed).catch(console.error)
		} catch (error) {
			helpEmbed.setDescription(`Result not found`)
			console.log(error)
			return message.channel.send(helpEmbed).catch(console.error)
		}
	},
}
