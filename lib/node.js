const { ReadStream, existsSync, readFileSync } = require('fs')
const jimp = require('jimp')
const { streamToBuffer } = require('@jorgeferrero/stream-to-buffer')
const { sync: mimeSync } = require('mime-kind')

/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ImageData|ImageData} polyfill for Node.js
 */
class ImageData {
    /**
     * Create a new ImageData instance from an object literal
     * 
     * @param {Object} object
     * @throws {Error} If the object argument is not an object literal
     * @throws {Error} If the object argument is missing required property data
     * @throws {Error} If the object argument is missing required property width
     * @throws {Error} If the object argument is missing required property height
     */
    constructor(object) {
        if (!(object instanceof Object) || object.constructor !== Object) {
            throw new Error('Argument object must be an object literal')
        }

        const required = ['data', 'width', 'height']

        required.forEach(param => {
            if (typeof object[param] === 'undefined') {
                throw new Error(`Argument object is missing required property "${param}"`)
            }
        })

        let data

        if (object.data instanceof Uint8ClampedArray) {
            data = object.data
        } else {
            data = new Uint8ClampedArray(object.data)
        }

        Object.defineProperty(this, 'data', {
            value: data,
            writable: false,
            enumerable: true
        })

        Object.defineProperty(this, 'width', {
            value: object.width,
            writable: false,
            enumerable: true
        })

        Object.defineProperty(this, 'height', {
            value: object.height,
            writable: false,
            enumerable: true
        })
    }
}

/**
 * Asynchronously get an ImageData instance based on provided data
 * 
 * @param {(string|Buffer|ReadStream)} data
 * @param {function} callback
 * @throws {Error} If the data argument is not a string, Buffer, or ReadStream
 * @throws {Error} If the callback argument is not a function
 */
const get = (data, callback) => {
    if (
        typeof data !== 'string' &&
        !(data instanceof Buffer) &&
        !(data instanceof ReadStream)
    ) {
        throw new Error('Argument data must be a string, Buffer, or ReadStream')
    }

    if (typeof callback !== 'function') {
        throw new Error('Argument callback must be a function')
    }

    const read = data => {
        jimp.read(data).then(image => {
            callback(null, new ImageData(image.bitmap))
        }, callback)
    }

    if (data instanceof ReadStream) {
        streamToBuffer(data).then(read)
    } else {
        read(data)
    }
}

/**
 * Synchronously get an ImageData instance based on provided data
 * 
 * @param {(string|Buffer)} data
 * @throws {Error} If the data argument is not a string or Buffer
 * @throws {Error} If the data argument is a string and the file could not be found
 * @throws {Error} If the mime type could not be retrieved
 * @throws {Error} If no image decoder could be found for the mime type
 * @returns {ImageData}
 */
const getSync = data => {
    if (typeof data !== 'string' && !(data instanceof Buffer)) {
        throw new Error('Argument data must be a string or Buffer')
    }

    if (typeof data === 'string' && !existsSync(data)) {
        throw new Error(`Could not find ${data}`)
    }

    const mimeType = mimeSync(data)

    if (mimeType === null) {
        throw new Error('Could not retrieve mime type of file')
    }

    if (typeof data === 'string') {
        data = readFileSync(data)
    }

    const type = mimeType.mime

    if (typeof jimp.decoders[type] === 'undefined') {
        throw new Error(`No image decoder available for file of type ${type}`)
    }

    return new ImageData(jimp.decoders[type](data))
}

exports.get = get
exports.getSync = getSync
exports.ImageData = ImageData
