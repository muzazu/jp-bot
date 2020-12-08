const message = require('../../__mocks__/message')
const help = require('../help')
const { mockMessage } = require('../../__mocks__/discord')

describe('Command Help', () => {
	test("should have name 'help'", () => {
		expect(help.name).toBe('help')
	})
	test('should return all command', async () => {
		const result = mockMessage(message)
		const res = await help.execute(result)
		expect(res.fields.length).toEqual(4)
	})
	test('first command to be `-jp help (h)`', async () => {
		const result = mockMessage(message)
		const res = await help.execute(result)
		expect(res.fields[0].name).toBe('**-jp help (h)**')
	})
})
