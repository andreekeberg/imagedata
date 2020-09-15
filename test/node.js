import { assert, expect } from 'chai'
import { get, getSync, ImageData } from '../lib/node'
import fs from 'fs'

const imagePath = `${__dirname}/images/hotdog.jpg`
const imageBuffer = fs.readFileSync(imagePath)
const imageReadStream = fs.createReadStream(imagePath)

describe('Node', () => {
    describe('ImageData', () => {
        it('should throw an error if object is not an object literal', () => {
            expect(() => new ImageData([])).to.throw(Error)
        })

        it('should throw an error if object data is not defined', () => {
            expect(() => new ImageData({ width: 1, height: 1 })).to.throw(Error)
        })

        it('should throw an error if object width is not defined', () => {
            expect(() => new ImageData({ data: {}, height: 1 })).to.throw(Error)
        })

        it('should throw an error if object height is not defined', () => {
            expect(() => new ImageData({ data: {}, width: 1 })).to.throw(Error)
        })

        it('should return an ImageData instance', () => {
            const imageData = new ImageData({ data: {}, height: 1, width: 1 })

            assert.instanceOf(imageData, ImageData)
        })
    })

    describe('get', () => {
        it('should throw an error if image is not a string, Buffer, or fs.ReadStream', () => {
            expect(() => get({}, () => {})).to.throw(Error)
        })

        it('should throw an error if callback is not a function', () => {
            expect(() => get('test.jpg', null)).to.throw(Error)
        })

        it('should call provided callback with an ImageData instance when given a path', () => {
            get(imagePath, (error, data) => {
                assert.instanceOf(data, ImageData)
            })
        })

        it('should call provided callback with an ImageData instance when given a Buffer', () => {
            get(imageBuffer, (error, data) => {
                assert.instanceOf(data, ImageData)
            })
        })

        it('should call provided callback with an ImageData instance when given a ReadStream', () => {
            get(imageReadStream, (error, data) => {
                assert.instanceOf(data, ImageData)
            })
        })

        it('callback data should include the correct image width', () => {
            get(imagePath, (error, data) => {
                expect(data.width).to.equal(500)
            })
        })

        it('callback data should include the correct image height', () => {
            get(imagePath, (error, data) => {
                expect(data.height).to.equal(333)
            })
        })

        it('callback data should include a Uint8ClampedArray', () => {
            get(imagePath, (error, data) => {
                assert.instanceOf(data.data, Uint8ClampedArray)
            })
        })
    })

    describe('getSync', () => {
        it('should throw an error if image is not a string or Buffer', () => {
            expect(() => getSync([])).to.throw(Error)
        })

        it('should throw an error if provided image could not be found', () => {
            expect(() => getSync('missing.jpg')).to.throw(Error)
        })

        it('should return an ImageData instance when given a path', () => {
            const imageData = getSync(imagePath)

            assert.instanceOf(imageData, ImageData)
        })

        it('should return an ImageData instance when given a Buffer', () => {
            const imageData = getSync(imageBuffer)

            assert.instanceOf(imageData, ImageData)
        })

        it('returned ImageData should include the correct image width', () => {
            const imageData = getSync(imagePath)

            expect(imageData.width).to.equal(500)
        })

        it('returned ImageData should include the correct image height', () => {
            const imageData = getSync(imagePath)

            expect(imageData.height).to.equal(333)
        })

        it('returned ImageData should include a Uint8ClampedArray', () => {
            const imageData = getSync(imagePath)

            assert.instanceOf(imageData.data, Uint8ClampedArray)
        })
    })
})
