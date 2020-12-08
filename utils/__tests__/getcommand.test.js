const mockMessage = require('../../__mocks__/message')
const getcommand = require('../getcommand')

let data = {}
beforeEach(() => {
	data = mockMessage
})
describe('getCommand', () => {
	test('should return command name', () => {
		const cmd = getcommand(data)[0]
		expect(cmd).toBe('kanji')
	})
	test('should return empty arg', () => {
		const arg = getcommand(data)[1]
		expect(arg).toBe('')
	})
	test('should return empty filters', () => {
		const arg = getcommand(data)[2]
		expect(arg).toMatchObject({})
	})
})
