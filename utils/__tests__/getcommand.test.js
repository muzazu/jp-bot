const mockMessage = require('../../__mocks__/message.js')
const getcommand = require('../getcommand.js')

jest.disableAutomock()

let data
beforeEach(() => {
	data = getcommand(mockMessage)
})
describe('getCommand', () => {
	test('should return command name', () => {
		const cmd = data[0]
		console.log(data)
		expect(cmd).toBe('kanji')
	})
	test('should return empty arg', () => {
		const arg = data[1]
		expect(arg).toBe('')
	})
	test('should return empty filters', () => {
		const arg = data[2]
		expect(arg).toMatchObject({})
	})
})
