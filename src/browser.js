/**
 * Loads an image and passes the resulting ImageData to the callback function
 * 
 * @param {string} src
 * @param {function} callback
 * @throws {Error} If the src argument is not a string
 * @throws {Error} If the callback argument is not a function
 * @ignore
 */
const loadImage = (src, callback) => {
    if (typeof src !== 'string') {
        throw new Error('Argument src must be a string')
    }

    if (typeof callback !== 'function') {
        throw new Error('Argument callback must be a function')
    }

    const image = new Image()

    image.onerror = (error) => callback(error, null)

    image.onload = function() {
        callback(null, getImageData(this))
    }

    image.src = src
}

/**
 * Returns an ImageData instance based on a provided image
 * 
 * @param {HTMLImageElement} image
 * @throws {Error} If the image argument if not a HTMLImageElement
 * @return {ImageData}
 * @ignore
 */
const getImageData = image => {
    if (!(image instanceof HTMLImageElement)) {
        throw new Error('Argument image must be a HTMLImageElement')
    }

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight

    ctx.drawImage(image, 0, 0)

    return ctx.getImageData(
        0, 0, image.naturalWidth, image.naturalHeight
    )
}

/**
 * Asynchronously get an ImageData instance based on provided data
 * 
 * @param {(string|HTMLImageElement|File|Blob)} data
 * @param {function} callback
 * @throws {Error} If the data argument is not a string, HTMLImageElement, File or Blob
 * @throws {Error} If the callback argument is not a function
 */
const get = (data, callback) => {
    if (typeof callback !== 'function') {
        throw new Error('Argument callback must be a function')
    }

    if (typeof data === 'string') {
        loadImage(data, callback)
    } else if (data instanceof HTMLImageElement) {
        if (data.complete) {
            callback(null, getImageData(data))
        } else {
            data.onload = () => {
                callback(null, getImageData(data))
            }
        }
    } else {
        if (!(data instanceof File) && !(data instanceof Blob)) {
            throw new Error('Argument data must be a string, HTMLImageElement, File or Blob')
        }

        const url = URL.createObjectURL(data)

        loadImage(url, (error, data) => {
            if (error) {
                callback(error, null)
            } else {
                URL.revokeObjectURL(url)

                callback(null, data)
            }
        })
    }
}

/**
 * Synchronously get an ImageData instance based on provided data
 *
 * @param {HTMLImageElement} image
 * @throws {Error} If the image argument is not an HTMLImageElement
 * @throws {Error} If the image has not completed loading
 * @returns {ImageData}
 */
const getSync = image => {
    if (!(image instanceof HTMLImageElement)) {
        throw new Error('Argument image must be an HTMLImageElement')
    }

    if (image.complete) {
        return getImageData(image)
    } else {
        throw new Error('Image has not completed loading')
    }
}

export { get, getSync }
