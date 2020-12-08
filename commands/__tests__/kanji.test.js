jest.mock('node-fetch')
const fetch = require('node-fetch')
const message = require('../../__mocks__/message')
const kanji = require('../kanji')
const { mockMessage } = require('../../__mocks__/discord')
const mockAPI = require('../../__mocks__/api')

const { Response } = jest.requireActual('node-fetch')

describe('Command Help', () => {
	beforeEach(() => {
		fetch.mockReturnValue(
			Promise.resolve(new Response(JSON.stringify(mockAPI)))
		)
	})
	test("should have name 'kanji'", () => {
		expect(kanji.name).toBe('kanji')
	})
	test('should return 4 fields', async () => {
		const result = mockMessage(message)
		const res = await kanji.execute(result, null, {})
		expect(res.fields.length).toEqual(4)
	})
	test('`-jp kanji [keyword] -limit=1` should return 1 field', async () => {
		const result = mockMessage(message)
		const res = await kanji.execute(result, null, { limit: 1 })
		expect(res.fields.length).toEqual(1)
	})
	test('`-jp kanji [keyword] -jlpt=n5` should return only kanji with jlpt-n5', async () => {
		const result = mockMessage(message)
		const res = await kanji.execute(result, null, { jlpt: 'n5' })
		expect(res.fields[0].value).toContain('jlpt-n5')
	})
})
