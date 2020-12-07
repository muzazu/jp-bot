const message = require('../../__mocks__/message')
const getcommand = require('../getcommand')

describe('getCommand', () => {
	test('should return command name', () => {
		const cmd = getcommand(message)[0]
		expect(cmd).toBe('kanji')
	})
	test('should return arg', () => {
		const arg = getcommand(message)[1]
		expect(arg).toBe(undefined)
	})
})
