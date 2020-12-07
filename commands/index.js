const help = require('./help')
const kanji = require('./kanji')

module.exports = {
	help,
	kanji,
	'-limit': {
		name: 'kanji -limit',
		aliases: ['-limit'],
		description: `Limit result of kanji \`${process.env.PREFIX}kanji -limit=1\``,
	},
	'-jlpt': {
		name: 'kanji -jlpt',
		aliases: ['-jlpt'],
		description: `
			Usage \`${process.env.PREFIX}kanji -jlpt=n5\`
			Values: n1, n2, n3, n4, n5
			`,
	},
}
