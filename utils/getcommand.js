/**
 * handle get command from message
 * @param {object} msg
 * @returns {[string, string]} command and arg
 */
module.exports = (msg) => {
	if (!msg) return []
	if (msg.content && !msg.content.startsWith(process.env.PREFIX)) return []

	const [, commandname, ...args] = msg.content.split(' ')
	const arg = args.join(' ')
	const clearArg = arg.replace(/\W/g, '')
	return [commandname, clearArg]
}
