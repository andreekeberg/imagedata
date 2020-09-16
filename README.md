# ImageData

[![Version](https://img.shields.io/npm/v/@andreekeberg/imagedata)](https://www.npmjs.com/package/@andreekeberg/imagedata) [![Total Downloads](https://img.shields.io/npm/dt/@andreekeberg/imagedata)](https://www.npmjs.com/package/@andreekeberg/imagedata) [![License](https://img.shields.io/npm/l/@andreekeberg/imagedata)](https://www.npmjs.com/package/@andreekeberg/imagedata)

Unified method of getting `ImageData` from an image in both the **browser** and **Node.js**, asynchronously or synchronously.

Exports an `ImageData` class in **Node.js**, allowing you to use `instanceof ImageData` in both environments.

## Supported formats

- jpeg
- png
- gif
- bmp
- tiff

## Installation

### Using npm

```
npm install @andreekeberg/imagedata
```

### Using yarn

```
yarn add @andreekeberg/imagedata
```

## Getting started

### Import as an ES6 module

```javascript
import { get, getSync } from '@andreekeberg/imagedata'
```

### Import as a CommonJS module

```javascript
const { get, getSync } = require('@andreekeberg/imagedata')
```

## Usage (Browser)

### Asynchronously

#### Available input types

|Type|Description|
|----|-----------|
|`string`|Path to image file|
|`HTMLImageElement`|Reference to an `<img>` element|
|`File`|Generally returned from an `<input>` element|
|`Blob`|Raw binary data blob|

#### Example

```javascript
get('image.jpg', (error, data) => {
    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }
})
```

### Synchronously

#### Available input types

|Type|Description|
|----|-----------|
|`HTMLImageElement`|Reference to an `<img>` element|

> Throws an `Error` if the provided image has not completed loading.
 
#### Example

```javascript
const image = document.querySelector('img')

try {
    console.log(getSync(image))
} catch(error) {
    console.log(error)
}
```

## Usage (Node.js)

### Asynchronously

#### Available input types

|Type|Description|
|----|-----------|
|`string`|Path to image file|
|`Buffer`|Created from `fs.readFile` or `fs.readFileSync`|
|`fs.ReadStream`|Created from `fs.createReadStream`|

#### Example

```javascript
get('image.jpg', (error, data) => {
    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }
})
```

### Synchronously

#### Available input types

|Type|Description|
|----|-----------|
|`string`|Path to image file|
|`Buffer`|Created from `fs.readFile` or `fs.readFileSync`|

#### Example

```javascript
try {
    console.log(getSync('image.jpg'))
} catch(error) {
    console.log(error)
}
```

## Documentation

* [Browser](docs/browser.md)
* [Node.js](docs/node.md)

## Contributing

Read the [contribution guidelines](CONTRIBUTING.md).

## Changelog

Refer to the [changelog](CHANGELOG.md) for a full history of the project.

## License

ImageData is licensed under the [MIT license](LICENSE).
