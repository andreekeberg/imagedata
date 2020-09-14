# ImageData

Unified method of getting `ImageData` instances in both the browser and Node.js, either asynchronously or synchronously.

Also exports an `ImageData` polyfill in Node.js, allowing you to use `instanceof ImageData` to type check any returned data.

[![Version](https://img.shields.io/npm/v/imagedata)](https://www.npmjs.com/package/imagedata) [![Total Downloads](https://img.shields.io/npm/dt/imagedata)](https://www.npmjs.com/package/imagedata) [![License](https://img.shields.io/npm/l/imagedata)](https://www.npmjs.com/package/imagedata)

## Supported formats

- jpeg
- png
- gif
- bmp
- tiff

## Installation

**Using npm**

```
npm install imagedata
```

**Using yarn**

```
yarn add imagedata
```

## Getting started

**Import as an ES6 module**

```javascript
import { get, getSync } from 'imagedata'
```

**Import as a CommonJS module**

```javascript
const { get, getSync } = require('imagedata')
```

## Usage

### In the browser

#### Asynchronously

**Available input types**

|Type|Description|
|----|-----------|
|`string`|Path to image file|
|`HTMLImageElement`|Reference to an `<img>` element|
|`File`|Generally returned from an `<input>` element|
|`Blob`|Raw binary data blob|

**Example**

```javascript
get('image.jpg', (error, data) => {
    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }
})
```

#### Synchronously

**Available input types**

|Type|Description|
|----|-----------|
|`HTMLImageElement`|Reference to an `<img>` element|

> Throws an `Error` if the provided image has not completed loading.
 
**Example**

```javascript
const image = document.querySelector('img')

try {
    console.log(getSync(image))
} catch(error) {
    console.log(error)
}
```

### In Node.js

#### Asynchronously

**Available input types**

|Type|Description|
|----|-----------|
|`string`|Path to image file|
|`Buffer`|Created from `fs.readFile` or `fs.readFileSync`|
|`fs.ReadStream`|Created from `fs.createReadStream`|

**Example**

```javascript
get('image.jpg', (error, data) => {
    if (error) {
        console.log(error)
    } else {
        console.log(data)
    }
})
```

#### Synchronously

**Available input types**

|Type|Description|
|----|-----------|
|`string`|Path to image file|
|`Buffer`|Created from `fs.readFile` or `fs.readFileSync`|

**Example**

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
