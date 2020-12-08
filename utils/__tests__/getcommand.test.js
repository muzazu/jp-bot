const mockMessage = require('../../__mocks__/message')
const getcommand = require('../getcommand')

describe('getCommand', () => {
	test('should return command name', () => {
		console.log(mockMessage)
		const cmd = getcommand(mockMessage)[0]
		expect(cmd).toBe('kanji')
	})
	test('should return empty arg', () => {
		const arg = getcommand(mockMessage)[1]
		expect(arg).toBe('')
	})
	test('should return empty filters', () => {
		const arg = getcommand(mockMessage)[2]
		expect(arg).toMatchObject({})
	})
})
