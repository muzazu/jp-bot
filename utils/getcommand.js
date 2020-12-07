/**
 * handle get command from message
 * @param {object} msg
 * @returns {[string, string, object]} command and arg
 */
module.exports = (msg) => {
	if (!msg) return []
	if (msg.content && !msg.content.startsWith(process.env.PREFIX)) return []

	const [, commandname, ...args] = msg.content.split(' ')
	const filters = {}
	args.forEach((arg) => {
		if (arg.startsWith('-')) {
			const [key, value] = arg.split('=')
			filters[key.substring(1)] = value
		}
	})
	const arg = args.filter((ar) => !ar.startsWith('-')).join(' ')
	const clearArg = arg.replace(/"/g, '') // remove double quoute
	return [commandname, clearArg, filters]
}
