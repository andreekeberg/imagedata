import { assert, expect } from 'chai'
import { get, getSync } from '../src/browser'

describe('Browser', () => {
    describe('get', () => {
        it('should throw an error if data is not a string, HTMLImageElement, File or Blob', () => {
            expect(() => get({}, () => {})).to.throw(Error)
        })

        it('should throw an error if callback is not a function', () => {
            expect(() => get('test.jpg', null)).to.throw(Error)
        })
    })

    describe('getSync', () => {
        it('should throw an error if image is not an HTMLImageElement', () => {
            expect(() => getSync('test.jpg')).to.throw(Error)
        })
    })
})
