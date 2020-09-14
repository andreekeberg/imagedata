const { ReadStream, existsSync, readFileSync } = require('fs')
const jimp = require('jimp')
const { streamToBuffer } = require('@jorgeferrero/stream-to-buffer')
const { sync: mimeSync } = require('mime-kind')

/**
 * Polyfill for {@link https://developer.mozilla.org/en-US/docs/Web/API/ImageData|ImageData}
 */
class ImageData {
    /**
     * Create a new ImageData instance from an object literal
     * 
     * @param {Object} object
     * @throws {Error}
     */
    constructor(object) {
        if (!(object instanceof Object) || object.constructor !== Object) {
            throw new Error('Argument object must be an object literal')
        }

        if (typeof object.data === 'undefined') {
            throw new Error('Argument object is missing required data parameter')
        }

        if (typeof object.width === 'undefined') {
            throw new Error('Argument object is missing required width parameter')
        }

        if (typeof object.height === 'undefined') {
            throw new Error('Argument object is missing required height parameter')
        }

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
 * Asynchronously get an ImageData instance based on provided input
 * 
 * @param {(string|Buffer|ReadStream)} image
 * @param {function} callback
 * @throws {Error}
 */
const get = (image, callback) => {
    if (
        typeof image !== 'string' &&
        !(image instanceof Buffer) &&
        !(image instanceof ReadStream)
    ) {
        throw new Error('Argument image must be a string, Buffer, or ReadStream')
    }

    if (typeof callback !== 'function') {
        throw new Error('Argument callback must be a function')
    }

    const read = image => {
        jimp.read(image).then(img => {
            callback(null, new ImageData(img.bitmap))
        }, callback)
    }

    if (image instanceof ReadStream) {
        streamToBuffer(image).then(read)
    } else {
        read(image)
    }
}

/**
 * Synchronously get an ImageData instance based on provided input
 * 
 * @param {(string|Buffer)} image
 * @throws {Error}
 * @returns {ImageData}
 */
const getSync = image => {
    if (typeof image !== 'string' && !(image instanceof Buffer)) {
        throw new Error('Argument image must be a string or Buffer')
    }

    if (typeof image === 'string' && !existsSync(image)) {
        throw new Error(`Could not find ${image}`)
    }

    const mimeType = mimeSync(image)

    if (mimeType === null) {
        throw new Error('Could not get file mime type')
    }

    if (typeof image === 'string') {
        image = readFileSync(image)
    }

    const type = mimeType.mime

    if (typeof jimp.decoders[type] === 'undefined') {
        throw new Error(`No decoder available for file of type ${type}`)
    }

    return new ImageData(jimp.decoders[type](image))
}

exports.get = get
exports.getSync = getSync
exports.ImageData = ImageData
