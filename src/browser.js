/**
 * Loads an image and passes the resulting ImageData to the callback function
 * 
 * @param {string} src
 * @param {function} callback
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
 * @throws {Error}
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
 * Asynchronously get an ImageData instance based on provided input
 * 
 * @param {(string|HTMLImageElement|File|Blob)} image
 * @param {function} callback
 * @throws {Error}
 */
const get = (image, callback) => {
    if (typeof callback !== 'function') {
        throw new Error('Argument callback must be a function')
    }

    if (typeof image === 'string') {
        loadImage(image, callback)
    } else if (image instanceof HTMLImageElement) {
        if (image.complete) {
            callback(null, getImageData(image))
        } else {
            image.onload = () => {
                callback(null, getImageData(image))
            }
        }
    } else {
        if (!(image instanceof File) && !(image instanceof Blob)) {
            throw new Error('Argument image must be a string, HTMLImageElement, File or Blob')
        }

        const url = URL.createObjectURL(image)

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
 * Synchronously get an ImageData instance based on provided input
 *
 * @param {HTMLImageElement} image
 * @throws {Error}
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
